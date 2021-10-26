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

        <!-- <ion-toast
            :is-open="isOpenToastRef"
            :message="toastMessage"
            :duration="3000"
            @didDismiss="setOpenToast(false)"
        >
        </ion-toast> -->
    </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet, toastController } from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import GMap from '@/components/GMapTracker.vue';
import OneSignal from 'onesignal-cordova-plugin';

import { Storage } from '@ionic/storage';
import Echo from "laravel-echo";

export default defineComponent({
    name: 'App',
    components: {
        IonApp,
        IonRouterOutlet,
        GMap
    },

    props: {
        ROLE_CUSTOMER: {
            type: String,
            default: "customer"
        },

        ROLE_MERCHANT: {
            type: String,
            default: "customer"
        },

        ROLE_RIDER: {
            type: String,
            default: "customer"
        },
    },

    setup() {
        const storage = new Storage();
        storage.create();

        const isOpenToastRef = ref(false);
        const setOpenToast = (state) => isOpenToastRef.value = state;
        const toastMessage = "";

        return {
            storage,

            isOpenToastRef, setOpenToast,
            toastMessage
        };
    },

    methods: {
        // Call this function when your app starts
       OneSignalInit() {
          // Uncomment to set OneSignal device logging to VERBOSE
          OneSignal.setLogLevel(6, 0);

          // NOTE: Update the setAppId value below with your OneSignal AppId.
          OneSignal.setAppId('643e1055-dcf7-4525-880a-89e3ba955d68');
          OneSignal.setNotificationOpenedHandler(function(jsonData) {
              console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
          });

          // iOS - Prompts the user for notification permissions.
          //    * Since this shows a generic native prompt, we recommend instead using an In-App Message to prompt for notification permission (See step 6) to better communicate to your users what notifications they will get.
          OneSignal.promptForPushNotificationsWithUserResponse(function(accepted) {
              console.log("User accepted notifications: " + accepted);
          });
        },

        async initEcho() {
            const storageAuthUser = await this.storage.get('authUser');

            if (storageAuthUser !== null) {
                const user = storageAuthUser.user;

                const simpleNotif = new Audio(`${process.env.VUE_APP_ROOT_API}/media/all-riders-are-engage.mp3`);
                // const noisySound = new Audio(`${process.env.VUE_APP_ROOT_API}/media/rider-notif2.mp3`);

                const echo = new Echo({
                    broadcaster: "pusher",
                    key: process.env.VUE_APP_PUSHER_APP_KEY,
                    cluster: process.env.VUE_APP_PUSHER_APP_CLUSTER,
                    encrypted: true,
                    authEndpoint: `${process.env.VUE_APP_ROOT_API}/broadcasting/auth`,
                    auth: {
                        headers: {
                            Authorization: `Bearer ${storageAuthUser.token}`
                        }
                    }
                });

                switch (user.role) {
                    case this.ROLE_CUSTOMER:
                        echo.private(`ping-customer.${user.customer.id}`)
                        .listen(".all-riders-are-engage", () => {
                            // console.log(e);

                            simpleNotif.currentTime = 0;
                            simpleNotif.play();

                            this.openToast("All riders are currently engaged. Please try again later.", 10);
                        });

                        break;

                    case this.ROLE_MERCHANT:
                        break;

                    case this.ROLE_RIDER:
                        break;
                }
            }
        },

        async openToast(message, durationSeconds=2) {
            const toast = await toastController
                .create({
                  message: message,
                  duration: durationSeconds * 1000
                });
            return toast.present();
        }
    },
    mounted() {
        if (process.env.VUE_ENABLE_ONE_SIGNAL) {
            this.OneSignalInit();
        }

        this.initEcho();
    }
});
</script>
