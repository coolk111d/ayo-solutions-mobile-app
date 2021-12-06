<template>
    <ion-page>
        <MerchantHeader/>

        <ion-content :fullscreen="true">
            <div class="content-container">
                <ion-header collapse="condense">
                    <ion-toolbar>
                        <ion-title size="large">Home</ion-title>
                    </ion-toolbar>
                </ion-header>
                <ion-card>
                    <div class="container">
                    <h3>Merchant's Dashboard</h3>

                    <ion-button color="tertiary" size="small" @click="ordersList">Order List</ion-button>
                    </div>
                </ion-card>
                <hr style="border-bottom: 1px solid rgba(0,0,0,0.05); margin: 20px 10px 0px;">
                <h3 class="divider-title">New Order</h3>

                <ion-card v-for="order in orders" :key="order.id">
                    <div class="container">
                        <ion-row class="ion-align-items-center">
                            <ion-col size="12" style="text-align:center;">
                                <ion-badge color="warning">New</ion-badge><br>
                                <!-- Product Title -->
                                <!-- <a class="product-title"><span style="color:#feb041; font-size: 14px;">MangInasal - Batangas</span></a> -->

                                <!-- Product Price -->
                                <p class="sale-price">Order #{{order.tracking_number}}</p>
                                <p class="sale-price">Ordered: <span class="price">{{ order.created_at }}</span></p>
                                <p class="sale-price">Total Price: <span class="price">&#8369;{{ order.total_price }}</span></p>
                                <ion-button size="small" color="success" @click="orderDetails(order.id, order.assigned_rider)">View Details</ion-button>
                            </ion-col>
                        </ion-row>
                    </div>
                </ion-card>
            </div>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonButton, modalController, IonRow, IonBadge, IonCol } from '@ionic/vue';
import MerchantHeader from '@/components/Merchant/MerchantHeader.vue';
import MerchantOrderList from '@/components/Merchant/MerchantOrderList.vue';
import MerchantOrderDetails from '@/components/Merchant/MerchantOrderDetails.vue';

import { Storage } from '@ionic/storage';
import Echo from "laravel-echo";
import axios from "axios";

export default  {
    name: 'Merchant Dashboard',
    components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, MerchantHeader, IonCard, IonButton , IonRow, IonBadge, IonCol },

    data() {
        return {
            orders: []
        };
    },

    setup() {
        const storage = new Storage();
        storage.create();

        const audio = new Audio(`${process.env.VUE_APP_ROOT_API}/media/rider-notif2.mp3`);

        return { storage, audio };
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

            const channel = `notify-merchant.${storageAuthUser.user.merchant.id}`;

            echo.private(channel)
            .listen(".rider-accepted-order", (e) => {
                this.audio.currentTime = 0;
                this.audio.play();

                if (process.env.VUE_APP_ENABLE_ONE_SIGNAL) {
                    axios({
                        method: "POST",
                        url: `https://onesignal.com/api/v1/notifications`,
                        headers: {
                            Authorization: `Basic ${process.env.VUE_APP_ONE_SIGNAL_AUTH}`
                        },
                        data: {
                              "app_id": process.env.VUE_APP_ONE_SIGNAL_ID,
                                "include_external_user_ids": [`merchant${storageAuthUser.user.id}`],
                                "channel_for_external_user_ids": "push",
                                "template_id": "31880987-1115-4f63-92d2-52afb395c799",
                                "headings": {"en": `You have a new order! ${e.order.tracking_number}`},
                                "contents": {"en": "Please accept the order."},
                                "buttons": [{"id": "id2", "text": "View", "icon": "ic_menu_share", "url": "/merchant-dashboard"}],
                                "android_accent_color": "FEB041"
                        }
                    }).then(res => {
                            console.log(res);
                    }).catch(err => {
                        console.log(err.response.data.message);
                    });
                }

                this.audio.currentTime = 0;
                this.audio.play();
                this.orders.unshift(e.order)
            });
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
            component: MerchantOrderList,
            cssClass: 'my-custom-class',
            })
            return modal.present();
        },

        async orderDetails(id, riderId) {
            if (!this.audio.paused) this.audio.pause();

            const modal = await modalController.create({
                component: MerchantOrderDetails,
                cssClass: 'my-custom-class',
                componentProps: {
                    orderID: id,
                    riderId: riderId
                }
            });

            return modal.present();
        },
    }
}
</script>

<style scoped>
    .content-container {
        height: 88vh;
        background: url('https://ayo-bucket.s3.ap-southeast-1.amazonaws.com/mobile-app/bg-img/13.jpg');
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


