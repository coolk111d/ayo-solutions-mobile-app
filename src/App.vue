<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';
// import OneSignal from 'onesignal-cordova-plugin';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  },
  // methods: {
  //     // Call this function when your app starts
  //     OneSignalInit() {
  //       // Uncomment to set OneSignal device logging to VERBOSE  
  //       OneSignal.setLogLevel(6, 0);

  //       // NOTE: Update the setAppId value below with your OneSignal AppId.
  //       OneSignal.setAppId("643e1055-dcf7-4525-880a-89e3ba955d68");
  //       OneSignal.setNotificationOpenedHandler(function(jsonData) {
  //           console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
  //       });

  //       // iOS - Prompts the user for notification permissions.
  //       //    * Since this shows a generic native prompt, we recommend instead using an In-App Message to prompt for notification permission (See step 6) to better communicate to your users what notifications they will get.
  //       OneSignal.promptForPushNotificationsWithUserResponse(function(accepted) {
  //           console.log("User accepted notifications: " + accepted);
  //       });
  //     }
  // },
  // beforeMount() {
  //   this.OneSignalInit();
  // },
});
</script>