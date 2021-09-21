<template>
    <ion-header>
        <ion-toolbar>
             <ion-buttons slot="end">
                <ion-button @click="dismissModal"><ion-icon :icon="closeCircleOutline" /></ion-button>
            </ion-buttons>
            <ion-title>My Orders</ion-title>
        </ion-toolbar>  
    </ion-header>

    <ion-content class="ion-padding  cart-content">
            <ion-row class="ion-align-items-center">
                    <ion-col size="12" style="text-align:center;">
                         <!-- Product Title --><a class="product-title" href=""><span style="color:#feb041; font-size: 14px;">Jolibee- Batangas</span></a>
                            <!-- Product Price -->
                            <p class="sale-price">Order #S10928102</p>
                            <p class="sale-price">Ordered: <span class="price">09/21/2021 8:10pm</span></p>       
                            <p class="sale-price">Total Price: <span class="price">&#8369;230</span></p>       
                            <ion-button size="small" @click="orderDetails">Order Details</ion-button>
                    </ion-col>
            </ion-row>

            <ion-row class="ion-align-items-center">
                    <ion-col size="12" style="text-align:center;">
                         <!-- Product Title --><a class="product-title" href=""><span style="color:#feb041; font-size: 14px;">MangInasal - Batangas</span></a>
                            <!-- Product Price -->
                            <p class="sale-price">Order #S61910121</p>
                            <p class="sale-price">Ordered: <span class="price">09/17/2021 9:10pm</span></p>       
                            <p class="sale-price">Total Price: <span class="price">&#8369;560</span></p>       
                            <ion-button size="small" @click="orderDetails">Order Details</ion-button>
                    </ion-col>
            </ion-row>

            <ion-row class="ion-align-items-center">
                    <ion-col size="12" style="text-align:center;">
                         <!-- Product Title --><a class="product-title" href=""><span style="color:#feb041; font-size: 14px;">Chowking - Batangas</span></a>
                            <!-- Product Price -->
                            <p class="sale-price">Order #S61910801</p>
                            <p class="sale-price">Ordered: <span class="price">09/17/2021 9:10pm</span></p>       
                            <p class="sale-price">Total Price: <span class="price">&#8369;520</span></p>       
                            <ion-button size="small" @click="orderDetails">Order Details</ion-button>
                    </ion-col>
            </ion-row>

            <ion-row class="ion-align-items-center">
                    <ion-col size="12" style="text-align:center;">
                         <!-- Product Title --><a class="product-title" href=""><span style="color:#feb041; font-size: 14px;">Mcdo - Batangas</span></a>
                            <!-- Product Price -->
                            <p class="sale-price">Order #S61213411</p>
                            <p class="sale-price">Ordered: <span class="price">09/14/2021 9:10pm</span></p>       
                            <p class="sale-price">Total Price: <span class="price">&#8369;120</span></p>       
                            <ion-button size="small" @click="orderDetails">Order Details</ion-button>
                    </ion-col>
            </ion-row>

            <ion-row class="ion-align-items-center">
                    <ion-col size="12" style="text-align:center;">
                         <!-- Product Title --><a class="product-title" href=""><span style="color:#feb041; font-size: 14px;">Mcdo - Batangas</span></a>
                            <!-- Product Price -->
                            <p class="sale-price">Order #S61213411</p>
                            <p class="sale-price">Ordered: <span class="price">09/14/2021 9:10pm</span></p>       
                            <p class="sale-price">Total Price: <span class="price">&#8369;120</span></p>       
                            <ion-button size="small" @click="orderDetails">Order Details</ion-button>
                    </ion-col>
            </ion-row>

            <ion-row class="ion-align-items-center">
                    <ion-col size="12" style="text-align:center;">
                         <!-- Product Title --><a class="product-title" href=""><span style="color:#feb041; font-size: 14px;">Mcdo - Batangas</span></a>
                            <!-- Product Price -->
                            <p class="sale-price">Order #S61213411</p>
                            <p class="sale-price">Ordered: <span class="price">09/14/2021 9:10pm</span></p>       
                            <p class="sale-price">Total Price: <span class="price">&#8369;120</span></p>       
                            <ion-button size="small" @click="orderDetails">Order Details</ion-button>
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
    modalController
} from '@ionic/vue';
import {addCircleOutline, removeCircleOutline, pencilOutline, trashOutline, closeCircleOutline } from 'ionicons/icons';
import { defineComponent} from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: "OrderList",

    components: {
        IonHeader, IonContent, IonToolbar, IonTitle,
        IonButtons, IonButton,
    },

    setup() {
        const router = useRouter();
        return {addCircleOutline, removeCircleOutline, pencilOutline, trashOutline, closeCircleOutline, router};
    },

    methods : {
        dismissModal() {
            modalController.dismiss();
        },
        orderDetails() {
            modalController.dismiss();
            this.router.push('/order-details');
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