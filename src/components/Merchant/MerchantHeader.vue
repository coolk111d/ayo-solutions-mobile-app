<template>
    <MerchantMenu />

    <ion-header>
        <a href="/merchant-dashboard">
            <img src="/assets/images/logo.png" alt="" class="logo">
        </a>

        <ion-toolbar>
            <ion-title>
                <ion-grid>
                    <ion-row>
                        <ion-col>
                            <div class="ion-text-start">
                                <ion-icon :icon="menu" @click="openMenu" class="menu-head"/>
                            </div>
                        </ion-col>
                        <ion-col>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </ion-title>
        </ion-toolbar>
    </ion-header>
</template>

<script lang="ts">
import {
    IonHeader, IonToolbar, IonTitle,

    // IonButtons, IonMenuButton,

    IonGrid, IonRow, IonCol,
    IonIcon
} from '@ionic/vue';
import { menu, basketOutline } from 'ionicons/icons';
import { menuController } from '@ionic/vue';

import MerchantMenu from '@/components/Merchant/MerchantMenu.vue';

export default {
    name: 'Merchant Header',
    components: {
        IonHeader, IonToolbar, IonTitle,

        IonGrid, IonRow, IonCol,
        IonIcon,
        MerchantMenu
    },
    methods: {
        openMenu() {
                menuController.enable(true, "menu");
                menuController.open("menu");
            },
  },
    setup() {
        return { menu, basketOutline };
    }
}
</script>

