<template>
  <section :style="{ backgroundColor: sectionColor }">
    <v-container>
      <h2>{{ $t("title") }}</h2>
      <v-card
        v-for="(award, i) in awards"
        :key="i"
        class="card pa-3 mb-4"
        width="100%"
        color="rgba(255,255,255,0.1)"
        flat
      >
        <h3 class="mb-3">{{ $t(`awards.${award.key}.title`) }}</h3>
        <v-img :src="award.img" max-height="128px" contain></v-img>
        <div :style="{ color: award.color }" class="prize my-3">
          {{ $t(`awards.${award.key}.prize`) }}
        </div>
        <p
          class="description"
          v-html="$t(`awards.${award.key}.description`)"
        ></p>
      </v-card>

      <div class="infoArea mt-5">
        <p class="awardInfo" v-html="$t('awardInfo')"></p>
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
    sectionColor: function() {
      return Object.keys(this.$vuetify.theme).indexOf(this.themeColor) !== -1
        ? this.$vuetify.theme[this.themeColor]
        : this.$vuetify.theme.primary;
    }
  },
  data() {
    return {
      awards: [
        {
          key: "climateGrant",
          img: require("../../assets/award-gold.svg"),
          color: this.$vuetify.theme.warning
        },
        {
          key: "shubAward",
          img: require("../../assets/award-shub.png"),
          color: this.$vuetify.theme.warning
        },
        {
          key: "projectTogetherAward",
          img: require("../../assets/award-projecttogether.png"),
          color: this.$vuetify.theme.info
        },
        {
          key: "cityPrize",
          img: require("../../assets/award-red.svg"),
          color: this.$vuetify.theme.error
        }
      ]
    };
  }
};
</script>

<i18n>
{
  "en": {
    "title": "Awards",
    "awardInfo": "Guess what, we’re working on getting more prices out (e.g. we’re planning special prizes for challenges from sponsors to Start-Up pre-seed promotions). The rules by which the jury  evaluates as well as all requirements for your project and team to meet all criteria will all  be published here soon. The whole process should be made transparent to you. You still have questions? Have a look at our FAQ section or just <a class='link' href='mailto:climathon@hackerstolz.de?subject=I%20want%20to%20be%20sponsor,%20mentor,%20speaker,%20etc.'>contact us</a>.",
    "awards": {
      "climateGrant": {
        "title": "3x Climate Grants",
        "prize": "min. 6k EUR Total Grant budget",
        "description": "The three projects best evaluated by the jury win a project grant with which the team can turn its idea into reality. Each project receives at least 2k EUR, we give everything to find a sponsor, so that the funding amount is higher."
      },
      "cityPrize": {
        "title": "City Prizes",
        "prize": "to be announced soon",
        "description": "If you take part in a city challenge, then you have already won. Not only is your project guaranteed to be a source of inspiration for the city, but every team in a city challenge wins a prize for its participation."
      },
      "shubAward": {
        "title": "1 Year Accelerator Award",
        "prize": "2x S-HUB Accelerator",
        "description": "Free participation in the <a class='link' target='_blank' href='https://www.shub-mannheim.de'>S-HUB Accelerator Program</a> with an individual start of about 1 year of systematic and intensive support from the idea to the foundation. Prerequisite is a desired foundation as a team in Mannheim, the seriousness behind the foundation wish should be high and all participants must have a certain degree of common welfare and environmental sensitivity."
      },
      "projectTogetherAward": {
        "title": "6 Months Accelerator Award",
        "prize": "10x ProjectTogether Accelerator",
        "description": "Free participation in the <a class='link' target='_blank' href='https://projecttogether.org/climate-action/'>ProjectTogether Accelerator Program</a> with a direct start of an approx. 6-month systematic and intensive support from the idea to the foundation. Prerequisite is a desired foundation as a team in Germany, the seriousness behind the foundation wish should be high and all participants must have a certain degree of common welfare and environmental sensitivity."
      }
    }
  },
  "de": {
    "title": "Auszeichnungen",
    "awardInfo": "Raten mal, wir arbeiten daran, mehr Preise aus zu schütten (z.B. planen wir Sonderpreise für Herausforderungen von Sponsoren bis hin zu speziellen Start-Up-Promotionen). Die Regeln, nach denen die Jury bewertet, sowie alle Anforderungen an dein Projekt und dein Team, um alle Kriterien zu erfüllen, werden in Kürze hier veröffentlicht. Der gesamte Prozess soll für dich transparent gemacht werden. Du hast noch Fragen? Werfen einen Blick in unseren FAQ-Bereich oder <a class='link' href='mailto:climathon@hackerstolz.de?subject=I%20want%20to%20be%20sponsor,%20mentor,%20speaker,%20etc.'>kontaktiere uns</a> einfach.",
    "awards": {
      "climateGrant": {
        "title": "3x Klima Förderungen",
        "prize": "min. 6t EUR gesamtes Förderbudget",
        "description": "Die drei von der Jury am besten bewerteten Projekte erhalten einen Projektstipendium, mit dem das Team seine Idee in die Tat umsetzen kann. Jedes Projekt erhält mindestens 2t EUR, wir geben alles, um Sponsoren zu finden, so dass der Förderbetrag noch höher ist."
      },
      "cityPrize": {
        "title": "Stadtpreise",
        "prize": "wird in Kürze bekannt gegeben",
        "description": "Wenn du an einer City Challenge teilnimmst, dann hast du bereits gewonnen. Nicht nur, dass dein Projekt garantiert eine Quelle der Inspiration für die Stadt ist, sondern jedes Team in einer Stadtherausforderung erhält einen Preis für seine Teilnahme."
      },
      "shubAward": {
        "title": "1 Jahr Accelerator Award",
        "prize": "2x S-HUB Accelerator",
        "description": "Kostenfreie Teilnahme am <a class='link' target='_blank' href='https://www.shub-mannheim.de'>S-HUB Accelerator Programm</a> mit zeitlich individuellem Start einer ca. 1-jährigen systematischen und intensiven Betreuung von der Idee bis zur Gründung. Voraussetzung ist eine angestrebte Gründung als Team in Mannheim, die Ernsthaftigkeit hinter dem Gründungswunsch sollte hoch sein und alle Teilnehmer müssen ein gewisses Maß an Gemeinwohl- und Umweltempfinden mitbringen."
      },
      "projectTogetherAward": {
        "title": "6 Monate Accelerator Award",
        "prize": "10x ProjectTogether Accelerator",
        "description": "Kostenfreie Teilnahme am <a class='link' target='_blank' href='https://projecttogether.org/climate-action/'>ProjectTogether Accelerator Programm</a> mit zeitlich direktem Start einer ca. 6-Monatigen systematischen und intensiven Betreuung von der Idee bis zur Gründung. Voraussetzung ist eine angestrebte Gründung als Team in Deutschland, die Ernsthaftigkeit hinter dem Gründungswunsch sollte hoch sein und alle Teilnehmer müssen ein gewisses Maß an Gemeinwohl- und Umweltempfinden mitbringen."
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
