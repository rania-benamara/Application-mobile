<!-- components/Menu.vue -->
<template>
  <StackLayout class="menu-container" @tap="preventClose">
    <GridLayout rows="auto, auto" columns="auto, *" class="user-info">
          <Image src="~/images/contactIcon.png" row="0" col="0" rowSpan="2" class="user-icon"/>
          <Label text="Tian Saris" row="0" col="1" class="title"/>
          <Label text="Loremipsum@email.com" row="1" col="1" class="menu-item-email"/>
        </GridLayout>
    <ScrollView>
      <StackLayout class="menu-items">
        <GridLayout rows="auto, auto" columns="auto, *" class="menu-item-wrapper" @tap="onTap('Mes commandes')">
          <Image src="~/images/commandesIcon.png" row="0" col="0" class="menu-icon"/>
          <Label text="Mes commandes" row="0" col="1" class="menu-item"/>
          <StackLayout row="1" col="0" colSpan="2" class="menu-item-underline"/>
        </GridLayout>
        <GridLayout rows="auto, auto" columns="auto, *" class="menu-item-wrapper" @tap="onTap('Mon profile')">
          <Image src="~/images/profileIcon.png" row="0" col="0" class="menu-icon"/>
          <Label text="Mon profile" row="0" col="1" class="menu-item"/>
          <StackLayout row="1" col="0" colSpan="2" class="menu-item-underline"/>
        </GridLayout>
        <GridLayout rows="auto, auto" columns="auto, *" class="menu-item-wrapper" @tap="onTap('Adresse de livraison')">
          <Image src="~/images/locationIcon.png" row="0" col="0" class="menu-icon"/>
          <Label text="Adresse de livraison" row="0" col="1" class="menu-item"/>
          <StackLayout row="1" col="0" colSpan="2" class="menu-item-underline"/>
        </GridLayout>
        <GridLayout rows="auto, auto" columns="auto, *" class="menu-item-wrapper" @tap="onTap('Nous contacter')">
          <Image src="~/images/phoneIcon.png" row="0" col="0" class="menu-icon"/>
          <Label text="Nous contacter" row="0" col="1" class="menu-item"/>
          <StackLayout row="1" col="0" colSpan="2" class="menu-item-underline"/>
        </GridLayout>
        <GridLayout rows="auto, auto" columns="auto, *" class="menu-item-wrapper" @tap="onTap('Paramètres')">
          <Image src="~/images/settingIcon.png" row="0" col="0" class="menu-icon"/>
          <Label text="Paramètres" row="0" col="1" class="menu-item"/>
          <StackLayout row="1" col="0" colSpan="2" class="menu-item-underline"/>
        </GridLayout>
        <GridLayout rows="auto, auto" columns="auto, *" class="menu-item-wrapper" @tap="onTap('Se déconnecter')">
          <Image src="~/images/logoutIcon.png" row="0" col="0" class="menu-icon"/>
          <Label text="Se déconnecter" row="0" col="1" class="menu-item"/>
          <StackLayout row="1" col="0" colSpan="2" class="menu-item-underline"/>
        </GridLayout>
      </StackLayout>
    </ScrollView>
  </StackLayout>
</template>

<script>
export default {
  methods: {
    onTap(item) {
      this.$emit('menuTap', item);
    },
    preventClose(event) {
      event.stopPropagation();
    }
  }
}
</script>

<style scoped>
.menu-container {
  background-color: #1C1D53;
  width: 80%;
  height: 100%;
  border-top-left-radius: 70;
  border-bottom-left-radius: 70;
  margin-top: 5%;
  margin-bottom: 5%;
  horizontal-align: right;
}
.title {
  font-size: 20;
  font-weight: 400;
  color: #F4FAFF;
  margin: 20 0 0 10;
  text-align: left;
}

.user-info {
  padding: 35 20 20 30;
}
.user-icon {
  width: 50;
  height: 50;
  border-radius: 22;
  margin-right: 15;
  vertical-align: middle;
}

.menu-item-email {
  font-size: 15;
  color: #F3E9B5;
  margin: 3 0 10 10;
}
.menu-items {
  margin-top: 20;
}
.menu-item-wrapper {
  padding: 10 30;
}
.menu-icon {
  width: 24;
  height: 24;
  margin-right: 15;
  vertical-align: middle;
}
.menu-item {
  font-size: 20;
  color: #F3E9B5;
  text-align: left;
  font-weight: 500;
  font-family: "League Spartan", sans-serif;
  vertical-align: middle;
}
.menu-item-underline {
  height: 1;
  background-color: rgba(243, 233, 181, 0.3);
  margin-top: 10;
}
</style>
