<template>
    <ion-page v-show="notAuth">
        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">Login</ion-title>
                </ion-toolbar>
            </ion-header>

            <div class="login-container" style="">
                <a href="javascript:void(0)" style="display:none" class="guest-signin-link" @click="loginAsGuest"><ion-icon :icon="arrowBackOutline" /> Sign in as Guest</a>

                <img src="/assets/images/logo-trans.png" alt="" style="width: 30%; margin: 0 auto;">

                <h6 class="">Log in to continue to AYO.</h6>

                <Form @submit="onSubmit" :validation-schema="schema" :initial-values="formValues">
                    <ion-item class="form-group">
                        <ion-label position="stacked">Email</ion-label>
                        <div class="input">
                            <Field as="ion-input" name="email" />
                            <ErrorMessage as="ion-text" name="email" color="danger" />
                        </div>
                    </ion-item>

                    <ion-item class="form-group">
                        <ion-label position="stacked">Password</ion-label>
                        <div class="input">
                            <Field as="ion-input" type="password" name="password" ref="inputpass"/>
                            <ErrorMessage as="ion-text" name="password" color="danger" />
                        </div>
                    </ion-item>

                    <!-- <ion-button @click="() => router.push('/home')" class="signin-button">Sign in</ion-button> -->
                    <ion-button type="submit" class="signin-button">Sign in</ion-button>
                </Form>

                <div class="login-meta-data text-center">
                    <a class="stretched-link" href="/">Forgot Password?</a>
                    <p>Didn't have an account? <a class="stretched-link" href="javascript:void(0)" @click="openRegistrationModal">Register Now</a></p>
                </div>
            </div>
            <!--<ion-list>
                <ion-item v-for="user of users" v-bind:key="user.id">
                    <ion-label full>{{user.name}}</ion-label>
                </ion-item>
            </ion-list>-->
        </ion-content>

        <ion-loading
            :is-open="isOpenLoadingRef"
            message="Please wait..."
            :duration="timeout"
            @didDismiss="setOpenLoading(false)"
          >
          </ion-loading>

        <!-- <ion-alert
            :is-open="isOpenAlertRef"
            :header="alertTitle"
            :message="alertMessage"
            css-class="my-custom-class"
            @didDismiss="setOpenAlert(false)"
        >
        </ion-alert> -->

        <ion-toast
            :is-open="isOpenToastRef"
            :message="toastMessage"
            :duration="3000"
            @didDismiss="setOpenToast(false)"
          >
          </ion-toast>
    </ion-page>
</template>

<script>
import {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonLabel, IonItem, IonIcon,

    IonLoading, IonToast
} from '@ionic/vue';
import { arrowBackOutline } from 'ionicons/icons';
import { modalController } from '@ionic/vue';
import RegistrationModal from '@/components/RegistrationModal.vue'
import { useRouter } from 'vue-router';
import { ref } from 'vue';

import { Form, Field, ErrorMessage } from "vee-validate";
import { object, string } from "yup";
import { Storage } from '@ionic/storage';
import OneSignal from 'onesignal-cordova-plugin';
import axios from "axios";
export default  {
    name: 'Login',

    props: {
        timeout: { type: Number, default: 0 }
    },

    components: {
        IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButton, IonItem, IonLabel, IonIcon,

        IonLoading, IonToast,

        Form, Field, ErrorMessage
    },

    data() {
        return {
            notAuth: true
        }
    },

    setup() {
        const router = useRouter();

        const schema = object({
            email: string().required().email().label("Email"),
            password: string().required().label("Password")
        });

        // Initial values
        const formValues = {
            email: `${process.env.VUE_APP_LOGIN_EMAIL}`,
            password: `${process.env.VUE_APP_LOGIN_PASSWORD}`,
        };
        const inputpass = ref();
        console.log(inputpass);
        const isOpenLoadingRef = ref(false);
        const setOpenLoading = (state) => isOpenLoadingRef.value = state;

        // const isOpenAlertRef = ref(false);
        // const setOpenAlert = (state) => isOpenAlertRef.value = state;
        // const alertTitle = "";
        // const alertMessage = "";

        const isOpenToastRef = ref(false);
        const setOpenToast = (state) => isOpenToastRef.value = state;
        const toastMessage = "";

        const storage = new Storage();
        storage.create();

        return {
            router, arrowBackOutline,
            schema,

            formValues,

            isOpenLoadingRef, setOpenLoading,

            // isOpenAlertRef, setOpenAlert, alertTitle, alertMessage
            isOpenToastRef, setOpenToast, toastMessage,
            inputpass,
            storage
        };
    },

    beforeCreate() {
        this.storage.get("authUser").then(authUser => {
            if (authUser !== null) {
                const user = authUser.user;

                this.toastMessage = "You are already login";
                this.setOpenToast(true);
                if(user.role == "rider") {
                    this.router.push('/rider-dashboard')
                } else if(user.role == "merchant") {
                    this.router.push('/merchant-dashboard')
                } else {
                    this.router.push('/home')
                }
            } else {
                this.notAuth = true;
            }
        });
    },

    methods: {
        onSubmit(inputs, actions) {
            actions.setValues({email: "", password: ""});
            this.setOpenLoading(true);

            axios({
                method: "POST",
                url: `${process.env.VUE_APP_ROOT_API}/mobile-api/login`,
                data: {
                    email: inputs.email,
                    password: inputs.password
                }
            }).then(res => {
                const data = res.data;

                this.setOpenLoading(false);
                if (data.success) {
                        // const externalUserId = data.data.user.role + data.data.user.id // You will supply the external user id to the OneSignal SDK

                        // // Setting External User Id with Callback Available in SDK Version 2.11.2+
                        // OneSignal.setExternalUserId(externalUserId, (results) => {
                        //     // The results will contain push and email success statuses
                        //     console.log('Results of setting external user id');
                        //     console.log(results);

                        //     // Push can be expected in almost every situation with a success status, but
                        //     // as a pre-caution its good to verify it exists
                        //     if (results.push && results.push.success) {
                        //         console.log('Results of setting external user id push status:');
                        //         console.log(results.push.success);
                        //     } else {
                        //         console.log('Not successful');
                        //     }
                        // });

                    if(data.data.user.role == "rider") {
                        this.router.push('/rider-dashboard')
                    } else if(data.data.user.role == "merchant") {
                        this.router.push('/merchant-dashboard')
                    } else {
                        this.router.push('/home')
                    }
                    this.toastMessage = `Successfully Login! Welcome ${data.data.user.name}`;
                    // eslint-disable-next-line no-undef
                    this.storage.set('authUser', {
                            user: data.data.user,

                            token: data.data.token,
                            // eslint-disable-next-line @typescript-eslint/camelcase
                            cart_token: data.data.cart_token,
                        }
                    );
                } else {
                    this.toastMessage = "Invalid email and password."
                }

                this.setOpenToast(true);
            }).catch(err => {
                this.setOpenLoading(false);

                console.log(err);
                // this.toastMessage = err.response.data.message;
                this.setOpenToast(true);
            });
        },

        loginAsGuest() {
            this.router.push('/home')
            this.toastMessage = `Successfully Login as Guest!`;

            // eslint-disable-next-line no-undef
            this.storage.set('authUser', {
                    token: null,
                    // eslint-disable-next-line @typescript-eslint/camelcase
                    cart_token: "STuVkR4toQnnS994I7emmxjYw3ibca05daaHt4Mv1uXdXqkTw5fNvwY6XSS0gu",
                    // cart_token: data.cart_token,
                    name: null,
                    email: null,
                    role: "guest"
                }
            );

            // this.setOpenLoading(true);

            // axios({
            //     method: "POST",
            //     url: `${process.env.VUE_APP_ROOT_API}/mobile-api/cart/take`
            // }).then(res => {
            //     const data = res.data;

            //     this.setOpenLoading(false);
            //     if (data.success) {
            //         this.router.push('/home')
            //         this.toastMessage = `Successfully Login as Guest!`;

            //         // eslint-disable-next-line no-undef
            //         this.storage.set('authUser', {
            //                 token: null,
            //                 // eslint-disable-next-line @typescript-eslint/camelcase
            //                 cart_token: data.cart_token,
            //                 name: null,
            //                 email: null,
            //                 role: "guest"
            //             }
            //         );
            //     } else {
            //         this.toastMessage = "Invalid email and password."
            //     }

            //     this.setOpenToast(true);
            // }).catch(err => {
            //     this.setOpenLoading(false);

            //     this.toastMessage = err.response.data.message;
            //     this.setOpenToast(true);
            // });
        },

        async openRegistrationModal() {
            const modal = await modalController.create({component: RegistrationModal});
            modal.present();
        }
    },
}
</script>

<style scoped>
    .login-container {
        padding: 50px 10px;
        display:flex;
        flex-direction: column;
        text-align: center;
        height: 100vh;
        font-family: "Poppins", sans-serif;
    }
    a.guest-signin-link {
        float:left;
        text-align: left;
        text-decoration: none;
        margin-bottom: 40px;
    }
    a.guest-signin-link:hover {
        color: #feb041;
    }
    h6 {
        font-weight: 600;
        line-height: 1.2;
    }

    .signin-button {
        width: 90%;
        margin: 10px auto;
        border-radius: 10px;
    }
    p {
        font-size: 12px;
        }
    a.stretched-link {
        font-size: 12px;
        color: #1f0757;
        font-weight: 600;
    }
</style>
