<!-- components/NousContacter.vue -->
<template>
  <Page backgroundColor="#1C1D53" actionBarHidden="true">
    <GridLayout rows="auto, auto, *">
      <!-- Action Bar -->
      <StackLayout row="0" class="action-bar-layout">
        <GridLayout columns="auto, *" rows="auto">
          <Image src="~/images/gobackIcon.png" col="0" row="0" class="back-icon" @tap="goBack" />
          <Label text="Nous Contacter" col="1" row="0" class="page-title" />
        </GridLayout>
      </StackLayout>
      <!-- Underline -->
      <StackLayout row="1" class="underline"></StackLayout>
      <!-- Contact Information -->
      <ScrollView row="2">
        <StackLayout class="contact-info">
          <!-- Phone -->
          <GridLayout rows="auto, auto" columns="auto, *" class="contact-item" @tap="callPhone">
            <Image src="~/images/phoneIcon.png" row="0" col="0" class="contact-icon" />
            <Label :text="phoneNumber" row="0" col="1" class="contact-text" />
            <StackLayout row="1" colSpan="2" class="item-underline"></StackLayout>
          </GridLayout>
          <!-- Email -->
          <GridLayout rows="auto, auto" columns="auto, *" class="contact-item" @tap="sendEmail">
            <Image src="~/images/emailICon.png" row="0" col="0" class="contact-icon" />
            <Label :text="emailAddress" row="0" col="1" class="contact-text" />
            <StackLayout row="1" colSpan="2" class="item-underline"></StackLayout>
          </GridLayout>
          <!-- WhatsApp -->
          <GridLayout rows="auto, auto" columns="auto, *" class="contact-item" @tap="openWhatsApp">
            <Image src="~/images/whatsAppIcon.png" row="0" col="0" class="contact-icon" />
            <Label :text="whatsappGroup" row="0" col="1" class="contact-text" />
            <StackLayout row="1" colSpan="2" class="item-underline"></StackLayout>
          </GridLayout>
        </StackLayout>
      </ScrollView>
    </GridLayout>
  </Page>
</template>

<script>
import { openUrl } from '@nativescript/core/utils';

export default {
  data() {
    return {
      phoneNumber: '+1 450-435-4080',
      emailAddress: 'foodswnglutenfree@gmail.com',
      whatsappGroup: 'Rejoindre le groupe WhatsApp',
      whatsappLink: 'https://chat.whatsapp.com/your-group-invite-link'
    };
  },
  methods: {
    goBack() {
      this.$navigateBack();
    },
    callPhone() {
      openUrl(`tel:${this.phoneNumber.replace(/\s/g, '')}`);
    },
    sendEmail() {
      openUrl(`mailto:${this.emailAddress}`);
    },
    openWhatsApp() {
      openUrl(`intent://send?phone=${this.whatsappLink}#Intent;scheme=smsto;package=com.whatsapp;action=android.intent.action.SENDTO;end`);
    }
  }
}
</script>

<style scoped>
.action-bar-layout {
  padding: 10 16;
  background-color: #1C1D53;
}
.back-icon {
  width: 24;
  height: 24;
  vertical-align: middle;
  margin-right: 10;
}
.page-title {
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
.contact-info {
  padding: 20;
}
.contact-item {
  margin-bottom: 20;
}
.contact-icon {
  width: 24;
  height: 24;
  margin-right: 15;
  vertical-align: middle;
}
.contact-text {
  font-size: 18;
  color: #FFFFFF;
  vertical-align: middle;
}
.item-underline {
  height: 1;
  background-color: rgba(255, 255, 255, 0.3);
  margin-top: 10;
}
</style>
