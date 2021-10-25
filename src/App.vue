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
import OneSignal from 'onesignal-cordova-plugin';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
    GMap
  },
  methods: {
    // Call this function when your app starts
   OneSignalInit(): void {
  // Uncomment to set OneSignal device logging to VERBOSE  
  OneSignal.setLogLevel(6, 0);

  // NOTE: Update the setAppId value below with your OneSignal AppId.
  OneSignal.setAppId(process.env.VUE_ONE_SIGNAL_ID);
  OneSignal.setNotificationOpenedHandler(function(jsonData) {
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
  });

  // iOS - Prompts the user for notification permissions.
  //    * Since this shows a generic native prompt, we recommend instead using an In-App Message to prompt for notification permission (See step 6) to better communicate to your users what notifications they will get.
  OneSignal.promptForPushNotificationsWithUserResponse(function(accepted) {
      console.log("User accepted notifications: " + accepted);
  });
}
  },
  mounted() {
     this.OneSignalInit();
  },
});
</script>
