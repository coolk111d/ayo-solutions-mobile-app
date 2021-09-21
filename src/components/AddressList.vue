<template>
    <ion-header>
        <ion-toolbar>
             <ion-buttons slot="end">
                <ion-button @click="dismissModal"><ion-icon :icon="closeCircleOutline" /></ion-button>
            </ion-buttons>
            <ion-title>My Addresses</ion-title>
        </ion-toolbar>  
    </ion-header>

    <ion-content class="ion-padding  cart-content">
            <ion-row class="ion-align-items-center"  @click="editAddress">
                    <ion-col size="12" style="text-align:center;">
                        <ion-icon :icon="home" style="float:left; color: #000; font-size: 25px;"/>
                            <!-- Product Price -->
                        
                        <ion-icon :icon="navigateCircleOutline" style="float:right; color: #000; font-size: 25px;"/>  
                        <ion-icon :icon="trashOutline" style="float:right; color: #aaa;font-size: 25px;"/> 
                            <p class="sale-price">Blk 26 Lot 21</p>
                            <p class="sale-price">John St. South Ville</p>       
                            <p class="sale-price">Batangas City, Batangas</p> 
                        <ion-button size="small" style="--background:rgba(0,0,0,0.3); color:white;" disabled>Default</ion-button>
                    </ion-col>
            </ion-row>


            <ion-row class="ion-align-items-center"  @click="editAddress">
                    <ion-col size="12" style="text-align:center;">
                        <ion-icon :icon="home" style="float:left; color: #000; font-size: 25px;"/>
                            <!-- Product Price -->
                        
                        <ion-icon :icon="navigateCircleOutline" style="float:right; color: #000; font-size: 25px;" />  
                        <ion-icon :icon="trashOutline" style="float:right; color: #aaa;font-size: 25px;"/> 
                            <p class="sale-price">Blk 15 Lot 1</p>    
                            <p class="sale-price">Laguna City, Laguna</p> 
                        <ion-button size="small" style="--background:rgba(0,0,0,0.3); color:white;">Make Default</ion-button>
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
import {addCircleOutline, removeCircleOutline, pencilOutline, trashOutline, closeCircleOutline, home, navigateCircleOutline } from 'ionicons/icons';
import { defineComponent} from 'vue';
import { useRouter } from 'vue-router';
import AddressListAdd from '@/components/AddressListAdd.vue';
export default defineComponent({
    name: "AddressList",

    components: {
        IonHeader, IonContent, IonToolbar, IonTitle,
        IonButtons, IonButton,
    },

    setup() {
        const router = useRouter();
        return {addCircleOutline, removeCircleOutline, pencilOutline, trashOutline, closeCircleOutline, router, home, navigateCircleOutline};
    },

    methods : {
        dismissModal() {
            modalController.dismiss();
        },
        async editAddress() {
            modalController.dismiss();
            const modal = await modalController
                .create({
                component: AddressListAdd,
                cssClass: 'my-custom-class',
                })
            return modal.present();
        },
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