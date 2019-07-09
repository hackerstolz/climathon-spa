<template>
  <section :style="{ backgroundColor: sectionColor }">
    <v-container>
      <h2>{{ $t("title") }}</h2>
      <v-card
        v-for="(item, i) in faqs"
        :key="i"
        class="faq-card pa-3 mb-4"
        color="rgba(255,255,255,0.1)"
        ripple
        flat
        @click="toogleTile(i)"
      >
        <h3 class="faq-title my-1 mx-3">
          {{ $i18n.locale === "en" ? item.i18nTitle[0] : item.i18nTitle[1] }}
        </h3>
        <v-expand-transition>
          <p v-if="item.show" class="faq-text my-1 mx-3 mt-4">
            {{ $i18n.locale === "en" ? item.i18nText[0] : item.i18nText[1] }}
          </p>
        </v-expand-transition>
      </v-card>
    </v-container>
  </section>
</template>

<script>
export default {
  name: "FAQ",
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
  methods: {
    toogleTile(i) {
      const clickedFaq = this.faqs[i];
      const prevShow = this.faqs[i].show;

      this.faqs.forEach(c => (c.show = false));
      clickedFaq.show = !prevShow;
    }
  },
  data() {
    return {
      faqs: [
        {
          show: false,
          i18nTitle: ["What is a hackathon?", ""],
          i18nText: [
            "A hackathon is any event of any duration where people come together to solve problems with digital means and present them to each other. That’s it, really simple. In most cases a hackathon is on two days and you get 24-48 hours time for the hacking. In our case 40 (+1; thanks to the time change, we get one hour for free) hours. Hacking is meant in the sense of exploratory programming, not referenced to any computer crime.",
            ""
          ]
        },
        {
          show: false,
          i18nTitle: ["Do I need to pay for the tickets?", ""],
          i18nText: ["It depends...", ""]
        }
      ]
    };
  }
};
</script>

<i18n>
{
  "en": {
    "title": "FAQ"
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

  .faq-card
    .faq-title
      font-family Roboto Condensed,sans-serif
      font-weight 600
      font-size 20px
      line-height 1.4
      letter-spacing normal
      text-align left
      color rgba(255, 255, 255, 0.8)
    .faq-text
      font-family Roboto Condensed,sans-serif
      font-weight 400
      font-size 20px
      line-height 1.4
      letter-spacing normal
      text-align left
      color rgba(255, 255, 255, 0.8)
</style>
