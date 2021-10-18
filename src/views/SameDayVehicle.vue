<template>
    <ion-page>
        <CustomHeader link="/courier"/>

        <ion-content :fullscreen="true">
        <div class="container">
            
            <h3>Select Vehicle Type</h3>
           
                <ion-grid>
                    <ion-row>
                         <ion-card style="display:flex;">
                            <ion-col size="4" style="display:flex;align-items:center">
                                <img src="https://ayo-bucket.s3.ap-southeast-1.amazonaws.com/images/ayo-box/Motorcycle.png" style="width: 100%">
                            </ion-col>
                            <ion-col>
                                <div class="vehicle-info">
                                    <p>Motorcycle</p>
                                    <p class="small">Cheapest delivery option perfect for small items</p>
                                    <p class="small">Type of Load: Parcels <br> Maximum Kg Allowed: 20 kg</p>
                                </div>
                            </ion-col>
                        </ion-card>
                    </ion-row>
                    <ion-row>
                         <ion-card style="display:flex;">
                            <ion-col size="4" style="display:flex;align-items:center">
                                <img src="https://ayo-bucket.s3.ap-southeast-1.amazonaws.com/images/ayo-box/sedan.png" style="width: 100%">
                            </ion-col>
                            <ion-col>
                                <div class="vehicle-info">
                                    <p>Sedan</p>
                                    <p class="small">Type of Load: General Cargo <br> Maximum Kg Allowed: 200 kg</p>
                                </div>
                            </ion-col>
                        </ion-card>
                    </ion-row>
                     <ion-row>
                         <ion-card style="display:flex;">
                            <ion-col size="4" style="display:flex;align-items:center">
                                <img src="https://ayo-bucket.s3.ap-southeast-1.amazonaws.com/images/ayo-box/MPV-300-kg.png" style="width: 100%">
                            </ion-col>
                            <ion-col>
                                <div class="vehicle-info">
                                    <p>MPV 300KG</p>
                                    <p class="small">Type of Load: General Cargo <br> Maximum Kg Allowed: 300 kg</p>
                                </div>
                            </ion-col>
                        </ion-card>
                    </ion-row>
                    <ion-row>
                         <ion-card style="display:flex;">
                            <ion-col size="4" style="display:flex;align-items:center">
                                <img src="https://ayo-bucket.s3.ap-southeast-1.amazonaws.com/images/ayo-box/MPV-600-kg.png" style="width: 100%">
                            </ion-col>
                            <ion-col>
                                <div class="vehicle-info">
                                    <p>MPV 600KG</p>
                                    <p class="small">Type of Load: General Cargo <br> Maximum Kg Allowed: 600 kg</p>
                                </div>
                            </ion-col>
                        </ion-card>
                    </ion-row>
                    <ion-row>
                         <ion-card style="display:flex;">
                            <ion-col size="4" style="display:flex;align-items:center">
                                <img src="https://ayo-bucket.s3.ap-southeast-1.amazonaws.com/images/ayo-box/mpv-1000-kg.png" style="width: 100%">
                            </ion-col>
                            <ion-col>
                                <div class="vehicle-info">
                                    <p>MPV 1000KG</p>
                                    <p class="small">Type of Load: General Cargo <br> Maximum Kg Allowed: 1000 kg</p>
                                </div>
                            </ion-col>
                        </ion-card>
                    </ion-row>
                    <ion-row>
                         <ion-card style="display:flex;">
                            <ion-col size="4" style="display:flex;align-items:center">
                                <img src="https://ayo-bucket.s3.ap-southeast-1.amazonaws.com/images/ayo-box/mediumtruck.png" style="width: 100%">
                            </ion-col>
                            <ion-col>
                                <div class="vehicle-info">
                                    <p>Medium Truck</p>
                                    <p class="small">Type of Load: General Cargo <br> Maximum Kg Allowed: 2000 kg</p>
                                </div>
                            </ion-col>
                        </ion-card>
                    </ion-row>
                </ion-grid>
        </div>
        </ion-content>
        <ion-footer>
            <ion-toolbar>
                <ion-grid>
                    <ion-row>
                    <ion-col>
                        <p>Total:</p>
                    </ion-col>
                    <ion-col>
                        <p><strong>PHP 0.00</strong></p>
                    </ion-col>
                    </ion-row>
                </ion-grid>
                <ion-button expand="full">Next</ion-button>
            </ion-toolbar>
        </ion-footer>
        
    </ion-page>
</template>

<script lang="ts">
import { IonPage,  IonContent, IonCard, IonGrid, IonRow, IonCol, IonFooter, IonToolbar, IonButton, modalController } from '@ionic/vue';
import CustomHeader from '@/components/CustomHeader.vue';
import { mapOutline, chevronForwardOutline} from 'ionicons/icons';
export default {
    name: 'AYO Courier',
    components: {   IonContent, IonPage, CustomHeader , IonCard, IonGrid, IonRow, IonCol, IonFooter, IonToolbar, IonButton},
    setup() {
        return {mapOutline, chevronForwardOutline}
    },
}
</script>

<style scoped>
.container {
    padding: 10px;
}
ion-card {
    padding: 10px;
    cursor: hand;
}
h3 {
    text-align:center;
    color: #feb041;
}
ion-row ion-card  {
    padding: 10px;
    width: 100%;
    margin: 5px 2.5%;
}
ion-card ion-icon {
    color: #feb041;
    margin-right: 10px;
}
ion-grid p {
    color: #000;
    text-align:left;
    font-weight: 600;
}
p.small {
    font-size: 12px;
    color: #666;
    margin-top: -10px;
    font-weight: 400;
}
ion-footer p {
    padding: 5px;
    margin: 0;
    text-align:center;
    font-weight: 400;
}
ion-row:active ion-card, ion-row:focus ion-card, ion-row:hover ion-card {
    background:#feb041;
}
</style>
