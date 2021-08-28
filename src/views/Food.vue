<template>
    <ion-page>
        <Header/>

        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">AYO Food</ion-title>
                </ion-toolbar>
            </ion-header>
            <ExploreContainer name="AYO Food" />
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import Header from '@/components/Header.vue';

export default {
    name: 'AYO Food',
    components: { ExploreContainer, IonHeader, IonToolbar, IonTitle, IonContent, IonPage, Header }
}
</script>
