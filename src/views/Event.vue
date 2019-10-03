<template>
  <v-content class="pa-0">
    <section :style="{ backgroundColor: this.$vuetify.theme.secondary }">
      <v-container>
        <!-- add content here -->
      </v-container>
    </section>
    <Footer id="footer" themeColor="primary" />
  </v-content>
</template>

<script>
import Footer from "../components/sections/Footer.vue";

export default {
  name: "Event",
  components: {
    Footer
  },
  props: {
    isMobile: Boolean
  },
  data() {
    return {};
  }
};
</script>

<i18n>
{}
</i18n>

<style scoped lang="stylus"></style>
