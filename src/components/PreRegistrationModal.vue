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
                <!-- <form @submit.prevent="onSubmit"> -->
                <Form @submit="onSubmit" :validation-schema="schema">
                    <ion-item>
                        <ion-label position="floating">Name</ion-label>
                        <Field as="ion-input" name="name" :rules="name" />
                        <ErrorMessage as="ion-text" name="name" color="danger" />
                    </ion-item>

                    <ion-item>
                        <ion-label position="floating">Address</ion-label>
                        <Field as="ion-textarea" name="address" :rules="address" />
                        <ErrorMessage as="ion-text" name="address" color="danger" />
                    </ion-item>

                    <ion-item>
                        <ion-label position="floating">Mobile Number</ion-label>
                        <Field as="ion-input" name="mobile_number" :rules="mobile_number" />
                        <ErrorMessage as="ion-text" name="mobile_number" color="danger" />
                    </ion-item>

                    <ion-item>
                        <ion-label position="floating">Email Address</ion-label>
                        <Field as="ion-input" name="email" :rules="email" />
                        <ErrorMessage as="ion-text" name="email" color="danger" />
                    </ion-item>

                    <br>
                    <!-- may problema sa checkbox ng ionic sa validation kaya custom checkbox muna ginamit -->
                    <!-- <Field as="ion-checkbox" type="checkbox" name="tac" :rules="tac" :value="true" /> -->

                    <Field as="input" type="checkbox" name="tac" :rules="tac" :value="true" />
                    <ion-text> I agree to the <a href="https://ayosolution.com/terms-and-condition/ayo-food">AYO Food Terms and Conditions</a></ion-text>

                    <p>
                        <ErrorMessage as="ion-text" name="tac" color="danger" />
                    </p>

                    <ion-button expand="full" type="submit">Register</ion-button>
                <!-- </form> -->
                </Form>
            </ion-card-content>
        </ion-card>
    </ion-content>
</template>

<script>
import {
    IonHeader, IonContent, IonToolbar, IonTitle,
    IonButtons, IonButton,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    IonLabel, IonItem,

    modalController
} from '@ionic/vue';
import { defineComponent } from 'vue';

import { Form, Field, ErrorMessage } from "vee-validate";
import { object, string, boolean, ValidationError } from "yup";

export default defineComponent({
    name: "PreRegistrationModal",
    props: {
        title: {
            type: String,
            default: "Pre Registration"
        }
    },

    components: {
        IonHeader, IonContent, IonToolbar, IonTitle,
        IonButtons, IonButton,
        IonCard, IonCardHeader, IonCardTitle, IonCardContent,
        IonLabel, IonItem,

        Form, Field, ErrorMessage
    },

    setup() {
        let schema = object({
            name: string().required().min(2).max(50).label("Name"),
            address: string().required().min(2).max(100).label("Address"),
            // eslint-disable-next-line @typescript-eslint/camelcase
            mobile_number: string().required().matches(/^(09|\+639)\d{9}$/, "Mobile Number is invalid.").label("Mobile Number"),
            email: string().required().email().label("Email"),
            // eslint-disable-next-line @typescript-eslint/camelcase
            tac: boolean()
            //         .required("The terms and conditions must be accepted.")
            //         .oneOf([true], "You must agree on our terms and conditions."),
        });

        schema = schema.test(
            'tac',
            null,
            (obj) => {
                console.log(obj);
                if (obj.tac) {
                    return true;
                }

                return new ValidationError("Accept our terms and conditions.", null, "tac");
            }
        );

        return { schema };
    },

    methods : {
        dismissModal() {
            modalController.dismiss();
        },

        onSubmit(values) {
            console.log("submitted");
            console.log(JSON.stringify(values, null, 2));
        }
    }
})
</script>
