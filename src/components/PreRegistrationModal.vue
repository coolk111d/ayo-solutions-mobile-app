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
            <Form @submit="onSubmit" :validation-schema="schema" :initial-values="formValues">
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
                    <Field as="ion-input" name="contact_number" />
                    <ErrorMessage as="ion-text" name="contact_number" color="danger" />
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
                    <Field as="ion-input" name="government_id" type="file" accept="image/*" />
                    <ErrorMessage as="ion-text" name="government_id" color="danger" />
                </ion-item>
                <br>

                <Field as="input" type="checkbox" name="terms_and_condition" :value="true" />
                <ion-text> I agree to the <a href="https://ayosolution.com/terms-and-condition/ayo-food">AYO Food Terms and Conditions</a></ion-text>

                <p>
                    <ErrorMessage as="ion-text" name="terms_and_condition" color="danger" />
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
import { object, string, boolean, mixed } from "yup";

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

        IonSelect, IonSelectOption,

        IonLoading,
        IonAlert,

        Form, Field, ErrorMessage
    },

    setup() {
        const schema = object({
            name: string().required().min(3).max(50).label("Name"),
            address: string().required().min(10).max(100).label("Address"),
            // eslint-disable-next-line @typescript-eslint/camelcase
            contact_number: string().required().matches(/^(09|\+639)\d{9}$/, "Mobile Number is invalid.").label("Mobile Number"),
            email: string().required().email().label("Email"),
            // eslint-disable-next-line @typescript-eslint/camelcase
            government_id: mixed().required()
            // .test("fileSize", "The file is too large.", value => {
            //     if (!value.length) return false; // attachment is optional
            //     return value[0].size <= 2048;
            // })
            .label("Government ID")
            ,
            // eslint-disable-next-line @typescript-eslint/camelcase
            terms_and_condition: boolean().required("Please accept our terms and conditions."),
            // service: string().oneOf(["food", "same day courier"]).required("Please select service.")
        });

        // Initial values
        const formValues = {
            // name: "Rodrigo",
            // address: "Kanluran laang",
            // // eslint-disable-next-line @typescript-eslint/camelcase
            // contact_number: "09052990579",
            // email: "rodrigogalura3rd@gmail.com"
            name: "",
            address: "",
            // eslint-disable-next-line @typescript-eslint/camelcase
            contact_number: "",
            email: ""
        };

        const isOpenLoadingRef = ref(false);
        const setOpenLoading = (state) => isOpenLoadingRef.value = state;

        const isOpenAlertRef = ref(false);
        const setOpenAlert = (state) => isOpenAlertRef.value = state;
        const alertTitle = "";
        const alertMessage = "";


        return {
            schema,

            formValues,

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

        onSubmit(inputs) {
            this.setOpenLoading(true);

            const formData = new FormData();
            formData.append('government_id', new Blob([inputs.government_id[0]]));
            delete inputs.government_id;

            for (const field in inputs) {
                console.log(field, inputs[field]);
                formData.append(field, inputs[field]);
            }
            formData.append('service', this.service);

            axios({
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                url: `${process.env.VUE_APP_ROOT_API}/mobile-api/pre-registration`,
                data: formData
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
