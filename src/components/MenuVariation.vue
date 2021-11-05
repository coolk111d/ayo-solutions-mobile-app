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
        <div class="container">
            <ion-card v-for="vp in variationPivots" :key="vp.id">
                <h5 class="title">{{ vp.variation.name }}{{ vp.variation.is_addon ? " - Add Ons (Optional)" : "" }}</h5>
                <ion-list>
                    <ion-radio-group v-if="vp.variation.is_addon">
                        <ion-item v-for="option in vp.options" :key="option.id">
                            <ion-label v-text="option.name"></ion-label>
                            <h6 class="price">(+{{ option.price }})</h6>
                            <ion-checkbox slot="start" :value="option.id" :checked="menuVariationOptionIds.includes(option.id)"></ion-checkbox>
                        </ion-item>
                    </ion-radio-group>
                    <ion-radio-group :value="vp.options[0].id" v-else>
                        <ion-item v-for="(option, i) in vp.options" :key="option.id">
                            <ion-label v-text="option.name"></ion-label>
                            <h6 class="price">(+{{ option.price }}) {{ i }}</h6>
                            <ion-radio slot="start" :value="option.id" :checked="i == 0 || menuVariationOptionIds.includes(option.id)"></ion-radio>
                        </ion-item>
                    </ion-radio-group>
                </ion-list>
           </ion-card>

           <!-- <ion-card>
                <h5 class="title">Add Ons (Optional)</h5>
                <ion-list>
                    <ion-radio-group value="Extra Rice">

                    <ion-item>
                        <ion-label>Extra Rice</ion-label>
                        <h6 class="price">(+50)</h6>
                        <ion-checkbox slot="start" value="Extra Rice"></ion-checkbox>
                    </ion-item>

                    <ion-item>
                        <ion-label>Extra Mustard</ion-label>
                        <h6 class="price">(+10)</h6>
                        <ion-checkbox slot="start" value="Extra Mustard"></ion-checkbox>

                    </ion-item>

                    <ion-item>
                        <ion-label>Extra Mayonaisse</ion-label>
                        <h6 class="price">(+20)</h6>
                        <ion-checkbox slot="start" value="Extra Mayonaisse"></ion-checkbox>
                    </ion-item>
                    </ion-radio-group>
                </ion-list>
           </ion-card> -->
       </div>
    </ion-content>
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
  modalController,
  } from '@ionic/vue';
import { defineComponent} from "vue";

import { arrowBackOutline, closeCircleOutline } from 'ionicons/icons';

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
  },
    data() {
        return {
            variationPivots: [],
            menuVariationOptionIds: []
        }
    },

    setup() {
        const env = process.env.VUE_APP_ROOT_API;
        const router = useRouter();

        return { router, env, arrowBackOutline, closeCircleOutline }
    },

    mounted() {
        this.variationPivots = this.menuItem.variationPivots;
        console.log(this.cartItem);
        this.menuVariationOptionIds = this.cartItem.variations.map(v => v.menu_variation_option_id);
    },

    methods: {
        dismissModal() {
            modalController.dismiss();
        }
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
