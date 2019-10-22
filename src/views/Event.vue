<template>
  <v-content class="pa-0">
    <!-- <section :style="{ backgroundColor: this.$vuetify.theme.secondary }">
      <v-container>
      </v-container>
    </section> -->
    <EventHeader id="header" :isMobile="isMobile" themeColor="secondary" />
    <EventInfo id="info" :isMobile="isMobile" themeColor="secondary" />
    <EventLocation id="location" :isMobile="isMobile" themeColor="primary" />
    <EventBag id="bag" :isMobile="isMobile" themeColor="secondary" />
    <Footer id="footer" themeColor="primary" />
  </v-content>
</template>

<script>
import EventHeader from "../components/sections/EventHeader.vue";
import EventInfo from "../components/sections/EventInfo.vue";
import EventLocation from "../components/sections/EventLocation.vue";
import EventBag from "../components/sections/EventBag.vue";
import Footer from "../components/sections/Footer.vue";

export default {
  name: "Event",
  components: {
    EventHeader,
    EventInfo,
    EventLocation,
    EventBag,
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
