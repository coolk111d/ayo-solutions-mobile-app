<template>
    <ion-page>
        <CustomHeader link="/select-vehicle" />

        <ion-content :fullscreen="true">
            <div class="header-container">
                <h5 style="text-align:center">Same Day Checkout</h5>
            </div>

            <!--Pickup-->
            <ion-card>
                <div class="title-icon">
                    <ion-icon :icon="mapOutline" class="map"></ion-icon>
                    <p class="title">Pick Up Address</p>
                    <ion-icon :icon="pencilOutline" color="warning" class="edit"  @click="onChangePickup"></ion-icon>
                </div>


                <div v-show="shipping.google_address">
                    <p class="address" @click="onChangePickup">{{ shipping.google_address }}</p>
                    <hr style="margin-bottom: 30px;">
                </div>
                <div v-show="shipping.first_name">
                    <p class="title">Details:</p>
                    <p class="address" @click="onChangePickup">
                        <ion-icon :icon="person" color="dark" style="color: #000; font-size: 18px; margin-right: 20px;"></ion-icon> {{ shipping.first_name }} {{ shipping.last_name }}
                    </p>
                </div>
                <div v-show="shipping.mobile_number">
                    <p class="address" @click="onChangePickup">
                        <ion-icon :icon="call" color="dark" style="color: #000; font-size: 18px; margin-right: 20px;"></ion-icon> {{ shipping.mobile_number }}
                    </p>
                </div>
            </ion-card>

            <!--Destination-->
             <ion-card>
                <div class="title-icon">
                    <ion-icon :icon="mapOutline" class="map"></ion-icon>
                    <p class="title">Destination Address</p>
                    <ion-icon :icon="pencilOutline" color="warning" class="edit"  @click="onChangeDestination"></ion-icon>
                </div>


                <div v-show="shipping.google_address">
                    <p class="address" @click="onChangeDestination">{{ shipping.google_address }}</p>
                    <hr style="margin-bottom: 30px;">
                </div>
                <div v-show="shipping.first_name">
                    <p class="title">Details:</p>
                    <p class="address" @click="onChangeDestination">
                        <ion-icon :icon="person" color="dark" style="color: #000; font-size: 18px; margin-right: 20px;"></ion-icon> {{ shipping.first_name }} {{ shipping.last_name }}
                    </p>
                </div>
                <div v-show="shipping.mobile_number">
                    <p class="address" @click="onChangeDestination">
                        <ion-icon :icon="call" color="dark" style="color: #000; font-size: 18px; margin-right: 20px;"></ion-icon> {{ shipping.mobile_number }}
                    </p>
                </div>
            </ion-card>


           <Form @submit="onSubmit" :validation-schema="schema" :initial-values="formValues">
               <!--Payment Method-->
               <ion-card>
                    <div class="title-icon">
                        <ion-icon :icon="walletOutline" class="map"></ion-icon>
                        <p class="title">Payment Method</p>
                    </div>
                    <ion-radio-group>
                        <ion-item>
                            <ion-radio name="payment_method" value="cod"></ion-radio>
                            <ion-label style="margin-left: 10px">Cash to Cash on Delivery</ion-label>
                        </ion-item>

                        <ion-item>
                            <ion-radio name="payment_method" value="GCash" disabled></ion-radio>
                            <ion-label style="margin-left: 10px">GCash upon Rider Delivery</ion-label>
                        </ion-item>

                        <ion-item>
                            <ion-radio name="payment_method" value="Paymaya" disabled></ion-radio>
                            <ion-label style="margin-left: 10px">Paymaya upon Rider Delivery</ion-label>
                        </ion-item>

                        <ion-item>
                            <ion-radio name="payment_method" value="Debit/Credit" disabled></ion-radio>
                            <ion-label style="margin-left: 10px">Debit/Credit</ion-label>
                        </ion-item>
                    </ion-radio-group>
               </ion-card>
                <!--Proof of Identity-->
               <ion-card>
                    <div class="title-icon">
                        <ion-icon :icon="personOutline" class="map"></ion-icon>
                        <p class="title">Proof of Identity</p>
                    </div>
                    <ion-item>
                      
                        <ion-label position="stacked" style="margin-bottom: 20px;">Government ID</ion-label>
                        <Field as="ion-input" name="gov_id" type="file" accept="image/*" />
                        <ErrorMessage as="ion-text" name="gov_id" color="danger" />
                    </ion-item>
                    <ion-item>
                     
                        <ion-label position="stacked" style="margin-bottom: 20px;">Selfie</ion-label>
                        <Field as="ion-input" name="selfie" type="file" accept="image/*" />
                        <ErrorMessage as="ion-text" name="selfie" color="danger" />
                    </ion-item>

                    <ion-item>
                        <ion-label position="floating" style="font-weight: 600">Delivery Instruction  <ion-icon :icon="bicycleOutline" color="dark" class="edit"  @click="addAddress"></ion-icon></ion-label>
                        <Field as="ion-textarea" name="special_instruction" />
                        <ErrorMessage as="ion-text" name="special_instruction" color="danger" />
                    </ion-item>
                </ion-card>

               <ion-card>
                    <div class="title-icon">
                        <ion-icon :icon="receiptOutline" class="map"></ion-icon>
                        <p class="title" style="text-align:left; margin-right: 150px;">Summary</p>
                    </div>
                    <div class="summary-details">
                        <div class="display-flex" v-for="item in items" :key="item.id">
                            <p>{{ item.quantity }}x {{ item.name }}</p>
                            <p>&#8369; {{ item.price }}</p>
                        </div>
                        <hr style="margin: 0px 0 10px">
                        <div class="display-flex">
                            <p>Distance</p>
                            <p>12.55 km</p>
                        </div>
                        <div class="display-flex">
                            <p style="font-size: 16px;">Total(w/ Tax)</p>
                            <p style="font-size: 16px;">&#8369; 324.62</p>
                        </div>
                    </div>
               </ion-card>

                <ion-card>
                    <p>Please Note:</p>
                    <small>
                        AYO Solution Sellers are NOT allowed to ask you to order and transact your payments outside the platform.
                        When using our COD service, payment is given to our official delivery partner upon receipt on item.
                    </small>
                </ion-card>

                <ion-button class="button" expand="full" type="submit" @click="() => router.push('/sameday-order-details')">BOOK TRANSACTION</ion-button>

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
    </ion-page>
</template>

<script lang="ts">
import {
    IonPage, IonContent, IonCard, modalController, IonLabel, IonItem, IonRadioGroup, IonRadio,
    IonLoading, IonToast
} from '@ionic/vue';
import { arrowBackOutline, mapOutline, pencilOutline, receiptOutline, walletOutline, bicycleOutline, person, call, personOutline } from 'ionicons/icons';
import { useRouter } from 'vue-router';
import { defineComponent, ref } from 'vue';
import CustomHeader from '@/components/CustomHeader.vue';
import PickUpAddress from '@/components/SameDay/PickUpAddress.vue';
import DestinationAddress from '@/components/SameDay/DestinationAddress.vue';
// import OrderList from '@/components/OrderList.vue';

import { Storage } from "@ionic/storage";
import { Form, Field, ErrorMessage } from "vee-validate";
import { object, string, mixed } from "yup";
import axios from "axios";

export default defineComponent({
    name: 'Same Day Checkout',
    components: { IonContent, IonPage, IonCard, CustomHeader, IonLabel, IonItem,
    IonRadioGroup, IonRadio,

    Form, Field, ErrorMessage,

    IonLoading, IonToast
    },

    data() {
        return {
            billing: {},
            shipping: {},
            cart: {},
            items: {},
            toastMessage: ""
        }
    },

    setup() {
        const storage = new Storage();
        storage.create();

        const router = useRouter();

        const schema = object({
            // eslint-disable-next-line @typescript-eslint/camelcase
            gov_id: mixed().label("Government ID"),
            selfie: mixed().label("Selfie Picture"),
            // eslint-disable-next-line @typescript-eslint/camelcase
            special_instruction: string().min(3).max(50).label("Special Instruction"),
        });

        const formValues = {
            // eslint-disable-next-line @typescript-eslint/camelcase
            special_instruction: "",
        };

        const isOpenLoadingRef = ref(false);
        const setOpenLoading = (state) => isOpenLoadingRef.value = state;

        const isOpenToastRef = ref(false);
        const setOpenToast = (state) => isOpenToastRef.value = state;

        return {
            router, arrowBackOutline, mapOutline, pencilOutline, receiptOutline, walletOutline, bicycleOutline, person, call, personOutline,
            storage,

            schema,

            formValues,

            isOpenLoadingRef, setOpenLoading,
            isOpenToastRef, setOpenToast
        }
    },

    mounted() {
        this.storage.get("authUser").then(user => {
            axios({
                method: "GET",
                url: `${process.env.VUE_APP_ROOT_API}/mobile-api/customers/billing-shipping`,
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }).then(res => {
                const data = res.data;

                if (data.success) {
                    this.billing = data.data.billing;
                    this.shipping = data.data.shipping;

                    console.log(this.billing);
                    console.log(this.shipping);
                } else {
                    console.log(data.message);
                }
            }).catch(err => {
                console.log(err.response.data.message);
            });

            axios({
                method: "GET",
                url: `${process.env.VUE_APP_ROOT_API}/mobile-api/carts/items`,
                headers: {
                    Authorization: `Bearer ${user.cart_token}`
                }
            }).then(res => {
                const data = res.data;

                if (data.success) {
                    this.cart = data.cart;
                    this.items = data.items;

                    console.log(this.cart);
                    console.log(this.items);
                } else {
                    console.log(data.message);
                }
            }).catch(err => {
                console.log(err.response.data.message);
            });
        });
    },

    methods: {
        

        async onChangePickup() {
            const modal = await modalController
            .create({
                component: PickUpAddress,
                componentProps: {
                    title: "Pick Up Address",
                    address: this.shipping
                },
            });

            return modal.present();
        },

        async onChangeDestination() {
            const modal = await modalController
            .create({
                component: DestinationAddress,
                componentProps: {
                    title: "Destination Address",
                    address: this.shipping
                },
            });

            return modal.present();
        },

        // onSubmit(input) {
        //     this.setOpenLoading(true);

        //     this.storage.get("authUser").then(d => {
        //         const formData = new FormData();
        //         formData.append('gov_id', new Blob([input.gov_id[0]]));
        //         delete input.gov_id;

        //         formData.append('selfie', new Blob([input.selfie[0]]));
        //         delete input.selfie;

        //         formData.append("payment_method", "cod");
        //         formData.append("special_instruction", input.special_instruction);

        //         // for (const field in input) {
        //         //     console.log(field, input[field]);
        //         //     formData.append(field, input[field]);
        //         // }

        //         axios({
        //             method: "POST",
        //             url: `${process.env.VUE_APP_ROOT_API}/mobile-api/orders`,
        //             data: formData,
        //             headers: {
        //                 Authorization: `Bearer ${d.token}`
        //             }
        //         }).then(res => {
        //             this.setOpenLoading(false);

        //             const data = res.data;

        //             if (data.success) {
        //                 const order = data.data;
        //                 this.router.push(`/order-details/${order.id}`);
        //             } else {
        //                 console.log(data.message);
        //             }

        //             this.toastMessage = data.message;
        //             this.setOpenToast(true);
        //         }).catch(err => {
        //             this.setOpenLoading(false);

        //             console.log(err.response.data.message);
        //         });

        //         // axios({
        //         //     method: "POST",
        //         //     url: `https://onesignal.com/api/v1/notifications`,
        //         //     data: {
        //         //     "app_id": "643e1055-dcf7-4525-880a-89e3ba955d68",
        //         //     "include_external_user_ids": ["rider90"],
        //         //     "channel_for_external_user_ids": "push",
        //         //     "data": {"name": "Ayo Food", "subtitle": "You have a new"},
        //         //     "contents": {"en": "English Message", "name": "Ayo Food"},
        //         //     "name": {"en": "AYO FOOD"},
        //         //     "subtitle": {"en": "You have a new order!"}
        //         //     },
        //         //     headers: {
        //         //         Authorization: `Bearer ${d.token}`
        //         //     }
        //         // });
        //     });
        // }
    }
})
</script>

<style scoped>
ion-content {
    --background: #eceff1;;
}
.header-container {
    margin-top: -60px;
    padding-top: 70px;
    min-height: 150px;
    background: #feb041;
    border-radius: 10px;
    margin-bottom: 15px;
    box-shadow: 1px 1px 6px rgba(0,0,0,0.2);
}
.header-container h5 {
    font-size: 24px;
    color: #fff;
}
p {
    font-weight: 600;
     color: black;
}
p.address {
    color: black;
    text-align:Center;
    font-size: 12px;
    border: 1px solid rgba(0,0,0,0.06);
    padding: 10px;
    background: rgba(0,0,0,0.02);
    box-shadow: 1px 1px 1px rgba(0,0,0,0.1);
    border-radius: 5px;
}
hr {
    border-bottom: 1px solid rgba(0,0,0,0.1);
    margin: 30px 0 0;
}

ion-card {
    padding: 10px 20px;
    border-radius: 5px;
    margin: 5px 10px 20px;
    box-shadow: 1px 1px 5px rgba(0,0,0,0.2)
}
.title-icon {
    display:flex;
    align-items:center;
    justify-content:space-around
}
p.title {
    margin: 10px 100px 10px 0px;
    font-size: 16px;
    color: black;
}
ion-icon.map {
    font-size: 18px;
    --color: black;
}
ion-icon.edit {
    color: #feb041;
    font-size: 20px;
}
ion-label {
    font-size: 16px !important;
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
ion-radio-group  ion-label {
    font-size: 16px !important;
}
.display-flex {
    display:flex;
    justify-content:space-between
}
.summary-details {
    padding: 10px 20px
}
.summary-details p {
    font-size: 12px;
}
</style>
