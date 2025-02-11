import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { cubicOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

type FlyAndScaleParams = {
	y?: number;
	x?: number;
	start?: number;
	duration?: number;
};

export const flyAndScale = (
	node: Element,
	params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
	const style = getComputedStyle(node);
	const transform = style.transform === 'none' ? '' : style.transform;

	return {
		duration: params.duration ?? 150,
		easing: cubicOut,
		css: (t) => {
			const y = (params.y ?? 0) * (1 - t);
			const x = (params.x ?? 0) * (1 - t);
			const scale = (params.start ?? 0.95) + (1 - (params.start ?? 0.95)) * t;

			return `
				transform: ${transform} translate3d(${x}px, ${y}px, 0) scale(${scale});
				opacity: ${t}
			`;
		}
	};
};
