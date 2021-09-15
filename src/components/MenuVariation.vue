<template>
        <div class="container">
            <ion-card>
                <h5  class="title">Drinks (Select 1)</h5>
                <ion-list>
                    <ion-radio-group value="Regular">

                    <ion-item>
                        <ion-label>Regular</ion-label>
                        <h6 class="price">(+0)</h6>
                        <ion-radio slot="start" value="Regular"></ion-radio>
                    </ion-item>

                    <ion-item>
                        <ion-label>Medium</ion-label>
                        <h6 class="price">(+10)</h6>
                        <ion-radio slot="start" value="Medium"></ion-radio>
                        
                    </ion-item>

                    <ion-item>
                        <ion-label>Large</ion-label>
                        <h6 class="price">(+20)</h6>
                        <ion-radio slot="start" value="Large"></ion-radio>
                    </ion-item>
                    </ion-radio-group>
                </ion-list>
           </ion-card>
           
           <ion-card>
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
           </ion-card>

           </div>
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
  IonRadioGroup 
  } from '@ionic/vue';
import { defineComponent} from "vue";

import { arrowBackOutline } from 'ionicons/icons';

export default defineComponent({
  name: 'Menu Variation',
  components: { 
    IonCard, 
    IonItem, 
    IonLabel, 
    IonList, 
    IonRadio,
    IonCheckbox, 
    IonRadioGroup  
  },
  setup() {
    const env = process.env.VUE_APP_ROOT_API;
    
    const router = useRouter();

    return { router, env, arrowBackOutline }
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
