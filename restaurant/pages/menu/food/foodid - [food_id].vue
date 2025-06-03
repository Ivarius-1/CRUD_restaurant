<script setup>
const {food_id} = useRoute().params
</script>

<template>
    <div>
        <h1>food_id: {{ food_id }}</h1>
    </div>
</template>