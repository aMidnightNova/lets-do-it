<template>

  <v-container fill-height style="max-width: 1024px">
    <v-layout row wrap>
      <v-flex>
        <v-card flat color="transparent">
          <v-card-title class="px-0">
            <h2>
              ARCHIVED TODO LISTS
            </h2>
            <v-spacer></v-spacer>

          </v-card-title>
          <v-divider></v-divider>

          <v-data-table
                  :items="archivedTodoLists"
                  item-key="name"
                  hide-actions
                  class="elevation-1"

          >
            <template v-slot:headers="props">
              <tr>
                <th align="left" class="pr-0 fill-height">
                  <h3>Item</h3>
                </th>
              </tr>
            </template>
            <template v-slot:items="props">
              <tr>
                <td class="pr-0">

                  <v-container class="pa-0 ma-0 fill-height">
                    <v-layout row class="fill-height">
                      <span class="text-capitalize " style="display: inline-flex; align-items: center"> {{ props.item.title }}</span>

                      <v-spacer></v-spacer>

                      <v-btn depressed color="primary" @click.stop="unarchiveTodoList(props.item.title)">
                        <v-icon>unarchive</v-icon>
                        Restore
                      </v-btn>
                      <v-btn depressed style="min-width: 40px" color="danger" @click.stop="deleteTodoList(props.item.name)">
                        <v-icon>delete</v-icon>
                        &nbsp; Delete
                      </v-btn>
                    </v-layout>
                  </v-container>
                </td>


              </tr>
            </template>
          </v-data-table>


        </v-card>

      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
  import colors from 'vuetify/es5/util/colors';

  export default {
    name: 'Archived',

    data() {
      return {}
    },
    computed: {
      archivedTodoLists() {
        return this.$store.getters.getArchivedTodoLists;
      }
    },
     methods: {
       unarchiveTodoList(name) {
         this.$store.dispatch('unarchiveTodoList', name);
       },
       deleteTodoList(name) {
         this.$store.dispatch('deleteTodoList', name);
       }
     }
  }
</script>

<style>

</style>
