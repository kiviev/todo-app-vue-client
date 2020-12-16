<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <h1>Todo App</h1>
          </div>
          <hr />
          <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
                  <div v-if="taskEditing">
                    <task
                      @submitted="setData"
                      @clean="cleanTask"
                      :new="taskEditing.id == null"
                      :id="taskEditing.id"
                      :title="taskEditing.title"
                      :description="taskEditing.description"
                      :priority="taskEditing.priority"
                    />
                  </div>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                  <div class="for-group addTask">
                    <button
                      href="#"
                      @click.prevent="newTask"
                      class="btn btn-primary"
                    >
                      Add Task
                    </button>
                  </div>
                  <ul class="list-group">
                    <li
                      class="list-group-item clickable"
                      v-for="task in list"
                      :key="task.id"
                      :class="'priority-' + task.priority"
                      @click="editTask(task)"
                    >
                      {{ task.title }}
                      <span class="badge">{{ task.priority }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Task from "@/components/Task.vue";

export default {
  name: "TodoTasks",
  components: {
    Task
  },
  data() {
    return {
      context: "/task/",
      list: [],
      taskEditing: null
    };
  },

  mounted() {
    this.setData();
  },
  methods: {
    setData() {
      this.list = [];
      this.taskEditing = null;
      this.$http
        .get(this.context)
        .then(r => {
          this.list = r.data.data;
          if (this.list.length > 0) {
            this.taskEditing = this.list[0];
          }
        })
        .catch(e => {
          console.error(e);
        });
    },
    editTask(task) {
      this.taskEditing = task;
    },
    newTask() {
      this.taskEditing = {
        id: null,
        title: "",
        description: "",
        priority: "0"
      };
    },
    cleanTask() {
      this.taskEditing = null;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.clickable {
  cursor: pointer;
}
.priority-1 {
  background-color: #b1e8fd;
}
.priority-2 {
  background-color: #55d0db;
}
.priority-3 {
  background-color: #cef2ac;
}
.priority-4 {
  background-color: #dcacf2;
}
.priority-5 {
  background-color: #e65d5d;
}
.addTask {
  margin: 10px;
}
</style>
