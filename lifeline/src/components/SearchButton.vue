<script setup>
import 'bootstrap/dist/css/bootstrap.css'
</script>

<template>
  <button type="button" class="rounded-circle button-color w-auto h-auto p-4">
    <span aria-hidden="true">
      <img src="@/assets/icons/chercher.png" class="icon">
    </span>
  </button>
</template>

<style scoped>
.icon {
  width: 40px;
  height: 40px;
  fill: white;
}

.button-color{
  background-color: #169A0B;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border: 2px grey ;
}


</style>