<template>
    <ion-header>
        <a href="/home">
            <img src="/assets/images/logo.png" alt="" class="logo">
        </a>

        <ion-toolbar>
            <ion-title>
                <ion-grid>
                    <ion-row>
                        <ion-col>
                            <div class="ion-text-start">
                                <ion-icon :icon="menu" />
                            </div>
                        </ion-col>
                        <ion-col>
                            <div class="ion-text-end">
                                <ion-icon :icon="cart" />
                            </div>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </ion-title>
        </ion-toolbar>
    </ion-header>
</template>

<script lang="ts">
import { IonHeader, IonToolbar, IonTitle } from '@ionic/vue';
import { menu, cart } from 'ionicons/icons';

export default {
    name: 'Header',
    components: { IonHeader, IonToolbar, IonTitle },

    setup() {
        return { menu, cart };
    }
}
</script>
