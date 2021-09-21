<template>
    <ion-page>
        <CustomHeader link="/order-details"/>
        
        <ion-content :fullscreen="true">
           <g-map 
                mapType="roadmap"
                :center="{lat: 14.124561213272877, lng: 121.164106030269481}"
                :zoom="10"
                :disableUI="true"
             style="height: 200px;"></g-map>
           <ion-card class="status">
                <h4>Your Order</h4>
                <h5>Order #S19820101</h5>   
                <h6>Estimated Delivery Time: 09/20/2021 8:45pm-9:00pm</h6>
                <ion-grid>
                    <ion-row>
                        <ion-col size="6"><ion-icon :icon="checkmarkCircleOutline" color="warning"></ion-icon><p class="text-status active">Processing</p></ion-col>
                        <ion-col size="6"><ion-icon :icon="checkmarkCircleOutline"></ion-icon><p class="text-status">Assembled</p></ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col size="6"><ion-icon :icon="checkmarkCircleOutline"></ion-icon><p class="text-status">Delivering</p></ion-col>
                        <ion-col size="6"><ion-icon :icon="checkmarkCircleOutline"></ion-icon><p class="text-status">Delivered</p></ion-col>
                    </ion-row>
                </ion-grid>
           </ion-card>
           <ion-card>
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
                            <p style="font-size: 15px;">John Rider</p>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col  size="3">
                            <ion-icon :icon="call" class="map" style="font-size: 18px; margin-right: 10px; color: #000"></ion-icon>
                        </ion-col>
                        <ion-col size="9"> 
                            <ion-button target="_blank" rel="noopener noreferrer" href="tel:09567387836" color="warning">Call Rider 09567387836</ion-button>
                        </ion-col>
                    </ion-row>
                    
                    <ion-row>
                            
                    <ion-icon :icon="bicycleOutline" style="font-size: 24px; color: #000; margin-bottom: 15px;"></ion-icon>
                    </ion-row>
                    <ion-row>
                            <p style="font-size: 12px;">Make and Model: Mio i124</p>
                            <p style="font-size: 12px;">Plate Number: XGY210</p>
                            </ion-row>
                    <ion-row>
                            <p style="font-size: 12px;">Company ID:</p>
                        <ion-col size="12"> 
                            <img src="/assets/images/companyid.png" style="margin-top: -40px">
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
                            <p style="font-size: 15px;">John Smith</p>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col  size="3">
                            <ion-icon :icon="call" class="map" style="font-size: 18px; margin-right: 10px; color: #000"></ion-icon>
                        </ion-col>
                        <ion-col size="9"> 
                            <p style="font-size: 15px;">09567387836</p>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col size="3">
                            <ion-icon :icon="navigate" class="map" style="font-size: 18px; margin-right: 10px; color: #000"></ion-icon>
                        </ion-col>
                        <ion-col size="9"> 
                            <p style="font-size: 15px;">Blk 21 Lot 1 John St. Batangas City, Batangas</p>
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
                    <div class="display-flex">
                        <p>1x Burger</p>
                        <p>&#8369; 100.00</p>
                    </div>
                    <hr style="margin: 0px 0 10px">
                    <div class="display-flex">
                        <p>Delivery Charge</p>
                        <p>&#8369; 30.00</p>
                    </div>
                    <div class="display-flex">
                        <p>Subtotal</p>
                        <p>&#8369; 130.00</p>
                    </div>
                    <div class="display-flex">
                        <p style="font-size: 16px;">Total(w/ Tax)</p>
                        <p style="font-size: 16px;">&#8369; 250.00</p>
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

<script lang="ts">
import { IonPage, IonContent, IonCard, IonGrid, IonButton } from '@ionic/vue';
import { arrowBackOutline, receiptOutline, person, call, personOutline, navigate, bicycleOutline, checkmarkCircleOutline } from 'ionicons/icons';
import { useRouter } from 'vue-router';
import { defineComponent } from 'vue';
import CustomHeader from '@/components/CustomHeader.vue';
import GMap from '@/components/GMapTracker.vue';
export default defineComponent({
    name: 'OrderDetails',
    components: { IonContent, IonPage, IonCard, CustomHeader, IonGrid, IonButton , GMap },
    setup() {
        const router = useRouter();
        return { router, arrowBackOutline, receiptOutline, person, call, personOutline, navigate, bicycleOutline, checkmarkCircleOutline}
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
