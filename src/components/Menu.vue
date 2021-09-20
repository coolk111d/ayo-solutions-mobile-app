<template>
    <ion-menu side="start" menu-id="menu" content-id="main">
        <ion-header>
            <ion-toolbar>
                <ion-title>Account</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
        
            
            <div class="name">
                <h3 style="margin: 0">{{name}}</h3><br>
                <span style="color:#feb041; font-size: 14px; text-align:center;margin: -15px 0 0">{{role}}</span>
                <p style="color:rgba(230,230,230,1); font-size: 12px; text-align:center;margin: 5px 0 20px">{{email}}</p>
                <ion-button @click="logOut" slot="end" size="small">LogOut</ion-button>
            </div>
            <ion-list>
                <ion-item>Orders</ion-item>
                <ion-item>Addresses</ion-item>
                <ion-item>Password</ion-item>
                <ion-item>Settings</ion-item>
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
            return { router, storage };
        },
        
        methods: {
            logOut() {
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
                    this.name = name.name;
                    this.email = name.email;
                    this.role = name.role;
                    }
            }
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
</style>
