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
                                <ion-icon :icon="menu" @click="openMenu" class="menu-head"/>
                            </div>
                        </ion-col>
                        <ion-col>
                            <CartIcon />
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
import { menu } from 'ionicons/icons';
import CartIcon from './Cart/CartIcon.vue';
import { menuController } from '@ionic/vue';

import Menu from '@/components/Menu.vue';

export default {
    name: 'Header',
    components: {
        IonHeader, IonToolbar, IonTitle,

        // IonButtons, IonMenuButton,

        IonGrid, IonRow, IonCol,
        IonIcon,
        Menu,

        CartIcon
    },
    methods: {
        openMenu() {
            menuController.enable(true, "menu");
            menuController.open("menu");
        },
    },

    setup() {
        return { menu };
    }
}
</script>

