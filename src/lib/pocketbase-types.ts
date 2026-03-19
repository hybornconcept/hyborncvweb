import type { RecordModel } from 'pocketbase';

// ─── users (extends PocketBase auth collection) ───────────────────────────────
export interface UsersRecord extends RecordModel {
	fullname: string;
	email: string;
	phone: string;
	location: string;
	role: 'admin' | 'client';
	referral_code: string;
	referred_by: string; // Relation → users
	wallet_balance: number;
	emailVisibility: boolean;
	verified: boolean;
	avatar: string; // File
}

// ─── orders ───────────────────────────────────────────────────────────────────
export interface OrdersRecord extends RecordModel {
	user: string; // Relation → users
	Job_Title: string;
	Career_Level: string;
	Package: string; // 'basic' | 'regular' | 'allinone'
	Additional_Services: { id: string; label: string; price: number }[];
	Deadline: string; // DateTime ISO string
	fullname: string;
	phone: string;
	Additional_comments: string;
	job_link: string;
	order_status: 'Pending' | 'In Progress' | 'Revision' | 'Completed';
	payment_status: 'Unpaid' | 'Paid' | 'Failed';
	payment_method: string;
	amount: number;
}

// ─── deliveries ───────────────────────────────────────────────────────────────
export interface DeliveriesRecord extends RecordModel {
	order: string; // Relation → orders
	user: string; // Relation → users
	files: string[]; // File (multiple) — PocketBase stores filenames
	message: string;
	tag: 'Delivered' | 'In Review' | 'Action Required' | 'Completed';
}

// ─── revisions ────────────────────────────────────────────────────────────────
export interface RevisionsRecord extends RecordModel {
	order: string; // Relation → orders
	user: string; // Relation → users
	notes: string;
	status: 'Open' | 'In Review' | 'Resolved';
	delivery: string; // Relation → deliveries (optional)
}

// ─── referrals ────────────────────────────────────────────────────────────────
export interface ReferralsRecord extends RecordModel {
	referrer: string; // Relation → users
	referee: string; // Relation → users
	status: 'Pending' | 'Completed';
	reward_amount: number;
	payout_status: 'Pending' | 'Approved' | 'Paid';
	source: string; // 'Direct Link' | 'WhatsApp' | 'Email' | etc.
}

// ─── Expanded record helpers ──────────────────────────────────────────────────
export type OrdersExpanded = OrdersRecord & {
	expand?: { user: UsersRecord };
};

export type DeliveriesExpanded = DeliveriesRecord & {
	expand?: { order: OrdersRecord; user: UsersRecord };
};

export type RevisionsExpanded = RevisionsRecord & {
	expand?: { order: OrdersRecord; user: UsersRecord; delivery: DeliveriesRecord };
};

export type ReferralsExpanded = ReferralsRecord & {
	expand?: { referrer: UsersRecord; referee: UsersRecord };
};
