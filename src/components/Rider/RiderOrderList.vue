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
        <ion-row class="ion-align-items-center" v-for="order in orders" :key="order.id">
            <ion-col size="12" style="text-align:center;">
                <a class="product-title" href=""><span style="color:#feb041; font-size: 14px;">Order #{{order.tracking_number}}</span></a>
                <p class="sale-price">Status: {{order.status}}</p>
                <p class="sale-price">Delivery Time: <span class="price">{{order.delivery_date}}</span></p>
                <p class="sale-price">Total Price: <span class="price">&#8369;{{order.total_price_with_tax}}</span></p>
                <ion-button size="small" @click="orderDetails(order.id)">View Details</ion-button>
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
import axios from "axios";
import { Storage } from '@ionic/storage';
import RiderOrderDetails from '@/components/Rider/RiderOrderDetails.vue';
export default defineComponent({
    name: "RiderOrderList",

    components: {
        IonHeader, IonContent, IonToolbar, IonTitle,
        IonButtons, IonButton
    },
    data() {
        return {
            customerId: Number,
            orders: []
        }
    },

    setup() {
        const storage = new Storage();
        storage.create();
        const router = useRouter();
        return {addCircleOutline, removeCircleOutline, pencilOutline, trashOutline, closeCircleOutline, router, storage};
    },

    methods : {
        dismissModal() {
            modalController.dismiss();
        },
        // async details() {
        //     modalController.dismiss();
        //     const modal = await modalController
        //         .create({
        //         component: RiderOrderDetails,
        //         cssClass: 'my-custom-class',
        //         })
        //     return modal.present();
        // },
        async getOrders() {
            const d = await this.storage.get('authUser');

            axios({
                method: "GET",
                url: `${process.env.VUE_APP_ROOT_API}/mobile-api/orders`,
                headers: {
                    Authorization: `Bearer ${d.token}`
                }
            }).then(res => {
                const data = res.data;

                if (data.success) {
                    console.log(data.data);
                    this.orders = data.data
                } else {
                    console.log(data.message);
                }

            }).catch(err => {
                console.log(err);
            });
        },
        async orderDetails(id) {
            modalController.dismiss();
            const modal = await modalController
                .create({
                component: RiderOrderDetails,
                cssClass: 'my-custom-class',
                componentProps: {
                    orderID: id
                }
                })
            return modal.present();
        },

    },
    beforeMount() {
        this.getOrders();
    },
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
