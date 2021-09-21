<template>
    <ion-page>
        <Header/>

        <ion-content :fullscreen="true">
            <div class="container">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">AYO Logistic</ion-title>
                </ion-toolbar>
            </ion-header>

            <ExploreContainer name="AYO Logistic" service="Logistic" link="https://ayosolution.com/ayo-box/calculator-rate"/>
            <!-- <ion-button @click="openModal">Register Now!</ion-button> -->
            </div>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import Header from '@/components/Header.vue';

export default {
    name: 'AYO Logistic',
    components: { ExploreContainer, IonHeader, IonToolbar, IonTitle, IonContent, IonPage, Header }
}
</script>

<style scoped>
.container {
    height: 81vh;
    background: url('/assets/images/bg-img/51.jpg') rgba(0,0,0,0.3);
    background-blend-mode: darken;
    background-size: cover;
    background-position: center;
}
</style>
