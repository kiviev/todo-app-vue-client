<template>

<div class='row'>
  <div class="container">

        <!-- Card -->
        <div class="card" :class="'priority-'+ priority" >

          <div class="card-inner">
            <!-- Card image -->
            <img class="card-img-top respoonsive" :src="randomImage" alt="Card image cap">

            <!-- Card content -->
            <div class="card-body" >

                <!-- Title -->
                <input type="hidden" id="id" v-model="id">
                <div v-if="showInEdit" class="for-group">
                  <label for="title">Title</label>
                  <input type="text" class="form-control" id="title" placeholder="Task title" v-model="title">
                </div>
                <h2 v-else class="card-title"><a>{{title}}</a></h2>
                <!-- Text -->
                 <div v-if="showInEdit" class="for-group">
                    <label for="description">Description</label>
                    <textarea  class="form-control" id="description" placeholder="Task description" v-model="description"></textarea>
                </div>
                <p v-else class="card-text">{{description}}</p>
                    <!-- Text -->
                 <div v-if="showInEdit" class="for-group">
                    <label for="priority">priority</label>
                    <select id="priority" class="form-control" v-model="priority">
                      <option :selected="priority == 0">0</option>
                      <option :selected="priority == 1">1</option>
                      <option :selected="priority == 2">2</option>
                      <option :selected="priority == 3">3</option>
                      <option :selected="priority == 4">4</option>
                      <option :selected="priority == 5">5</option>
                    </select>
                </div>
        
                <!-- Button -->
                <div>
                  <div class="row">
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                      <button href="#" v-if="showInEdit" @click.prevent="submit" class="btn btn-primary">Save</button>
                      <button href="#" v-if="!showInEdit" @click.prevent="showEdit" class="btn btn-primary">Edit</button>
                      <button href="#" v-else @click.prevent="cancel" class="btn btn-primary">Cancel</button>
                    </div>
                    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-right">
                      <button href="#" v-if="showInEdit && !this.new" @click.prevent="destroy" class="btn btn-danger">Delete</button>
                    </div>
                  </div>   
                </div>
            </div>
          </div>
         
        </div>
<!-- Card -->
  </div>
</div>
</template>

<script>


export default {
  name: "Task",
    props: {
    id: Number,
    title: String,
    description: String,
    priority: String,
    new: Boolean
  },
  computed:{
    showInEdit(){
      return this.onEdit == true || this.new == true;
    }
  },

  data(){
    return {
      context: '/task/',
      onEdit: false,
      task: {},
      randomImage: null
    }
    
  },
  mounted() {
    this.randomImage = this.getRandomImage()
  },
  methods: {
      submit(){
        let self = this;
        const valid = this.validate();
        if(valid){
          const context = (this.task.id ? (this.context + this.task.id) : this.context);
      
          const formData = {
                id: this.id,
                title: this.title,
                description: this.description,
                priority: this.priority
              };

          this.$http.post( context, formData)
            .then((r => {
              console.log(r);
            }))
            .catch(e => {
              console.error(e);
              })
            .finally(() => {
              self.$emit('submitted');
            });
        }

       
        },
      validate(){
        if(this.priority < 0 || this.priority > 5){
          alert("Priority: " + this.priority + " Not valid!!!")
          return false;
        }
        return true;
      },
      showEdit(){
        this.onEdit = !this.onEdit
      },
      cancel(){
        if(this.new){
          this.$emit('clean');
        }else {
          this.onEdit = false;
        }
      },
      destroy(){
          let submit = false;
          let userResponse = confirm("Are you sure to delete the task?\nThis action is not reversible.");
            if (userResponse == true) {
              submit = true;
            }

          if(submit){
            let self = this;
            this.$http.delete(this.context + this.id)
              .then((r => {
                console.log(r);
              }))
              .catch(e => {
                console.error(e);
                })
              .finally(() => {
                self.$emit('submitted');
              });
          }
      },
      getRandomImage(){
        const list = [
          'https://www.die.cl/sitio/wp-content/uploads/2019/09/comunicaciones-senales.jpg',
          'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fprobablynot.neocities.org%2Fio%2Fpixabay_padrinan_800x200.jpg&f=1&nofb=1',
          'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fclipartart.com%2Fimages%2Fstar-wars-valentines-clipart-800-x-200-pixels-1.jpg&f=1&nofb=1',
          'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.freewebheaders.com%2Fwp-content%2Fgallery%2Fabstract-size-800x200%2Fabstract-paint-colors-butterfly-header_size-800x200.jpg&f=1&nofb=1',
          'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fforum.unity.com%2Fattachments%2Fendzeit_2050_by_sprayerdayuri-png.261899%2F&f=1&nofb=1'

        ]

        const index = Math.floor(Math.random() * 5); 

        return list[index];
      }
  },

};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card-img, .card-img-top {
    border-top-left-radius: calc(0.25rem - 1px);
    border-top-right-radius: calc(0.25rem - 1px);
}

.card-img, .card-img-top, .card-img-bottom {
    -ms-flex-negative: 0;
    flex-shrink: 0;
    width: 100%;
}
img {
    vertical-align: middle;
    border-style: none;
}

.card {
    font-weight: 400;
    -webkit-box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
    position: relative;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-clip: border-box;
    border: 1px solid rgba(0,0,0,0.125);
    border-radius: .25rem;
}

.card-inner{
  margin: 20px;
}
button{
  margin: 10px;
}

.responsive {
  width: 100%;
  height: auto;
}
</style>
