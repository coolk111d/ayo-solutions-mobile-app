<template>
  <ion-app>
    <ion-router-outlet />
     <g-map
      v-show="disableUI"
       mapType="roadmap"
       :center="{lat: 14.124561213272877, lng: 121.164106030269481}"
       :zoom="14"
       style="height: 200px;"
       ref="gMapRef"
    ></g-map>
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';
import GMap from '@/components/GMapTracker.vue';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
    GMap
  }
});
</script>
