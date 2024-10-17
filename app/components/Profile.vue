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
