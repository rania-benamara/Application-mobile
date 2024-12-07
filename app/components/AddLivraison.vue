<template>
    <Page actionBarHidden="true" class="backgr-livraison">
        <GridLayout rows="*, auto" columns="*">
            <ScrollView row="0">
                <StackLayout class="conteneur">
                    <Label text="<" class="boutton-retour" @tap="goBack" />
                    <Label text="Ajouter nouvelle adresse" class="titre" />

                    <StackLayout class="champ-texte-conteneur">
                        <TextField v-model="address.numero_appartement"
                                hint="Numéro Appartement"
                                required="true"
                                keyboardType="number"
                                class="input-field" />
                    </StackLayout>

                    <StackLayout class="champ-texte-conteneur">
                        <TextField v-model="address.numero_nom_rue"
                                hint="numero_nom_rue"
                                required="true"
                                class="input-field" />
                    </StackLayout>

                    <StackLayout class="champ-texte-conteneur">
                        <TextField v-model="address.ville"
                                hint="Ville"
                                required="true"
                                class="input-field" />
                    </StackLayout>

                    <StackLayout class="champ-texte-conteneur">
                        <TextField v-model="address.province"
                                hint="Province"
                                required="true"
                                class="input-field" />
                    </StackLayout>

                    <StackLayout class="champ-texte-conteneur">
                        <TextField v-model="address.code_postal"
                                hint="Code postal (A1A 1A1)"
                                required="true"
                                class="input-field" />
                    </StackLayout>

                    <Button text="Ajouter"
                            class="ajouterAdresse"
                            @tap="addAddress"
                            :isEnabled="!isLoading"/>

                    <ActivityIndicator v-if="isLoading" :busy="true"/>
                </StackLayout>
            </ScrollView>
        </GridLayout>
    </Page>
</template>

<script>
import { Http, ApplicationSettings } from '@nativescript/core'

const API_URL = 'https://dev-api.wnsansgluten.ca/Clients';

export default {
    data() {
        return {
            address: {
                numero_appartement: '',
                numero_nom_rue: '',
                ville: '',
                province: '',
                code_postal: ''
            },
            isLoading: false
        }
    },
    created() {
        const token = ApplicationSettings.getString('token', '');
        console.log('Token in AddLivraison:', token);
        if (token) {
            try {
                const tokenParts = token.split('.');
                const payload = JSON.parse(atob(tokenParts[1]));
                console.log('Decoded token in AddLivraison:', payload);
            } catch (e) {
                console.error('Error decoding token:', e);
            }
        }
    },
    methods: {
        goBack() {
            this.$navigateBack();
        },

        addAddress() {
            const token = ApplicationSettings.getString('token', '');
            console.log('Token before request:', token);

            if (!token) {
                alert('Vous n\'êtes pas connecté');
                return;
            }

            // Validate fields
            if (!this.address.numero_appartement || !this.address.numero_nom_rue ||
                !this.address.ville || !this.address.province ||
                !this.address.code_postal) {
                alert('Veuillez remplir tous les champs!');
                return;
            }

            // Validate postal code
            const postal = /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/;
            if (!postal.test(this.address.code_postal)) {
                alert('Le code postal doit être au format A1A 1A1');
                return;
            }

            this.isLoading = true;

            const requestData = {
                numero_appartement: this.address.numero_appartement,
                numero_nom_rue: this.address.numero_nom_rue,
                ville: this.address.ville,
                province: this.address.province,
                code_postal: this.address.code_postal
            };
            console.log('Request data:', requestData);

            Http.request({
                url: `${API_URL}/add-address`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                content: JSON.stringify(requestData)
            }).then(response => {
                console.log('Response status:', response.statusCode);
                console.log('Response content:', response.content.toString());

                if (response.statusCode === 201) {
                    alert('Adresse ajoutée avec succès');
                    this.goBack();
                } else {
                    const result = response.content.toJSON();
                    throw new Error(result.message || 'Erreur lors de l\'ajout de l\'adresse');
                }
            }).catch(error => {
                console.error('Full error:', error);
                console.error('Error response:', error.response ? error.response.content.toString() : 'No response');

                alert(error.message || 'Erreur lors de l\'ajout de l\'adresse');
            }).finally(() => {
                this.isLoading = false;
            });
        }
    }
}
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

.titre {
  font-size: 28px;
  color: #F8F8F8;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 130px;
  text-align: center;
}

.champ-texte-conteneur {
  background-color: #f8f8f8;
  font-size: 11px;
  text-align: left;
  margin-bottom: 80px;
  width: 700px;
  border-radius: 8px;
  border: 1.5px solid #8E8383;
  padding: 0 10;
}

.input-field {
  border-bottom-width: 0;
  border-bottom-color: #FFFFFF;
  background-color: transparent;
  placeholder-color: #8E8383;
  color: #000000;
  padding: 10 0;
  margin: 0;
  font-size: 14;
}

.ajouterAdresse {
  width: 300px;
  padding: 10px;
  color: #E95322;
  background-color: #FFDECF;
  border-radius: 100px;
  font-size: 14px;
  font-weight: bold;
  margin-top: 40px;
  margin-left: auto;
  margin-right: auto;
}

.ajouterAdresse:hover {
  background-color: #FFDECF;
}
</style>
