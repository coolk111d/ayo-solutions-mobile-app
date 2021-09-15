<template>
    <ion-page>
        <Header/>

        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">AYO Courier</ion-title>
                </ion-toolbar>
            </ion-header>
            <ExploreContainer name="AYO Courier" service="Courier" link="https://ayosolution.com/same-day" />
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import Header from '@/components/Header.vue';

export default {
    name: 'AYO Courier',
    components: { ExploreContainer, IonHeader, IonToolbar, IonTitle, IonContent, IonPage, Header }
}
</script>
