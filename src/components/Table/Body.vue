<script setup lang="ts">
import type { RecordItem } from './Table.vue';

const props = defineProps({
	data: {
		type: Array as PropType<RecordItem[]>,
		required: true,
	},
});
</script>

<template>
	<tbody :class="$style.table__body">
		<tr v-for="item in data" :key="item.id">
			<td>{{ item.id }}</td>
			<td>{{ item.name }}</td>
			<td>{{ item.date }}</td>
			<td>{{ item.address }}</td>
			<td>{{ item.phone }}</td>
		</tr>
	</tbody>
</template>

<style lang="scss" scoped module>
.table__body {
	> tr {
		&:nth-child(even) {
			background-color: #f9f9f9;
		}
		> td {
			width: max-content;
			padding: 0.7rem 2rem;
			border: 1px solid #333333;
			white-space: nowrap;

			&:nth-child(2),
			&:nth-child(3) {
				text-align: center;
			}
		}
	}
}
</style>
