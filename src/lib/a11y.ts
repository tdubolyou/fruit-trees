/**
 * Accessibility utilities: focus trap and live region announcements.
 */

let announceCallback: ((msg: string) => void) | null = null;

export function registerAnnouncer(cb: (msg: string) => void) {
	announceCallback = cb;
}

export function announce(message: string) {
	if (announceCallback) {
		announceCallback(message);
	}
}

const FOCUSABLE_SELECTOR =
	'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Svelte action: traps focus within the given element.
 * Use on modal dialogs, popups, etc.
 */
export function focusTrap(node: HTMLElement) {
	function handleKeydown(e: KeyboardEvent) {
		if (e.key !== 'Tab') return;

		const focusable = Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
		if (focusable.length === 0) return;

		const first = focusable[0];
		const last = focusable[focusable.length - 1];

		if (e.shiftKey && document.activeElement === first) {
			e.preventDefault();
			last.focus();
		} else if (!e.shiftKey && document.activeElement === last) {
			e.preventDefault();
			first.focus();
		}
	}

	node.addEventListener('keydown', handleKeydown);

	// Auto-focus first focusable element
	const firstFocusable = node.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
	if (firstFocusable) {
		firstFocusable.focus();
	}

	return {
		destroy() {
			node.removeEventListener('keydown', handleKeydown);
		}
	};
}
