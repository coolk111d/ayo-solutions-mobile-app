<template>
    <ion-menu side="start" menu-id="menu" content-id="main">
        <ion-header>
            <ion-toolbar>
                <ion-title>Rider Account</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
        
            
            <div class="name">
                <h3 style="margin: 0">{{name}}</h3><br>
                <span style="color:#feb041; font-size: 14px; text-align:center;margin: -15px 0 0">{{role}}</span>
                <p style="color:rgba(230,230,230,1); font-size: 12px; text-align:center;margin: 5px 0 20px">{{email}}</p>
            </div>
            <ion-list>
                <ion-item lines="none" detail button @click="orders"><ion-icon :icon="bagOutline"/> <a>Orders</a></ion-item>
                <ion-item  lines="none" detail button @click="logOut"><ion-icon :icon="logOutOutline"/><a> Log Out</a></ion-item>
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
        IonToolbar,
        modalController
    } from '@ionic/vue';

    import { Storage } from '@ionic/storage';
    import { bagOutline, mapOutline, keypadOutline, logOutOutline } from 'ionicons/icons';
    import RiderOrderList from '@/components/Rider/RiderOrderList.vue';

    import axios from "axios";

    import { useRouter } from 'vue-router';
    import { defineComponent } from 'vue';
    export default defineComponent({
        name: "Rider Menu",
        components: {
            IonContent,
            IonHeader,
            IonItem,
            IonList,
            IonMenu,
            IonRouterOutlet,
            IonTitle,
            IonToolbar,
        },
        data() {
            return {
                name: String,
                email: String,
                role: String,
            }
        },
        setup() {
            const router = useRouter();
            
            const storage = new Storage();
            storage.create();
            return { router, storage, bagOutline, mapOutline, keypadOutline, logOutOutline };
        },
        
        methods: {
            async logOut() {
                const storageAuthUser = await this.storage.get('authUser');

                axios({
                    method: "POST",
                    url: `${process.env.VUE_APP_ROOT_API}/mobile-api/logout`,
                    headers: {
                        Authorization: `Bearer ${storageAuthUser.token}`
                    }
                }).then(res => {
                    const data = res.data;
                    console.log(data.message);
                }).catch(err => {
                    console.log(err);
                });

                this.storage.clear();
                this.router.push("/login");
            },
            logIn() {
                this.router.push("/login");
            },
            async getName() {
            
                    const name = await this.storage.get('authUser');
                    if(name == null) {
                        this.name = "Guest" 
                        this.email = "Not Available"
                        this.role = "Customer"
                    } else {
                    this.name = name.user.name;
                    this.email = name.user.email;
                    this.role = name.user.role;
                    }
            },
            async orders() {
                const modal = await modalController
                .create({
                component: RiderOrderList,
                cssClass: 'my-custom-class',
                })
            return modal.present();
            },
        },
        beforeMount() {
            this.getName();
        },
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
ion-list {
    height: 62vh;
    padding-top: 20px;
}
ion-item:hover {
    --background: #feb041;
    --color: #fff;
}
ion-item:hover a, ion-item:hover ion-icon {
    color: #fff;
}
ion-item a {
    font-size: 16px;
    color: #000;
    padding: 20px 0;
}
ion-item ion-icon {
    margin-right: 30px;
}
</style>
