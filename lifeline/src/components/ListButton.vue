<script setup>
import 'bootstrap/dist/css/bootstrap.css'
</script>

<template>
  <button type="button" class="rounded-circle button-color w-auto h-auto p-3">
    <span aria-hidden="true">
      <img src="@/assets/icons/liste.png" class="icon">
    </span>
  </button>
</template>

<style scoped>
.icon {
  width: 20px;
  height: 20px;
  fill: black;
}

.button-color{
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border: none;
}


</style>