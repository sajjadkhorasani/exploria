<script setup lang="ts">
import { usePagination, useSearchParam } from '~/hooks';
import Head from './Head.vue';
import Body from './Body.vue';
import Pagination from './Pagination.vue';

export interface RecordItem {
	id: string;
	name: string;
	date: string;
	address: string;
	phone: string;
}

const props = defineProps({
	data: {
		type: Array as PropType<RecordItem[]>,
		required: true,
	},
});

const { data: paginatedList, pagination, nextPage, previusPage, setPageSize, hasNextPage, hasPreviusPage, reset } = usePagination(props.data);
const [sort, setSort] = useSearchParam<string | undefined>('sort', JSON.stringify({}));
const [filter, setFilter] = useSearchParam<string | undefined>('filter', JSON.stringify({}));

watch(
	() => sort.value,
	(value) => {
		const sortValue = JSON.parse(value as unknown as string);
		const hasFilter = Object.keys(sortValue).length;

		if (hasFilter) {
			if (sortValue.user) {
				paginatedList.value = paginatedList.value.sort((a, b) => (sortValue.user === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)));
			}
			if (sortValue.date) {
				paginatedList.value = paginatedList.value.sort((a, b) => (sortValue.date === 'asc' ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date)));
			}
		} else {
			reset();
		}
	}
);

watch(
	() => filter.value,
	(value) => {
		const filterValue = JSON.parse(value as unknown as string);
		const hasFilter = Object.keys(filterValue).length;

		if (hasFilter) {
			for (const key in filterValue) {
				if (filterValue[key]) {
					const regex = new RegExp(filterValue[key], 'i');

					paginatedList.value = paginatedList.value.filter((item) => regex.test(item[key as keyof typeof item]));
				}
			}
		} else {
			reset();
		}
	}
);
</script>

<template>
	<div :class="$style.container">
		<table :class="$style.table">
			<Head :filter="filter" :sort="sort" @set-filter="setFilter" @set-sort="setSort" />
			<Body :data="paginatedList" />
		</table>
		<Pagination :pagination="pagination" :hasNext="hasNextPage" :hasPrev="hasPreviusPage" @page-size="setPageSize" @next-page="nextPage" @previus-page="previusPage" />
	</div>
</template>

<style lang="scss" scoped module>
.container {
	display: flex;
	flex-flow: column nowrap;
	justify-content: flex-start;
	align-items: stretch;
	gap: 16px;
	user-select: none;
}

.table {
	display: block;
	width: auto;
	max-width: 100vw;
	max-height: calc(100vh - 80px);
	border-collapse: collapse;
	border: 1px solid #333333;
	overflow: auto;
}
</style>
