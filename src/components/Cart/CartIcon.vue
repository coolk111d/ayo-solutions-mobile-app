<template>
    <div class="cart-container ion-text-end">
        <ion-icon :icon="basketOutline" @click="onCartIconClick" class="cart-head" />
        <ion-badge color="warning" v-text="items_num"></ion-badge>
    </div>
</template>
<script>
import {
    IonIcon, IonBadge,
    modalController
} from '@ionic/vue';
import { Storage } from '@ionic/storage';

import CartModal from './../CartModal.vue';
import { basketOutline } from 'ionicons/icons';

import axios from "axios";

export default {
    name: 'CartIcon',

    components: { IonIcon, IonBadge },

    setup() {
        const storage = new Storage();
        return { storage, basketOutline };
    },

    mounted() {
        this.storage.create();

        this.storage.get("authUser").then(user => {
            axios({
                method: "GET",
                url: `${process.env.VUE_APP_ROOT_API}/mobile-api/carts/items`,
                headers: {
                    Authorization: `Bearer ${user.cart_token}`
                }
            }).then(res => {
                const data = res.data;

                if (data.success) {
                    // eslint-disable-next-line @typescript-eslint/camelcase
                    this.items_num = data.items.length;
                } else {
                    console.log(data.message);
                }
            }).catch(err => {
                console.log(err);
            });
        });
    },

    data() {
        return {
            // eslint-disable-next-line @typescript-eslint/camelcase
            items_num: 0
        }
    },

    methods: {
        async onCartIconClick() {
            const modal = await modalController.create({
                component: CartModal,
                cssClass: 'my-custom-class',
                componentProps: {
                    title: 'My Cart'
                },
            });

            return modal.present();
        }
    }
}

</script>
<style lang="css" scoped>
</style>
