<template>
    <Menu />

    <ion-header class="ion-no-border">
        <ion-toolbar>
            <ion-title>
                <ion-grid>
                    <ion-row>
                        <ion-col>
                            <div class="ion-text-start" v-show="link">
                                <a @click="() => router.push(link)"><ion-icon :icon="arrowBackOutline" class="menu-head" > </ion-icon></a>
                            </div>
                            <div class="ion-text-start" v-show="reset">
                                <a :href="reset"><ion-icon :icon="arrowBackOutline" class="menu-head" > </ion-icon></a>
                            </div>
                        </ion-col>
                        <ion-col>
                            <CartIcon style="color: white" />
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
    IonIcon,modalController,

    // IonBadge
} from '@ionic/vue';
import { useRouter } from 'vue-router';
import { arrowBackOutline, menu, basketOutline } from 'ionicons/icons';
import CartModal from './CartModal.vue';
import { menuController } from '@ionic/vue';

import Menu from '@/components/Menu.vue';
import CartIcon from '@/components/Cart/CartIcon.vue';

export default {
    name: 'CustomHeader',
    props: {
        link: String,
        reset:String
    },
    components: {
        IonHeader, IonToolbar, IonTitle,
        IonGrid, IonRow, IonCol,
        IonIcon,
        // IonBadge,
        Menu,

        CartIcon
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
