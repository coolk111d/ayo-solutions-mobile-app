<template>
    <ion-page>
        <Header/>

        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">Home</ion-title>
                </ion-toolbar>
            </ion-header>

            <ion-slides pager="true" :options="slideOpts">
                <ion-slide>
                    <div class="ayo-slider ayo-food-slider">
                        <h1>Food</h1>
                    </div>
                </ion-slide>

                <ion-slide>
                 <div class="ayo-slider ayo-logistic-slider">
                        <h1>Logistic</h1>
                    </div>
                </ion-slide>

                <ion-slide>
                 <div class="ayo-slider ayo-handyman-slider">
                        <h1>Handyman</h1>
                    </div>
                </ion-slide>

                <ion-slide>
                 <div class="ayo-slider ayo-store-slider">
                        <h1>Store</h1>
                    </div>
                </ion-slide>
            </ion-slides>
           <ExploreContainer name="Welcome!" />
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import { IonSlides, IonSlide } from '@ionic/vue';
import Header from '@/components/Header.vue';

export default  {
    name: 'Home',
    components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, Header, IonSlides, IonSlide, ExploreContainer },
    setup() {
    const slideOpts = {
      initialSlide: 0,
      speed: 700,
      loop: 1
    };
    return { slideOpts }
  }
}
</script>
