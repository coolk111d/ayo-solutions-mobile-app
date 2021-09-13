<template>
    <ion-menu side="start" menu-id="menu" content-id="main">
        <ion-header>
            <ion-toolbar>
                <ion-title>Account</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <div class="name" v-if="logins.name != null">
                <h3>{{logins.name}}</h3>
                <ion-button @click="logOut" slot="end" color="default"  size="small">Logout</ion-button>
            </div>
            <div class="name" v-else>
                <h3>Guest</h3>
                <ion-button @click="logIn" slot="end" size="small">Login</ion-button>
            </div>
            <ion-list>
                <ion-item>Orders</ion-item>
                <ion-item>Addresses</ion-item>
                <ion-item>Password</ion-item>
                <ion-item>Setting</ion-item>
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

            const logins = storage.get('authUser', name);
            console.log(logins);
            return { router, storage,logins };
        },

        methods: {
            logOut() {
                this.storage.clear();
                this.router.push("/login");
            },
            logIn() {
                this.router.push("/login");
            }
        }
    });
</script>

<style lang="css" scoped>
.my-custom-menu {
  --width: 500px;
}
.name {
    margin-top: -10px;
    padding: 20px;
    background: url('/assets/images/bg-img/1.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    align-items: center; 
    justify-content: center;
    height: 200px;
}
.name h3 {
    text-align: left;
    margin: 10px 10px;
    color: #fff;
    text-shadow: 1px 1px 3px #000;
    font-size: 20px;
}
</style>
