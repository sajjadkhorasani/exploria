<script setup lang="ts">
import json from '~/assets/records.json';
import { Table } from '~/components';

const data = ref(json);
</script>

<template>
	<div>
		<Table :data="data" />
	</div>
</template>
