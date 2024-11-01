<script setup lang="ts">
const emit = defineEmits<{
	(e: 'pageSize', payload: number): void;
	(e: 'nextPage'): void;
	(e: 'previusPage'): void;
}>();
defineProps<{
	pagination: {
		page: Ref<string>;
		pageSize: Ref<string>;
	};
	hasNext: boolean;
	hasPrev: boolean;
}>();

function onPageSizeHandler(payload: Event) {
	emit('pageSize', +(payload.target as HTMLSelectElement).value);
}

function nextPage() {
	emit('nextPage');
}

function previusPage() {
	emit('previusPage');
}
</script>

<template>
	<div :class="$style.pagination">
		<div>
			<button :disabled="!hasNext" @click="nextPage">Next</button>
			<span>{{ +pagination.page.value + 1 }}</span>
			<button :disabled="!hasPrev" @click="previusPage">Prev</button>
		</div>
		<div>
			<span>Page Size:</span>
			<select :value="pagination.pageSize.value" @change="onPageSizeHandler">
				<option value="10">10</option>
				<option value="15">15</option>
				<option value="30">30</option>
				<option value="50">50</option>
			</select>
		</div>
	</div>
</template>

<style lang="scss" scoped module>
.pagination {
	display: flex;
	justify-content: space-between;
	align-items: center;
	> div {
		display: flex;
		justify-content: center;
		align-items: center;
		> span {
			margin: 0 1rem;
		}
		> button {
			width: 60px;
			background: transparent;
			border: 1px solid #333333;
			padding: 0.5rem 1rem;
			cursor: pointer;
			&:disabled {
				border: 1px solid #ababab;
				cursor: not-allowed;
			}
		}
	}

	select {
		padding: 0.5rem 1rem;
		border: 1px solid #333333;
		cursor: pointer;
	}
}
</style>
