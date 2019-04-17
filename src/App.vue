<template>
  <v-app light>
    <v-navigation-drawer dark clipped app v-model="drawer" :width="breakpointName === 'xs' ? '250' : '300'"
                         v-if="this.$store.state.isAuthorized">


      <v-list class="ma-0 pa-0">
        <v-list-tile v-bind:to="`/${userName}/dashboard`">
          <v-list-tile-action>

            <v-icon>dashboard</v-icon>

          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title><h3>Dashboard</h3></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-group :value="true">
          <v-list-tile slot="activator">
            <v-list-tile-action>

              <v-icon>lists</v-icon>

            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title><h3>Todos</h3></v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-menu v-model="addMenu" :close-on-content-click="false" :nudge-width="200" offset-x>
                <template v-slot:activator="{ on }">
                  <v-btn small depressed dark icon v-on="on" @click="resetValues()" @click.native.stop>
                    <v-icon class="" large>add_circle_outline</v-icon>
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

            </v-list-tile-action>
          </v-list-tile>


          <v-list-tile v-for="(menuItem, i) in menu" :key="i" v-bind:to="`/${userName}/todos/${menuItem.title}`"
                        :style="`background-color: ${$vuetify.theme.menuBackground}!important`">

            <v-list-tile-content>
              <v-list-tile-title v-text="menuItem.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>


        <v-list-tile v-bind:to="`/${userName}/archived`">
          <v-list-tile-action>

            <v-icon>archive</v-icon>

          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title><h3>Archive</h3></v-list-tile-title>
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
              accent: colors.blue.lighten3,
              error: colors.red.accent3,
              primaryBorder: colors.blue.darken2,
              menuBackground: colors.grey.darken4,

            }

          },
          {
            title: "red",
            colors: {
              title: "red",
              primary: colors.red.lighten2,
              secondary: colors.grey.darken1,
              accent: colors.red.lighten3,
              error: colors.blue.accent3,
              primaryBorder: colors.red.darken2,
              menuBackground: colors.grey.darken4, // base is default color

            }

          },
          {
            title: "green",
            colors: {
              title: "green",
              primary: colors.green.lighten2,
              secondary: colors.grey.darken1,
              accent: colors.green.lighten3,
              error: colors.blue.accent3,
              primaryBorder: colors.green.darken2,
              menuBackground: colors.grey.darken4, // base is default color

            }

          }

        ]
      }
    },
    name: 'App',
    beforeMount() {
      // change the vuetify theme before the app loads
      this.$vuetify.theme = this.themes[0].colors;
    },
    computed: {
      color() {
        return this.$vuetify.theme.title
      },
      menu() {
        return this.$store.getters.getTodoLists;
      },

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


</style>
