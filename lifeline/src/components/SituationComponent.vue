<script setup lang="ts">

const props = defineProps<{
  text : string
}>()
</script>

<template>

   <p>{{ text }}</p>

</template>

<style scoped>
 p{
   border-radius: 10px ;
   border: #343434 solid 1.2px ;
   box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
   width: fit-content;
   padding: 5px 10px 10px 10px;
   text-align: center;
   margin: 0;
   color: #343434;
   font-size: 20px;
   font-weight: 500;
   line-height: 15px;
 }
</style>