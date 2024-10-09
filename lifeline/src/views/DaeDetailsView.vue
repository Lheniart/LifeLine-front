<script setup lang="ts">
import type {DaeWithDistance} from "@/api/models";
import router from "@/router";
import {onMounted, ref} from "vue";
import L, {marker} from "leaflet";
import useDaeStore from "@/store";
import SituationComponent from "@/components/SituationComponent.vue";
import markerIconUrl from "@/assets/icons/pin.png";

const store = useDaeStore();

const dae = ref<DaeWithDistance>(store.daeSelected);


const markerIcon = L.icon({
  iconUrl: markerIconUrl,
  iconSize: [50, 50],
  iconAnchor: [25, 50],
  popupAnchor: [0, -32],
});

const map = ref();

onMounted(() => {
  map.value = L.map('map', {
    zoomControl: false,
    dragging: false
  }).setView([dae.value.daeEntity.latitude, dae.value.daeEntity.longitude], 17);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    minZoom: 7,
  }).addTo(map.value);
  const newMarker = marker([dae.value.daeEntity.latitude, dae.value.daeEntity.longitude],  {
    icon: markerIcon
  }).addTo(map.value);
});

window.addEventListener('resize', () => {
  map.value.invalidateSize();
});


function openGoogleMaps() {
  const latitude = dae.value.daeEntity.latitude;
  const longitude = dae.value.daeEntity.longitude;
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
  window.open(googleMapsUrl, '_blank'); // Ouvre l'itinéraire dans un nouvel onglet

}
</script>

<template>
  <header>
    <img src="@/assets/icons/fleche-petite-gauche.png" @click="router.push({name: 'mapVue'})">
    <h1>Details du DAE</h1>
  </header>
  <main>
    <article id="carte">
      <div id="detailsInfo">
        <div id="text">
          <h2>{{ dae.daeEntity.name }}</h2>
          <p> {{ dae.daeEntity.adresseNum }} {{ dae.daeEntity.adresseVoie }}, {{ dae.daeEntity.adresseCommune }}</p>
        </div>
        <div id="distance">
          <img src="@/assets/icons/marche.png">
          <p> {{ (dae.distance)?.toFixed(0) }}m</p>
        </div>
      </div>
      <div id="map"></div>
    </article>
    <article id="Horaires">
      <h2>Horaires</h2>
      <p>Jour : {{ dae.daeEntity.dispoJour.replace(/[{}"]/g, '') }} </p>
      <p>Heure : {{ (dae.daeEntity.dispoHeure).replace(/[{}"]/g, '') }} </p>
    </article>
    <article id="Situation">
      <h2>Situation</h2>
      <div id="situationComponentWrapper">
        <situation-component v-if="dae.daeEntity.acces" :text="dae.daeEntity.acces"/>
        <situation-component v-if="dae.daeEntity.etat_fonctionnement" :text="dae.daeEntity.etat_fonctionnement"/>
        <situation-component v-if="dae.daeEntity.accesLibre === true" text="Publique"/>
        <situation-component v-if="dae.daeEntity.accesLibre === false" text="Privée"/>
      </div>
    </article>
  </main>
  <nav>
    <div @click="openGoogleMaps">
      <img src="@/assets/icons/arrow-right.png" class="icon">
      <p class="labelIcon">Itinéraire</p>
    </div>
  </nav>
</template>

<style scoped>
@import 'leaflet/dist/leaflet.css';
@import 'bootstrap/dist/css/bootstrap.min.css';

h2 {
  font-size: 150%;
  font-weight: bold;
  color: #117009;
}

main {
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: scroll;
  align-items: center;
  justify-content: start;
  height: calc(100vh - 150px);
}

header {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;

  img {
    aspect-ratio: 1;
    width: 35px;
  }

  h1 {
    text-align: left;
    font-weight: 500;
    padding: 0;
    margin: 0;
  }
}

article {
  border-radius: 18px;
  border: solid #343434 1px;
  background-color: white;
  box-shadow: 0 -4px 4px rgba(0, 0, 0, 0.25);
  width: 75%;
  padding: 10px;
}


#carte {
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;


  #detailsInfo {
    display: flex;
    flex-direction: row;
    gap: 10px;

    #text {
      display: flex;
      flex: 3;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      gap: 10px;

      h2 {
        font-size: 100%;
        font-weight: bold;
        color: #117009;
      }

      p {
        font-size: 80%;
        font-weight: bold;
        margin: 0;
      }
    }

    #distance {
      display: flex;
      flex: 1;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: 18px;
      background-color: #A7EAA1;

      img {
        aspect-ratio: 1;
        width: 40px;
      }

      p {
        text-align: center;
        font-weight: 600;
        color: #117009;
        margin: 0;
      }
    }
  }
}

#situationComponentWrapper{
  margin-top: 30px;
  display: flex;
  gap: 10px;
}

#map {
  width: 100%;
  aspect-ratio: 1.7;
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
  justify-content: center;
  align-items: center;
  div{
    width: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1;
  }

  .icon {
    width: 50px;
    aspect-ratio: 1;
    fill: black;
    border-radius: 100%;
    padding: 10px;
    background-color: #A7EAA1;

  }
  .labelIcon{
    font-weight: bold;
    margin: 0;
    padding: 0;
  }
}


</style>