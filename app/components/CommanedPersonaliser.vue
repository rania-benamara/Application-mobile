<template>
  <Page backgroundColor="#1C1D53" actionBarHidden="true">
    <GridLayout rows="auto, *">
      <!-- Top bar with back button -->
      <StackLayout row="0" class="top-bar">
        <Image src="~/images/img.png"
       @tap="onGoBack"
       class="back-image"
       width="120"
       height="120"
       stretch="none"
       horizontalAlignment="left"/>

      </StackLayout>

      <!-- Main content -->
      <ScrollView row="1">
        <StackLayout class="custom-order">
          <Label text="Créer votre propre commande"
                 class="title"
                 color="white"/>

          <GridLayout rows="auto, auto, auto, auto" class="form">
            <!-- Date -->
            <StackLayout row="0" class="input-group">
              <Label text="Date:" class="label" color="white"/>
              <TextField v-model="orderData.date"
                        hint="AAAA-MM-JJ"
                        class="input"
                        backgroundColor="white"
                        :isEnabled="!isLoading"/>
            </StackLayout>

            <!-- Téléphone -->
            <StackLayout row="1" class="input-group">
              <Label text="Numéro de téléphone:" class="label" color="white"/>
              <TextField v-model="orderData.phone"
                        hint="0123456789"
                        keyboardType="phone"
                        class="input"
                        backgroundColor="white"
                        :isEnabled="!isLoading"/>
            </StackLayout>

            <!-- Description -->
            <StackLayout row="2" class="input-group">
              <Label text="Description:" class="label" color="white"/>
              <TextView v-model="orderData.description"
                       hint="Décrivez votre commande..."
                       class="input description"
                       backgroundColor="white"
                       :isEnabled="!isLoading"/>
            </StackLayout>

            <!-- Submit Button -->
            <Button row="3"
                   :text="isLoading ? 'Chargement...' : 'Passer la commande'"
                   @tap="onSubmit"
                   :isEnabled="!isLoading"
                   class="submit-btn"/>
          </GridLayout>
        </StackLayout>
      </ScrollView>
    </GridLayout>
  </Page>
</template>

<script>
import { Http, ApplicationSettings } from '@nativescript/core';
import Login from './Login.vue';

export default {
  name: 'CommanedPersonaliser',

  data() {
    return {
      orderData: {
        date: '',
        phone: '',
        description: ''
      },
      isLoading: false,
      apiUrl: 'https://dev-api.wnsansgluten.ca/Clients/personalized-order'
    }
  },

  created() {
    this.checkInitialAuth();
  },

  mounted() {
    const token = ApplicationSettings.getString('token', '');
    console.log('Token on mount:', token ? 'Token exists' : 'No token');
  },

  methods: {
    checkInitialAuth() {
      const token = ApplicationSettings.getString('token', '');
      console.log('Initial auth check - Token:', token ? 'exists' : 'missing');
      if (!token) {
        console.log('No initial token, redirecting to login');
        this.$navigateTo(Login, {
          clearHistory: true
        });
      }
    },

    onSubmit() {
      console.log('Submit button clicked');
      if (this.checkAuthentication()) {
        this.submitOrder();
      }
    },

    checkAuthentication() {
      const token = ApplicationSettings.getString('token', '');
      console.log('Checking authentication - Token:', token ? 'exists' : 'missing');

      if (!token) {
        console.log('No token found during check');
        alert("Veuillez vous connecter");
        this.$navigateTo(Login, {
          clearHistory: true
        });
        return false;
      }
      return true;
    },

    async submitOrder() {
      try {
        const token = ApplicationSettings.getString('token', '');
        console.log('Submitting order - Token:', token ? 'exists' : 'missing');

        if (!token) {
          console.log('No token found during submit');
          alert("Veuillez vous connecter");
          this.$navigateTo(Login, {
            clearHistory: true
          });
          return;
        }

        if (!this.validateFormData()) {
          return;
        }

        this.isLoading = true;

        // Format data to match backend expectations exactly
        const formattedData = {
          description: this.orderData.description.trim(),
          date: this.orderData.date.trim(),
          telephone: this.orderData.phone.trim() // Note: backend expects 'telephone'
        };

        console.log('Sending request with data:', formattedData);

        const response = await Http.request({
          url: this.apiUrl,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          content: JSON.stringify(formattedData)
        });

        console.log('Response status:', response.statusCode);

        let responseData;
        try {
          responseData = response.content.toJSON();
          console.log('Parsed response data:', responseData);
        } catch (error) {
          console.error('Response parsing error:', error);
          throw new Error('Erreur de réponse du serveur');
        }

        // Match backend response status codes
        switch (response.statusCode) {
          case 201:
          case 200:
            alert("Commande personnalisée ajoutée avec succès");
            this.clearForm();
            this.$navigateBack();
            break;
          case 400:
            alert(responseData.message || "Veuillez remplir tous les champs!");
            break;
          case 401:
            ApplicationSettings.setString('token', '');
            alert("Session expirée. Veuillez vous reconnecter.");
            this.$navigateTo(Login, {
              clearHistory: true
            });
            break;
          case 500:
            throw new Error("Erreur lors de la création de la commande personnalisée.");
          default:
            throw new Error(responseData.message || "Une erreur inattendue est survenue.");
        }

      } catch (error) {
        console.error('Error details:', error);
        if (error.response?.statusCode === 401 || error.message.includes('Unauthorized')) {
          ApplicationSettings.setString('token', '');
          alert("Session expirée. Veuillez vous reconnecter.");
          this.$navigateTo(Login, {
            clearHistory: true
          });
        } else {
          alert(error.message || "Une erreur est survenue. Veuillez réessayer.");
        }
      } finally {
        this.isLoading = false;
      }
    },

    validateFormData() {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!this.orderData.date.trim() || !dateRegex.test(this.orderData.date.trim())) {
        alert("Veuillez entrer une date valide au format AAAA-MM-JJ");
        return false;
      }

      if (!this.validatePhone(this.orderData.phone.trim())) {
        alert("Veuillez entrer un numéro de téléphone valide");
        return false;
      }

      if (!this.orderData.description.trim()) {
        alert("Veuillez entrer une description");
        return false;
      }

      return true;
    },

    validatePhone(phone) {
      const phoneRegex = /^[0-9]{10}$/;
      return phoneRegex.test(phone);
    },

    onGoBack() {
      this.$navigateBack();
    },

    clearForm() {
      this.orderData = {
        date: '',
        phone: '',
        description: ''
      };
    }
  }
}
</script>

<style scoped>
.top-bar {
  height: 130;
  padding-left: 20;
  padding-top: 25;
  background-color: #1C1D53;
}

.back-image {
  width: 120;
  height: 120;
  margin: 10;
}

.custom-order {
  padding: 20;
  background-color: #1C1D53;
}

.title {
  font-size: 24;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20;
}

.form {
  padding: 20;
}

.input-group {
  margin-bottom: 15;
}

.label {
  font-size: 16;
  margin-bottom: 5;
}

.input {
  font-size: 16;
  padding: 10;
  border-width: 1;
  border-color: #ffffff;
  border-radius: 4;
  color: black;
}

.description {
  height: 100;
  text-align: left;
  padding: 10;
}

.submit-btn {
  background-color: white;
  color: #1C1D53;
  padding: 15;
  border-radius: 4;
  margin-top: 20;
  font-weight: bold;
}

.submit-btn:active {
  background-color: #f0f0f0;
}

.submit-btn[disabled] {
  opacity: 0.7;
}

.loading {
  opacity: 0.7;
  pointer-events: none;
}
</style>
