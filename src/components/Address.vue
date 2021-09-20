<template>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="end">
                    <ion-button @click="dismissModal"><ion-icon :icon="closeCircleOutline" /></ion-button>
                </ion-buttons>
                <ion-title>Address</ion-title>
            </ion-toolbar>  
        </ion-header>
        <ion-content>
            <g-map 
                mapType="roadmap"
                :center="{lat: 14.124561213272877, lng: 121.164106030269481}"
                :zoom="10"
                :disableUI="true"
            ></g-map>
                    <ion-item>
                        <ion-label position="stacked" style="font-weight: 600">First Name <ion-icon :icon="navigateCircleoutline" color="dark" class="edit"></ion-icon></ion-label>
                        <ion-input type="text" placeholder=""></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-label position="stacked" style="font-weight: 600">Last Name <ion-icon :icon="navigateCircleoutline" color="dark" class="edit"></ion-icon></ion-label>
                        <ion-input type="text" placeholder=""></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-label position="stacked" style="font-weight: 600">Apt/Blk/Lot/Landmark  <ion-icon :icon="navigateCircleoutline" color="dark" class="edit"></ion-icon></ion-label>
                        <ion-input></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-label position="stacked" style="font-weight: 600">Phone Number  <ion-icon :icon="navigateCircleoutline" color="dark" class="edit"></ion-icon></ion-label>
                        <ion-input type="number" placeholder="09xx"></ion-input>
                    </ion-item>
        </ion-content>
        <ion-footer>
            <ion-toolbar>
                <ion-button @click="dismissModal">Add Address</ion-button>
            </ion-toolbar>
        </ion-footer>
</template>

<script>
import { 
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonTitle,
    IonContent,
    modalController,
    IonLabel,
    IonInput
 } from '@ionic/vue';
import GMap from '@/components/GMap.vue';
import { closeCircleOutline, navigateCircleoutline } from 'ionicons/icons';
import { useRouter } from 'vue-router';
import { defineComponent } from 'vue';
export default defineComponent({
    name: "Address",
    components: {
        IonContent,
        GMap,
        IonHeader,
        IonToolbar,
        IonButtons,
        IonButton,
        IonTitle,  
        IonLabel,
        IonInput
    },
    setup() {
        const router = useRouter();
        return {closeCircleOutline, router, navigateCircleoutline}
    },
    methods : {
        async dismissModal() {
            modalController.dismiss();
        },
    }
})
</script>

<style scoped>
.map {
    width: 100%;
    height: 65vh;
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
</style>