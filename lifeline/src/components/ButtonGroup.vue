<script setup>
import 'bootstrap/dist/css/bootstrap.css'
import ListButton from "./ListButton.vue";
import LocButton from "./LocButton.vue";
import SearchButton from "./SearchButton.vue";
import {useRouter} from "vue-router";
import useDaeStore from "@/store";
import {ref, watch} from "vue";

const store = useDaeStore();

const showFindNearest = ref(false)

watch(() => store.daeList, (newValue) => {

  if (newValue !== []) {
    showFindNearest.value = true
  }
});

const router = useRouter();

const emit = defineEmits(['centerLoc'])


</script>

<template>
  <div class="df flex-row justify-content-center bg-transparent position-fixed button-position h">
    <div class="d-flex flex-column justify-content-end align-items-center ">
      <ListButton v-if="showFindNearest" @click="router.push('/liste')"/>
    </div>
    <div class="d-flex flex-column justify-content-end align-items-center">
      <SearchButton v-if="showFindNearest" @click="router.push('/details')"/>
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

.df {
  display: flex;

}

.h {
  height: 80px;
}
</style>