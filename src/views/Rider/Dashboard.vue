<template>
    <ion-page>
        <RiderHeader/>
        <ion-loading
            :is-open="isOpenLoadingRef"
            message="Please wait..."
            :duration="0"
            @didDismiss="setOpenLoading(false)"
        >
        </ion-loading>

        <ion-toast
            :is-open="isOpenToastRef"
            :message="toastMessage"
            :duration="3000"
            @didDismiss="setOpenToast(false)"
        >
        </ion-toast>

        <ion-content :fullscreen="true">
            <div class="content-container">
                <ion-header collapse="condense">
                    <ion-toolbar>
                        <ion-title size="large">Home</ion-title>
                    </ion-toolbar>
                </ion-header>
                <ion-card>
                    <div class="container">
                    <h3>Rider's Dashboard</h3>

                    <!-- <p>Earn today: &#8369;100.00</p> -->

                    <ion-button color="tertiary" size="small" @click="ordersList">Order List</ion-button>
                    </div>
                </ion-card>

                <ion-card>
                    <div class="container">
                    <h3>Same Day Rider's Dashboard</h3>

                    <!-- <p>Earn today: &#8369;100.00</p> -->

                    <ion-button color="tertiary" size="small" @click="sameDaybooking">Same Day Booking</ion-button>
                    </div>
                </ion-card>
                <hr style="border-bottom: 1px solid rgba(0,0,0,0.05); margin: 20px 10px 0px;">
                <h3 class="divider-title">New Order</h3>
                <!-- <ion-card>
                    <div class="container">
                        <ion-row class="ion-align-items-center">
                            <ion-col size="6" style="text-align:center;">
                                <ion-badge color="warning">New</ion-badge><br>
                                <a class="product-title"><span style="color:#feb041; font-size: 14px;">MangInasal - Batangas</span></a>
                                    <p class="sale-price">Order #S61910121</p>
                                    <p class="sale-price">Ordered: <span class="price">09/17/2021 9:10pm</span></p>
                                    <p class="sale-price">Total Price: <span class="price">&#8369;560</span></p>
                            </ion-col>
                            <ion-col style="display:flex; flex-direction:column;">
                                <ion-button size="small" color="success" @click="details">Process</ion-button>
                                <ion-button size="small" color="danger">Reject</ion-button>
                            </ion-col>
                        </ion-row>
                    </div>
                </ion-card> -->

                <ion-card v-for="order in orders" :key="order.id">
                    <div class="container">
                        <ion-row class="ion-align-items-center">
                            <ion-col :size="order.status === 'processing' ? 6 : 12" style="text-align:center;">
                                <ion-badge color="warning">New</ion-badge><br>
                                <!-- Product Title --><a class="product-title"><span style="color:#feb041; font-size: 14px;">{{order.merchant.user.name}}</span></a>
                                    <!-- Product Price -->
                                    <p class="sale-price">Order #{{order.tracking_number}}</p>
                                    <p class="sale-price">Ordered: <span class="price">{{ order.created_at }}</span></p>
                                    <p class="sale-price">Total Price: <span class="price">&#8369;{{ order.total_price }}</span></p>
                                    <ion-button size="small" color="success" @click="orderDetails(order.id)">View Details</ion-button>
                            </ion-col>

                            <ion-col style="display:flex; flex-direction:column;" v-if="order.status === 'processing'">
                                <ion-button size="small" color="success" @click="accept(order.tracking_number)">Process</ion-button>
                                <ion-button size="small" color="danger" @click="reject(order.tracking_number)">Reject</ion-button>
                            </ion-col>

                            <ion-col style="display:flex; flex-direction:column;" v-else-if="order.status === 'assembled'">
                                <ion-button size="small" color="success" @click="delivering(order)">Mark As Delivering</ion-button>
                            </ion-col>

                            <ion-col style="display:flex; flex-direction:column;" v-else-if="order.status === 'delivering'">
                                <ion-button size="small" color="success" @click="delivered(order)">Mark As Delivered</ion-button>
                            </ion-col>
                        </ion-row>
                    </div>
                </ion-card>
            </div>
        </ion-content>
    </ion-page>
</template>

<script>
import {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonButton, modalController, IonRow, IonBadge, IonCol,
    IonLoading, IonToast
} from '@ionic/vue';
import RiderHeader from '@/components/Rider/RiderHeader.vue';
import RiderOrderList from '@/components/Rider/RiderOrderList.vue';
import RiderSameDayOrderList from '@/components/Rider/RiderSameDayOrderList.vue';
import RiderOrderDetails from '@/components/Rider/RiderOrderDetails.vue';

import { ref } from 'vue';
import { Storage } from '@ionic/storage';
import Echo from "laravel-echo";
import axios from "axios";

export default  {
    name: 'Rider Dashboard',
    components: {
        IonHeader, IonToolbar, IonTitle, IonContent, IonPage, RiderHeader, IonCard, IonButton , IonRow, IonBadge, IonCol,
        IonLoading, IonToast
    },

    data() {
        return {
            orders: [],

            toastMessage: ""
        };
    },

    setup() {
        const echo = new Echo({
            broadcaster: "pusher",
            key: process.env.VUE_APP_PUSHER_APP_KEY,
            cluster: process.env.VUE_APP_PUSHER_APP_CLUSTER,
            encrypted: true,
            authEndpoint: `${process.env.VUE_APP_ROOT_API}/broadcasting/auth`,
        });

        const storage = new Storage();
        storage.create();

        const audio = new Audio(`${process.env.VUE_APP_ROOT_API}/media/rider-notif2.mp3`);

        const isOpenLoadingRef = ref(false);
        const setOpenLoading = (state) => isOpenLoadingRef.value = state;

        const isOpenToastRef = ref(false);
        const setOpenToast = (state) => isOpenToastRef.value = state;

        return {
            echo, storage, audio,

            isOpenLoadingRef, setOpenLoading,
            isOpenToastRef, setOpenToast
        };
    },

    mounted() {
        this.initEcho();
        this.initOrdersData();
    },

    methods: {
        async initEcho() {
            const storageAuthUser = await this.storage.get('authUser');

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

            const channel = `pooling-rider.${storageAuthUser.user.rider.id}`;
            console.log(channel);

            echo.private(channel)
            .listen(".queue", (e) => {
                this.audio.currentTime = 0;
                this.audio.play();

                axios({
                    method: "POST",
                    url: `https://onesignal.com/api/v1/notifications`,
                    headers: {
                        Authorization: `Basic ${process.env.VUE_ONE_SIGNAL_AUTH}`
                    },
                    data: {
                          "app_id": process.env.VUE_ONE_SIGNAL_ID;
                            "include_external_user_ids": [`rider${storageAuthUser.user.id}`],
                            "channel_for_external_user_ids": "push",
                            "template_id": "31880987-1115-4f63-92d2-52afb395c799",
                            "headings": {"en": `You have a new order! ${e.order.tracking_number}`},
                            "contents": {"en": "Please accept the order."},
                            "buttons": [{"id": "id2", "text": "Accept", "icon": "ic_menu_share", "url": "/rider-dashboard"}, {"id": "id1", "text": "Reject", "icon": "ic_menu_send"}],
                            "android_accent_color": "FEB041"
                    }
                }).then(res => {
                        console.log(res);
                }).catch(err => {
                    console.log(err.response.data.message);
                });

                this.orders.unshift(e.order);
                console.log(e.order);
            });

            console.log("ionic storage");
            console.log(storageAuthUser);
            console.log("sessionStorage");
            console.log(sessionStorage);
            console.log("echo");
            console.log(echo);
        },

        async initOrdersData() {
            const storageAuthUser = await this.storage.get('authUser');

            axios({
                method: "GET",
                url: `${process.env.VUE_APP_ROOT_API}/mobile-api/orders/new`,
                headers: {
                    Authorization: `Bearer ${storageAuthUser.token}`
                }
            }).then(res => {
                const data = res.data;

                if (data.success) {
                    this.orders = data.data;
                } else {
                    console.log(data.message);
                }
            }).catch(err => {
                console.log(err);
            });
        },

        async ordersList() {
            const modal = await modalController
            .create({
            component: RiderOrderList,
            cssClass: 'my-custom-class',
            })
            return modal.present();
        },
        async sameDaybooking() {
            const modal = await modalController
            .create({
            component: RiderSameDayOrderList,
            cssClass: 'my-custom-class',
            })
            return modal.present();
        },
         async details() {
            const modal = await modalController
            .create({
            component: RiderOrderDetails,
            cssClass: 'my-custom-class',
            })
            return modal.present();
        },

        accept(trackingNumber) {
            if (!this.audio.paused) this.audio.pause();

            this.setOpenLoading(true);

            this.storage.get("authUser").then(d => {
                axios({
                    method: "PATCH",
                    url: `${process.env.VUE_APP_ROOT_API}/mobile-api/orders/${trackingNumber}/accept`,
                    headers: {
                        Authorization: `Bearer ${d.token}`
                    }
                }).then(res => {
                    this.setOpenLoading(false);

                    const data = res.data;

                    if (data.success) {
                        this.orders = [];
                        this.orders.push(data.data);

                        this.toastMessage = "Successfully accept Order";
                    } else {
                        this.toastMessage = data.message;
                        console.log(data.message);
                    }

                    this.setOpenToast(true);
                }).catch(err => {
                    this.setOpenLoading(false);

                    console.log(err);
                    // this.toastMessage = err.response.data.message;
                    // this.setOpenToast(true);
                });
            });
        },

        reject(trackingNumber) {
            if (!this.audio.paused) this.audio.pause();

            this.setOpenLoading(true);

            this.storage.get("authUser").then(d => {
                axios({
                    method: "PATCH",
                    url: `${process.env.VUE_APP_ROOT_API}/mobile-api/orders/${trackingNumber}/reject`,
                    headers: {
                        Authorization: `Bearer ${d.token}`
                    }
                }).then(res => {
                    this.setOpenLoading(false);

                    const data = res.data;

                    if (data.success) {
                        this.toastMessage = `You reject the order #${trackingNumber}`;
                        this.orders = [];
                    } else {
                        this.toastMessage = data.message;
                        console.log(data.message);
                    }

                    this.setOpenToast(true);
                }).catch(err => {
                    this.setOpenLoading(false);

                    console.log(err);
                    // this.toastMessage = err.response.data.message;
                    // this.setOpenToast(true);
                });
            });
        },

        delivering(order) {
            this.setOpenLoading(true);

            this.storage.get("authUser").then(d => {
                axios({
                    method: "PATCH",
                    url: `${process.env.VUE_APP_ROOT_API}/mobile-api/orders/${order.id}/delivering`,
                    headers: {
                        Authorization: `Bearer ${d.token}`
                    }
                }).then(res => {
                    this.setOpenLoading(false);

                    const data = res.data;

                    if (data.success) {
                        this.toastMessage = `You mark the order #${order.tracking_number} as delivering`;
                        this.orders = [];
                        order.status = "delivering";
                        this.orders.push(order)
                    } else {
                        this.toastMessage = data.message;
                        console.log(data.message);
                    }

                    this.setOpenToast(true);
                }).catch(err => {
                    this.setOpenLoading(false);

                    console.log(err);
                    // this.toastMessage = err.response.data.message;
                    // this.setOpenToast(true);
                });
            });
        },

        delivered(order) {
            this.setOpenLoading(true);

            this.storage.get("authUser").then(d => {
                axios({
                    method: "PATCH",
                    url: `${process.env.VUE_APP_ROOT_API}/mobile-api/orders/${order.id}/delivered`,
                    headers: {
                        Authorization: `Bearer ${d.token}`
                    }
                }).then(res => {
                    this.setOpenLoading(false);

                    const data = res.data;

                    if (data.success) {
                        this.toastMessage = `You mark the order #${order.tracking_number} as delivered`;
                        this.orders = [];
                        order.status = "delivered";
                        this.orders.push(order)
                    } else {
                        this.toastMessage = data.message;
                        console.log(data.message);
                    }

                    this.setOpenToast(true);
                }).catch(err => {
                    this.setOpenLoading(false);

                    console.log(err);
                    // this.toastMessage = err.response.data.message;
                    // this.setOpenToast(true);
                });
            });
        },

        async orderDetails(id) {
            if (!this.audio.paused) this.audio.pause();

            modalController.dismiss();
            const modal = await modalController
                .create({
                component: RiderOrderDetails,
                cssClass: 'my-custom-class',
                    componentProps: {
                        orderID: id
                    }
                })
            return modal.present();
        },
    }
}
</script>

<style scoped>
    .content-container {
        height: 88vh;
        background: url('/assets/images/bg-img/13.jpg');
        background-size: cover;
        background-position: left;
        background-repeat: no-repeat;
    }
    h3.divider-title {
        font-size: 14px;
        color: #000;
        text-align: center;
    }
    ion-card {
        border-radius: 10px;
    }
    .container {
        padding: 10px;
        text-align:center;
    }
    .container h3 {
        color: #000;
    }
    a.product-title {
    text-decoration: none;
    font-weight: 600;
    margin-left:5px;
    color: #1e1e50;
    font-size: 14px;
}
.sale-price {
    margin: 5px;
    font-size: 12px;
}
p {
    color: #000;
}
</style>


