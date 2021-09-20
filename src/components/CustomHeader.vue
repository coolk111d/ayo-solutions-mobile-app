<template>
    <Menu />

    <ion-header class="ion-no-border">
        <ion-toolbar>
            <ion-title>
                <ion-grid>
                    <ion-row>
                        <ion-col>
                            <div class="ion-text-start">
                                <a @click="() => router.push(link)"><ion-icon :icon="arrowBackOutline" class="menu-head" > </ion-icon></a>
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
    IonGrid, IonRow, IonCol,
    IonIcon,modalController, IonBadge
} from '@ionic/vue';
import { useRouter } from 'vue-router';
import { arrowBackOutline, menu, basketOutline } from 'ionicons/icons';
import CartModal from './CartModal.vue';
import { menuController } from '@ionic/vue';

import Menu from '@/components/Menu.vue';

export default {
    name: 'CustomHeader',
    props: {
        link: String,
    },
    components: {
        IonHeader, IonToolbar, IonTitle,
        IonGrid, IonRow, IonCol,
        IonIcon,
        IonBadge,
        Menu
    },
    setup() {
        const router = useRouter();
        return { menu, basketOutline, arrowBackOutline, router };
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
}
</script>

<style scoped>
ion-toolbar, ion-header {
    --background: rgba(0,0,0,0.2);
    --border-bottom: 0;
    height: 50px;
}
.menu-head {
    color: white;
}
.cart-head {
    color: #fff;
}
</style>