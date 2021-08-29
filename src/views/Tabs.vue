<template>
    <ion-page>
        <ion-tabs>
            <ion-router-outlet></ion-router-outlet>
            <ion-tab-bar slot="bottom">
                <ion-tab-button tab="home" href="/home">
                    <ion-icon :icon="home" />
                    <ion-label>Home</ion-label>
                </ion-tab-button>

                <ion-tab-button tab="food" href="/food">
                    <ion-icon :icon="fastFoodOutline" />
                    <ion-label>Food</ion-label>
                </ion-tab-button>

                <ion-tab-button tab="logistic" href="/logistic">
                    <ion-icon :icon="airplaneOutline" />
                    <ion-label>Logistics</ion-label>
                </ion-tab-button>

                <ion-tab-button tab="courier" href="/courier">
                    <ion-icon :icon="bicycleOutline" />
                    <ion-label>Courier</ion-label>
                </ion-tab-button>

                <ion-tab-button tab="handyman" href="/handyman">
                    <ion-icon :icon="construct" />
                    <ion-label>Handyman</ion-label>
                </ion-tab-button>
            </ion-tab-bar>
        </ion-tabs>
    </ion-page>
</template>

<script lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { home, fastFoodOutline, airplaneOutline, bicycleOutline, construct } from 'ionicons/icons';
export default {
    name: 'Tabs',
    components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage, IonRouterOutlet },
    setup() {
        return { home, fastFoodOutline, airplaneOutline, bicycleOutline, construct }
    }
}
</script>
