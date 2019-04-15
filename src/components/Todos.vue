<template>
  <div v-if="this.$route.params.todoList">
    Todo List data here soon.
  </div>
  <div v-else>
    Click on a Todo List.
  </div>
</template>

<script>
  import colors from 'vuetify/es5/util/colors';

  export default {
    name: 'Todos',

    data() {
      return {}
    },

  }
</script>

<style>

</style>
