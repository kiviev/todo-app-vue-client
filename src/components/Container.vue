<template>
  <div id="container" class="col-xs-12 col-sm-8 col-md-8 col-lg-8 ">
    <todoTasks />
  </div>
</template>

<script>
import TodoTasks from "@/components/TodoTasks.vue";

export default {
  name: "Container",
  components: {
    TodoTasks
  }
};
</script>

<style scoped>
#container {
  height: 100vh;
}
</style>
