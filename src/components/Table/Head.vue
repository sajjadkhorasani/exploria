<script setup lang="ts">
import type { CSSProperties } from 'vue';

const emit = defineEmits<{
	(e: 'setSort', payload: string): void;
	(e: 'setFilter', payload: string): void;
}>();
const { sort, filter } = defineProps(['sort', 'filter']);

const filterModel = defineModel({
	type: String,
	default: '',
});
const state = reactive<{
	contextMenu?: CSSProperties & { fieldName: string; hasValue: boolean };
}>({
	contextMenu: undefined,
});

function onUserSortHandler() {
	const sortValue = JSON.parse(sort as string);
	switch (sortValue?.user) {
		case 'asc':
			return emit('setSort', JSON.stringify({ ...sortValue, user: 'desc' }));
		case 'desc':
			return emit('setSort', JSON.stringify({ ...sortValue, user: undefined }));
		default:
			return emit('setSort', JSON.stringify({ ...sortValue, user: 'asc' }));
	}
}

function onDateSortHandler() {
	const sortValue = JSON.parse(sort as string);
	switch (sortValue?.date) {
		case 'asc':
			return emit('setSort', JSON.stringify({ ...sortValue, date: 'desc' }));
		case 'desc':
			return emit('setSort', JSON.stringify({ ...sortValue, date: undefined }));
		default:
			return emit('setSort', JSON.stringify({ ...sortValue, date: 'asc' }));
	}
}

function onFilterHandler(e: MouseEvent) {
	e.stopPropagation();
	e.preventDefault();

	const fieldName = e.target instanceof HTMLElement ? e.target.innerText.split('\n')[0] : '';
	const filterValue = JSON.parse(filter as string);

	if (filterValue[fieldName.toLowerCase()]) {
		filterModel.value = filterValue[fieldName.toLowerCase()];
	} else {
		filterModel.value = '';
	}

	state.contextMenu = {
		fieldName,
		hasValue: !!filterValue[fieldName.toLowerCase()],
		top: `${e.clientY}px`,
		left: `${e.clientX}px`,
		opacity: 1,
		visibility: 'visible',
	};
}

function onSubmitFilter(e: MouseEvent) {
	if (!filterModel.value.length) {
		return;
	}

	const fieldName = state.contextMenu!.fieldName.toLowerCase() as string;
	const filterValue = JSON.parse(filter as string);
	emit('setFilter', JSON.stringify({ ...filterValue, [fieldName]: filterModel.value }));
	state.contextMenu = undefined;
}

function onCancelFilter() {
	filterModel.value = '';
	state.contextMenu = undefined;
}

function onResetFilter() {
	const fieldName = state.contextMenu!.fieldName.toLowerCase() as string;
	const filterValue = JSON.parse(filter as string);
	delete filterValue[fieldName];
	emit('setFilter', JSON.stringify(filterValue));
	state.contextMenu = undefined;
}
</script>

<template>
	<thead :class="$style.table__head">
		<tr>
			<th @contextmenu="onFilterHandler">ID</th>
			<th @contextmenu="onFilterHandler" @click="onUserSortHandler">
				Name
				<span v-if="JSON.parse($props.sort)?.user">
					{{ JSON.parse($props.sort)?.user === 'asc' ? '▲' : '▼' }}
				</span>
				<span v-else>⇅</span>
			</th>
			<th @contextmenu="onFilterHandler" @click="onDateSortHandler">
				Date
				<span v-if="JSON.parse($props.sort)?.date">
					{{ JSON.parse($props.sort)?.date === 'asc' ? '▲' : '▼' }}
				</span>
				<span v-else>⇅</span>
			</th>
			<th @contextmenu="onFilterHandler">Address</th>
			<th @contextmenu="onFilterHandler">Phone</th>
		</tr>
	</thead>

	<Teleport to="body">
		<menu :class="$style.menu" :style="state.contextMenu">
			<div>
				<span>Filter(Text, Regxp) : </span>
				<div>
					<h5>{{ state.contextMenu?.fieldName }}</h5>
					<input type="text" v-model="filterModel" />
					<button v-if="state.contextMenu?.hasValue" @click="onResetFilter">Reset</button>
				</div>
				<div>
					<button @click="onSubmitFilter">Submit</button>
					<button @click="onCancelFilter">Cancel</button>
				</div>
			</div>
		</menu>
	</Teleport>
</template>

<style lang="scss" scoped module>
.table__head {
	position: sticky;
	top: 0;
	z-index: 5;
	> tr {
		background-color: #333333;
		color: #ffffff;
		> th {
			position: relative;
			padding: 1rem;
			> span {
				position: absolute;
				bottom: 0;
				right: 0;
			}

			&:has(span) {
				cursor: pointer;
				&:hover {
					background-color: #444444;
				}
			}
		}
	}
}

.menu {
	position: fixed;
	background-color: #ffffff;
	border: 1px solid #333333;
	border-radius: 4px;
	box-shadow: 0 0 10px 0 #333333;
	z-index: 10;
	margin: 0;
	padding: 0;
	visibility: hidden;
	opacity: 0;

	> div {
		display: flex;
		flex-flow: column nowrap;
		justify-content: flex-start;
		align-items: stretch;
		padding: 16px;
		gap: 4px;

		> div {
			display: flex;
			flex-flow: row nowrap;
			justify-content: flex-start;
			align-items: center;
			gap: 1rem;
			margin-block-start: 16px;

			h5 {
				margin: 0;
			}

			> input {
				padding: 4px 8px;
				border-radius: 4px;
			}

			> button {
				flex-grow: 1;
				padding: 8px;
				border: none;
				border-radius: 4px;
				cursor: pointer;

				&:first-child {
					background-color: #2aa33c;
					color: white;
				}

				&:last-child {
					background-color: #a32a2a;
					color: white;
				}
			}
		}
	}
}
</style>
