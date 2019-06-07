<template>
    <v-container fluid>
        <home-plans></home-plans>
        <meal-recipes></meal-recipes>
    </v-container>
</template>

<script>
import MealRecipes from '@/components/MealRecipes.vue';
import HomePlans from '@/components/HomePlans.vue';
export default {
    name: 'Menu',
    components: {
        HomePlans,
        MealRecipes
    }
};
</script>

<style scoped>
</style>