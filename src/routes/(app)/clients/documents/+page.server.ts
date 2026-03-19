import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const pb = locals.pb;
	const user = locals.user;

	const hour = new Date().getHours();
	let greeting = 'Good Evening';
	if (hour < 12) greeting = 'Good Morning';
	else if (hour < 17) greeting = 'Good Afternoon';

	// Fetch all deliveries for this user, newest first
	const rawDeliveries = await pb.collection('deliveries').getFullList({
		filter: `user = "${user?.id}"`,
		sort: '-created',
		expand: 'order'
	});

	// Helper to derive file type from filename
	function getFileType(filename: string): string {
		const ext = filename.split('.').pop()?.toLowerCase() || '';
		if (['pdf'].includes(ext)) return 'pdf';
		if (['doc', 'docx'].includes(ext)) return 'doc';
		if (['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(ext)) return 'image';
		return 'file';
	}

	// Fetch all orders for this user
	const rawOrders = await pb.collection('orders').getFullList({
		filter: `user = "${user?.id}"`,
		sort: '-created'
	});

	// Flatten all files from all deliveries
	const deliveryFiles = rawDeliveries.flatMap((delivery) => {
		const files: string[] = Array.isArray(delivery.files) ? delivery.files : [];
		const orderId = delivery.expand?.order?.id
			? `#ORD-${delivery.expand.order.id.slice(0, 6).toUpperCase()}`
			: '—';

		return files.map((filename) => ({
			id: `${delivery.id}-${filename}`,
			name: filename,
			type: getFileType(filename),
			orderId,
			dateCreated: new Date(delivery.created).toLocaleDateString('en-US', {
				month: 'short',
				day: 'numeric',
				year: 'numeric'
			}),
			// PocketBase file URL
			url: pb.files.getURL(delivery, filename),
			tag: delivery.tag || 'Delivered',
			message: delivery.message || '',
			owner: { name: 'Admin', initials: 'AD' }
		}));
	});

	// Flatten all files from user's orders
	const orderFiles = rawOrders.flatMap((order) => {
		const files: string[] = Array.isArray(order.documents) ? order.documents : [];
		const orderId = `#ORD-${order.id.slice(0, 6).toUpperCase()}`;

		return files.map((filename) => ({
			id: `${order.id}-${filename}`,
			name: filename,
			type: getFileType(filename),
			orderId,
			dateCreated: new Date(order.created).toLocaleDateString('en-US', {
				month: 'short',
				day: 'numeric',
				year: 'numeric'
			}),
			url: pb.files.getURL(order, filename),
			tag: 'Uploaded by You',
			message: '',
			owner: { 
				name: user?.fullname || 'You', 
				initials: (user?.fullname ? user.fullname.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase() : 'YO') 
			}
		}));
	});

	// Combine and sort by date descending
	const allFiles = [...deliveryFiles, ...orderFiles].sort((a, b) => {
		return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
	});

	// Recent = last 4 files
	const recentFiles = allFiles.slice(0, 4).map((f) => ({
		id: f.id,
		name: f.name,
		date: f.dateCreated,
		type: f.type,
		orderId: f.orderId
	}));

	return {
		pageInfo: {
			greeting: `${greeting}, ${user?.fullname || user?.name || 'there'}`,
			subtext: 'Access and download your finalized CVs, cover letters, and other career documents.'
		},
		recentFiles,
		allFiles,
		user
	};
};
