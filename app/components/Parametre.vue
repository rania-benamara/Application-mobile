<template>
  <Page class="page">
    <!-- ActionBar avec bouton de retour -->
    <ActionBar title="Paramètres" class="action-bar">
      <NavigationButton icon="~/images/back_icone.png" @tap="goBack" ios.position="left" />
    </ActionBar>

    <!-- Contenu principal -->
    <StackLayout class="settings-content">
      <!-- Bouton "Changer mot de passe" -->
      <GridLayout columns="50, *" rows="auto" @tap="goToChangePassword" class="settings-button">
        <Image src="~/images/key_icon.png" class="settings-icon" col="0" />
        <Label text="Changer mot de passe" class="settings-text" col="1" @tap="goChangePwd" />
      </GridLayout>

      <!-- Bouton "Supprimer mon compte" -->
      <GridLayout columns="50, *" rows="auto" @tap="goDelete" class="settings-button">
        <Image src="~/images/profileJaune_icon.png" class="settings-icon" col="0" />
        <Label text="Supprimer mon compte" class="settings-text" col="1"/>
      </GridLayout>
    </StackLayout>
  </Page>
</template>

<script>
import Menu from './Menu.vue';
import { Frame } from '@nativescript/core';
import ChangeMotpasse from './ChangeMotpasse.vue';
import SupprimerProfile from './SupprimerProfile.vue'

export default {
  name: "Parametre",
  components: {
           Menu
  },
  methods: {
    goBack() {
      this.$navigateBack(); // Retour à la page précédente
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
    goChangePwd() {
        console.log("Attempting to navigate to Register");
                    this.$navigateTo(ChangeMotpasse, {
                      transition: {
                        name: "slide"
                      }
                    }).then(() => {
                      console.log("Navigation to Register successful");
                    }).catch(error => {
                      console.error("Navigation to Register failed:", error);
                    });
    },

    goDelete() {
        console.log("Attempting to navigate to Register");
                            this.$navigateTo(SupprimerProfile, {
                              transition: {
                                name: "slide"
                              }
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
.page {
  background-color: #0f144a; /* Bleu foncé */
}

.action-bar {
  background-color: #0f144a; /* Couleur bleu foncé pour la barre de navigation */
  color: white;
}

.settings-content {
  padding: 30px;
  margin-top: 400px;
}

.settings-button {
  flex-direction: row;
  align-items: center;
  padding: 50px 0;
  margin-bottom: 50px;
  justify-content: flex-start; /* Assure que l'alignement commence à gauche */
}

.settings-icon {
  width: 70px;
  height: 70px;
  margin-left: 140px; /* Décale l'icône vers la gauche */
}

.settings-text {
  font-size: 20px;
  color: white;
  font-weight: bold;
  margin-left: 100px; /* Décale le texte vers la droite */
}
</style>
