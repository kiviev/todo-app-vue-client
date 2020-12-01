<template>
  <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
      <div id="sidebar" class="well sidebar-nav">
          <h5><i class="glyphicon glyphicon-home"></i>
              <b>Management</b>
          </h5>
          <ul class="nav nav-pills nav-stacked">
              <li class="active"><a href="/">Home</a></li>
              <li><a href="#">Page 1</a></li>
          </ul>  
      </div>
  </div>

</template>

<script>

export default {
  name: "Navbar",
};
</script>

<style scoped>
  i{
    margin-right: 5px;
  }


  @media (min-width: 768px) {
    #sidebar{
      height: 100vh;
    }
  }
</style>
