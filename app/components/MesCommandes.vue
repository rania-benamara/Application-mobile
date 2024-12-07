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
            <Label text="Mes Commandes" col="1" class="category-title" />
          </GridLayout>

          <!-- Main Content -->
          <ScrollView row="1">
            <StackLayout>
              <StackLayout class="underline"></StackLayout>

              <!-- Liste des Commandes Normales -->
              <StackLayout>
                        <!-- Liste des Commandes Normales -->
                        <Label text="Commandes " class="section-title" />
                        <StackLayout v-for="(order, index) in normalOrders" :key="index" class="order-card">
                          <Label
                            :text="'Commande du: ' + formatDate(order.orderDate)"
                            class="order-date"
                          />
                          <Label
                            v-for="(product, idx) in order.products"
                            :key="idx"
                            :text="'- ' + product"
                            class="order-product"
                          />
                        </StackLayout>

                        <!-- Liste des Commandes Personnalisées -->
                        <Label text="Commandes Personnalisées" class="section-title" />
                        <StackLayout v-for="(order, index) in personalizedOrders" :key="index" class="order-card">
                          <Label
                            :text="order.description"
                            class="order-product"
                            textWrap="true"
                          />
                          <Label
                            :text="'Date : ' + formatDate(order.date)"
                            class="order-date"
                          />
                        </StackLayout>
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

const API_URL_NORMAL = 'https://dev-api.wnsansgluten.ca/Orders/'; // Commandes normales
const API_URL_PERSONALIZED = 'https://dev-api.wnsansgluten.ca/Clients/p-order'; // Commandes personnalisées

export default {
  name: 'MesCommandes',
  components: { Menu },
  data() {
    return {
      normalOrders: [], // Commandes normales
      personalizedOrders: [] // Commandes personnalisées
    };
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
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
        this.normalOrders = data.orders || [];
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
        this.personalizedOrders = data.personalizedOrders || [];
      } catch (error) {
        console.error("Erreur lors de la récupération des commandes personnalisées", error);
      }
    }
  },
  created() {
    this.fetchNormalOrders();
    this.fetchPersonalizedOrders();
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
.page {
  background-color: #1b1b3a;
}

.main-content {
  padding: 16px;
}

.section-title {
  font-size: 20px;
  font-weight: bold;
  color: #E95322;
  margin-top: 25px;
  margin-bottom: 8px;
  text-align: center;

}

.order-card {
  background-color: #292b4d;
  padding: 16px;
  margin-bottom: 12px;
  border-radius: 8px;
  shadow-color: #000;
  shadow-opacity: 0.2;
  shadow-radius: 4px;
}

.order-date {
  font-size: 14px;
  color: #a5b4fc;
  margin-bottom: 8px;
}

.order-product {
  font-size: 16px;
  color: #ffffff;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>

