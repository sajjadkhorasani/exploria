import { chunk } from '~/utils/chunk';
import { useSearchParam } from './useSearchParam';

interface IPagination {
	page: Ref<string>;
	pageSize: Ref<string>;
}

interface PaginationProps<T> {
	data: Ref<T[]>;
	pagination: IPagination;
	nextPage: () => void;
	previusPage: () => void;
	setPage: (page: number) => void;
	setPageSize: (pageSize: number) => void;
	hasNextPage: ComputedRef<boolean>;
	hasPreviusPage: ComputedRef<boolean>;
	reset: () => void;
}

export function usePagination<T>(arr: T[]): PaginationProps<T> {
	const [page, setPage] = useSearchParam('page', '0');
	const [pageSize, setPageSize] = useSearchParam('pageSize', '10');

	const chunkedData = computed(() => chunk(arr, +pageSize.value));

	function nextPage() {
		if (+page.value < chunkedData.value.length - 1) {
			const newValue = +page.value + 1;
			setPage(newValue.toString());
		}
	}

	function previusPage() {
		if (+page.value > 0) {
			const newValue = +page.value - 1;
			setPage(newValue.toString());
		}
	}

	function onChangePage(page: number) {
		setPage(page.toString());
	}

	function onChangePageSize(pageSize: number) {
		setPageSize(pageSize.toString());
	}

	function reset() {
		setPage('0');
		data.value = chunkedData.value[+page.value];
	}

	const hasNextPage = computed(() => +page.value < chunkedData.value.length - 1);
	const hasPreviusPage = computed(() => +page.value > 0);

	const data = ref(chunkedData.value[+page.value]) as Ref<T[]>;

	watch([page, pageSize], () => {
		data.value = chunkedData.value[+page.value];
	});

	return {
		data,
		pagination: { page: page as Ref<string>, pageSize: pageSize as Ref<string> },
		nextPage,
		previusPage,
		setPage: onChangePage,
		setPageSize: onChangePageSize,
		hasNextPage,
		hasPreviusPage,
		reset,
	};
}
