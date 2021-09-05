<template>
    <ion-page>
        

        <ion-content :fullscreen="true">


            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">Login</ion-title>
                </ion-toolbar>
            </ion-header>

            <div class="login-container" style="">
                <a href="/home" class="guest-signin-link"><ion-icon :icon="arrowBackOutline" /> Sign in as Guest</a>
            
                <img src="/assets/images/logo-trans.png" alt="" style="width: 30%; margin: 0 auto;">

                <h6 class="">Log in to continue to AYO.</h6>

                <ion-item class="form-group">
                    <ion-label position="stacked">Username</ion-label>
                    <div class="input">
                        <ion-input></ion-input>
                    </div>
                </ion-item>

                <ion-item class="form-group">
                    <ion-label position="stacked">Password</ion-label>
                    <div class="input">
                        <ion-input type="password"></ion-input>
                    </div>
                </ion-item>

                <ion-button @click="() => router.push('/home')" class="signin-button">Sign in</ion-button> 

                <div class="login-meta-data text-center">
                    <a class="stretched-link" href="/">Forgot Password?</a>
                    <p>Didn't have an account? <a class="stretched-link" href="/">Register Now</a></p>
                    <p>Administrator? <a class="stretched-link" href="/">Login Now</a></p>
                </div>
            </div>   

            <!--<ion-list>
                <ion-item v-for="user of users" v-bind:key="user.id">
                    <ion-label full>{{user.name}}</ion-label>
                </ion-item>
            </ion-list>-->

        </ion-content>
    </ion-page>
</template>




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



<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonLabel, IonInput, IonItem} from '@ionic/vue';
import { arrowBackOutline } from 'ionicons/icons';
import { useRouter } from 'vue-router';
/*import axios  from 'axios';*/
export default  {
    /*data: () => ({
    users: []
    }),
    created() {
      axios.get('http://jsonplaceholder.typicode.com/users')
      .then(response => {
        this.users = response.data
        });
    },*/
    name: 'Login',
    components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButton, IonInput, IonItem, IonLabel},
    setup() {
      const router = useRouter();
      
      return { router, arrowBackOutline};
    },
     
}
</script>
