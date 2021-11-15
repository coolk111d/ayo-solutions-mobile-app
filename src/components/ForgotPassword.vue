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
            <ion-card-title>Please enter your email for reseting your password:</ion-card-title>
        </ion-card-header>

        <ion-card-content>
            <!-- <form @submit.prevent="onSubmit"> -->
            <Form @submit="onSubmit" :validation-schema="schema" :initial-values="formValues">
                

                <ion-item>
                    <ion-label position="floating">Email Address</ion-label>
                    <Field as="ion-input" name="email" />
                    <ErrorMessage as="ion-text" name="email" color="danger" />
                </ion-item>

                <br>

               
                <ion-button class="button" expand="full" type="submit">Reset Password</ion-button>
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
    IonLabel, IonItem,

    IonLoading,
    IonAlert,

    modalController
} from '@ionic/vue';
import { arrowBackOutline } from 'ionicons/icons';
import { defineComponent, ref } from 'vue';

import { Form, Field, ErrorMessage } from "vee-validate";
import { object, string, boolean, mixed } from "yup";

import axios from "axios";

export default defineComponent({
    name: "ForgotPasswordModal",
    props: {
        title: {
            type: String,
            default: "Reset Password"
        },

        timeout: { type: Number, default: 0 }
    },

    components: {
        IonHeader, IonContent, IonToolbar, IonTitle,
        IonButtons, IonButton, IonCardHeader, IonCardTitle, IonCardContent,
        IonLabel, IonItem,

        IonLoading,
        IonAlert,

        Form, Field, ErrorMessage
    },

    setup() {
        const schema = object({
            // eslint-disable-next-line @typescript-eslint/camelcase
            first_name: string().required().min(3).max(50).label("First Name"),
            // eslint-disable-next-line @typescript-eslint/camelcase
            last_name: string().required().min(3).max(50).label("Last Name"),
            // eslint-disable-next-line @typescript-eslint/camelcase
            mobile_number: string().required().matches(/^(09|\+639)\d{9}$/, "Mobile Number is invalid.").label("Mobile Number"),
            email: string().required().email().label("Email"),

            password: string().required().min(8).max(20).label("Password"),
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
        });

        // Initial values
        const formValues = {
            // name: "Rodrigo",
            // address: "Kanluran laang",
            // // eslint-disable-next-line @typescript-eslint/camelcase
            // mobile_number: "09052990579",
            // email: "rodrigogalura3rd@gmail.com"
            // eslint-disable-next-line @typescript-eslint/camelcase
            first_name: "",
            // eslint-disable-next-line @typescript-eslint/camelcase
            last_name: "",
            // eslint-disable-next-line @typescript-eslint/camelcase
            mobile_number: "",
            email: "",
            password: ""
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

        onSubmit(inputs) {
            this.setOpenLoading(true);

            const formData = new FormData();
            formData.append('government_id', new Blob([inputs.government_id[0]]));
            delete inputs.government_id;

            for (const field in inputs) {
                console.log(field, inputs[field]);
                formData.append(field, inputs[field]);
            }

            axios({
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                url: `${process.env.VUE_APP_ROOT_API}/mobile-api/registration`,
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
