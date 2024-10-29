<template>
    <Page actionBarHidden="true" class="page">
        <RadSideDrawer ref="drawer" drawerLocation="Right">
            <GridLayout ~drawerContent>
                <Menu @menuTap="onMenuTap"/>
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
                            <StackLayout class="product-list">
                                <GridLayout v-for="(order, index) in orders"
                                    :key="index"
                                    rows="auto, auto, auto, auto"
                                    columns="auto, *, auto"
                                    class="product-item">
                                    <Image :src="order.image"
                                        row="0"
                                        col="0"
                                        rowSpan="4"
                                        class="product-image"/>
                                    <Label :text="order.number"
                                        row="0"
                                        col="1"
                                        class="product-name"/>
                                    <Label :text="order.date"
                                        row="1"
                                        col="1"
                                        class="product-date"/>
                                    <Label :text="order.status"
                                        row="2"
                                        col="1"
                                        class="product-status"/>
                                    <Button text="Laissez un avis"
                                        row="3"
                                        col="1"
                                        class="review-button"
                                        @tap="leaveReview(order)"/>
                                    <Label :text="order.total"
                                        row="0"
                                        col="2"
                                        class="product-price"/>
                                    <Label :text="order.items"
                                        row="1"
                                        col="2"
                                        class="product-quantity"/>
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
import Menu from './Menu.vue'
import { Frame } from '@nativescript/core'

export default {
    name: 'MesCommandes',
    components: {
        Menu
    },
    data() {
        return {
            orders: [
                {
                    id: 1,
                    date: '20 Oct 2023',
                    number: 'Commande #12345',
                    status: 'Produit expédié',
                    image: '~/images/1.png',
                    items: '3 articles',
                    total: '92.00 €'
                },
                // Add more orders as needed
            ]
        }
    },
    methods: {
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
        leaveReview(order) {
            console.log('Leave review for order:', order.id);
            // Implement review functionality
        }
    }
}
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
    font-size: 20;
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
