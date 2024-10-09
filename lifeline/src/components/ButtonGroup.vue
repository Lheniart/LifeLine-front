<script setup>
import 'bootstrap/dist/css/bootstrap.css'
import ListButton from "./ListButton.vue";
import LocButton from "./LocButton.vue";
import SearchButton from "./SearchButton.vue";

const emit = defineEmits(['centerLoc'])
</script>

<template>
  <div class="df flex-row justify-content-center bg-transparent position-fixed button-position h">
    <div class="d-flex flex-column justify-content-end align-items-center ">
      <ListButton/>
    </div>
    <div class="d-flex flex-column justify-content-end align-items-center">
      <SearchButton/>
    </div>
    <div class="d-flex flex-column justify-content-end align-items-center">
      <LocButton @click="$emit('centerLoc')"/>
    </div>
  </div>
</template>

<style scoped>

.button-position {
  bottom: 150px;
}

.df{
  display: flex;

}

.h { height: 80px;}
</style>