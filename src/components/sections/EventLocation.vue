<template>
  <section :style="{ backgroundColor: sectionColor }">
    <v-container>
      <h2>{{ $t("title") }}</h2>
      <v-card class="card pa-3 mb-4" width="100%" color="info" flat>
        <!-- <h3 class="mb-1">{{ $t(`awards.${award.key}.title`) }}</h3>
        <h4 class="mb-3">{{ $t(`awards.${award.key}.place`) }}</h4> -->
        <v-img
          class="room-plan"
          :src="require('../../assets/event/location.svg')"
        ></v-img>
        <!-- <p v-html="'hallo'"></p> -->
      </v-card>
    </v-container>
  </section>
</template>

<script>
export default {
  name: "EventLocation",
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
    "title": "Room plan"
  },
  "de": {
    "title": "Raumplan"
  }
}
</i18n>

<!-- Global scope -->
<style lang="stylus"></style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
section
  padding 64px 0
  h2
    font-family Gagalin,sans-serif
    font-weight 400
    font-style normal
    font-size 28px
    letter-spacing 1.4px
    text-align center
    color #ffffff
    margin-bottom 64px

  .card
    // background-image url("../../assets/event/location.svg")
    // background-size contain
    // background-position center center
    h3
      font-family Gagalin,sans-serif
      font-weight 400
      font-style normal
      font-size 20px
      letter-spacing 1px
      color rgba(255, 255, 255, 0.8)
    h4
      font-family Roboto Condensed,sans-serif
      font-weight 600
      font-size 14px
      font-style normal
      line-height 1.2
      letter-spacing 0.5px
      text-transform uppercase
      color rgba(255, 255, 255, 0.6)
    p
      font-family Roboto Condensed,sans-serif
      font-weight 400
      font-size 20px
      line-height 1.4
      letter-spacing 1px
      text-align center
      color rgba(255, 255, 255, 0.8)

    .room-plan
      border 1px solid #ffffff
      border-radius 4px
</style>
