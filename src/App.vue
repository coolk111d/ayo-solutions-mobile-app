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
import {
    IonApp, IonRouterOutlet,
    toastController, alertController
} from '@ionic/vue';
import { defineComponent, ref } from 'vue';
// import GMap from '@/components/GMapTracker.vue';
import OneSignal from 'onesignal-cordova-plugin';
import axios from "axios";
import { Storage } from '@ionic/storage';
import Echo from "laravel-echo";
import { useRouter } from "vue-router";

export default defineComponent({
    name: 'App',
    components: {
        IonApp,
        IonRouterOutlet,
        // GMap,
    },

    props: {
        ROLE_CUSTOMER: {
            type: String,
            default: "customer"
        },

        ROLE_MERCHANT: {
            type: String,
            default: "merchant"
        },

        ROLE_RIDER: {
            type: String,
            default: "rider"
        },
    },

    setup() {
        const storage = new Storage();
        storage.create();

        const isOpenToastRef = ref(false);
        const setOpenToast = (state) => isOpenToastRef.value = state;
        const toastMessage = "";

        const router = useRouter();

        return {
            storage,

            isOpenToastRef, setOpenToast,
            toastMessage,

            router
        };
    },

    methods: {
        // Call this function when your app starts
       OneSignalInit() {
          // Uncomment to set OneSignal device logging to VERBOSE
          OneSignal.setLogLevel(6, 0);

          // NOTE: Update the setAppId value below with your OneSignal AppId.
          OneSignal.setAppId(process.env.VUE_APP_ONE_SIGNAL_ID);
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

                if (user !== undefined) {
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
                                if (process.env.VUE_APP_ENABLE_ONE_SIGNAL) {
                                    axios({
                                        method: "POST",
                                        url: `https://onesignal.com/api/v1/notifications`,
                                        headers: {
                                            Authorization: `Basic ${process.env.VUE_APP_ONE_SIGNAL_AUTH}`
                                        },
                                        data: {
                                            "app_id": process.env.VUE_APP_ONE_SIGNAL_ID,
                                                "include_external_user_ids": [`customer${storageAuthUser.user.id}`],
                                                "channel_for_external_user_ids": "push",
                                                "template_id": "31880987-1115-4f63-92d2-52afb395c799",
                                                "headings": {"en": `All riders are currently engaged.`},
                                                "contents": {"en": "Please try again later."},
                                                "android_accent_color": "FEB041"
                                        }
                                    }).then(res => {
                                            console.log(res);
                                    }).catch(err => {
                                        console.log(err.response.data.message);
                                    });
                                }

                                simpleNotif.currentTime = 0;
                                simpleNotif.play();

                                this.openAlert("All riders are currently engaged. Please try again later.");
                            })
                            .listen(".rider-accepted-order", (e) => {
                                const order = e.order;

                                if (process.env.VUE_APP_ENABLE_ONE_SIGNAL) {
                                    axios({
                                        method: "POST",
                                        url: `https://onesignal.com/api/v1/notifications`,
                                        headers: {
                                            Authorization: `Basic ${process.env.VUE_APP_ONE_SIGNAL_AUTH}`
                                        },
                                        data: {
                                            "app_id": process.env.VUE_APP_ONE_SIGNAL_ID,
                                                "include_external_user_ids": [`customer${storageAuthUser.user.id}`],
                                                "channel_for_external_user_ids": "push",
                                                "template_id": "31880987-1115-4f63-92d2-52afb395c799",
                                                "headings": {"en": `Your order is now in progress! ${e.order.tracking_number}`},
                                                "buttons": [{"id": "id2", "text": "View", "icon": "ic_menu_share", "url": "/merchant-dashboard"}],
                                                "android_accent_color": "FEB041"
                                        }
                                    }).then(res => {
                                            console.log(res);
                                    }).catch(err => {
                                        console.log(err.response.data.message);
                                    });
                                }

                                simpleNotif.currentTime = 0;
                                simpleNotif.play();

                                this.openAlertOptions({
                                    header: order.tracking_number,
                                    message: "Your order is now in progress.",
                                    buttons: [
                                        {
                                            text: "Track Order",
                                            role: "track-order",
                                            handler: blah => {
                                                this.router.push(`/order-tracker/${order.id}`);
                                                console.log("blah", blah);
                                            }
                                        },
                                        {
                                            text: "Close",
                                            handler() {
                                                console.log("close");
                                            }
                                        }
                                    ]
                                });
                            });

                            break;

                        case this.ROLE_MERCHANT:
                            break;

                        case this.ROLE_RIDER:
                            break;
                    }
                }
            }
        },

        async openToast(message, durationSeconds=2) {
            const duration = durationSeconds * 1000;
            const toast = await toastController.create({message, duration});

            return toast.present();
        },

        async openAlert(message, buttons=["OK"]) {
            this.openAlertOptions({message, buttons});
        },

        async openAlertOptions(options={}) {
            const defaultOptions = Object.assign({
                message: "Alert message",
                buttons: ["OK"]
            }, options)

            const alert = await alertController.create(defaultOptions);
            await alert.present();

            const { role } = await alert.onDidDismiss();
            return new Promise(resolve => resolve(role));
        },

        async updateAppService() {
            const CURRENT_VERSION = process.env.VUE_APP_VERSION;
            const versionResponse = await axios.get(`${process.env.VUE_APP_ROOT_API}/mobile-api/version`);

            const latestVersion = versionResponse.data;

            if (latestVersion.success) {
                if (CURRENT_VERSION !== latestVersion.data.version) {
                    this.openAlertOptions({
                        header: "New app version available!",
                        message: "",
                        buttons: [
                            {
                                text: "Update now",
                                handler() {
                                    window.open(`https://play.google.com/store/apps/details?id=${process.env.VUE_APP_ID}`, "_system");
                                }
                            }
                        ]
                    });
                }
            }
        }
    },
    mounted() {
        this.updateAppService();

        if (process.env.VUE_APP_ENABLE_ONE_SIGNAL) {
            this.OneSignalInit();
        }

        this.initEcho();
    }
});
</script>
