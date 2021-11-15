<template>
    <ion-header>
        <ion-toolbar>
             <ion-buttons slot="end">
                <ion-button @click="dismissModal"><ion-icon :icon="closeCircleOutline" /></ion-button>
            </ion-buttons>
            <ion-title>{{ title }}</ion-title>
        </ion-toolbar>
    </ion-header>

    <ion-content>
        <ion-row>
            <ion-col>
                 <ion-card v-for="vp in variationPivots" :key="vp.id">
                     <h5 class="title">{{ vp.variation.name }}{{ vp.variation.is_addon ? " - Add Ons (Optional)" : "" }}</h5>
                     <ion-list>
                        <div v-if="vp.variation.is_addon">
                            <ion-item v-for="option in vp.options" :key="option.id">
                                <ion-label v-text="option.name"></ion-label>
                                <h6 class="price">(+{{ option.price }})</h6>
                                <ion-checkbox slot="start" :value="option.id" @ionChange="onAddAddons($event)" :checked="menuVariationOptionIds.includes(option.id)"></ion-checkbox>
                            </ion-item>
                        </div>
                         <ion-radio-group v-else :value="vp.options[0].id" @ionChange="onVariationChange($event)">
                             <ion-item v-for="(option, i) in vp.options" :key="option.id">
                                 <ion-label v-text="option.name"></ion-label>
                                 <h6 class="price">(+{{ option.price }})</h6>

                                 <ion-radio slot="start" :value="option.id" :checked="i == 0 || menuVariationOptionIds.includes(option.id)"></ion-radio>
                             </ion-item>
                         </ion-radio-group>
                     </ion-list>
                </ion-card>
            </ion-col>
        </ion-row>

    </ion-content>
    <ion-footer>
        <ion-toolbar>
        <ion-button color="success" @click="dismissModal()" style="width: 100%; color: #fff;">Add More Items</ion-button>

        <!-- nag ko-cause ng stopper -->
        <!-- <ion-button color="primary" @click="checkout()" style="width: 100%; color: #fff;">Go to Cart</ion-button> -->
        </ion-toolbar>
    </ion-footer>
            <!--<div style="margin: -5px auto 10px; text-align:center">
            <ion-button @click="nextLoad()" fill="outline" size="small">Load More</ion-button>
            </div>-->
</template>

<script lang="ts">
import { useRouter } from 'vue-router';
import {
  IonCard,
  IonItem,
  IonLabel,
  IonList,
  IonRadio,
  IonCheckbox,
  IonRadioGroup,

  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonIcon,

  modalController,
  toastController,
  loadingController
  } from '@ionic/vue';
import { defineComponent } from "vue";

import { arrowBackOutline, closeCircleOutline } from 'ionicons/icons';

import axios from "axios";
import { Storage } from "@ionic/storage";

export default defineComponent({
    name: 'Menu Variation',

    props: {
        title: {
            type: String,
            default: "Variations"
        },

        cartItem: {
            type: Object,
            // eslint-disable-next-line vue/require-valid-default-prop
            default: {}
        },

        menuItem: {
            type: Object,
            // eslint-disable-next-line vue/require-valid-default-prop
            default: {}
        }
    },

  components: {
    IonCard,
    IonItem,
    IonLabel,
    IonList,
    IonRadio,
    IonCheckbox,
    IonRadioGroup,

    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
    IonIcon,
  },
    data() {
        return {
            variationPivots: [],

            variationId: null, // variation id
            menuVariationOptionIds: [] // addons IDS
        }
    },

    setup() {
        const env = process.env.VUE_APP_ROOT_API;
        const router = useRouter();

        const storage = new Storage();
        storage.create();

        return {
            router, env, arrowBackOutline, closeCircleOutline,
            storage
        }
    },

    mounted() {
        this.variationPivots = this.menuItem.variationPivots;
        this.menuVariationOptionIds = this.cartItem.variations.map(v => v.menu_variation_option_id);
    },

    methods: {
        dismissModal() {
            this.openLoading(true);
            location.reload(); // reload the page to display the data automatic. (no solution yet)
            // modalController.dismiss();
        },
        checkout() {
            modalController.dismiss();
            this.router.push('/cart');
        },
        onVariationChange(e) {
            this.variationId = +e.target.value;
            this.onUpdateVariationAddons();
        },

        onAddAddons(e) {
            const addonId = +e.target.value;

            if (this.menuVariationOptionIds.includes(addonId)) {
                const indexLocation = this.menuVariationOptionIds.indexOf(addonId);
                this.menuVariationOptionIds.splice(indexLocation, 1);
            } else {
                this.menuVariationOptionIds.push(addonId);
            }

            this.onUpdateVariationAddons();
        },

        async onUpdateVariationAddons() {
            this.openLoading(true);

            const menuVariationOptionIds = [... new Set(this.menuVariationOptionIds)];

            if (!["", null, undefined].includes(this.variationId)) {
                if (!menuVariationOptionIds.includes(+this.variationId)) {
                    menuVariationOptionIds.push(this.variationId);
                }
            }

            console.log(menuVariationOptionIds);

            const authUser = await this.storage.get("authUser");

            axios({
                method: "PUT",
                url: `${process.env.VUE_APP_ROOT_API}/mobile-api/carts/items/${this.cartItem.id}/update-variation`,
                headers: {
                    Authorization: `Bearer ${authUser.cart_token}`
                },
                data: { menuVariationOptionIds }
            }).then(res => {
                this.openLoading(false);

                const data = res.data;
                this.openToast(data.message);
                // }
            }).catch(err => {
                this.openLoading(false);

                console.log(err);
            });
        },

        async openLoading(isOpen) {
            if (isOpen) {
                const loading = await loadingController
                    .create({
                      cssClass: 'my-custom-class',
                      message: 'Please wait...',
                      duration: 0,
                    });

                return loading.present();
            } else {
                setTimeout(loadingController.dismiss, 100);
            }
        },

        async openToast(message, durationSeconds=2) {
            const duration = durationSeconds * 1000;
            const toast = await toastController.create({message, duration});

            return toast.present();
        },
    }
})
</script>

<style scoped>
* {
  font-family: "Poppins", sans-serif;
}
.container {
margin: 0px 0 70px;
}
.container ion-card {
    padding: 20px 10px;
}
ion-radio {
    --color-checked: #feb041;
}
ion-label {
    font-size: 14px !important;
}
.title {
    font-size: 16px;
    font-weight: 600;
}
.price {
    padding-bottom: 10px;
    font-size: 14px;
}
</style>
