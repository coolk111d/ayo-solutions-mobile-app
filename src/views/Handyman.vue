<template>
    <ion-page>
        <Header/>
        
        <ion-content :fullscreen="true">
       <div class="container"> 
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">AYO Handyman</ion-title>
                </ion-toolbar>
            </ion-header>
            <ExploreContainer name="AYO Handyman" service="Handyman" link="https://ayosolution.com"/>
            </div>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import Header from '@/components/Header.vue';

export default {
    name: 'AYO Handyman',
    components: { ExploreContainer, IonHeader, IonToolbar, IonTitle, IonContent, IonPage, Header }
}
</script>
<style scoped>
.container {
    height: 81vh;
    background: url('https://ayo-bucket.s3.ap-southeast-1.amazonaws.com/mobile-app/bg-img/53.jpg') rgba(0,0,0,0.3);
    background-blend-mode: darken;
    background-size: cover;
    background-position: center;
}
</style>