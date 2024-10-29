<template>
    <Page actionBarHidden="true" class="backgr-livraison">
        <GridLayout rows="*, auto">
            <ScrollView row="0">
                <StackLayout class="page-content">
                    <Label text="<" class="boutton-retour" @tap="onBackTap" />
                    <Label text="Adresse de livraison" class="titre-pLivraison" />

                    <!-- Addresses List -->
                    <StackLayout class="addresses-container">
                        <!-- First Address -->
                        <GridLayout rows="auto, auto" columns="*" class="address-item">
                            <StackLayout row="0" class="address-content">
                                <Label text="Maison" class="address-title" />
                                <Label text="123 Rue Principal" class="address-line" />
                                <Label text="Montréal, QC H2X 1Y6" class="address-line" />
                                <Label text="Canada" class="address-line" />
                            </StackLayout>
                            <StackLayout row="1" class="address-underline"/>
                        </GridLayout>

                        <!-- Second Address -->
                        <GridLayout rows="auto, auto" columns="*" class="address-item">
                            <StackLayout row="0" class="address-content">
                                <Label text="Bureau" class="address-title" />
                                <Label text="456 Boulevard Saint-Laurent" class="address-line" />
                                <Label text="Montréal, QC H2Y 2X8" class="address-line" />
                                <Label text="Canada" class="address-line" />
                            </StackLayout>
                            <StackLayout row="1" class="address-underline"/>
                        </GridLayout>
                    </StackLayout>

                    <Button text="Ajouter une nouvelle adresse" @tap="onAddAddressTap" class="b-adress" />
                </StackLayout>
            </ScrollView>
            <!-- LogoBarre as navbar at the bottom -->
           <!-- <LogoBarre row="1" /> -->
        </GridLayout>
    </Page>
</template>

<script>
import LogoBarre from './LogoBarre.vue';
import AddLivraison from './AddLivraison.vue';

export default {
    name: "Livraison",
    components: {
        LogoBarre
    },
    methods: {
        onBackTap() {
            this.$navigateBack();
        },
        onAddAddressTap() {
            console.log("Attempting to navigate to Register");
            this.$navigateTo(AddLivraison, {
                transition: { name: "slide" }
            }).then(() => {
                console.log("Navigation to Register successful");
            }).catch(error => {
                console.error("Navigation to Register failed:", error);
            });
        }
    }
};
</script>

<style scoped>
.backgr-livraison {
    background-color: #1C1D53;
}

.boutton-retour {
    color: #E95322;
    font-size: 28px;
    margin-top: 20px;
    margin-left: 10px;
}

.titre-pLivraison {
    font-size: 28px;
    color: #F8F8F8;
    font-weight: bold;
    margin-top: 20px;
    text-align: center;
}

.addresses-container {
    margin-top: 30;
    padding: 0 20;
}

.address-item {
    margin-bottom: 20;
}

.address-content {
    padding: 15;
}

.address-title {
    color: #FFFFFF;
    font-size: 18;
    font-weight: bold;
    margin-bottom: 5;
}

.address-line {
    color: #F3E9B5;
    font-size: 14;
    margin-bottom: 2;
}

.address-underline {
    height: 1;
    background-color: rgba(243, 233, 181, 0.3);
    margin-top: 10;
}

.b-adress {
    width: 500px;
    padding: 10px;
    color: #E95322;
    background-color: #FFDECF;
    border-radius: 100px;
    font-size: 11px;
    font-weight: bold;
    margin-top: 60px;
    margin-left: auto;
    margin-right: auto;
}

.b-adress:hover {
    background-color: #FFDECF;
}

.custom-tabview {
    border-width: 0;
    separator-color: transparent;
}
</style>
