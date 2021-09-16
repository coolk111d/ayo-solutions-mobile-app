<template>
    <ion-page>
        <Header/>
        
        <ion-content :fullscreen="true">
            <h5 style="text-align:center">Checkout</h5>
           <ion-card>
                <div class="title-icon">
                    <ion-icon :icon="mapOutline" class="map"></ion-icon>
                    <p class="title">Delivery Address</p> 
                    <ion-icon :icon="pencilOutline" color="warning" class="edit"  @click="addAddress"></ion-icon>
                </div>
                <p class="address" @click="addAddress">Blk 20 Lot 21 Mara St. Cabuyao Laguna</p>

                <hr>
                    <ion-item>
                        <ion-label position="floating" style="font-weight: 600">Delivery Instruction  <ion-icon :icon="bicycleOutline" color="dark" class="edit"  @click="addAddress"></ion-icon></ion-label>
                        <ion-textarea></ion-textarea>
                    </ion-item>
           </ion-card>

           <ion-card>
                <div class="title-icon">
                    <ion-icon :icon="walletOutline" class="map"></ion-icon>
                    <p class="title">Payment Method</p> 
                </div>
                    <ion-radio-group>
                        <ion-item>
                            
                            <ion-radio value="Cash"></ion-radio>
                            <ion-label style="margin-left: 10px">Cash</ion-label>
                        </ion-item>

                        <ion-item>
                            <ion-radio value="Debit/Credit" disabled></ion-radio>
                            <ion-label style="margin-left: 10px">Debit/Credit</ion-label>
                        </ion-item>

                        <ion-item>
                            <ion-radio value="GCash/Paymaya" disabled></ion-radio>
                            <ion-label style="margin-left: 10px">GCash/Paymaya</ion-label>
                        </ion-item>
                    </ion-radio-group>
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
                        <p>Subtotal</p>
                        <p>&#8369; 100.00</p>
                    </div>
                    <div class="display-flex">
                        <p style="font-size: 18px;">Total</p>
                        <p style="font-size: 18px;">&#8369; 200.00</p>
                    </div>
                </div>
           </ion-card>
            
        </ion-content>
        
        <ion-footer>
            <ion-toolbar>
                <ion-button>Review Payment</ion-button>
            </ion-toolbar>
        </ion-footer>
    </ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent, IonCard, modalController,IonTextarea, IonLabel, IonItem, IonRadioGroup, IonRadio,
    IonFooter} from '@ionic/vue';
import { arrowBackOutline, mapOutline, pencilOutline, receiptOutline, walletOutline, bicycleOutline} from 'ionicons/icons';
import { useRouter } from 'vue-router';
import { defineComponent } from 'vue';
import Header from '@/components/Header.vue';

import Address from '@/components/Address.vue';
export default defineComponent({
    name: 'Checkout',
    components: { IonContent, IonPage, IonCard, Header, IonTextarea, IonLabel, IonItem, 
    IonFooter, IonRadioGroup, IonRadio},
    setup() {
        const router = useRouter();
        return { router, arrowBackOutline, mapOutline, pencilOutline, receiptOutline, walletOutline, bicycleOutline}
    },
    methods: {
        async addAddress() {
        const modal = await modalController
        .create({
          component: Address,
          cssClass: 'my-custom-class',
          componentProps: {
            title: 'Address'
          },
        })
      return modal.present();
    }
    }
})
</script>

<style scoped>
ion-content {
    --background: #fff;
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
</style>
