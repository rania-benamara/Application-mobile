<!-- components/ForgotPassword.vue -->
<template>
  <Page actionBarHidden="true">
    <StackLayout class="page-content">
      <StackLayout class="top-container">
        <Image src="~/images/goback1.png" class="go-back-icon" @tap="goBack" />
      </StackLayout>
      <ScrollView>
        <StackLayout>
          <Label text="Créer un nouveau" class="main-title" />
          <Label text="mot de passe" class="main-title" />
          <Label text="Entrer votre nouveau mote de passe" textWrap="true" class="subtitle" />
          <StackLayout class="input-field">
            <Label text="Nouveau mot de passe" class="input-label" />
            <GridLayout columns="*, auto" class="input-container">
              <TextField v-model="newPassword" hint="Entrez mot de passe" :secure="!showNewPassword" keyboardType="email" autocorrect="false" autocapitalizationType="none" class="input" col="0" />
              <Image :src="showNewPassword ? '~/images/Hide.png' : '~/images/show.png'" @tap="toggleNewPasswordVisibility" class="visibility-icon" col="1" />
            </GridLayout>
          </StackLayout>
          <StackLayout class="input-field">
            <Label text="Confirmer mot de passe" class="input-label" />
            <GridLayout columns="*, auto" class="input-container">
              <TextField v-model="confirmPassword" hint="Confirmer mot de passe" :secure="!showConfirmPassword" keyboardType="email" autocorrect="false" autocapitalizationType="none" class="input" col="0" />
              <Image :src="showConfirmPassword ? '~/images/Hide.png' : '~/images/show.png'" @tap="toggleConfirmPasswordVisibility" class="visibility-icon" col="1" />
            </GridLayout>
          </StackLayout>
          <Button text="Suivant" @tap="goLogin" class="submit-button" />
        </StackLayout>
      </ScrollView>
    </StackLayout>
  </Page>
</template>

<script>
import Login from './Login.vue';

export default {
  name: "ResetPassword",
  data() {
    return {
      newPassword: '',
      confirmPassword: '',
      showNewPassword: false,
      showConfirmPassword: false
    }
  },
  methods: {
    onSubmit() {
      console.log('New Password:', this.newPassword);
      console.log('Confirm Password:', this.confirmPassword);
    },
    goBack() {
      this.$navigateBack();
    },
    toggleNewPasswordVisibility() {
      this.showNewPassword = !this.showNewPassword;
    },
    toggleConfirmPasswordVisibility() {
      this.showConfirmPassword = !this.showConfirmPassword;
    },

    goLogin() {
      console.log("Attempting to navigate to Register");
                        this.$navigateTo(Login, {
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
}
</script>

<style scoped>
.page-content {
  padding: 0;
}
.top-container {
  padding-top: 20;
  padding-left: 20;
  height: 60;
}
.go-back-icon {
  width: 40;
  height: 40;
  vertical-align: top;
  horizontal-align: left;
}
.main-title {
  font-size: 28;
  font-weight: 600;
  margin-bottom: 5;
  margin-top: 5;
  color: #1F2C37;
  text-align: center;
}
.subtitle {
  font-size: 14;
  color: #9CA4AB;
  margin-bottom: 20;
  font-weight: 500;
  text-align: center;
  padding: 0 20;
}
.input-field {
  margin-bottom: 20;
  padding: 0 20;
}
.input-label {
  font-size: 14;
  margin-bottom: 5;
  font-weight: 600;
  color: #1F2C37;
}
.input-container {
  border-width: 2;
  border-color: #ECF1F6;
  border-radius: 20;
  height: 60;
}
.input {
  font-size: 16;
  padding: 10;
  padding-right: 40;
  border-width: 0;
  border-bottom-width: 0;
  font-weight: 500;
  background-color: transparent;
  placeholder-color: #9CA4AB;
}
.visibility-icon {
  width: 24;
  height: 24;
  vertical-align: center;
  margin-right: 10;
}
.submit-button {
  background-color: #010035;
  color: white;
  font-size: 18;
  font-weight: bold;
  padding: 15 10;
  border-radius: 5;
  margin: 20 20 0 20;
}
</style>
