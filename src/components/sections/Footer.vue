<template>
  <v-footer dark height="auto" :style="{ backgroundColor: sectionColor }">
    <v-card class="footer-card" flat tile color="transparent">
      <v-card-text>
        <v-btn
          v-for="(link, i) in links"
          :key="i"
          :href="link.href"
          target="_blank"
          class="mx-3"
          icon
        >
          <v-img
            :src="link.icon"
            height="24"
            width="24"
            position="center"
            contain
          ></v-img>
        </v-btn>
      </v-card-text>

      <div class="organizer my-5">
        <p class="made-by-slogan my-3">
          <span>{{ $t("sloganBeforeHeart") }}</span>
          <v-img
            class="d-inline-block mx-1"
            :src="require('../../assets/icon-heart.svg')"
            height="24"
            width="24"
            contain
          >
          </v-img>
          <span>{{ $t("sloganAfterHeart") }}</span>
        </p>
        <div class="logos ma-3">
          <v-img
            class="mr-2"
            :src="require('../../assets/logo-hackerstolz.svg')"
            max-height="40"
            max-width="232"
            width="20%"
            position="center"
            contain
          >
          </v-img>
          <v-img
            class="mr-2"
            :src="require('../../assets/logo-mannheim.svg')"
            max-height="40"
            max-width="160"
            width="20%"
            position="center"
            contain
          >
          </v-img>
        </div>
        <div class="logos ma-3">
          <v-img
            :src="require('../../assets/logo-KIC-EU.svg')"
            max-height="40"
            width="58%"
            position="center"
            contain
          >
          </v-img>
        </div>
      </div>

      <h4 class="credits-title my-1">{{ $t("creditsTitle") }}</h4>
      <p class="credits pa-2 mb-5" v-html="$t('credits')">
      </p>

      <v-divider></v-divider>

      <v-layout row align-center justify-center wrap>
        <v-spacer></v-spacer>
        <v-card-text class="white--text">
          &copy;2019 — <strong>Hackerstolz e.V.</strong>
          <div v-html="$t('designedBy')"></div>
        </v-card-text>
        <v-spacer></v-spacer>
        <v-btn
          class="mb-4"
          href="https://www.hackerstolz.de/impressum/"
          target="_blank"
          outline
          small
          flat
        >
          {{ $t("button.link2Legal") }}
          <v-icon dark right>open_in_new</v-icon>
        </v-btn>
      </v-layout>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  props: {
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
  },
  data: () => ({
    links: [
      {
        icon: require("../../assets/icon-twitter.svg"),
        href: "https://twitter.com/hackerstolz"
      },
      {
        icon: require("../../assets/icon-meetup.svg"),
        href: "https://www.meetup.com/de-DE/Hackschool-Rhein-Neckar/"
      },
      {
        icon: require("../../assets/icon-facebook.svg"),
        href: "https://www.facebook.com/hackerstolz/"
      },
      {
        icon: require("../../assets/icon-igr.svg"),
        href: "https://www.instagram.com/hackerstolz/"
      },
      {
        icon: require("../../assets/icon-hackerstolz.svg"),
        href: "https://www.hackerstolz.de/"
      }
    ]
  })
};
</script>

<i18n>
{
  "en": {
    "sloganBeforeHeart": "A hackathon made with",
    "sloganAfterHeart": "by",
    "creditsTitle": "Credits",
    "credits": "font <a class='link' target='_blank' href='https://www.fontfabric.com/fonts/gagalin/'>„Gagalin“</a> by Iordanis Passas • icons by „Özden Gelgec“, <a class='link' target='_blank' href='http://www.iconarchive.com/show/small-n-flat-icons-by-paomedia.html'>„Arnaud“</a>, <a class='link' target='_blank' href='https://www.flaticon.com'>„Freepik“</a> and <a class='link' target='_blank' href='http://www.iconarchive.com/show/free-flat-sample-icons-by-thesquid.ink.html'>„Squid Ink“</a>",
    "designedBy": "designed and coded by Jascha A. Quintern",
    "button": {
      "link2Legal": "Imprint • Disclaimer • Privacy Policy"
    }
  },
  "de": {
    "sloganBeforeHeart": "Ein Hackathon gemacht mit",
    "sloganAfterHeart": "von",
    "creditsTitle": "Credits",
    "credits": "Schriftart <a class='link' target='_blank' href='https://www.fontfabric.com/fonts/gagalin/'>\"Gagalin\"</a> von Iordanis Passas - Symbole von \"Özden Gelgec\", <a class='link' target='_blank' href='http://www.iconarchive.com/show/small-n-flat-icons-by-paomedia.html'>\"Arnaud\"</a>, <a class='link' target='_blank' href='https://www.flaticon.com'>\"Freepik\"</a> und <a class='link' target='_blank' href='http://www.iconarchive.com/show/free-flat-sample-icons-by-thesquid.ink.html'>\"Squid Ink\"</a>",
    "designedBy": "entworfen und entwickelt von Jascha A. Quintern",
    "button": {
      "link2Legal": "Impressum • Haftungsausschluss • Datenschutzerklärung"
    }
  }
}
</i18n>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
footer
  .footer-card
    width 100%
    .organizer
      width 100%
      .made-by-slogan
        color rgba(255,255,255,0.8)
        font-family click-clack,sans-serif
        font-weight 400
        font-style normal
        display flex
        align-items center
        justify-content center
        > *
          flex-grow 0
      .logos
        display flex
        align-items center
        justify-content center
        > *
          flex-grow 1

    .credits-title
      display block
      width 100%
      font-family Roboto Condensed,sans-serif
      font-weight 600
      font-size 20px
      line-height 1.4
      letter-spacing 1px
      text-align center
      text-transform uppercase
      color rgba(255, 255, 255, 0.8)

    .credits
      display block
      width 100%
      font-family Roboto Condensed,sans-serif
      font-weight 400
      font-size 20px
      line-height 1.4
      letter-spacing 1px
      text-align center
      color rgba(255, 255, 255, 0.8)
</style>
