<template>
  <section
    :style="{ backgroundColor: sectionColor }">
    <v-container>
      <h2 class="align-left">{{ $t("title") }}</h2>
    </v-container>
    <video-bg 
      class="video-container"
      :sources="[
        require('!file-loader!../../assets/video/ma-earth-footage.webm'),
        require('!file-loader!../../assets/video/ma-earth-footage.ogv'),
        require('!file-loader!../../assets/video/ma-earth-footage.mp4')
      ]"
      :img="require('../../assets/ma-footage-thumb.jpeg')">
      <v-layout class="video-content flex align-center py-5" fill-height  column>
        <h3 class="align-left">{{ $t("locationSlogan") }}</h3>
        <!-- <v-flex xs12 align-end> -->
          <v-spacer />
          <v-icon 
            class="pa-1"
            color="rgba(255, 255, 255, 0.38)"
            x-large>
            place
          </v-icon>
          <p class="location-text pa-1">
            MAFINEX-Technologiezentrum<br/>
            Julius-Hatry-Str. 1<br/>
            68163 Mannheim
          </p>
          <v-btn
            class="my-2"
            width="auto"
            href="https://www.google.com/maps/place/mg:+mannheimer+gr%C3%BCndungszentren+gmbh/@49.4732698,8.4747424,15z/data=!4m5!3m4!1s0x0:0x9a435721e6fc738d!8m2!3d49.4732698!4d8.4747424"
            target="_blank"
            color="rgba(255, 255, 255, 0.8)"
            outline
            flat
          >
            {{ $t("button.link2Maps") }}
            <v-icon dark right>open_in_new</v-icon>
          </v-btn>
        <!-- </v-flex> -->
      </v-layout>
    </video-bg>
  </section>
</template>

<script>
import VideoBg from 'vue-videobg'

export default {
  name: "Location",
  components: {
    VideoBg
  },
  props: {
    themeColor: {
      type: String,
      default: "primary"
    }
  },
  computed: {
    sectionColor: function () {
      return Object.keys(this.$vuetify.theme).indexOf(this.themeColor) !== -1
        ? this.$vuetify.theme[this.themeColor]
        : this.$vuetify.theme.primary
    }
  }
};
</script>

<i18n>
{
  "en": {
    "title": "Location",
    "locationSlogan": "The greatest hacker location in Mannheim",
    "button": {
      "link2Maps": "Open in maps"
    }
  },
  "de": {
    "title": "Standort",
    "locationSlogan": "Der großartigste Hackerstandort in Mannheim",
    "button": {
      "link2Maps": "In Karten öffnen"
    }
  }
}
</i18n>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
section
  h2
    font-family Gagalin,sans-serif
    font-weight 400
    font-style normal
    font-size 28px
    letter-spacing 1.4px
    text-align center
    color #ffffff
    margin-top 128px
    margin-bottom 64px

  .video-container
    &:before
      position absolute
      z-index 1
      top 0
      left 0
      right 0
      content ''
      width 100%
      height 30%
      background-image linear-gradient(to top, rgba(16, 24, 47, 0), #182445)
    &:after
      position absolute
      z-index 1
      bottom 0
      left 0
      right 0
      content ''
      width 100%
      height 30%
      background-image linear-gradient(to bottom, rgba(24, 36, 69, 0), #182445)
    .video-content
      position relative
      z-index 2
      h3
        max-width 640px
        margin 0 auto
        font-family Gagalin,sans-serif
        font-weight 400
        font-style normal
        font-size 70px
        line-height 1
        letter-spacing 3.5px
        text-align center
        color rgba(255, 255, 255, 0.38)
        @media screen and (max-width: 600px)
          font-size 40px
      .location-text
        font-family Roboto
        font-weight 900
        font-size 28px
        font-style normal
        line-height 1.2
        letter-spacing 6px
        text-align center
        color rgba(255, 255, 255, 0.8)
        @media screen and (max-width: 600px)
          font-size 18px
</style>
