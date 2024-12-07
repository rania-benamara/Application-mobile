<template>
  <Page class="page">
    <!-- ActionBar avec le bouton de retour et fond bleu foncé -->
    <ActionBar title="Profil" class="action-bar">
      <NavigationButton icon="~/images/back_icone.png" @tap="goBack" ios.position="left" />
    </ActionBar>

    <!-- Contenu de la page -->
    <GridLayout rows="auto, *" columns="*">
      <!-- Image de fond qui occupe tout l'écran -->
      <Image src="~/images/fondProfil.png" stretch="aspectFill" class="background-image" rowSpan="2" />

      <!-- Conteneur pour le nom de l'utilisateur, superposé à l'icône de profil dans le fond -->
      <StackLayout row="0" class="profile-header">
        <!-- Le nom est superposé à l'icône de profil qui est incluse dans le background -->
        <Label :text="fullName" class="user-name-overlay" />
      </StackLayout>

      <!-- Contenu principal avec le formulaire, dans la moitié inférieure -->
      <StackLayout row="1" class="profile-content">
        <ScrollView>
          <StackLayout class="profile-page">
            <!-- Formulaire de profil -->
            <StackLayout class="form">
              <StackLayout class="form-group">
                <Label text="Nom complet" class="label" />
                <TextField v-model="fullName" class="input" />
              </StackLayout>

              <StackLayout class="form-group">
                <Label text="Email" class="label" />
                <TextField v-model="email" class="input" keyboardType="email" />
              </StackLayout>

              <StackLayout class="form-group">
                <Label text="Numérooo de téléphone" class="label" />
                <TextField v-model="phone" class="input" keyboardType="phone" />
              </StackLayout>

              <StackLayout class="form-group">
                <Label text="Adresse" class="label" />
                <TextView v-model="address" class="input textarea" />
              </StackLayout>

              <Button text="Enregistrer" class="save-button" @tap="onSaveTap" />
            </StackLayout>
          </StackLayout>
        </ScrollView>
      </StackLayout>
    </GridLayout>
  </Page>
</template>
<script>
import Menu from './Menu.vue';
import { ApplicationSettings } from '@nativescript/core';

export default {
  name: "Profile",
  components: {
    Menu
  },
  data() {
    return {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      errorMessage: '', // Pour afficher les erreurs s'il y en ae
      successMessage: '' // Pour afficher le succès de l'enregistrement
    };
  },
  //ff
  methods: {
    goBack() {
      this.$navigateBack(); // Fonction pour revenir à la page précédente
    },
    async onSaveTap() {
      console.log("Enregistrer les modifications");

      // Vérification si les champs sont remplis avant d'envoyer la requête
      if (!this.fullName || !this.email || !this.phone || !this.address) {
        this.errorMessage = "Tous les champs doivent être remplis.";
        return;
      }

      // Vérification du format de l'adresse
const addressPattern = /^\d+\s+[a-zA-Z\s]+(?:\s+app\d+)?\s+[A-Za-z]\d[A-Za-z]\s?\d[A-Za-z]\d\s+[a-zA-Z\s]+$/;

      if (!addressPattern.test(this.address)) {
        alert("Veuillez entrer une adresse au format suivant :\n\n- '40 NomRue AppNum H1E 4B9 Ville Province'\n- ou \n'40 NomRue H1E 4B9 Ville Province'");
        this.errorMessage = "Format d'adresse incorrect.";
        return;
      }

      try {
        // Récupérer le token pour l'authentification
        const token = this.getToken();
        if (!token) {
          this.errorMessage = "Token non valide. Veuillez vérifier votre connexion.";
          console.error("Token manquant");
          return;
        }

        // Préparer les données à envoyer, en gardant nom_complet et adresse en entier
        const updatedProfile = {
          nom_complet: this.fullName,   // Envoyer le nom complet
          email: this.email,
          telephone: this.phone,
          adresse: this.address          // Envoyer l'adresse complète
        };

        // Effectuer la requête PUT pour mettre à jour le profil
        const response = await fetch("https://dev-api.wnsansgluten.ca/Clients/profile", {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(updatedProfile)
        });

        console.log("Réponse brute:", response);

        if (!response.ok) {
          this.errorMessage = `Erreur HTTP: ${response.status}`;
          console.error("Erreur HTTP:", response.status, response.statusText);
          return;
        }

        const data = await response.json();
        console.log("Réponse serveur:", data);
        // Afficher une alerte de succès
              alert("Les modifications ont été enregistrées avec succès !");

        if (data && data.message === "Profil mis à jour avec succès") {
          this.successMessage = "Profil mis à jour avec succès!";
          this.errorMessage = ''; // Réinitialiser les erreurs
        } else {
          this.errorMessage = "Une erreur est survenue lors de la mise à jour du profil.";
        }

      } catch (error) {
        console.error("Erreur lors de l'enregistrement des données :", error.message);
        this.errorMessage = "Une erreur est survenue lors de l'enregistrement.";
      }
    },

    async fetchUserProfile() {
      console.log("Début de fetchUserProfile");
      try {
        // Récupérer le token
        const token = this.getToken();
        if (!token) {
          this.errorMessage = "Token non valide. Veuillez vérifier votre connexion.";
          console.error("Token manquant");
          return; // Sortie si le token n'est pas valide
        }

        console.log("Token utilisé :", token);

        // Effectuer la requête GET pour récupérer le profil
        const response = await fetch("https://dev-api.wnsansgluten.ca/Clients/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Utilisation du token dans les en-têtes
          },
        });

        console.log("Réponse brute:", response);

        if (!response.ok) {
          this.errorMessage = `Erreur HTTP: ${response.status}`;
          console.error("Erreur HTTP:", response.status, response.statusText);
          return;
        }

        const data = await response.json();
        console.log("Données reçues :", data);

        // Vérification des données reçues
        if (data) {
          this.fullName = data.nom_complet || '';  // Nom complet de l'utilisateur
          this.email = data.email || '';            // Email de l'utilisateur
          this.phone = data.telephone || '';        // Téléphone de l'utilisateur
          this.address = data.adresse || '';        // Adresse de l'utilisateur
        } else {
          this.errorMessage = "Aucune donnée disponible.";
        }

      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error.message);
        this.errorMessage = "Une erreur est survenue lors de la récupération des données.";
      }
    },
    getToken() {
      // Récupérer le token stocké dans ApplicationSettings
      const token = ApplicationSettings.getString('token');
      console.log("Récupération du token:", token);
      return token;
    }
  },
  mounted() {
    console.log("Montage du composant profil");
    this.fetchUserProfile(); // Appel de la fonction pour récupérer les données du profil dès que le composant est monté
  }
};
</script>



<style scoped>
/* ActionBar */
.action-bar {
  background-color: rgba(28, 29, 83, 1); /* Bleu foncé */
  color: white; /* Le texte sera blanc pour le contraste */
}

/* Page de profil */
.page {
  background-color: transparent;
  height: 100%;
  width: 100%;
}

/* Image de fond */
.background-image {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1; /* L'image de fond reste derrière le contenu */
}

/* Conteneur de contenu du profil */
.profile-content {
  height: 100%;
  z-index: 1;
  padding: 20px;
}

/* Superposition du nom d'utilisateur */
.user-name-overlay {
  font-size: 18px;
  margin-top: 60px;
  font-weight: bold;
  color: white; /* Blanc pour se démarquer du fond */
  text-align: center;
}

/* Contenu de la page de profil */
.profile-page {
  height: 100%;
}

/* Formulaire */
.form {
  margin-top: 600px;
  height: 100%;
}

/* Groupe de champs de formulaire */
.form-group {
  margin-bottom: 15px;
}

.label {
  font-size: 14px;
  color: #666; /* Couleur gris foncé pour le texte */
  margin-bottom: 10px;
}

.input {
  background-color: #f5f5f5; /* Couleur de fond gris clair */
  border-radius: 10px;
  padding: 10px;
  border: 1px solid #ccc; /* Bordure grise */
  font-size: 16px;
}

/* Zone de texte pour l'adresse */
.textarea {
  height: 80px;
}

/* Bouton de sauvegarde */
.save-button {
  background-color: #1A237E; /* Bleu foncé */
  color: white; /* Texte blanc */
  padding: 15px;
  border-radius: 25px;
  width: 50%;
  font-size: 16px;
  text-align: center;
  align-self: center; /* Centrer le bouton horizontalement */
}
</style>

