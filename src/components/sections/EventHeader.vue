<template>
  <section :style="{ backgroundColor: sectionColor }">
    <v-spacer />
    <header>
      <v-img
        class="icon-large my-5"
        :src="require('../../assets/event/logo-flat.svg')"
        max-height="245px"
        max-width="245px"
        height="245px"
        width="245px"
        contain
      ></v-img>
    </header>
    <v-spacer />
    <v-spacer />
  </section>
</template>

<script>
export default {
  name: "EventHeader",
  props: {
    isMobile: Boolean,
    themeColor: {
      type: String,
      default: "primary"
    }
  },
  computed: {
    sectionColor: function() {
      return Object.keys(this.$vuetify.theme).indexOf(this.themeColor) !== -1
        ? this.$vuetify.theme[this.themeColor]
        : this.$vuetify.theme.primary;
    }
  }
};
</script>

<i18n>
{
  "en": {
  },
  "de": {
  }
}
</i18n>

<!-- Global scope -->
<style lang="stylus"></style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
section
  display flex
  flex-direction column
  justify-content center
  align-items center
  padding-top 64px

  header
    z-index 1
    display flex
    flex-direction row
    align-items center
</style>
