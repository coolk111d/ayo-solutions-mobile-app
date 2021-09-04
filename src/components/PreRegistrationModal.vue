<template>
    <ion-header>
        <ion-toolbar>
            <ion-title>{{ title }}</ion-title>
            <ion-buttons slot="end">
                <ion-button @click="dismissModal">Close</ion-button>
            </ion-buttons>
        </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
        <ion-card>
            <ion-card-header>
                <ion-card-title>Please Fill Required Fields</ion-card-title>
            </ion-card-header>

            <ion-card-content>
                <ion-item>
                    <ion-label position="floating">Name</ion-label>
                    <ion-input></ion-input>
                </ion-item>

                <ion-item>
                    <ion-label position="floating">Address</ion-label>
                    <ion-input></ion-input>
                </ion-item>

                <ion-item>
                    <ion-label position="floating">Mobile Number</ion-label>
                    <ion-input></ion-input>
                </ion-item>

                <ion-item>
                    <ion-label position="floating">Email Address</ion-label>
                    <ion-input></ion-input>
                </ion-item>

                <ion-item>
                    <ion-checkbox></ion-checkbox>
                    <ion-label> I agree to the <a href="https://ayosolution.com/terms-and-condition/ayo-food">AYO Food Terms and Conditions</a></ion-label>
                </ion-item>

                <ion-button expand="full">Register</ion-button>
            </ion-card-content>
        </ion-card>
    </ion-content>
</template>

<script>
import {
    IonContent, IonHeader, IonTitle, IonToolbar,
    modalController,
    IonLabel, IonInput, IonItem, IonButton
} from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
    name: "PreRegistrationModal",
    props: {
        title: {
            type: String,
            default: "Super Modal"
        }
    },

    components: {
        IonContent, IonHeader, IonTitle, IonToolbar,
        IonLabel, IonInput, IonItem, IonButton
    },

    methods : {
        dismissModal() {
            modalController.dismiss();
        }
    }
})
</script>
