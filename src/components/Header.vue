<template>
    <Menu />

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
                                <ion-icon :icon="menu" @click="openMenu" />
                            </div>
                        </ion-col>
                        <ion-col>
                            <div class="ion-text-end">
                                <ion-icon :icon="cart" />
                                <ion-text style="margin-left: 5px">Rodrgio</ion-text>
                            </div>
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
    IonIcon,
    IonText,
} from '@ionic/vue';
import { menu, cart } from 'ionicons/icons';

import { menuController } from '@ionic/vue';

import Menu from '@/components/Menu.vue';

export default {
    name: 'Header',
    components: {
        IonHeader, IonToolbar, IonTitle,

        // IonButtons, IonMenuButton,

        IonGrid, IonRow, IonCol,
        IonIcon,
        IonText,

        Menu
    },

    setup() {
        return { menu, cart };
    },

    methods: {
        openMenu() {
            menuController.enable(true, "menu");
            menuController.open("menu");
        }
    }
}
</script>
