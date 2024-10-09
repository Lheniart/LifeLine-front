<script setup lang="ts">
import L, {LatLng, LayerGroup, marker} from "leaflet";
import {onMounted, ref} from "vue";
import ButtonGroup from "@/components/ButtonGroup.vue";

import {findAllDaeNear} from "@/api/api";
import type {DaeWithDistance, FindNearDaeDto} from "@/api/models";

import userLocationIconUrl from '@/assets/icons/user-location-icon.png';
import markerIconUrl from '@/assets/icons/pin.png';
import {useStore} from "vuex";


const map = ref();
let markersLayer = ref<LayerGroup>();

const store = useStore();


const center = ref<{ lat: number, lng: number }>({lat: 0, lng: 0});
const daeList = ref<DaeWithDistance[]>([]);
const watchId= ref<number | null>(null);
const userLocationMarker = ref<L.CircleMarker | null>(null);
const userLocation = ref<{latitude : number | null, longitude : number | null}>({latitude : null, longitude: null});


const userIcon = L.icon({
  iconUrl: userLocationIconUrl,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
  popupAnchor: [0, -32],
});
const markerIcon = L.icon({
  iconUrl: markerIconUrl,
  iconSize: [50, 50],
  iconAnchor: [25, 50],
  popupAnchor: [0, -32],
});



onMounted(() => {
  getLocalisation();
  map.value = L.map('map', {
    zoomControl: false
  }).setView([48.5124, 2.21], 7);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    minZoom: 7,
  }).addTo(map.value);

  markersLayer.value = L.layerGroup().addTo(map.value);

  map.value.on('moveend', () => {
    const currentCenter = map.value.getCenter();
    center.value = {lat: currentCenter.lat, lng: currentCenter.lng};
    startDelay();
  });

  center.value = { lat: map.value.getCenter().lat, lng: map.value.getCenter().lng };
  startDelay();
});


window.addEventListener('resize', () => {
  map.value.invalidateSize();
});

let timeoutId: ReturnType<typeof setTimeout> | null = null;
let isLoading = ref<boolean>(false);
const startDelay = (): void => {
  console.log("moove")
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  timeoutId = setTimeout(() => {
    getDae()
  }, 1000);
};


const getDae = async () => {
  isLoading.value = true;
  const dto : FindNearDaeDto = {
    latitude : center.value.lat,
    longitude: center.value.lng,
    range: 0.4,
    userLatitude: userLocation.value.latitude,
    userLongitude: userLocation.value.longitude

  }
  await findAllDaeNear(dto)
      .then(response => {
        daeList.value = response;
        store.commit("setDaeList", response);
        clearMarkers();
        daeList.value.forEach((dae) => {
          let latLng = new LatLng(dae.daeEntity.latitude, dae.daeEntity.longitude)
          const newMarker = marker(latLng,  {
            icon: markerIcon
          }).addTo(map.value);
          markersLayer.value?.addLayer(newMarker);
          newMarker.on('click', function() {
            console.log(dae)
          });
        });
      })
      .catch(error => {
        store.commit("setDaeList", []);
        daeList.value = []
        console.log(error)
      })
      .finally(() => {
        isLoading.value = false;
      })
}

const clearMarkers = (): void => {
  if (markersLayer.value){
    markersLayer.value.clearLayers();
  }
};
const updateUserLocationMarker = (latitude: number, longitude: number) => {
  const newMarker = marker([latitude, longitude], {
    icon: userIcon
  }).addTo(map.value);
};
const getLocalisation = () =>{
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;

      map.value.setView([position.coords.latitude, position.coords.longitude],16);
      updateUserLocationMarker(latitude, longitude);
      userLocation.value.latitude = latitude;
      userLocation.value.longitude = longitude;
    })
  }
}

const centerLoc = () => {
  map.value.setView([userLocation.value.latitude, userLocation.value.longitude],16);
}


</script>

<template>
  <div id="map"></div>
  <div v-if="isLoading" class="spinner-container">
    <div class="spinner-border text-success" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <ButtonGroup
  @centerLoc="centerLoc"
  />
</template>

<style scoped>
@import 'leaflet/dist/leaflet.css';
@import 'bootstrap/dist/css/bootstrap.min.css';


div {
  width: 100%;
  height: 100vh;
}

#map {
  z-index: 0;
}
.spinner-container {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1px;
  height: 1px;
  z-index: 1000;
}
.spinner-border{
  background-color: white;

}


</style>