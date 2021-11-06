<template>
    <ion-header>
        <ion-toolbar>
            <ion-buttons slot="end">
                <ion-button @click="dismissModal"><ion-icon :icon="closeCircleOutline" /></ion-button>
            </ion-buttons>
            <ion-title v-text="title"></ion-title>
        </ion-toolbar>
    </ion-header>
    <ion-content>
        <g-map
            mapType="roadmap"
            :center="{lat: 14.124561213272877, lng: 121.164106030269481}"
            :zoom="10"
            :merchantlatlng="merchantlatlng"
            :disableUI="true"
            v-on:clicked="onClickChild"
        ></g-map>
        <small style="font-size: 14px;">Distance from Merchant: {{distance}}</small>
        <Form @submit="onSubmit" :initial-values="initialValues" id="addresssForm">
            <ion-item>
                <ion-label position="stacked" style="font-weight: 600">First Name <ion-icon :icon="navigateCircleoutline" color="dark" class="edit"></ion-icon></ion-label>
                <Field as="ion-input" name="firstName" placeholder="" />
                <ErrorMessage as="ion-text" name="firstName" color="danger" />
                <!-- <ion-input type="text" :value="address.first_name" placeholder=""></ion-input> -->
            </ion-item>
            <ion-item>
                <ion-label position="stacked" style="font-weight: 600">Last Name <ion-icon :icon="navigateCircleoutline" color="dark" class="edit"></ion-icon></ion-label>
                <Field as="ion-input" name="lastName" placeholder="" />
                <ErrorMessage as="ion-text" name="lastName" color="danger" />
                <!-- <ion-input type="text" :value="address.last_name" placeholder=""></ion-input> -->
            </ion-item>
            <ion-item>
                <ion-label position="stacked" style="font-weight: 600">Apt/Blk/Lot/Landmark  <ion-icon :icon="navigateCircleoutline" color="dark" class="edit"></ion-icon></ion-label>
                <Field as="ion-input" name="googleAddress" placeholder="" v-model="destination"/>
                <ErrorMessage as="ion-text" name="googleAddress" color="danger" />
                <!-- <ion-input :value="address.google_address"></ion-input> -->
            </ion-item>
            <ion-item>
                <ion-label position="stacked" style="font-weight: 600">Phone Number  <ion-icon :icon="navigateCircleoutline" color="dark" class="edit"></ion-icon></ion-label>
                <!-- <ion-input type="number" :value="address.mobile_number" placeholder="09xx"></ion-input> -->
                <Field as="ion-input" name="mobileNumber" placeholder="" />
                <ErrorMessage as="ion-text" name="mobileNumber" color="danger" />
            </ion-item>

            <ion-button type="submit" expand="full" style="color: FFF">Add Address</ion-button>
        </Form>
    </ion-content>

    <ion-loading
        :is-open="isOpenLoadingRef"
        message="Please wait..."
        :duration="0"
        @didDismiss="setOpenLoading(false)"
    >
    </ion-loading>

    <ion-toast
        :is-open="isOpenToastRef"
        :message="toastMessage"
        :duration="3000"
        @didDismiss="setOpenToast(false)"
    >
    </ion-toast>
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
    IonInput,
    IonItem,

    IonLoading, IonToast
 } from '@ionic/vue';
import GMap from '@/components/GMap.vue';
import { closeCircleOutline, navigateCircleoutline } from 'ionicons/icons';
import { useRouter } from 'vue-router';
import { defineComponent, ref } from 'vue';

import { Storage } from '@ionic/storage';
import axios from "axios";
import { Form, Field } from "vee-validate";

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
        // IonInput,
        IonItem,

        Form, Field,

        IonLoading, IonToast
    },
    data() {
        return {
            distance: '',
            destination: '',
            geoaddress: ''
        }
    },

    props: {
        title: {
            type: String,
            default: "Address"
        },
        address: {
            type: Object,
            default: null
        }
    },

    setup() {
        const router = useRouter();

        const storage = new Storage();
        storage.create();

        const initialValues = {}

        const isOpenLoadingRef = ref(false);
        const setOpenLoading = (state) => isOpenLoadingRef.value = state;
        const merchantlatlng = ref(null);
        const isOpenToastRef = ref(false);
        const setOpenToast = (state) => isOpenToastRef.value = state;

        const merch = storage.get("authUser").then(d => {
                axios({
                    method: 'GET',
                     url: `${process.env.VUE_APP_ROOT_API}/mobile-api/merchantbycarttoken/${d.cart_token}`,
                     headers: {
                        Authorization: `Bearer ${d.token}`
                    }
                }).then(res => {
                    console.log(res);
                   merchantlatlng.value = {lat: res.data.latitude, lng: res.data.longitude};  
                   console.log(merchantlatlng.value);
                });
            });

        return {
            closeCircleOutline, router, navigateCircleoutline,
            storage,
            initialValues,
            merchantlatlng,
            isOpenLoadingRef, setOpenLoading,
            isOpenToastRef, setOpenToast
        }
    },

    beforeMount() {
        this.initialValues = {
            firstName: this.address.first_name,
            lastName: this.address.last_name,
            googleAddress: this.address.google_address,
            mobileNumber: this.address.mobile_number,
            lat: this.address.lat,
            lng: this.address.lng
        }
    },

    methods : {
        onClickChild(value) {
            this.initialValues.lat = value[0].lat;
            this.initialValues.lng = value[0].lng;
            if(value[1] === null) {
                this.distance = 'Please pin again your location';
            } else {
            this.distance = value[1].rows[0].elements[0].distance.text;
            }
            this.destination = value[1].destinationAddresses[0];
            console.log(value[1].destinationAddresses[0]);
        },
        async dismissModal() {
            modalController.dismiss();
        },
        onSubmit(input) {
            this.setOpenLoading(true);

            this.storage.get("authUser").then(d => {
                axios({
                    method: "POST",
                    url: `${process.env.VUE_APP_ROOT_API}/mobile-api/billing`,
                    headers: {
                        Authorization: `Bearer ${d.token}`
                    },
                    data: {
                        // eslint-disable-next-line @typescript-eslint/camelcase
                        first_name: input.firstName,
                        // eslint-disable-next-line @typescript-eslint/camelcase
                        last_name: input.lastName,
                        // eslint-disable-next-line @typescript-eslint/camelcase
                        mobile_number: input.mobileNumber,
                        // eslint-disable-next-line @typescript-eslint/camelcase
                        google_address: input.googleAddress,

                        lat: this.initialValues.lat,

                        lng: this.initialValues.lng
                    }
                }).then(res => {
                    this.setOpenLoading(false);

                    const data = res.data;

                    if (data.success) {
                        location.reload();
                        // this.router.push('/checkout');
                        // this.dismissModal();
                    } else {
                        console.log(data.message);
                    }

                    this.toastMessage = data.message;
                    this.setOpenToast(true);
                }).catch(err => {
                    this.setOpenLoading(false);

                    console.log(err.response.data.message);
                });
            });
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
