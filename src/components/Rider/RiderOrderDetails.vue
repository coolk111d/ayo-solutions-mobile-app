<template>
    <ion-content :fullscreen="true" v-if="order">
           <ion-icon :icon="arrowBackOutline" style="position:fixed; top:10px; left: 20px; z-index: 20; border-radius: 50%; padding: 5px; border:1px solid #feb041; background: #feb041; color: #fff" @click="dismissModal"/>

            <!-- :center="{lat: order.shipping_address.latitude, lng: order.shipping_address.longitude}" -->
           <g-map
               v-if="coordslat && coordslng"
               mapType="roadmap"
               :coordslat="coordslat"
               :coordslng="coordslng"
               :zoom="12"
               :disableUI="true"
               style="height: 200px;">
           </g-map>

           <ion-card class="status">
                <h4>Customer's Order {{ coordslat }} {{ coordslng }}</h4>
                <h5>Order #{{order.tracking_number}}</h5>
                <h6>Estimated Delivery Time: {{order.delivery_date}}</h6>
                <ion-grid>
                    <ion-row>
                        <ion-col size="6" v-if="order.status != 'processing'"><ion-icon :icon="checkmarkCircleOutline"></ion-icon><p class="text-status ">Processing</p></ion-col>
                        <ion-col size="6" v-else><ion-icon :icon="checkmarkCircleOutline" color="warning"></ion-icon><p class="text-status active">Processing</p></ion-col>

                        <ion-col size="6" v-if="order.status != 'assembled'"><ion-icon :icon="checkmarkCircleOutline"></ion-icon><p class="text-status">Assembled</p></ion-col>
                        <ion-col size="6" v-else><ion-icon :icon="checkmarkCircleOutline" color="warning"></ion-icon><p class="text-status active">Assembled</p></ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col size="6" v-if="order.status != 'delivering'"><ion-icon :icon="checkmarkCircleOutline"></ion-icon><p class="text-status">Delivering</p></ion-col>
                        <ion-col size="6" v-else><ion-icon :icon="checkmarkCircleOutline" color="warning"></ion-icon><p class="text-status active">Delivering</p></ion-col>

                        <ion-col size="6" v-if="order.status != 'delivered'"><ion-icon :icon="checkmarkCircleOutline"></ion-icon><p class="text-status">Delivered</p></ion-col>
                        <ion-col size="6" v-else><ion-icon :icon="checkmarkCircleOutline" color="warning"></ion-icon><p class="text-status active">Delivered</p></ion-col>
                    </ion-row>
                </ion-grid>
           </ion-card>
           <ion-card>
                <div class="title-icon">
                    <p style="text-align:center; font-size: 18px">Customer's Details</p> 
                </div>
                <div class="summary-details" v-if="order.status !== 'delivered'">
                    <ion-grid>
                        <ion-row>
                            <ion-col size="3">
                                <ion-icon :icon="person" class="map" style="font-size: 18px; margin-right: 10px; color: #000"></ion-icon>
                            </ion-col>
                            <ion-col size="9">
                                <p style="font-size: 15px;">{{order.shipping_address.name}}</p>
                            </ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col  size="3">
                                <ion-icon :icon="call" class="map" style="font-size: 18px; margin-right: 10px; color: #000"></ion-icon>
                            </ion-col>
                            <ion-col size="9">
                                <ion-button target="_blank" rel="noopener noreferrer" :href="'tel:' + order.shipping_address.mobile_number" color="tertiary">Call: {{order.shipping_address.mobile_number}}</ion-button>
                            </ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col size="3">
                                <ion-icon :icon="navigate" class="map" style="font-size: 18px; margin-right: 10px; color: #000"></ion-icon>
                            </ion-col>
                            <ion-col size="9">
                                <p style="font-size: 15px;">{{order.shipping_address.address}}</p>
                            </ion-col>
                        </ion-row>
                        <ion-row>
                                <p style="font-size: 12px;">Customer's ID:</p>
                            <ion-col size="12">
                                <img :src="order.cart.customer.gov_id" style="margin-top: -10px">
                            </ion-col>
                        </ion-row>
                        <ion-row>
                                <p style="font-size: 12px;">Customer's Selfie:</p>
                            <ion-col size="12">
                                <img :src="env + '/storage/' + order.selfie" style="margin-top: -10px">
                            </ion-col>
                        </ion-row>
                    </ion-grid>
                </div>
                <div class="summary-details" v-else>
                    <p>Not Available</p>
                </div>
           </ion-card>
           <ion-card>
                <div class="title-icon">
                    <ion-icon :icon="receiptOutline" class="map"></ion-icon>
                    <p class="title" style="text-align:left; margin-right: 150px;">Summary</p>
                </div>
                <div class="summary-details">
                    <div class="display-flex" v-for="item in order.cart.items" :key="item.id">
                        <p>{{ item.menu_item.name }}</p>
                        <div>
                            <p style="margin-bottom: 3px;">{{ item.quantity }} x &#8369; {{item.menu_item.price}}</p>

                            <p v-if="item.menu_item.discount_price !== null">
                                - <i>&#8369;{{ (item.quantity * item.menu_item.discount_price).toFixed(2) }}</i>
                            </p>
                        </div>
                    </div>
                    <hr style="margin: 0px 0 10px">
                    <div class="display-flex">
                        <p>Delivery Charge</p>
                        <p>&#8369; {{order.delivery_charge}}</p>
                    </div>
                    <div class="display-flex">
                        <p>Subtotal</p>
                        <p>&#8369; {{order.sub_total_price}}</p>
                    </div>
                    <div class="display-flex">
                        <p style="font-size: 16px;">Total(w/ Tax)</p>
                        <p style="font-size: 16px;">&#8369; {{order.total_price_with_tax}}</p>
                    </div>
                </div>
           </ion-card>
        </ion-content>
        <!-- <ion-footer>
            <ion-toolbar>
                <ion-button color="tertiary">Accept</ion-button>
                <ion-button color="dark">Reject</ion-button>
            </ion-toolbar>
        </ion-footer> -->
</template>

<script>
import { IonContent, IonCard, IonGrid, modalController, IonButton } from '@ionic/vue';
import { arrowBackOutline, receiptOutline, person, call, personOutline, navigate, bicycleOutline, checkmarkCircleOutline } from 'ionicons/icons';
import { useRouter } from 'vue-router';
import { defineComponent } from 'vue';
import GMap from '@/components/MapTracker.vue';
import axios from "axios";

import { Storage } from '@ionic/storage';

export default defineComponent({
    name: 'RiderOrderDetails',
    props: {
        orderID: Number
    },
    data() {
        return {
            order : null,

            shipping: {},
            coordslat: 14.090128,
            coordslng: 121.173882,
        }
    },
    components: { IonContent, IonCard, IonGrid , GMap, IonButton },
    setup() {
        const env = process.env.VUE_APP_ROOT_API;
        const router = useRouter();

        const storage = new Storage();
        storage.create();

        return {
            env, router, arrowBackOutline, receiptOutline, person, call, personOutline, navigate, bicycleOutline, checkmarkCircleOutline,

            storage
        }
    },
    methods : {
        dismissModal() {
            modalController.dismiss();
        },

        async getDetail(props) {
            const d = await this.storage.get('authUser');

            axios({
                method: "GET",
                url: `${process.env.VUE_APP_ROOT_API}/mobile-api/orders/${props.orderID}`,
                headers: {
                    Authorization: `Bearer ${d.token}`
                }
            }).then(res => {
                const data = res.data;
                console.log(data);

                if (data.success) {
                    this.order = data.data
                    console.log(this.order)
                    this.shipping = this.order.shipping_address;

                    if (this.shipping.latitude) {
                        this.coordslat = this.shipping.latitude;
                    }

                    if (this.shipping.longitude) {
                        this.coordslng = this.shipping.longitude;
                    }

                    console.log(this.coordslat);
                    console.log(this.coordslng);
                } else {
                    console.log(data.message);
                }
            }).catch(err => {
                console.log(err);
            });
        }
    },
    beforeMount() {
        this.getDetail(this.$props);
    },
})
</script>

<style scoped>
.head-container {
    margin-top: -70px;
    padding-top: 80px;
    padding-bottom: 20px;
    background: url('/assets/images/bg-img/50.png') rgba(0,0,0,0.6);
    background-blend-mode: darken;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    min-height: 200px;
    border-radius: 10px;
    margin-bottom: 15px;
    box-shadow: 1px 1px 6px rgba(0,0,0,0.2)
}
.status {
    background: #a36100;
}
.status h5 {
    text-align:center;
    color: #feb041;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.4);
}
.status h6 {
    color: #fff;
    text-align:center;
    font-size: 14px;
    text-shadow: 1px 1px 2px rgba(0,0,0,1);
}
.status h4 {
    color: #fff;
    font-weight: 600;
    text-align:center;
    font-size: 16px;
}
ion-content {
    --background: #eceff1;
}
p {
    font-weight: 600;
     color: black;
}
p.address {
    color: black;
    text-align:Center;
    font-size: 12px;
    border: 1px solid rgba(0,0,0,0.06);
    padding: 10px;
    background: rgba(0,0,0,0.02);
    box-shadow: 1px 1px 1px rgba(0,0,0,0.1);
    border-radius: 5px;
}
hr {
    border-bottom: 1px solid rgba(0,0,0,0.1);
    margin: 30px 0 0;
}

ion-card {
    padding: 10px 20px;
    border-radius: 5px;
    margin: 5px 10px 20px;
    box-shadow: 1px 1px 5px rgba(0,0,0,0.2)
}
.title-icon {
    display:flex; 
    align-items:center; 
    justify-content:space-around 
}
p.title {
    margin: 10px 100px 10px 0px;
    font-size: 16px;
    color: black;
}
ion-icon.map {
    font-size: 18px;
    --color: black;
}
ion-icon.edit {
    color: #feb041;
    font-size: 20px;
}
ion-label {
    font-size: 16px !important;
}
ion-footer ion-toolbar {
    --padding-top: 0;
    --padding-bottom: 0;
    --padding-start: 0;
    --padding-end: 0;
    --background: #ECEFF1;
}
ion-footer ion-button {
    width: 100vw;
    --border-radius: 0;
    --color: #fff;
    --margin: 0;
}
ion-radio-group  ion-label {
    font-size: 16px !important;
}
.display-flex {
    display:flex; 
    justify-content:space-between
}
.summary-details {
    padding: 10px 20px
}
.summary-details p {
    font-size: 12px;
}
.text-status {
    text-align:center;
    font-size: 12px;
    margin: 0;
    padding: 0;
    color:#fff;
}
.status ion-row {
    display: flex;
    text-align:center;
}
.status ion-icon {
    font-size: 22px;
    text-align:right;
    color: #fff;
}
.active {
    color: #feb041 !important;
}
</style>
