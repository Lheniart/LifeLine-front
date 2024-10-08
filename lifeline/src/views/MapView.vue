<script setup lang="ts">
import L, {LatLng, marker} from "leaflet";
import {onMounted, ref} from "vue";

const map = ref();


onMounted( () =>{
  getLocation();
  map.value = L.map('map',{
    zoomControl: false
  }).setView([48.5124, 2.21], 7);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    minZoom: 7,
  }).addTo(map.value);
  });

  const getLocation = () =>{
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position => {
        map.value.setView([position.coords.latitude, position.coords.longitude],16);
      })
    }
  }

  window.addEventListener('resize', () => {
    map.value.invalidateSize();
  });


</script>

<template>
  <div id="map"></div>
</template>

<style scoped>
@import 'leaflet/dist/leaflet.css';
 div{
   width: 100%;
   height: 100vh;
 }
#map{
  z-index: 0;
}
</style>