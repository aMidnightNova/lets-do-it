<template>
  <v-app light>
    <v-navigation-drawer dark clipped app v-model="drawer" :width="breakpointName === 'xs' ? '240' : '300'"
                         v-if="this.$store.state.isAuthorized">
      <v-toolbar color="transparent" flat>
        <v-toolbar-title v-if="breakpointName === 'xs'" class="body-2">MY TODO LISTS</v-toolbar-title>
        <v-toolbar-title v-else>MY TODO LISTS</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-menu v-model="addMenu" :close-on-content-click="false" :nudge-width="200" offset-x>
          <template v-slot:activator="{ on }">
            <v-btn small depressed light block v-on="on" @click="resetValues()">
              <v-icon>add</v-icon>
              add
            </v-btn>
          </template>

          <v-card>
            <div style="padding: 10px 0 0 10px">
              <h2> Add a Todo List</h2>
            </div>


            <v-list>
              <v-list-tile>
                <v-form ref="form" v-model="addTodoIsValid">
                  <v-text-field
                          v-model="todoName"
                          label="Todo List Name"
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
              <v-btn :disabled="!addTodoIsValid" color="primary" flat @click="addTodoList(todoName)">Add</v-btn>
            </v-card-actions>
          </v-card>


        </v-menu>
        <!--<v-btn small depressed light block>-->
        <!--<v-icon>add</v-icon>-->
        <!--add-->
        <!--</v-btn>-->

      </v-toolbar>

      <v-divider></v-divider>


      <v-list>
        <v-list-tile v-for="(menuItem, i) in menu" :key="i" v-bind:to="`/${userName}/${menuItem.name}`">
          <!--<v-list-tile-action>-->

          <!--<v-icon>{{menuItem.icon}}</v-icon>-->

          <!--</v-list-tile-action>-->
          <v-list-tile-content>
            <v-list-tile-title v-text="menuItem.name"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>


    </v-navigation-drawer>

    <v-toolbar flat app clipped-left class="primary" v-if="this.$store.state.isAuthorized"
               :style="`border-bottom: 4px solid  ${this.$vuetify.theme.primaryBorder}!important`">

      <v-btn icon small class="hidden-lg-and-up" @click.stop="drawer = !drawer">
        <v-icon>menu</v-icon>
      </v-btn>

      <v-toolbar-title fixed v-text="title" class="hidden-xs-only text-uppercase headline"></v-toolbar-title>
      <v-spacer></v-spacer>


      <v-divider inset class="mx-2 white " vertical></v-divider>

      <v-avatar size="36px" class="ml-2">
        <v-gravatar :email="email"></v-gravatar>
      </v-avatar>

      <span class="ml-2 mr-1"><strong>{{name.first}} {{name.last}}</strong></span>


      <v-menu offset-y content-class="dropdown-menu" transition="slide-y-transition">
        <v-btn icon small slot="activator">
          <v-icon>settings</v-icon>
        </v-btn>
        <v-card>
          <v-card-title primary-title>
            <div class="headline">
              Change Theme
            </div>
          </v-card-title>

          <v-divider class="mx-3 black lighten-2 "></v-divider>
          <v-container style="display: flex; justify-content: space-evenly;">

            <v-avatar v-for="theme in themes" :key="theme.title"
                      :class="[theme.title === color ? 'active-class-mr ' : '']"
                      size="32"
                      :style="{border:theme.title === color ? `4px solid ${theme.colors.primaryBorder}`: '', backgroundColor:theme.colors.primary, cursor:'pointer' }"
                      @click.stop="changeTheme(theme)"

            />


          </v-container>

        </v-card>
      </v-menu>


    </v-toolbar>


    <v-content>
      <router-view/>
    </v-content>

    <v-footer flat app class="primary">
            <span style="margin-left: 20px">Made with <v-icon
                    style="font-size: 18px;">favorite</v-icon> by Midnight</span>
    </v-footer>

  </v-app>
</template>

<script>
  import colors from 'vuetify/es5/util/colors';

  export default {
    data() {
      return {
        radioGroup: null,
        drawer: null,
        title: "Lets do this",
        addMenu: false,
        todoName: '',
        addTodoIsValid: null,
        name: this.$store.getters.getName,
        userName: this.$store.getters.getUserName,

        email: this.$store.state.user.email,
        breakpointName: this.$vuetify.breakpoint.name,
        menu: this.$store.getters.getTodoLists,
        rules: {
          required: value => !!value || 'Required.',

        },
        themes: [
          {
            title: "blue",
            colors: {
              title: "blue",
              primary: colors.blue.lighten2,
              secondary: colors.grey.darken1,
              accent: colors.shades.black,
              error: colors.red.accent3,
              primaryBorder: colors.blue.darken2
            }

          },
          {
            title: "white",
            colors: {
              title: "white",
              primary: colors.grey.lighten2,
              secondary: colors.grey.darken2,
              accent: colors.shades.black,
              error: colors.red.accent3,
              primaryBorder: colors.grey.darken2
            }

          }
        ]
      }
    },
    name: 'App',
    beforeMount() {
      // change the vuetify theme before the app loads
      this.$vuetify.theme = {
        title: "blue",
        primary: colors.blue.lighten2,
        secondary: colors.grey.darken1,
        accent: colors.shades.black,
        error: colors.red.accent3,
        primaryBorder: colors.blue.darken2
      }
    },
    computed: {
      color() {
        return this.$vuetify.theme.title
      },
      // menu() {
      //   return this.$store.getters.getTodoLists;
      // }
    },
    methods: {
      changeTheme(theme) {
        this.$vuetify.theme = theme.colors;
      },
      addTodoList(name) {
        this.$store.dispatch('addTodoList', name);
        this.addMenu = false;
      },
      resetValues() {
        this.todoName = '';
        this.$refs.form.reset()

      }
    }
  }
</script>

<style>
  .tilez {
    background: red;
  }

</style>
