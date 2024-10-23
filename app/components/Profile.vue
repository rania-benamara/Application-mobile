<template>
  <Page class="page">
    <!-- ActionBar avec le bouton de retour et fond bleu foncé -->
    <ActionBar title="Profil" class="action-bar">
      <NavigationButton icon="~/images/back_icone.png" @tap="goBack" ios.position="left" />
    </ActionBar>

    <!--hhhhtthh Contenu de la page -->
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
                <Label text="Numéro de téléphone" class="label" />
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
export default {
  data() {
    return {
      fullName: 'Tiana Saris', // Nom par défaut
      email: 'BrooklynSimmons@gmail.com',
      phone: '+1 3712 3789',
      address: ''
    };
  },
  methods: {
    goBack() {
      this.$navigateBack(); // Fonction pour revenir à la page précédente
    },
    onSaveTap() {
      // Logique pour enregistrer les modifications
    }
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
