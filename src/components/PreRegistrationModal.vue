<template>
    <ion-header>
        <ion-toolbar>
             <ion-buttons slot="start">
                <ion-button @click="dismissModal"><ion-icon :icon="arrowBackOutline" /></ion-button>
            </ion-buttons>
            <ion-title>{{ title }}</ion-title>
            
        </ion-toolbar>  
    </ion-header>
    <ion-content class="ion-padding">
            <ion-card-header>
                <ion-card-title>Please fill out required fields:</ion-card-title>
            </ion-card-header>

            <ion-card-content>
                <!-- <form @submit.prevent="onSubmit"> -->
                <Form @submit="onSubmit" :validation-schema="schema">
                    <ion-item>
                        <ion-label position="floating">Name</ion-label>
                        <Field as="ion-input" name="name" />
                        <ErrorMessage as="ion-text" name="name" color="danger" />
                    </ion-item>

                    <ion-item>
                        <ion-label position="floating">Address</ion-label>
                        <Field as="ion-textarea" name="address" />
                        <ErrorMessage as="ion-text" name="address" color="danger" />
                    </ion-item>

                    <ion-item>
                        <ion-label position="floating">Mobile Number</ion-label>
                        <Field as="ion-input" name="mobile_number" />
                        <ErrorMessage as="ion-text" name="mobile_number" color="danger" />
                    </ion-item>

                    <ion-item>
                        <ion-label position="floating">Email Address</ion-label>
                        <Field as="ion-input" name="email" />
                        <ErrorMessage as="ion-text" name="email" color="danger" />
                    </ion-item>

                  

                    <ion-item>
                    <ion-label position="floating">Type of Service you need:</ion-label>
                   <ion-select ok-text="Done" cancel-text="Cancel" @ionChange="bum($event)" v-model="service">
                            <ion-select-option value="Food">Food</ion-select-option>
                            <ion-select-option value="Same Day courier">Same Day Courier</ion-select-option>
                            <ion-select-option value="National Logistics">National Logistics</ion-select-option>
                            <ion-select-option value="Handyman">Handyman</ion-select-option>
                        </ion-select>
                        <ErrorMessage as="ion-text" name="service" color="danger" />
                    </ion-item>

                    <ion-item>
                     <ion-label position="floating" style="margin-bottom: 20px;">Government ID</ion-label>
                        <Field as="ion-input" name="image" type="file"/>
                        <ErrorMessage as="ion-text" name="image" color="danger" />
                    </ion-item>
                    <br>

                    <Field as="input" type="checkbox" name="tac" :value="true" />
                    <ion-text> I agree to the <a href="https://ayosolution.com/terms-and-condition/ayo-food">AYO Food Terms and Conditions</a></ion-text>

                    <p>
                        <ErrorMessage as="ion-text" name="tac" color="danger" />
                    </p>

                    <ion-button class="button" expand="full" type="submit">Register</ion-button>
                <!-- </form> -->
                </Form>
            </ion-card-content>
    </ion-content>

    <ion-loading
        :is-open="isOpenLoadingRef"
        message="Please wait..."
        :duration="timeout"
        @didDismiss="setOpenLoading(false)"
      >
      </ion-loading>

    <ion-alert
        :is-open="isOpenAlertRef"
        :header="alertTitle"
        :message="alertMessage"
        css-class="my-custom-class"
        @didDismiss="setOpenAlert(false)"
    >
    </ion-alert>
</template>


<style scoped>
ion-card-title {
    font-size: 16px;
    color: #feb041;
}
</style>
<script>
import {
    IonHeader, IonContent, IonToolbar, IonTitle,
    IonButtons, IonButton, IonCardHeader, IonCardTitle, IonCardContent,
    IonLabel, IonItem, IonText,

    IonLoading,
    IonAlert, IonSelect, IonSelectOption,

    modalController
} from '@ionic/vue';
import { arrowBackOutline } from 'ionicons/icons';
import { defineComponent, ref } from 'vue';

import { Form, Field, ErrorMessage } from "vee-validate";
import { object, string, boolean } from "yup";

import axios from "axios";

export default defineComponent({
    name: "PreRegistrationModal",
    props: {
        title: {
            type: String,
            default: "Pre Registration"
        },

        timeout: { type: Number, default: 0 }
    },

    components: {
        IonHeader, IonContent, IonToolbar, IonTitle,
        IonButtons, IonButton, IonCardHeader, IonCardTitle, IonCardContent,
        IonLabel, IonItem, IonText,

        IonLoading,
        IonAlert, IonSelect, IonSelectOption,

        Form, Field, ErrorMessage
    },

    setup() {
        const schema = object({
            name: string().required().min(3).max(50).label("Name"),
            address: string().required().min(10).max(100).label("Address"),
            // eslint-disable-next-line @typescript-eslint/camelcase
            mobile_number: string().required().matches(/^(09|\+639)\d{9}$/, "Mobile Number is invalid.").label("Mobile Number"),
            email: string().required().email().label("Email"),
            // eslint-disable-next-line @typescript-eslint/camelcase
            tac: boolean().required("Please accept our terms and conditions."),
            // service: string().oneOf(["food", "same day courier"]).required("Please select service.")
        });

        const isOpenLoadingRef = ref(false);
        const setOpenLoading = (state) => isOpenLoadingRef.value = state;

        const isOpenAlertRef = ref(false);
        const setOpenAlert = (state) => isOpenAlertRef.value = state;
        const alertTitle = "";
        const alertMessage = "";


        return {
            schema,
            isOpenLoadingRef, setOpenLoading,

            isOpenAlertRef, setOpenAlert, alertTitle, alertMessage, arrowBackOutline
        };
    },

    methods : {
        dismissModal() {
            modalController.dismiss();
        },

        bum(e) {
            this.service = e.target.value;
            console.log(e.target.value);
        },

        onSubmit(input) {
            console.log("submitted");
            console.log(JSON.stringify(input, null, 2));
            this.setOpenLoading(true);
            console.log(process.env.VUE_APP_ROOT_API);
            console.log(input.image);
            axios({
                method: "POST",
                url: `${process.env.VUE_APP_ROOT_API}/mobile-api/pre-registration`,
                data: {
                    name: input.name,
                    address: input.address,
                    // eslint-disable-next-line @typescript-eslint/camelcase
                    contact_number: input.mobile_number,
                    email: input.email,
                    service: this.service,
                    // eslint-disable-next-line @typescript-eslint/camelcase
                    terms_and_condition: true
                    
                }
            }).then(res => {
                console.log(res);
                this.setOpenLoading(false);

                this.alertTitle = "Success";
                this.alertMessage = "";
                this.setOpenAlert(true);

                setTimeout(modalController.dismiss, 1500);
            }).catch(err => {
                this.setOpenLoading(false);

                this.alertTitle = "Error";
                this.alertMessage = err.response.data.message;
                this.setOpenAlert(true);
            });
        }
    }
})
</script>
