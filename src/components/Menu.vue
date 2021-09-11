<template>
    <ion-menu side="start" menu-id="menu" content-id="main">
        <ion-header>
            <ion-toolbar>
                <ion-title>Menu</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-list>
                <ion-item>
                    <ion-button @click="logOut">Logout</ion-button>
                </ion-item>
                <!-- <ion-item>Menu Item</ion-item>
                <ion-item>Menu Item</ion-item>
                <ion-item>Menu Item</ion-item>
                <ion-item>Menu Item</ion-item> -->
            </ion-list>
        </ion-content>
    </ion-menu>

    <ion-router-outlet id="main"></ion-router-outlet>
</template>

<script>
    import {
        IonContent,
        IonHeader,
        IonItem,
        IonList,
        IonMenu,
        IonRouterOutlet,
        IonTitle,
        IonToolbar
    } from '@ionic/vue';

    import { Storage } from '@ionic/storage';

    import { useRouter } from 'vue-router';
    import { defineComponent } from 'vue';

    export default defineComponent({
        components: {
            IonContent,
            IonHeader,
            IonItem,
            IonList,
            IonMenu,
            IonRouterOutlet,
            IonTitle,
            IonToolbar
        },

        setup() {
            const router = useRouter();

            const storage = new Storage();
            storage.create();

            return { router, storage };
        },

        methods: {
            logOut() {
                this.storage.clear();
                this.router.push("/login");
            }
        }
    });
</script>

<style lang="css" scoped>
.my-custom-menu {
  --width: 500px;
}
</style>
