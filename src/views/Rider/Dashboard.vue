<template>
    <ion-page>
        <RiderHeader/>

        <ion-content :fullscreen="true">
            <div class="content-container">
                <ion-header collapse="condense">
                    <ion-toolbar>
                        <ion-title size="large">Home</ion-title>
                    </ion-toolbar>
                </ion-header>
                <ion-card>
                    <div class="container">
                    <h3>Rider's Dashboard</h3>

                    <ion-button color="tertiary" size="small" @click="orders">Order List</ion-button>
                    </div>
                </ion-card>
                <hr style="border-bottom: 1px solid rgba(0,0,0,0.05); margin: 20px 10px 0px;">
                <h3 class="divider-title">New Order</h3>
                <ion-card>
                    <div class="container">
                        <ion-row class="ion-align-items-center">
                                <ion-col size="6" style="text-align:center;">
                                    <ion-badge color="warning">New</ion-badge><br>
                                    <!-- Product Title --><a class="product-title"><span style="color:#feb041; font-size: 14px;">MangInasal - Batangas</span></a>
                                        <!-- Product Price -->
                                        <p class="sale-price">Order #S61910121</p>
                                        <p class="sale-price">Ordered: <span class="price">09/17/2021 9:10pm</span></p>       
                                        <p class="sale-price">Total Price: <span class="price">&#8369;560</span></p> 
                                </ion-col>
                                <ion-col style="display:flex; flex-direction:column;">
                                    <ion-button size="small" color="success" @click="details">Process</ion-button>
                                    <ion-button size="small" color="danger">Reject</ion-button>
                                </ion-col>
                        </ion-row>
                    </div>
                </ion-card>
            </div>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonButton, modalController, IonRow, IonBadge, IonCol } from '@ionic/vue';
import RiderHeader from '@/components/Rider/RiderHeader.vue';
import RiderOrderList from '@/components/Rider/RiderOrderList.vue';
import RiderOrderDetails from '@/components/Rider/RiderOrderDetails.vue';

export default  {
    name: 'Rider Dashboard',
    components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, RiderHeader, IonCard, IonButton , IonRow, IonBadge, IonCol},
    methods: {
    async orders() {
                const modal = await modalController
                .create({
                component: RiderOrderList,
                cssClass: 'my-custom-class',
                })
            return modal.present();
            },
             async details() {
                const modal = await modalController
                .create({
                component: RiderOrderDetails,
                cssClass: 'my-custom-class',
                })
            return modal.present();
            },
    }
}
</script>

<style scoped>
    .content-container {
        height: 88vh;
        background: url('/assets/images/bg-img/13.jpg');
        background-size: cover;
        background-position: left;
        background-repeat: no-repeat;
    }
    h3.divider-title {
        font-size: 14px;
        color: #000;
        text-align: center;
    }
    ion-card {
        border-radius: 10px;
    }
    .container {
        padding: 10px;
        text-align:center;
    }
    .container h3 {
        color: #000;
    }
    a.product-title {
    text-decoration: none;
    font-weight: 600;
    margin-left:5px;
    color: #1e1e50;
    font-size: 14px;
}
.sale-price {
    margin: 5px;
    font-size: 12px;
}
p {
    color: #000;
}
</style>


