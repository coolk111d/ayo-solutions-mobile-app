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
            </div>
            <ion-list>
                <div v-if="role !== 'guest'">
                    <ion-item lines="none" detail button @click="orders">
                        <ion-icon :icon="bagOutline"/> <a>Orders</a>
                    </ion-item>
                    <ion-item lines="none" detail button @click="samedayorders">
                        <ion-icon :icon="cubeOutline"/> <a>Same Day Transactions</a>
                    </ion-item>
                    <ion-item  lines="none" detail button  @click="address">
                        <ion-icon :icon="mapOutline"/> <a>Addresses</a>
                    </ion-item>
                    <ion-item  lines="none" detail button @click="password">
                        <ion-icon :icon="keypadOutline"/><a> Change Password</a>
                    </ion-item>
                </div>
                <ion-item  lines="none" detail button @click="logOut">
                    <ion-icon :icon="logOutOutline"/><a> Log Out</a>
                </ion-item>
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
    import { bagOutline, mapOutline, keypadOutline, logOutOutline, cubeOutline } from 'ionicons/icons';
    import OrderList from '@/components/OrderList.vue';
    import SameDayOrderList from '@/components/SameDay/OrderList.vue';
    import AddressList from '@/components/AddressList.vue';
    import ChangePassword from '@/components/ChangePassword.vue';

    import axios from "axios";

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

            return { router, storage, bagOutline, mapOutline, keypadOutline, logOutOutline, cubeOutline };
        },

        methods: {
            async logOut() {
                /**
                 * todo:
                 * if current logged in is guest, add confirmation before proceed it on logout
                 * because all items he add on cart will be lost.
                 */
                if (this.role !== "guest") {
                    const storageAuthUser = await this.storage.get('authUser');

                    axios({
                        method: "POST",
                        url: `${process.env.VUE_APP_ROOT_API}/mobile-api/logout`,
                        headers: {
                            Authorization: `Bearer ${storageAuthUser.token}`
                        }
                    }).then(res => {
                        const data = res.data;
                    }).catch(err => {
                        console.log(err);
                    });
                }

                this.storage.clear();
                this.router.push("/login");
            },

            logIn() {
                this.router.push("/login");
            },

            async getName() {
                const authUser = await this.storage.get('authUser');
                console.log(authUser);

                if(authUser.user !== undefined) {
                    this.name = authUser.user.name;
                    this.email = authUser.user.email;
                    this.role = authUser.user.role;
                } else {
                    this.name = "Customer"
                    this.email = "Not Available"
                    this.role = "guest"
                }
            },

            async orders() {
                const modal = await modalController
                .create({
                component: OrderList,
                cssClass: 'my-custom-class',
                })
                return modal.present();
            },

            async samedayorders() {
                const modal = await modalController
                .create({
                component: SameDayOrderList,
                cssClass: 'my-custom-class',
                })
                return modal.present();
            },

            async address() {
                const modal = await modalController
                .create({
                component: AddressList,
                cssClass: 'my-custom-class',
                })
                return modal.present();
            },

            async password() {
                const modal = await modalController
                .create({
                component: ChangePassword,
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
    background: url('https://ayo-bucket.s3.ap-southeast-1.amazonaws.com/mobile-app/bg-img/1.jpg');
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
    font-size: 14px;
    color: #000;
    padding: 10px 0;
}
ion-item ion-icon {
    margin-right: 30px;
    font-size: 25px;
}
</style>
