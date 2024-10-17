<template>
  <Page>
    <!-- Promotional Banner -->
    <StackLayout class="banner">
      <Image src="~/images/banner.jpg" stretch="aspectFill" />
      <Button text="Voir les offres" class="btn" />
    </StackLayout>

    <!-- Categories Grid -->
    <StackLayout class="categories">
      <Label text="Catégorie" class="title" />
      <GridLayout columns="*, *, *" rows="auto, auto, auto">
        <StackLayout v-for="category in categories" :key="category.name" colSpan="1" rowSpan="1" class="category">
          <Image :src="category.icon" stretch="aspectFit" />
          <Label :text="category.name" />
        </StackLayout>
      </GridLayout>
    </StackLayout>

    <!-- Bottom Navigation Bar -->
    <GridLayout rows="auto" columns="*, *, *, *, *" class="bottom-nav">
      <StackLayout v-for="item in navItems" :key="item.name" colSpan="1" class="nav-item">
        <Image :src="item.icon" stretch="aspectFit" />
        <Label :text="item.name" />
      </StackLayout>
    </GridLayout>
  </Page>
</template>

<script>
export default {
  data() {
    return {
      categories: [
        { name: 'Fruits', icon: '~/images/fruits-icon.png' },
        { name: 'Légumes', icon: '~/images/vegetables-icon.png' },
        { name: 'Pain', icon: '~/images/bread-icon.png' },
        { name: 'Poissons', icon: '~/images/seafood-icon.png' },
        // Ajoutez les autres catégories ici
      ],
      navItems: [
        { name: 'Accueil', icon: '~/images/home-icon.png' },
        { name: 'Recherche', icon: '~/images/search-icon.png' },
        { name: 'Panier', icon: '~/images/cart-icon.png' },
        { name: 'Promotions', icon: '~/images/promotions-icon.png' },
        { name: 'Profil', icon: '~/images/profile-icon.png' },
      ],
    };
  },
};
</script>

<style scoped>
.banner {
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
}

.banner img {
  width: 100%;
  height: auto;
}

.banner button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #ff6347;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.categories {
  width: 100%;
  text-align: center;
}

.grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.category {
  width: 45%;
  margin: 10px 0;
  text-align: center;
}

.category img {
  width: 50px;
  height: 50px;
}

.bottom-nav {
  width: 100%;
  display: flex;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
  background-color: #f8f8f8;
  padding: 10px 0;
}
</style>
