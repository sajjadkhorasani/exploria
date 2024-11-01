import { ref, onMounted, onBeforeUnmount } from 'vue';

export function useIntersectionObserver(
	target: Ref<HTMLElement | null>,
	callback: (entry: IntersectionObserverEntry) => void,
	options: IntersectionObserverInit = { threshold: 1, rootMargin: '0px' }
) {
	const observer = ref<IntersectionObserver | null>(null);

	const observe = () => {
		if (target?.value && observer.value) {
			observer.value.observe(target.value);
		}
	};

	const unobserve = () => {
		if (target?.value && observer.value) {
			observer.value.unobserve(target.value);
			observer.value.disconnect();
		}
	};

	onMounted(() => {
		observer.value = new IntersectionObserver((entries) => {
			entries.forEach(callback);
		}, options);
		observe();
	});

	onBeforeUnmount(() => {
		unobserve();
	});

	return { observer };
}
