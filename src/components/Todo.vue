<template>
    <v-container fill-height style="max-width: 1024px">
      <v-layout row wrap>
        <v-flex>
          <v-card flat color="transparent">
            <v-card-title class="px-0">
              <h2>
                TODO LIST: {{theList.title}}
              </h2>
              <v-spacer></v-spacer>
              <v-btn v-if="breakpointName !== 'xs'" depressed @click.stop="archiveTodoList()" color="secondary" class="mx-0">
                <v-icon>archive</v-icon> &nbsp; Archive List
              </v-btn>
            </v-card-title>
            <v-divider></v-divider>

            <v-data-table
                    v-model="selected"
                    :items="theList.tasks"
                    select-all
                    item-key="name"
                    hide-actions
                    class="elevation-1"

            >
              <template v-slot:headers="props">
                <tr>
                  <th width="45px">
                    <v-checkbox
                            :input-value="isAll"
                            :indeterminate="inde"
                            primary
                            hide-details
                            @click.stop="toggleAll()"
                    ></v-checkbox>
                  </th>
                  <th align="left" class="pr-0 fill-height">
                    <v-container class="pa-0 ma-0 fill-height">
                      <v-layout row class="fill-height">
                        <h2 class="text-capitalize " style="display: inline-flex; align-items: center"> Items</h2>
                        <v-spacer></v-spacer>

                        <v-divider vertical></v-divider>

                        <v-menu v-model="addMenu" :close-on-content-click="false" offset-x left>
                          <template v-slot:activator="{ on }">

                            <v-btn depressed color="primary" v-on="on" @click="resetValues()"
                                   class="fill-height ma-0 pa-0" style="width: 150px; border-radius: 0;">
                              <v-icon>add</v-icon>
                              New Item
                            </v-btn>
                          </template>

                          <v-card>
                            <div style="padding: 10px 0 0 10px">
                              <h2> Add Item To List</h2>
                            </div>


                            <v-list>
                              <v-list-tile>
                                <v-form ref="form" v-model="addItemIsValid">
                                  <v-text-field
                                          v-model="todoItemName"
                                          label="Item Name"
                                          :rules="[rules.required]"
                                          required
                                  ></v-text-field>
                                </v-form>

                              </v-list-tile>

                            </v-list>
                            <v-divider></v-divider>

                            <v-card-actions>
                              <v-spacer></v-spacer>

                              <v-btn flat @click="addMenu = false">Cancel</v-btn>
                              <v-btn :disabled="!addItemIsValid" color="primary" flat
                                     @click="addItem2TodoList(todoItemName)">Add
                              </v-btn>
                            </v-card-actions>
                          </v-card>


                        </v-menu>


                      </v-layout>
                    </v-container>
                  </th>
                </tr>
              </template>
              <template v-slot:items="props">
                <tr :active="props.item.completed">
                  <td>
                    <v-checkbox
                            :input-value="props.item.completed"
                            primary
                            hide-details
                            @click.stop="toggleTaskItem(props.item.name)"
                    ></v-checkbox>
                  </td>

                  <td class="pr-0">

                    <v-container class="pa-0 ma-0 fill-height">
                      <v-layout row class="fill-height">
                        <span class="text-capitalize " style="display: inline-flex; align-items: center">{{ props.item.name }}</span>

                        <v-spacer></v-spacer>

                        <v-btn depressed style="min-width: 40px" color="danger" @click.stop="deleteItemFromTodoList(props.item.name)">
                          <v-icon>delete</v-icon>
                          &nbsp; Delete
                        </v-btn>

                      </v-layout>
                    </v-container>
                  </td>
                </tr>
              </template>
            </v-data-table>


            <v-btn v-if="breakpointName === 'xs'" depressed large block color="secondary" class="mx-0 mt-3"
                   @click.stop="archiveTodoList()">
              <v-icon>archive</v-icon> &nbsp; Archive List
            </v-btn>

          </v-card>

        </v-flex>
      </v-layout>
    </v-container>

</template>

<script>
  export default {
    name: 'Todo',

    data() {
      return {
        isAll: null,
        inde: null,
        breakpointName: this.$vuetify.breakpoint.name,
        rules: {
          required: value => !!value || 'Required.',

        },
        todoItemName: '',
        addMenu: false,
        addItemIsValid: null,

        selected: [],

      }
    },
    computed: {
      theList() {
        return this.$store.getters.getTodoList(this.$route.params.todoList);
      }
    },
    methods: {
      resetValues() {
        this.todoItemName = '';
        this.$refs.form.reset()

      },
      addItem2TodoList(name) {
        this.$store.dispatch('addItem2TodoList', {listTitle: this.$route.params.todoList, name: name});
        this.addMenu = false;
      },
      deleteItemFromTodoList(){
        this.$store.dispatch('deleteItemFromTodoList', {listTitle: this.$route.params.todoList, name: name});
      },
      toggleTaskItem(name){
        this.$store.dispatch('toggleTaskItem', {listTitle: this.$route.params.todoList, name: name});

      },
      toggleAll() {
        this.isAll = !this.isAll;
        this.$store.dispatch('toggleAllTaskItems', {listTitle: this.$route.params.todoList, bool: this.isAll});
      },
      archiveTodoList() {
        this.$store.dispatch('archiveTodoList', this.$route.params.todoList);
      }

    }
  }
</script>

<style>

</style>
