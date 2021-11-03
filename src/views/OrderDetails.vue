<template>
    <ion-page>
        <CustomHeader reset="/checkout"/>
        <ion-content :fullscreen="true">
           <div class="head-container">   
                <h4>Thank you for ordering!</h4>
                <h5>Order #{{order.tracking_number}}</h5>
                <h6 v-if="order.received_time">Ordered: {{order.received_time}}</h6>
                <h6 v-if="order.delivery_date">Estimated Delivery: {{order.delivery_date}}</h6>
           </div>
           <ion-card v-if="order.assigned_rider != null">
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
                            <p style="font-size: 15px;">{{riderDetails.name}}</p>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col  size="3">
                            <ion-icon :icon="call" class="map" style="font-size: 18px; margin-right: 10px; color: #000"></ion-icon>
                        </ion-col>
                        <ion-col size="9"> 
                            <ion-button target="_blank" rel="noopener noreferrer" :href="'tel:' + riderDetails.mobile_number" color="warning">Call Rider {{riderDetails.mobile_number}}</ion-button>
                        </ion-col>
                    </ion-row>
                    
                    <ion-row>
                            
                    <ion-icon :icon="bicycleOutline" style="font-size: 24px; color: #000; margin-bottom: 15px;"></ion-icon>
                    </ion-row>
                    <ion-row>
                            <p style="font-size: 12px;">Make and Model: {{riderDetails.make_and_model}}</p>
                            <p style="font-size: 12px;">Plate Number: {{riderDetails.plate_number}}</p>
                            </ion-row>
                    <ion-row>
                            <p style="font-size: 12px;">Company ID:</p>
                        <ion-col size="12"> 
                            <img :src=" env + '/storage/' + riderDetails.company_id " style="margin-top: 0px">
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
                            <p style="font-size: 15px;">{{shippingAddress.name}}</p>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col  size="3">
                            <ion-icon :icon="call" class="map" style="font-size: 18px; margin-right: 10px; color: #000"></ion-icon>
                        </ion-col>
                        <ion-col size="9"> 
                            <p style="font-size: 15px;">{{shippingAddress.mobile_number}}</p>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col size="3">
                            <ion-icon :icon="navigate" class="map" style="font-size: 18px; margin-right: 10px; color: #000"></ion-icon>
                        </ion-col>
                        <ion-col size="9"> 
                            <p style="font-size: 15px;">{{shippingAddress.address}}</p>
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
                        <p>{{ item.quantity }}x {{ item.name }}</p>
                        <p>&#8369; {{ item.price }}</p>
                    </div>
                    <hr style="margin: 0px 0 10px">
                    <div class="display-flex">
                        <p>Delivery Charge</p>
                        <p>&#8369; {{order.total_price - order.sub_total_price}}</p>
                    </div>
                    <div class="display-flex">
                        <p>Subtotal</p>
                        <p>&#8369; {{order.total_price}}</p>
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
                <ion-button @click="() => router.push(`/order-tracker/${order.id}`)">TRACK MY ORDER</ion-button>
            </ion-toolbar>
        </ion-footer>
    </ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent, IonCard, IonGrid, IonButton  } from '@ionic/vue';
import { arrowBackOutline, receiptOutline, person, call, personOutline, navigate, bicycleOutline } from 'ionicons/icons';
import { useRouter } from 'vue-router';
import { defineComponent } from 'vue';
import CustomHeader from '@/components/CustomHeader.vue';
import axios from "axios";
export default defineComponent({
    name: 'OrderDetails',
    components: { IonContent, IonPage, IonCard, CustomHeader, IonGrid, IonButton },
    data() {
            return {
                order: [],
                items: [],
                shippingAddress: {},
                riderDetails: [],
            }
        },
    setup() {
        const env = process.env.VUE_APP_ROOT_API;
        const router = useRouter();
        return { router, arrowBackOutline, receiptOutline, person, call, personOutline, navigate, bicycleOutline, env}
    },
    methods: {
        async getOrders() {
            axios({
                method: "GET",
                url: `${process.env.VUE_APP_ROOT_API}/mobile-api/order-details/${this.$route.params.id}`,
            }).then(res => {
                const data = res.data;

                this.order = data.order;
                this.items = data.items;
                this.shippingAddress = data.order.shipping_address;
            }).catch(err => {
                console.log(err);
            });

            axios({
                method: "GET",
                url: `${process.env.VUE_APP_ROOT_API}/mobile-api/rider-details/${this.$route.params.id}`,
            }).then(res => {
                console.log(res.data);
                this.riderDetails = res.data[0];
            }).catch(err => {
                console.log(err);
            });
        },
    },
    beforeMount() {
        this.getOrders();
    },
})
</script>

<style scoped>
.head-container {
    margin-top: -70px;
    padding-top: 80px;
    padding-bottom: 20px;
    background: url('https://ayo-bucket.s3.ap-southeast-1.amazonaws.com/mobile-app/bg-img/25.jpg') rgba(0,0,0,0.3);
    background-blend-mode: darken;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    min-height: 200px;
    border-radius: 10px;
    margin-bottom: 15px;
    box-shadow: 1px 1px 6px rgba(0,0,0,0.2)
}
.head-container h5 {
    text-align:center;
    color: #feb041;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.4);
}
.head-container h6 {
    color: #fff;
    text-align:center;
    font-size: 14px;
    text-shadow: 1px 1px 2px rgba(0,0,0,1);
}
.head-container h4 {
    color: #01077c;
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
</style>
