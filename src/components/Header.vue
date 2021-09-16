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
                            <div class="cart-container ion-text-end">
                                <ion-icon :icon="basketOutline" @click="onClick" class="cart-head"/>
                                <ion-badge color="warning">5</ion-badge>
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
<<<<<<< HEAD
    IonIcon,modalController , IonBadge
=======
    IonIcon
>>>>>>> 4e7a215f479fc96d1cc2d1804c2b9310c1a651aa
} from '@ionic/vue';
import { menu, basketOutline } from 'ionicons/icons';
import CartModal from './CartModal.vue';
import { menuController } from '@ionic/vue';

import Menu from '@/components/Menu.vue';

export default {
    name: 'Header',
    components: {
        IonHeader, IonToolbar, IonTitle,

        // IonButtons, IonMenuButton,

        IonGrid, IonRow, IonCol,
        IonIcon,
<<<<<<< HEAD
        IonBadge,
=======

>>>>>>> 4e7a215f479fc96d1cc2d1804c2b9310c1a651aa
        Menu
    },
    methods: {
        async onClick() {
            const modal = await modalController
        .create({
          component: CartModal,
          cssClass: 'my-custom-class',
          componentProps: {
            title: 'My Cart'
          },
        })
      return modal.present();
    },
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

