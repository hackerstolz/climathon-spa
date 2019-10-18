<template>
  <v-content class="pa-0">
    <Intro id="intro" />
    <About id="about" themeColor="primary" :isMobile="isMobile" />
    <Challenges id="challenges" themeColor="secondary" :isMobile="isMobile" />
    <Awards id="awards" themeColor="primary" :isMobile="isMobile" />
    <Location id="location" themeColor="secondary" />
    <Schedule id="schedule" themeColor="secondary" :isMobile="isMobile" />
    <Registration id="registration" themeColor="primary" :isMobile="isMobile" />
    <Staff id="staff" themeColor="secondary" :isMobile="isMobile" />
    <FAQ id="faq" themeColor="primary" />
    <Parties id="parties" themeColor="secondary" :isMobile="isMobile" />
    <Team id="team" themeColor="primary" :isMobile="isMobile" />
    <Footer id="footer" themeColor="primary" :isMobile="isMobile" />
  </v-content>
</template>

<script>
const sectionsContext = require.context(
  "@/components/sections/",
  true,
  /\.vue$/
);

export default {
  name: "Overview",
  components: {
    ...sectionsContext.keys().reduce(
      (map, key) => ({
        ...map,
        [sectionsContext(key).default.name]: sectionsContext(key).default
      }),
      {}
    )
  },
  props: {
    isMobile: Boolean
  }
};
</script>

<i18n>
{}
</i18n>

<style scoped lang="stylus"></style>
