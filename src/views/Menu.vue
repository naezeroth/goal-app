<template>
    <v-container fluid>
        <home-plans></home-plans>
        <meal-recipes></meal-recipes>
    </v-container>
</template>

<script>
import MealRecipes from '@/components/MealRecipes.vue';
export default {
    name: 'Menu',
    components: {
        MealRecipes
    }
};
</script>

<style scoped>
</style>