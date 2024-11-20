<template>
  <Page actionBarHidden="true" class="page">
    <RadSideDrawer ref="drawer" drawerLocation="Right">
      <GridLayout ~drawerContent>
        <Menu @menuTap="onMenuTap" />
      </GridLayout>

      <StackLayout ~mainContent class="main-content">
        <GridLayout rows="auto, *">
          <!-- Header -->
          <GridLayout row="0" columns="auto, *" rows="auto" class="action-bar-layout">
            <Image src="~/images/gobackIcon.png" col="0" class="back-icon" @tap="goBack" />
            <Label text="Mes Commandes " col="1" class="category-title" />
          </GridLayout>

          <!-- Main Content -->
          <ScrollView row="1">
            <StackLayout>
              <StackLayout class="underline"></StackLayout>
              <StackLayout class="product-list">
                <GridLayout
                  v-for="(order, index) in personalizedOrders"
                  :key="index"
                  rows="auto, auto"
                  columns="*"
                  class="product-item"
                >
                  <!-- Description complète de la commande -->
                  <Label
                    :text="order.description"
                    row="0"
                    col="0"
                    class="product-name full-description"
                    textWrap="true"
                  />
                  <!-- Date de la commande au format DD/MM/YYYY -->
                  <Label
                    :text="formatDate(order.date)"
                    row="1"
                    col="0"
                    class="product-date"
                  />
                </GridLayout>
              </StackLayout>

              <StackLayout class="product-list">
                <GridLayout v-for="(order, index) in normalOrders" :key="index" rows="auto, auto, auto, auto" columns="auto, *, auto" class="product-item"
                >
                  <!-- Displaying normal order details -->
                  <Label :text="'Nom de l\'article: ' + order.order_item_name" row="0" col="1" class="product-name" />
                  <Label :text="'Date de commande: ' + order.order_date" row="1" col="1" class="product-date" />
                  <Label :text="'Statut: ' + order.order_status" row="2" col="1" class="product-status" />
                  <Label :text="'Type: ' + order.order_item_type" row="3" col="1" class="product-type" />
                </GridLayout>
              </StackLayout>
            </StackLayout>
          </ScrollView>
        </GridLayout>
      </StackLayout>
    </RadSideDrawer>
  </Page>
</template>
<script>
import Menu from './Menu.vue';
import { Http, ApplicationSettings } from '@nativescript/core';
import { Frame } from '@nativescript/core';

const API_URL_NORMAL = 'http://10.0.2.2:3000/Clients/orders';  // URL pour récupérer les commandes normales
const API_URL_PERSONALIZED = 'http://10.0.2.2:3000/Clients/p-order';

export default {
  name: 'MesCommandes',
  components: {
    Menu
  },
  data() {
    return {
      normalOrders: [], // Liste des commandes normales
      personalizedOrders: []  // Liste des commandes personnalisées
    };
  },
  methods: {
  formatDate(dateString) {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0'); // Ajoute un zéro si nécessaire
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },
    openDrawer() {
      if (this.$refs.drawer && this.$refs.drawer.nativeView) {
        this.$refs.drawer.nativeView.showDrawer();
      }
    },
    onMenuTap(item) {
      console.log(`Menu item tapped: ${item}`);
      if (this.$refs.drawer && this.$refs.drawer.nativeView) {
        this.$refs.drawer.nativeView.closeDrawer();
      }
    },
    goBack() {
      const frame = Frame.topmost();
      if (frame.canGoBack()) {
        frame.goBack();
      }
    },
    async fetchNormalOrders() {
      try {
        const token = ApplicationSettings.getString('token', '');
        if (!token) {
          console.log('Session expirée, veuillez vous reconnecter');
          return;
        }
        const response = await Http.request({
          url: API_URL_NORMAL,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });

        const data = response.content.toJSON();
        if (data && data.orders) {
          this.normalOrders = data.orders;
        } else {
          console.log('Aucune commande normale trouvée.');
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des commandes normales", error);
      }
    },
    async fetchPersonalizedOrders() {
      try {
        const token = ApplicationSettings.getString('token', '');
        if (!token) {
          console.log('Session expirée, veuillez vous reconnecter');
          return;
        }

        const response = await Http.request({
          url: API_URL_PERSONALIZED,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });

        const data = response.content.toJSON();
        if (data && data.personalizedOrders) {
          this.personalizedOrders = data.personalizedOrders;
        } else {
          console.log('Aucune commande personnalisée trouvée.');
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des commandes personnalisées", error);
      }
    },
    leaveReview(order) {
      console.log('Laisser un avis pour la commande:', order);
      // Implémentation de la logique pour laisser un avis
    }
  },
  created() {
    this.fetchNormalOrders();  // Récupérer les commandes normales au moment de la création du composant
    this.fetchPersonalizedOrders();  // Récupérer les commandes personnalisées
  }
};
</script>

<style scoped>
.page {
  background-color: #1C1D53;
}

.main-content {
  background-color: #1C1D53;
}

.action-bar-layout {
  padding: 10 16;
  background-color: #1C1D53;
  margin-top: 20;
}

.back-icon {
  width: 24;
  height: 24;
  vertical-align: middle;
  margin-right: 10;
}

.category-title {
  font-size: 20;
  font-weight: 700;
  color: #F8F8F8;
  vertical-align: middle;
}

.underline {
  height: 2;
  background-color: #FFD8C7;
  margin: 10 30 25 30;
}

.product-list {
  padding: 10;
}

.product-item {
  margin: 10 20;
  background-color: #1C1D53;
  border-radius: 10;
  padding: 15;
  border-width: 1;
  border-color: rgba(255, 255, 255, 0.1);
}

.product-image {
  width: 80;
  height: 80;
  border-radius: 10;
  margin-right: 10;
}

.product-name {
  font-size: 15;
  color: #FFFEFE;
  font-weight: 500;
}

.product-date {
  font-size: 13;
  color: #FFFEFE;
  font-weight: 300;
}

.product-status {
  font-size: 13;
  color: #E95322;
  margin-top: 0;
  margin-bottom: 3;
}

.review-button {
  font-size: 10;
  background-color: #FFDECF;
  color: #E95322;
  width: 100;
  height: 30;
  border-radius: 15;
  font-weight: 400;
  padding: 0;
  text-wrap: true;
  text-align: center;
  horizontal-align: left;
}

.product-quantity {
  font-size: 14;
  color: #FFFEFE;
  text-align: right;
  font-weight: 300;
}

.product-price {
  font-size: 16;
  font-weight: 700;
  color: #E9AA22;
  text-align: right;
}

ScrollView {
  background-color: #1C1D53;
}
</style>

