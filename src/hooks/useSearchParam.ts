import type { LocationQueryRaw } from 'vue-router';

export function useSearchParam<T>(key: string, defaultValue: T) {
	const route = useRoute();
	const router = useRouter();

	const value = ref(route?.query?.[key] || defaultValue);

	const setValue = (newValue: T) => {
		const query = { ...route.query, [key]: newValue } as T as LocationQueryRaw;
		router.replace({ query });
	};

	watch(
		() => route.query,
		(newQuery) => {
			value.value = newQuery[key] || defaultValue;
		}
	);

	return [value, setValue] as const;
}
