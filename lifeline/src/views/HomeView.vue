<script setup lang="ts">

</script>

<template>
  <div id="page-wrapper">
    <router-view/>
    <nav>
      <router-link to="/" class="nav-link">
        <img src="@/assets/icons/location.png" class="icon">
        <p class="labelIcon">Carte</p>
      </router-link>
      <router-link to="/guide" class="nav-link">
        <img src="@/assets/icons/livret_guide.png" class="icon">
        <p class="labelIcon">Guide</p>
      </router-link>
      <router-link to="/information" class="nav-link">
        <img src="@/assets/icons/information.png" class="icon">
        <p class="labelIcon">Info</p>
      </router-link>
    </nav>
  </div>

</template>
<style scoped>
#page-wrapper {
  position: relative;
  width: 100%;
  height: 100vh;

}


nav {
  background-color: white;
  height: 130px;
  z-index: 1;
  width: 100%;
  position: absolute;
  bottom: 0;
  border-radius: 28px 28px 0 0;
  box-shadow: 0 -4px 4px rgba(0, 0, 0, 0.25);
  border-top: solid 2px #169A0B;

  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.icon {
  width: 50px;
  height: 50px;
  fill: black;
}
.labelIcon{
  font-weight: bold;
  margin: 0;
  padding: 0;
}

a{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: auto;
}

a:hover{
  .labelIcon{
    text-decoration: underline #169A0B 1px;
  }
}

.router-link-exact-active{
  .labelIcon{
    color: #169A0B;
  }
  .icon{
    fill: #169A0B;
  }
}

.nav-link {
  p{
    color: black;
  }
}
</style>
