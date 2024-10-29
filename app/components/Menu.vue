<template>
    <StackLayout class="menu-container">
        <GridLayout rows="auto, auto" columns="auto, *" class="user-info">
            <Image src="~/images/contactIcon.png" row="0" col="0" rowSpan="2" class="menu-icon-title"/>
            <Label text="Tian Saris" row="0" col="1" class="title"/>
            <Label text="Loremipsum@email.com" row="1" col="1" class="menu-item-email"/>
        </GridLayout>
        <ScrollView>
            <StackLayout class="menu-items">
                <GridLayout rows="auto, auto" columns="auto, *"
                    class="menu-item-wrapper"
                    v-for="item in menuItems"
                    :key="item.text"
                    @tap="onTap(item.text)">
                    <Image :src="item.icon" row="0" col="0" class="menu-icon"/>
                    <Label :text="item.text" row="0" col="1" class="menu-item"/>
                    <StackLayout row="1" col="0" colSpan="2" class="menu-item-underline"/>
                </GridLayout>
            </StackLayout>
        </ScrollView>
    </StackLayout>
</template>

<script>
export default {
    name: 'Menu',
    data() {
        return {
            menuItems: [
                { text: 'Mes commandes', icon: '~/images/commandesIcon.png' },
                { text: 'Mon profile', icon: '~/images/profileIcon.png' },
                { text: 'Adresse de livraison', icon: '~/images/locationIcon.png' },
                { text: 'Nous contacter', icon: '~/images/phoneIcon.png' },
                { text: 'Paramètres', icon: '~/images/settingIcon.png' },
                { text: 'Se déconnecter', icon: '~/images/logoutIcon.png' }
            ]
        }
    },
    methods: {
        onTap(item) {
            this.$emit('menuTap', item);
        }
    }
}
</script>

<style scoped>
.title {
    font-size: 20;
    color: #F4FAFF;
    font-size: 17;
}

.menu-item-email {
    color: #F3E9B5;
}

.menu-icon-title {
    width: 40;
    height: 40;
    margin-right: 10;
}

.menu-container {
    background-color: #1C1D53;
    width: 100%;
    height: 100%;
    border-top-left-radius: 70;
    border-bottom-left-radius: 70;
    margin-top: 2%;
    margin-bottom: 2%;
    horizontal-align: right;
}

.menu-items {
    margin-top: 20;
    padding-bottom: 20;
}

.menu-item-wrapper {
    padding: 15 30;
    margin-bottom: 5;
}

.menu-icon {
    width: 28;
    height: 28;
    margin-right: 20;
    vertical-align: middle;
}

.menu-item {
    font-size: 18;
    color: #F3E9B5;
    text-align: left;
    font-weight: 500;
    font-family: "League Spartan", sans-serif;
    vertical-align: middle;
    padding-right: 10;
}

.user-info {
    padding: 35 20 30 30;
    margin-bottom: 10;
}

ScrollView {
    height: 100%;
}

.menu-item-underline {
    height: 1;
    background-color: rgba(243, 233, 181, 0.3);
    margin-top: 10;
    margin-bottom: 5;
}
</style>
