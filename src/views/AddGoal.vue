<template>
    <v-container fill-height>
        <v-layout align-center justify-center column>
            <v-flex xs12 sm8 md8>
                <v-card class="elevation-12">
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>BHAG</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="form" @submit.prevent="submit">
                            <v-text-field name="bhag" label="Add your BHAG here" v-model="bhag" required>
                            </v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="submit">Add</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
            <v-flex xs12 sm8 md4>
              <h1 class="title my-3">My Goals</h1>

              <div v-for="(item, idx) in userBHAG" class="subheading mb-2" :key="idx">
                  {{item}}
              </div>
             </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { db } from '@/main'

export default {
    name: 'addGoal',
    beforeCreate: function() {
        this.$store.dispatch('getBHAG');
    },
    data:  function () {
      return {
        bhag: '',
      }
    },
    computed: {
        isAuthenticated() {
            return this.$store.getters.isAuthenticated;
        },
        userBHAG() { 
            return this.$store.getters.getBHAG;
        }
    },
    methods: {
      submit() {
          console.log(this.bhag);
          if (this.isAuthenticated) {
              this.$store.dispatch('addBHAG', this.bhag);
              this.bhag = '';
          } else {
              this.$router.push('/sign-in');
          }
      }
    }
};

</script>

<style scoped>
</style>