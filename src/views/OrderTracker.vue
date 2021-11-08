<template>
    <ion-page>
        <CustomHeader :reset="'/order-details/' + id"/>

        <ion-content :fullscreen="true">
            <g-map
                mapType="roadmap"
                :center="{lat: mapLat, lng: mapLong}"
                :zoom="12"
                :disableUI="true"
                style="height: 200px;">
            </g-map>

           <ion-card class="status">
                <h4>Your Order</h4>
                <h5>Order #{{order.tracking_number}}</h5>
                <h6>Estimated Delivery Time: {{order.delivery_date}}</h6>
                <ion-grid>
                    <ion-row style="display:flex; align-items:center; justify-content: center;">
                        <ion-col style="width: 20%" v-if="order.status == 'processing'"><div class="active-div"><ion-icon :icon="checkmarkCircleOutline" color="warning"></ion-icon><p class="text-status active">Processing</p></div></ion-col>
                        <ion-col style="width: 20%" v-else><ion-icon :icon="ellipseOutline"></ion-icon><p class="text-status">Processing</p></ion-col>

                        <ion-col style="width: 20%" v-if="order.status == 'assembled'"><div class="active-div"><ion-icon :icon="checkmarkCircleOutline" color="warning"></ion-icon><p class="text-status active">Assembled</p></div></ion-col>
                        <ion-col style="width: 20%" v-else><ion-icon :icon="ellipseOutline"></ion-icon><p class="text-status">Assembled</p></ion-col>

                        <ion-col style="width: 20%" v-if="order.status == 'delivering'"><div class="active-div"><ion-icon :icon="checkmarkCircleOutline" color="warning"></ion-icon><p class="text-status active">Delivering</p></div></ion-col>
                        <ion-col style="width: 20%" v-else><ion-icon :icon="ellipseOutline"></ion-icon><p class="text-status">Delivering</p></ion-col>

                        <ion-col style="width: 20%" v-if="order.status == 'delivered'"><div class="active-div"><ion-icon :icon="checkmarkCircleOutline" color="warning"></ion-icon><p class="text-status active">Delivered</p></div></ion-col>
                        <ion-col style="width: 20%" v-else><ion-icon :icon="ellipseOutline"></ion-icon><p class="text-status">Delivered</p></ion-col>

                        <ion-col style="width: 20%" v-if="order.status == 'canceled'"><div class="active-div"><ion-icon :icon="checkmarkCircleOutline" color="warning"></ion-icon><p class="text-status active">Cancelled</p></div></ion-col>
                        <ion-col style="width: 20%" v-else><ion-icon :icon="ellipseOutline"></ion-icon><p class="text-status">Cancelled</p></ion-col>
                    </ion-row>
                </ion-grid>
           </ion-card>

           <ion-card v-if="rider">
                <div class="title-icon">
                    <p class="title" style="text-align:left; margin-right: 120px;">Rider Details</p>
                </div>
                <div class="summary-details">
                    <ion-grid>
                        <ion-row>
                            <ion-col size="3">
                                <ion-icon :icon="person" class="map" style="font-size: 18px; margin-right: 10px; color: #000"></ion-icon>
                            </ion-col>
                            <ion-col size="9">
                                <p style="font-size: 15px;">{{riderUser.name}}</p>
                            </ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col  size="3">
                                <ion-icon :icon="call" class="map" style="font-size: 18px; margin-right: 10px; color: #000"></ion-icon>
                            </ion-col>
                            <ion-col size="9">
                                <ion-button target="_blank" rel="noopener noreferrer" :href="'tel:' + rider.mobile_number" color="warning">Call Rider {{rider.mobile_number}}</ion-button>
                            </ion-col>
                        </ion-row>

                        <ion-row>
                            <ion-icon :icon="bicycleOutline" style="font-size: 24px; color: #000; margin-bottom: 15px;"></ion-icon>
                        </ion-row>

                        <ion-row>
                            <p style="font-size: 12px;">Make and Model: {{rider.make_and_model}}</p>
                            <p style="font-size: 12px;">Plate Number: {{rider.plate_number}}</p>
                        </ion-row>

                        <ion-row>
                            <p style="font-size: 12px;">Company ID:</p>
                            <ion-col size="12">
                                <img :src="rider.company_id " style="margin-top: 0px">
                            </ion-col>
                        </ion-row>
                    </ion-grid>
                </div>
           </ion-card>

           <ion-card>
                <div class="title-icon">
                    <ion-icon :icon="receiptOutline" class="map"></ion-icon>
                    <p class="title" style="text-align:left; margin-right: 100px;">Receiver Details</p>
                </div>
                <div class="summary-details">
                    <ion-grid>
                    <ion-row>
                        <ion-col size="3">
                            <ion-icon :icon="person" class="map" style="font-size: 18px; margin-right: 10px; color: #000"></ion-icon>
                        </ion-col>
                        <ion-col size="9">
                            <p style="font-size: 15px;">{{shipping.name}}</p>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col  size="3">
                            <ion-icon :icon="call" class="map" style="font-size: 18px; margin-right: 10px; color: #000"></ion-icon>
                        </ion-col>
                        <ion-col size="9">
                            {{shipping.mobile_number}}
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col size="3">
                            <ion-icon :icon="navigate" class="map" style="font-size: 18px; margin-right: 10px; color: #000"></ion-icon>
                        </ion-col>
                        <ion-col size="9">
                            <p style="font-size: 15px;">{{shipping.address}}</p>
                        </ion-col>
                    </ion-row>

                    <ion-row v-if="customer">
                            <p style="font-size: 12px;">Customer's ID:</p>
                        <ion-col size="12">
                            <img :src="customer.gov_id" style="margin-top: -10px">
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
           </ion-card>

           <ion-card>
                <div class="title-icon">
                    <ion-icon :icon="receiptOutline" class="map"></ion-icon>
                    <p class="title" style="text-align:left; margin-right: 150px;">Summary</p>
                </div>
                <div class="summary-details">
                    <div class="display-flex" v-for="item in items" :key="item.id">
                        <p>{{ item.menu_item.name }}</p>
                        <div>
                            <p style="margin-bottom: 3px;">{{ item.quantity }} x &#8369; {{item.menu_item.price}}</p>
                            <p v-if="item.menu_item.discount_price !== null">
                                - <i>&#8369;{{ (item.quantity * item.menu_item.price).toFixed(2) - (item.quantity * item.menu_item.discount_price).toFixed(2) }} = &#8369; {{(item.quantity * item.menu_item.discount_price).toFixed(2)}}</i>
                            </p>
                            <div v-for="itemVariation in item.variations" :key="itemVariation.id">
                                <div v-if="!itemVariation.variation_option.variation.is_addon" class="sale-price" style="padding-bottom: 3px">
                                    <!-- <h5 style="margin-bottom: 2px;">{{itemVariation.variation_option.variation.name}}</h5> -->
                                    <p class="price" style="margin-bottom: 2px;">+ {{ itemVariation.variation_option.name }} (&#8369;{{itemVariation.variation_option.price}})</p>
                                </div>
                            </div>

                            <div v-for="itemVariation in item.variations" :key="itemVariation.id">
                                <div v-if="itemVariation.variation_option.variation.is_addon" class="sale-price" style="padding-bottom: 3px">
                                    <!-- <h5 style="margin-bottom: 2px;">{{itemVariation.variation_option.variation.name}}</h5> -->
                                    <p class="price" style="margin-bottom: 2px;">+ {{ itemVariation.variation_option.name }} (&#8369;{{itemVariation.variation_option.price}})</p>
                                </div>
                            </div>
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

        <ion-footer>
            <ion-toolbar>
                <ion-button @click="() => router.push(`/food`)">Continue Shopping</ion-button>
            </ion-toolbar>
        </ion-footer>
    </ion-page>
</template>

<script>
import { IonPage, IonContent, IonCard, IonGrid, IonButton } from '@ionic/vue';
import { arrowBackOutline, receiptOutline, person, call, personOutline, navigate, bicycleOutline, ellipseOutline, checkmarkCircleOutline } from 'ionicons/icons';
import { useRouter } from 'vue-router';
import { defineComponent } from 'vue';
import CustomHeader from '@/components/CustomHeader.vue';
import GMap from '@/components/MapTracker.vue';
import axios from "axios";
import { Storage } from '@ionic/storage';

export default defineComponent({
    name: 'OrderDetails',

    data() {
        return {
            id: null,
            order : {},
            items: [],
            rider: null,
            riderUser: {},
            customer: {},

            mapLat: 14.124561213272877,
            mapLong: 121.164106030269481,

            shipping: {}
        }
    },

    components: { IonContent, IonPage, IonCard, CustomHeader, IonGrid, IonButton, GMap },

    setup() {
        const env = process.env.VUE_APP_ROOT_API;
        const router = useRouter();

        const storage = new Storage();
        storage.create();

        return {
            env, router, arrowBackOutline, receiptOutline, person, call, personOutline, navigate, bicycleOutline, checkmarkCircleOutline,
            storage, ellipseOutline
        };
    },

    mounted() {
        this.getID();
        this.getDetails();
    },

    methods: {
        getID() {
            this.id = this.$route.params.id;
        },

        async getDetails() {
            const d = await this.storage.get('authUser');
            console.log("fdasfdas");

            axios({
                method: "GET",
                url: `${process.env.VUE_APP_ROOT_API}/mobile-api/orders/${this.id}`,
                headers: {
                    Authorization: `Bearer ${d.token}`
                }
            }).then(res => {
                const data = res.data;
                console.log(data);

                if (data.success) {
                    this.order = data.data

                    if (this.order.shipping_address.latitude !== null) {
                        this.mapLat = this.order.shipping_address.latitude;
                    }

                    if (this.order.shipping_address.longitude !== null) {
                        this.mapLong = this.order.shipping_address.longitude;
                    }

                    if (this.order.cart.customer !== null) {
                        this.customer = this.order.cart.customer;
                    }

                    this.shipping = this.order.shipping_address;
                    this.items = this.order.cart.items;

                    axios({
                        method: "GET",
                        url: `${process.env.VUE_APP_ROOT_API}/mobile-api/rider-details/${this.order.assigned_rider}`,
                    }).then(res => {
                        const riderResponseData = res.data;

                        if (riderResponseData.success) {
                            this.rider = riderResponseData.data;
                            this.riderUser = this.rider.user;
                        } else {
                            console.log(riderResponseData.message);
                        }
                    }).catch(err => {
                        console.log(err);
                    });

                    console.log(this.shipping);
                } else {
                    console.log(data.message);
                }
            }).catch(err => {
                console.log(err);
            });
        }
    }
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
    background: #1f1e51;
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
    font-size: 10px;
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
.active-div {
    background: #5f4b00;
    width: 110%;
    margin-bottom: 10px;
    padding: 3px;
    border-radius: 10px;
    border: 2px solid #feb041;
    box-shadow: 1px 1px 6px rgba(0,0,0,0.5)
}

</style>
