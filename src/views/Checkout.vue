<template>
    <ion-page>
        <Header/>
        
        <ion-content :fullscreen="true">
            <h5 style="text-align:center">Checkout</h5>

            <ion-card>
                <h4 style="text-align:center">Under Development</h4>
            </ion-card>


        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { IonPage,  IonContent, IonCard, } from '@ionic/vue';
import { arrowBackOutline } from 'ionicons/icons';
import { useRouter } from 'vue-router';
import { defineComponent } from 'vue';
import Header from '@/components/Header.vue';
export default defineComponent({
    name: 'Checkout',
   
    components: {IonContent, IonPage, IonCard, Header},
    
 
    setup() {

    const router = useRouter();
    return { router, arrowBackOutline}
  }
})
</script>

<style scoped>

ion-content {
    --background: #eceff1;
}
.container {
     background: url('/assets/images/bg-img/24.jpg') rgba(0,0,0,0.3);
     background-blend-mode:darken; 
     min-height: 200px; 
     background-size:cover; 
     background-position: center;
     border-radius: 0 0 15% 15%; 
     margin-top: -20%; 
     padding-top: 20%;
}
h3.name-text {
    color:#fff; 
    text-shadow: 3px 3px 2px #000;
    text-align:center;
    font-size: 28px;
}
.address-text {
    font-size: 12px !important;
    color: #fff;
    text-align:center;
    margin: auto 20px;
    text-shadow: 1px 1px 1px #000;
    border-radius: 15px;
    border: 1px solid white;
    padding: 5px;
}
.store-hours {
    font-size: 12px !important;
    color: #feb041;
    text-align:center;
    margin: auto 20px;
    text-shadow: 1px 1px 1px #000;
    padding: 5px;
}
</style>
