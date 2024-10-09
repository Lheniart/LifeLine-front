<script setup>
import 'bootstrap/dist/css/bootstrap.css'
</script>

<template>
  <button type="button" class="button-color rounded-circle button-color w-auto h-auto p-3">
    <span aria-hidden="true">
      <img src="@/assets/icons/cible.png" class="icon">
    </span>
  </button>
</template>

<style scoped>
.icon {
  width: 30px;
  height: 30px;
  fill: black;
}

.button-color {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border: none;
}
</style>
