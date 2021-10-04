<template>
    <ion-page>
        <Header/>

        <ion-content :fullscreen="true">
        <div class="container">
            
            <ion-card>
                <h3>Same Day Courier</h3>
                <ion-grid>
                    <ion-row>
                        <label class="form-label ayo-text-orange fs-6 mb-3" for="defaultSelect">Choose the AYO Branch near you:</label>
                        <ion-select class="form-select" interface="action-sheet" :interface-options="options" @ionChange="onSelectChange($event)">
                            <ion-select-option>----- Select -----</ion-select-option>
                            <ion-select-option class="disabled">Batangas</ion-select-option>
                            <ion-select-option value="Tanauan, Batangas" selected="">City Of Tanauan</ion-select-option>
                            <ion-select-option value="Santo Tomas, Batangas">City Of Sto. Tomas</ion-select-option>
                            <ion-select-option value="Malvar, Batangas">Malvar</ion-select-option>
                            <ion-select-option value="Lipa, Batangas">City Of Lipa</ion-select-option>

                            <ion-select-option disabled>Cavite</ion-select-option>
                            <ion-select-option value="Silang">Silang</ion-select-option>
                            <ion-select-option value="dasmarinas, cavite">City Of Dasmariñas</ion-select-option>
                            <ion-select-option value="gen mariano alvarez, cavite">Gen. Mariano Alvarez</ion-select-option>

                            <ion-select-option disabled>Laguna</ion-select-option>
                            <ion-select-option value="victoria, laguna">Victoria</ion-select-option>
                            <ion-select-option value="bay">Bay</ion-select-option>
                            <ion-select-option value="santa cruz, laguna">Santa Cruz (Capital)</ion-select-option>
                            <ion-select-option value="pila, laguna">Pila</ion-select-option>
                            <ion-select-option value="san pablo, laguna">City Of San Pablo</ion-select-option>
                            <ion-select-option value="alaminos, laguna">Alaminos</ion-select-option>

                            <ion-select-option disabled>Zamboanga Del Sur</ion-select-option>
                            <ion-select-option value="pagadian">City Of Pagadian (Capital)</ion-select-option>
                            <ion-select-option value="CITY OF ZAMBOANGA">City Of Zamboanga</ion-select-option>

                            <ion-select-option disabled>Negros Oriental</ion-select-option>
                            <ion-select-option value="dumaguete">City Of Dumaguete (Capital)</ion-select-option>
                            <ion-select-option value="sibulan">Sibulan</ion-select-option>

                            <ion-select-option diabled>Leyte</ion-select-option>
                            <ion-select-option value="tacloban">City Of Tacloban (Capital)</ion-select-option>

                            <ion-select-option disabled>Aklan</ion-select-option>
                            <ion-select-option value="kalibo">Kalibo (Capital)</ion-select-option>
                            <ion-select-option value="altavas">Altavas</ion-select-option>

                            <ion-select-option disabled>Quezon</ion-select-option>
                            <ion-select-option value="Lucban">Lucban</ion-select-option>
                        </ion-select>
                    </ion-row>
                    <ion-row @click="pickup()">
                        <ion-col size="10">
                            <ion-icon :icon="mapOutline"/>  Pick Up Location
                        </ion-col>
                        <ion-col size="2">
                            <ion-icon :icon="chevronForwardOutline"/>
                        </ion-col>
                    </ion-row>
                    <p><strong>From:</strong><br> Blk 1 Lot 2 Street Quezon...</p>
                    <ion-row @click="destination()">
                        <ion-col size="10">
                            <ion-icon :icon="mapOutline"/>  Where to ...
                        </ion-col>
                        <ion-col size="2">
                            <ion-icon :icon="chevronForwardOutline"/>
                        </ion-col>
                    </ion-row>
                    <p><strong>To:</strong><br> Blk 5 Lot 10 Street Cavite...</p>
                </ion-grid>
            </ion-card>
        </div>
        </ion-content>
        <ion-footer>
            <ion-toolbar>
                <ion-button expand="full" @click="() => router.push('/select-vehicle')">Select Vehicle</ion-button>
            </ion-toolbar>
        </ion-footer>
        
    </ion-page>
</template>

<script lang="ts">
import { IonPage,  IonContent, IonCard, IonGrid, IonRow, IonCol, IonFooter, IonToolbar, IonButton, modalController, IonSelect } from '@ionic/vue';
import Header from '@/components/Header.vue';
import PickUpAddress from '@/components/SameDay/PickUpAddress.vue';
import DestinationAddress from '@/components/SameDay/DestinationAddress.vue';
import { useRouter } from 'vue-router';
import { mapOutline, chevronForwardOutline} from 'ionicons/icons';
export default {
    name: 'AYO Courier',
    components: {   IonContent, IonPage, Header , IonCard, IonGrid, IonRow, IonCol, IonFooter, IonToolbar, IonButton, IonSelect},
    setup() {
        
        const router = useRouter();

        return {mapOutline, chevronForwardOutline, router}
    },
    methods: {
        async pickup() {
             const modal = await modalController
            .create({
              component: PickUpAddress,
              cssClass: 'my-custom-class',
              componentProps: {
                title: 'Pick Up Address'
              },
            });

            return modal.present();
        },

         async destination() {
             const modal = await modalController
            .create({
              component: DestinationAddress,
              cssClass: 'my-custom-class',
              componentProps: {
                title: 'Destination Address'
              },
            });

            return modal.present();
        },

    }
}
</script>

<style scoped>
.container {
    height: 81vh;
    background: url('/assets/images/bg-img/52.jpg') rgba(0,0,0,0.5);
    background-blend-mode: darken;
    background-size: cover;
    background-position: center;
    padding: 10px;
    display:flex;
    align-items:center;
}
ion-card {
    padding: 10px 5px 30px;
    width: 90vw;
}
ion-card h3 {
    text-align:center;
    color: #feb041;
}
ion-card ion-row {
    padding: 10px;
}
ion-card ion-icon {
    color: #feb041;
    margin-right: 10px;
}
ion-grid p {
    color: #777;
    margin: 0 40px;
    border: 1px solid #888;
    padding: 10px;
    border-radius: 5px;
    font-size: 12px;
    background: #eee;
}
ion-select {
    width: 100%;
border: 1px double #feb041;
border-radius: 5px;
margin-top: 15px;
color: #feb041;
}
</style>
