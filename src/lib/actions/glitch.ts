import { gsap } from 'gsap';

function getGlitchTimeline(el: HTMLElement) {
	const turb = document.querySelector('#filter-glitch feTurbulence');
	const disp = document.querySelector('#filter-glitch feDisplacementMap');

	if (!turb || !disp) {
		console.warn('Glitch SVG filter not found. Cannot create timeline.');
		return null;
	}

	const turbVal = { val: 0.000001 };
	const Tl = gsap.timeline({
		paused: true,
		onUpdate() {
			turb.setAttribute('baseFrequency', '0.00001 ' + turbVal.val);
		},
		onStart() {
			el.style.filter = 'url(#filter-glitch)';
		},
		onComplete() {
			el.style.filter = 'none';
		}
	});
	Tl.to(turbVal, { val: 0.8, duration: 0.1 });
	return Tl;
}
export function randomGlitch(node: HTMLElement) {
	const timeline = getGlitchTimeline(node);
	if (!timeline) return;

	const intervalId = window.setInterval(
		() => {
			timeline.restart();
		},
		2000 + Math.random() * 5000
	);

	return {
		destroy() {
			window.clearInterval(intervalId);
		}
	};
}

export function hoverGlitch(node: HTMLElement) {
	const timelineCache = new WeakMap<HTMLElement, gsap.core.Timeline>();

	const handleMouseOver = (event: MouseEvent) => {
		const target = event.target as HTMLElement;

		if (target.tagName === 'A' && target.closest('.glitch-on-hover')) {
			let timeline = timelineCache.get(target);

			if (!timeline) {
				const newTimeline = getGlitchTimeline(target);
				if (newTimeline) {
					timeline = newTimeline;
					timelineCache.set(target, timeline);
				}
			}

			timeline?.restart();
		}
	};

	node.addEventListener('mouseover', handleMouseOver);

	return {
		destroy() {
			node.removeEventListener('mouseover', handleMouseOver);
		}
	};
}
