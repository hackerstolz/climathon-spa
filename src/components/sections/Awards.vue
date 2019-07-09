<template>
  <section
    :style="{ backgroundColor: sectionColor }">
    <v-container>
      <h2>{{ $t("title") }}</h2>
      <v-card
        v-for="(award, i) in awards" :key="i"
        class="card pa-3 mb-4"
        width="100%"
        color="rgba(255,255,255,0.1)"
        flat>
        <h3 class="mb-3">{{ $t(`awards.${award.key}.title`) }}</h3>
        <v-img
          :src="award.img"
          max-height="128px"
          contain
        ></v-img>
        <div class="prize my-3">{{ $t(`awards.${award.key}.prize`) }}</div>
        <p class="description">{{ $t(`awards.${award.key}.description`) }}</p>
      </v-card>

      <div class="infoArea mt-5">
        <p class="awardInfo">{{ $t("awardInfo") }}</p>
      </div>
    </v-container>
  </section>
</template>

<script>

export default {
  name: "Awards",
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
  },
  data() {
    return {
      awards: [{
        key: "climateGrant",
        img: require("../../assets/award-gold.svg"),
        color: this.$vuetify.theme.warning
      },{
        key: "cityPrize",
        img: require("../../assets/award-red.svg"),
        color: this.$vuetify.theme.error
      }]
    }
  }
};
</script>

<i18n>
{
  "en": {
    "title": "Awards",
    "awardInfo": "Guess what, we’re working on getting more prices out (e.g. we’re planning special prizes for challenges from sponsors to Start-Up pre-seed promotions). The rules by which the jury  evaluates as well as all requirements for your project and team to meet all criteria will all  be published here soon. The whole process should be made transparent to you. You still have questions? Have a look at our FAQ section or just contact us.",
    "awards": {
      "climateGrant": {
        "title": "3x Climate Grants",
        "prize": "min. 10k EUR Total Grant budget",
        "description": "The three projects best evaluated by the jury win a project grant with which the team can turn its idea into reality. Each project receives at least 5k EUR, we give everything to find a sponsor, so that the funding amount is higher."
      },
      "cityPrize": {
        "title": "City Prizes",
        "prize": "to be announced soon",
        "description": "If you take part in a city challenge, then you have already won. Not only is your project guaranteed to be a source of inspiration for the city, but every team in a city challenge wins a prize for its participation."
      }
    }
  },
  "de": {
    "title": "Auszeichnungen",
    "awardInfo": "Raten mal, wir arbeiten daran, mehr Preise aus zu schütten (z.B. planen wir Sonderpreise für Herausforderungen von Sponsoren bis hin zu speziellen Start-Up-Promotionen). Die Regeln, nach denen die Jury bewertet, sowie alle Anforderungen an dein Projekt und dein Team, um alle Kriterien zu erfüllen, werden in Kürze hier veröffentlicht. Der gesamte Prozess soll für dich transparent gemacht werden. Du hast noch Fragen? Werfen einen Blick in unseren FAQ-Bereich oder kontaktiere uns einfach.",
    "awards": {
      "climateGrant": {
        "title": "3x Klima Förderungen",
        "prize": "min. 10t EUR gesamtes Förderbudget",
        "description": "Die drei von der Jury am besten bewerteten Projekte erhalten einen Projektstipendium, mit dem das Team seine Idee in die Tat umsetzen kann. Jedes Projekt erhält mindestens 5t EUR, wir geben alles, um Sponsoren zu finden, so dass der Förderbetrag noch höher ist."
      },
      "cityPrize": {
        "title": "Stadtpreise",
        "prize": "wird in Kürze bekannt gegeben",
        "description": "Wenn du an einer City Challenge teilnimmst, dann hast du bereits gewonnen. Nicht nur, dass dein Projekt garantiert eine Quelle der Inspiration für die Stadt ist, sondern jedes Team in einer Stadtherausforderung erhält einen Preis für seine Teilnahme."
      }
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

  .card
    h3
      font-family Gagalin,sans-serif
      font-weight 400
      font-style normal
      font-size 20px
      letter-spacing 1px
      color rgba(255, 255, 255, 0.8)
    .prize
      font-family Roboto Condensed,sans-serif
      font-weight 600
      font-size 16px
      line-height 1.4
      letter-spacing 1px
      text-transform uppercase
      text-align center
      color inherit
    .description
      font-family Roboto Condensed,sans-serif
      font-weight 400
      font-size 20px
      line-height 1.4
      letter-spacing 1px
      text-align center
      color rgba(255, 255, 255, 0.8)

  .infoArea
    margin-bottom 128px
    .awardInfo
      font-family Roboto Condensed,sans-serif
      font-weight 400
      font-size 20px
      line-height 1.4
      letter-spacing normal
      text-align center
      color rgba(255, 255, 255, 0.8)
</style>
