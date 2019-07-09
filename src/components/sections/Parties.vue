<template>
  <section :style="{ backgroundColor: sectionColor }">
    <v-container>
      <h2>{{ $t("sponsorsTitle") }}</h2>
      <p class="intro-sponsors my-5">{{ $t("introSponsors") }}</p>
      <v-img
        v-if="sponsors.length === 0"
        class="icon-large mt-4"
        :src="require('../../assets/flat-icon-money-large.svg')"
        max-height="245px"
        max-width="245px"
        width="245px"
        contain
      ></v-img>
      <v-layout
        v-if="sponsors.length > 0"
        class="my-4"
        row
        wrap
        align-center
        justify-center
      >
        <v-flex
          v-for="(sponsor, i) in sponsors"
          :key="i"
          :class="{
            'stack-grid-item': true,
            'pa-2': true,
            xs4: !isMobile,
            xs12: isMobile
          }"
        >
          <v-img
            class="mx-4 my-2"
            :src="sponsor.icon"
            max-height="96px"
            max-width="96px"
            width="96px"
            contain
          ></v-img>
          <p class="sponsor-title my-1">{{ sponsor.name }}</p>
        </v-flex>
      </v-layout>
      <p class="outro-sponsors my-5">{{ $t("outroSponsors") }}</p>
      <v-layout row align-center justify-center>
        <v-btn
          class="mx-2"
          href="https://www.iso.org/iso-50001-energy-management.html"
          target="_blank"
          color="accent"
          outline
          flat
        >
          {{ $t("button.link2Iso500001") }}
          <v-icon dark right>open_in_new</v-icon>
        </v-btn>
        <v-btn
          class="mx-2"
          href="https://www.right-basedonscience.de/en/xdc-model/"
          target="_blank"
          color="accent"
          outline
          flat
        >
          {{ $t("button.link2XDC") }}
          <v-icon dark right>open_in_new</v-icon>
        </v-btn>
        <v-btn
          class="mx-2"
          href="https://www.cdp.net/en/companies/companies-scores"
          target="_blank"
          color="accent"
          outline
          flat
        >
          {{ $t("button.link2CDP") }}
          <v-icon dark right>open_in_new</v-icon>
        </v-btn>
      </v-layout>

      <h2>{{ $t("partnersTitle") }}</h2>
      <p class="intro-partners my-5">{{ $t("introPartners") }}</p>
      <v-img
        v-if="partners.length === 0"
        class="icon-large mt-4"
        :src="require('../../assets/flat-icon-heart-large.svg')"
        max-height="245px"
        max-width="245px"
        width="245px"
        contain
      ></v-img>
      <v-layout
        v-if="partners.length > 0"
        class="my-4"
        row
        wrap
        align-center
        justify-center
      >
        <v-flex
          v-for="(partner, i) in partners"
          :key="i"
          :class="{
            'stack-grid-item': true,
            'pa-2': true,
            xs4: !isMobile,
            xs12: isMobile
          }"
        >
          <v-img
            class="mx-4 my-2"
            :src="partner.icon"
            max-height="96px"
            max-width="96px"
            width="96px"
            contain
          ></v-img>
          <p class="partner-title my-1">{{ partner.name }}</p>
        </v-flex>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
export default {
  name: "Parties",
  props: {
    themeColor: {
      type: String,
      default: "primary"
    },
    isMobile: Boolean
  },
  computed: {
    sectionColor: function() {
      return Object.keys(this.$vuetify.theme).indexOf(this.themeColor) !== -1
        ? this.$vuetify.theme[this.themeColor]
        : this.$vuetify.theme.primary;
    }
  },
  data() {
    return {
      sponsors: [
        // {
        //   icon: require("../../assets/flat-icon-scientist.svg"),
        //   name: "vsids"
        // }
      ],
      partners: []
    };
  }
};
</script>

<i18n>
{
  "en": {
    "sponsorsTitle": "Sponsors",
    "introSponsors": "Make a difference, with your sponsoring you support promising projects or even startups which aim to save our planet – what else could you wish for? Not enough, as you wish, here some more arguments for you: You are mentioned at the event and on social media. Establish your company as a relevant and sustainable tech player in the dynamic coding community. And beside that you can provide your own challenge and prize depending on the sponsoring package of your choice. Benefit from the inventiveness of the teams working on your challenge. Act now and contact us!",
    "outroSponsors": "It is difficult to establish a clear and quantifiable criterion as to which sustainability criteria a sponsor must meet. Therefore, we will review different sources to get an idea of how sustainable a sponsor is. These criteria include: The last sustainability report, ISO-50001 certification, published climate indicators such as the X-Degree-Compatibility (XDC), rating in the CDP Climate Scoring etc., are all relevant criteria. If we have the impression that a sponsor does not meet our sustainability expectations, we can reject the sponsor.",
    "partnersTitle": "Partners",
    "introPartners": "You can’t support us financially? No problem, help us to promote  the event, become a network and media partner or support us with an immaterial contribution like mentors for the teams, etc. Contact us!",
    "button": {
      "link2Iso500001": "ISO-500001",
      "link2XDC": "XDC",
      "link2CDP": "CDP Climate Scoring"
    }
  }
}
</i18n>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
section
  padding-bottom 128px
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

  .icon-large
    margin 0 auto

  .intro-sponsors, .outro-sponsors, .intro-partners
    font-family Roboto Condensed,sans-serif
    font-weight 400
    font-size 20px
    line-height 1.4
    letter-spacing normal
    text-align center
    color rgba(255, 255, 255, 0.8)
    &.outro-sponsors
      color #A8E5A3

  .stack-grid-item
    transition all 300ms
    display flex
    flex-direction column
    align-items center
    justify-content center
    .sponsor-title, .partner-title
      font-family Roboto Condensed,sans-serif
      font-weight 600
      font-style normal
      font-size 20px
      font-stretch normal
      line-height 1
      letter-spacing 1px
      text-align inherit
      color #ffffff
</style>
