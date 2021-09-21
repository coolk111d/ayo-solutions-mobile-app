<template>
    <ion-header>
        <ion-toolbar>
             <ion-buttons slot="end">
                <ion-button @click="dismissModal"><ion-icon :icon="closeCircleOutline" /></ion-button>
            </ion-buttons>
            <ion-title>Orders</ion-title>
        </ion-toolbar>  
    </ion-header>

    <ion-content class="ion-padding  cart-content">

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
            <hr style="border-bottom: 1px solid rgba(0,0,0,0.1); margin-bottom:15px;">
            <ion-row class="ion-align-items-center">
                    <ion-col size="12" style="text-align:center;">
                        
                            <ion-badge color="tertiary">Assembled</ion-badge><br>
                         <!-- Product Title --><a class="product-title"><span style="color:#feb041; font-size: 14px;">MangInasal - Batangas</span></a>
                            <!-- Product Price -->
                            <p class="sale-price">Order #S61910121</p>
                            <p class="sale-price">Ordered: <span class="price">09/17/2021 9:10pm</span></p>   
                            <p class="sale-price">Received: <span class="price">09/17/2021 10:10pm</span></p>      
                            <p class="sale-price">Total Price: <span class="price">&#8369;560</span></p>
                            
                            <ion-button color="success" size="small" @click="details">View Details</ion-button> 
                    </ion-col>
            </ion-row>
            <ion-row class="ion-align-items-center">
                    <ion-col size="12" style="text-align:center;">
                        
                            <ion-badge  color="tertiary">Delivering</ion-badge><br>
                         <!-- Product Title --><a class="product-title"><span style="color:#feb041; font-size: 14px;">MangInasal - Batangas</span></a>
                            <!-- Product Price -->
                            <p class="sale-price">Order #S61910121</p>
                            <p class="sale-price">Ordered: <span class="price">09/17/2021 9:10pm</span></p>       
                            <p class="sale-price">Total Price: <span class="price">&#8369;560</span></p> 

                            <ion-button color="success" size="small" @click="details">View Details</ion-button> 
                    </ion-col>
            </ion-row>
            <ion-row class="ion-align-items-center">
                    <ion-col size="12" style="text-align:center;">
                        
                            <ion-badge color="tertiary">Delivered</ion-badge><br>
                         <!-- Product Title --><a class="product-title"><span style="color:#feb041; font-size: 14px;">MangInasal - Batangas</span></a>
                            <!-- Product Price -->
                            <p class="sale-price">Order #S61910121</p>
                            <p class="sale-price">Ordered: <span class="price">09/17/2021 9:10pm</span></p>    
                            <p class="sale-price">Delivered: <span class="price">09/17/2021 10:10pm</span></p>     
                            <p class="sale-price">Total Price: <span class="price">&#8369;560</span></p> 
                        <ion-button size="small" color="success" @click="details">View Details</ion-button>
                        </ion-col>
            </ion-row>
    </ion-content>

    
    
</template>


<style scoped>
ion-card-title {
    font-size: 16px;
    color: #feb041;
}
</style>
<script>
import {
    IonHeader, IonContent, IonToolbar, IonTitle,
    IonButtons, IonButton,
    modalController, IonBadge
} from '@ionic/vue';
import {addCircleOutline, removeCircleOutline, pencilOutline, trashOutline, closeCircleOutline } from 'ionicons/icons';
import { defineComponent} from 'vue';
import { useRouter } from 'vue-router';
import RiderOrderDetails from '@/components/Rider/RiderOrderDetails.vue';
export default defineComponent({
    name: "RiderOrderList",

    components: {
        IonHeader, IonContent, IonToolbar, IonTitle,
        IonButtons, IonButton, IonBadge
    },

    setup() {
        const router = useRouter();
        return {addCircleOutline, removeCircleOutline, pencilOutline, trashOutline, closeCircleOutline, router};
    },

    methods : {
        dismissModal() {
            modalController.dismiss();
        },
        async details() {
            modalController.dismiss();
            const modal = await modalController
                .create({
                component: RiderOrderDetails,
                cssClass: 'my-custom-class',
                })
            return modal.present();
        }    

    }
})
</script>

<style scoped>
ion-content {
--background: #f4f6ff;
}
.product-thumbnail img {
height: 70px; 
width: 100%; 
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
.cart-content ion-row {
 background: #fff;
 box-shadow: 2px 2px 6px rgba(0,0,0,0.05);
 padding: 5px;
 margin-bottom: 15px;
 border-radius: 10px;
}
.quantity ion-icon {
    font-size: 40px;
}
.quantity input {
    background: transparent;
    width: 30px;
    text-align: center;
    height: 40px;
    margin: 5px 2px;
    color: #000;
    border-radius: 10px;
    border: 2px solid #feb041;
}
.quantity {
display:flex;
align-items: center;
}
a.edit-link, a.delete-link  {
box-shadow: 1px 1px 6px rgba(0,0,0,0.05);
text-decoration: none;
padding: 5px 2px;
border-radius: 10%;
color: grey;
margin: 5px;
}
h6 {
    margin: 0;
}
</style>