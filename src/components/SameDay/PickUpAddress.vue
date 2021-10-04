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
                :disableUI="true"
            ></g-map>
            
            <Form @submit="onSubmit">
                <ion-item>
                    <ion-label position="stacked" style="font-weight: 600">Apt/Blk/Lot/Landmark  <ion-icon :icon="navigateCircleoutline" color="dark" class="edit"></ion-icon></ion-label>
                    <ion-input></ion-input>
                </ion-item>
                <ion-item>
                    <ion-label position="stacked" style="font-weight: 600">Phone Number  <ion-icon :icon="navigateCircleoutline" color="dark" class="edit"></ion-icon></ion-label>
                    <ion-input type="number" placeholder="09xx"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-label position="stacked" style="font-weight: 600">Name <ion-icon :icon="navigateCircleoutline" color="dark" class="edit"></ion-icon></ion-label>
                    <Field as="ion-input" name="name" placeholder="" />
                    <ErrorMessage as="ion-text" name="name" color="danger" />
                    <!-- <ion-input type="text" :value="address.first_name" placeholder=""></ion-input> -->
                </ion-item>
               
                
            </Form>
        </ion-content>
        <ion-footer>
            <ion-toolbar>
                <ion-button type="submit">Confirm</ion-button>
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
    IonInput,
    IonItem
 } from '@ionic/vue';
import GMap from '@/components/GMap.vue';
import { closeCircleOutline, navigateCircleoutline } from 'ionicons/icons';
import { useRouter } from 'vue-router';
import { defineComponent } from 'vue';

import { Storage } from '@ionic/storage';
import axios from "axios";
import { Form, Field, ErrorMessage } from "vee-validate";

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
        IonInput,
        IonItem,

        Form, Field, ErrorMessage
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

        return {
            closeCircleOutline, router, navigateCircleoutline,
            storage,
        }
    },

    methods : {
        async dismissModal() {
            modalController.dismiss();
        },

        onSubmit(input, actions) {
            console.log(input);
            console.log(actions);
            // this.storage.get("authUser").then(user => {
            //     axios({
            //         method: "POST",
            //         url: `${process.env.VUE_APP_ROOT_API}/mobile-api/billing`,
            //         headers: {
            //             Authorization: `Bearer ${user.token}`
            //         },
            //         data: {
            //             // eslint-disable-next-line @typescript-eslint/camelcase
            //             first_name: this.address.first_name,
            //             // eslint-disable-next-line @typescript-eslint/camelcase
            //             last_name: this.address.last_name,
            //             // eslint-disable-next-line @typescript-eslint/camelcase
            //             mobile_number: this.address.mobile_number,
            //             // eslint-disable-next-line @typescript-eslint/camelcase
            //             google_address: this.address.google_address,
            //         }
            //     }).then(res => {
            //         const data = res.data;

            //         if (data.success) {
            //             this.dismissModal();
            //         } else {
            //             console.log(data.message);
            //         }
            //     }).catch(err => {
            //         console.log(err.response.data.message);
            //     });
            // });
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
