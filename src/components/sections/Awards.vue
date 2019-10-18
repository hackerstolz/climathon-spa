<template>
  <section :style="{ backgroundColor: sectionColor }">
    <v-container>
      <h2>{{ $t("title") }}</h2>
      <v-card
        v-for="(award, i) in mainAwards"
        :key="i"
        class="card pa-3 mb-4"
        width="100%"
        color="rgba(255,255,255,0.1)"
        flat
      >
        <h3 class="mb-1">{{ $t(`awards.${award.key}.title`) }}</h3>
        <h4 class="mb-3">{{ $t(`awards.${award.key}.place`) }}</h4>
        <v-img :src="award.img" max-height="128px" contain></v-img>
        <div :style="{ color: award.color }" class="prize my-3">
          {{ $t(`awards.${award.key}.prize`) }}
        </div>
        <p
          class="description"
          v-html="$t(`awards.${award.key}.description`)"
        ></p>
      </v-card>

      <stack
        ref="stack"
        :column-min-width="320"
        :gutter-width="24"
        :gutter-height="24"
        monitor-images-loaded
      >
        <stack-item
          v-for="(award, i) in awards"
          :key="i"
          class="stack-grid-item"
        >
          <v-card
            class="card pa-3"
            width="100%"
            color="rgba(255,255,255,0.1)"
            flat
          >
            <h3 class="mb-1">{{ $t(`awards.${award.key}.title`) }}</h3>
            <h4 class="mb-3">{{ $t(`awards.${award.key}.place`) }}</h4>
            <v-img
              :src="award.img"
              max-height="128px"
              contain
              @load="reflow"
            ></v-img>
            <div :style="{ color: award.color }" class="prize my-3">
              {{ $t(`awards.${award.key}.prize`) }}
            </div>
            <p
              class="description"
              v-html="$t(`awards.${award.key}.description`)"
            ></p>
            <router-link
              v-if="typeof award.challengeCategoryID === 'number'"
              :to="'/overview/challenges/' + award.challengeCategoryID"
            >
              <v-btn
                class="mt-2"
                width="auto"
                :color="award.color"
                outline
                flat
                small
              >
                {{ $t("button.showChallenge") }}
              </v-btn>
            </router-link>
          </v-card>
        </stack-item>
      </stack>

      <div class="infoArea mt-5">
        <p class="awardInfo" v-html="$t('awardInfo')"></p>
      </div>
    </v-container>
  </section>
</template>

<script>
import debounce from "lodash/debounce";
import { Stack, StackItem } from "vue-stack-grid";

export default {
  name: "Awards",
  components: { Stack, StackItem },
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
    reflow: debounce(function() {
      this.$refs.stack.reflow();
    }, 100)
  },
  data() {
    return {
      mainAwards: [
        {
          key: "climateGlobal",
          img: require("../../assets/award/award-global.png"),
          color: this.$vuetify.theme.success
        },
        {
          key: "climateGrant",
          img: require("../../assets/award/award-gold.svg"),
          color: this.$vuetify.theme.warning
        }
      ],
      awards: [
        {
          key: "shubAward",
          img: require("../../assets/award/award-shub.png"),
          color: this.$vuetify.theme.warning
        },
        {
          key: "projectTogetherAward",
          img: require("../../assets/award/award-projecttogether.png"),
          color: this.$vuetify.theme.warning
        },
        {
          key: "cityPrize",
          img: require("../../assets/award/award-red.svg"),
          color: this.$vuetify.theme.error
        },
        {
          key: "mvvPrize",
          challengeCategoryID: 0,
          img: require("../../assets/sponsor/sponsor-mvv.jpg"),
          color: this.$vuetify.theme.info
        },
        {
          key: "obPrize",
          challengeCategoryID: 7,
          img: require("../../assets/sponsor/sponsor-op.svg"),
          color: this.$vuetify.theme.info
        },
        {
          key: "rnvPrize",
          challengeCategoryID: 1,
          img: require("../../assets/sponsor/sponsor-rnv.svg"),
          color: this.$vuetify.theme.info
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
        "place": "1st to 3rd place • challenge independent",
        "prize": "€7,500 Total Grant budget",
        "description": "The three projects best evaluated by the jury win a project grant with which the team can turn its idea into reality. Each project receives €2,500, we give everything to find a sponsor, so that the funding amount is higher."
      },
      "shubAward": {
        "title": "1 Year Accelerator Award",
        "place": "1st to 2nd place • challenge independent",
        "prize": "2x S-HUB Accelerator",
        "description": "Free participation in the <a class='link' target='_blank' href='https://www.shub-mannheim.de'>S-HUB Accelerator Program</a> with an individual start of about 1 year of systematic and intensive support from the idea to the foundation. Prerequisite is a desired foundation as a team in Mannheim, the seriousness behind the foundation wish should be high and all participants must have a certain degree of common welfare and environmental sensitivity."
      },
      "projectTogetherAward": {
        "title": "6 Months Accelerator Award",
        "place": "3rd to 12th place • challenge independent",
        "prize": "10x ProjectTogether Accelerator",
        "description": "Free participation in the <a class='link' target='_blank' href='https://projecttogether.org/climate-action/'>ProjectTogether Accelerator Program</a> with a direct start of an approx. 6-month systematic and intensive support from the idea to the foundation. Prerequisite is a desired foundation as a team in Germany, the seriousness behind the foundation wish should be high and all participants must have a certain degree of common welfare and environmental sensitivity."
      },
      "climateGlobal": {
        "title": "Climathon Global Awards",
        "place": "selection via Climate-KIC after the event • challenge independent",
        "prize": "Max. €10,000 Global Citizens Award",
        "description": "Winning proposals and finalists can receive prizes of up to €10,000, including an invitation to the Climathon Global Awards Ceremony during the ChangeNOW summit on January 31st in Paris. Learn more the Climathon Global Awrads <a href='https://www.climathonglobalawards.org' class='link' target='_blank'>here</a>."
      },
      "cityPrize": {
        "title": "City Prizes",
        "place": "all teams of a city challenge",
        "prize": "1x surprise shirt per team member from the Mannheim Climate Protection Agency",
        "description": "If you take part in a city challenge, then you have already won. Not only is your project guaranteed to be a source of inspiration for the city, but every team in a city challenge wins a prize for its participation."
      },
      "mvvPrize": {
        "title": "MVV Challenge",
        "place": "Challenge Winner",
        "prize": "Adler Mannheim Tickets",
        "description": "The winning team of the MVV-Challenge can win additional prizes. The winner of this Sponsor Challenge will not be determined by the main jury announced here, but by a*n representative* of the sponsor who is also a member of the jury. Each team member (max. seven) receives a ticket."
      },
      "obPrize": {
        "title": "objective partner Challnege",
        "place": "Challenge Winner",
        "prize": "Stainless steel thermos from avoid waste",
        "description": "The winning team of the objective partner Challenge can win additional prizes. The winner of this Sponsor Challenge will not be determined by the main jury announced here, but by a*n representative* of the sponsor who is also a member of the jury. Each team member (max. seven) receives a bottle."
      },
      "rnvPrize": {
        "title": "rnv Challenge",
        "place": "all teams of the rnv Challenge",
        "prize": "Surprise Goodie Bag per participant",
        "description": "Each team that has worked on the rnv Challenge will receive a prize for its participation."
      }
    },
    "button": {
      "showChallenge": "Show Challenge"
    }
  },
  "de": {
    "title": "Auszeichnungen",
    "awardInfo": "Raten mal, wir arbeiten daran, mehr Preise aus zu schütten (z.B. planen wir Sonderpreise für Herausforderungen von Sponsoren bis hin zu speziellen Start-Up-Promotionen). Die Regeln, nach denen die Jury bewertet, sowie alle Anforderungen an dein Projekt und dein Team, um alle Kriterien zu erfüllen, werden in Kürze hier veröffentlicht. Der gesamte Prozess soll für dich transparent gemacht werden. Du hast noch Fragen? Werfen einen Blick in unseren FAQ-Bereich oder <a class='link' href='mailto:climathon@hackerstolz.de?subject=I%20want%20to%20be%20sponsor,%20mentor,%20speaker,%20etc.'>kontaktiere uns</a> einfach.",
    "awards": {
      "climateGrant": {
        "title": "3x Klima Förderungen",
        "place": "1. bis 3. Platz • Challenge unabhängig",
        "prize": "7.500 € gesamtes Förderbudget",
        "description": "Die drei von der Jury am besten bewerteten Projekte erhalten einen Projektstipendium, mit dem das Team seine Idee in die Tat umsetzen kann. Jedes Projekt erhält 2.500 €, wir geben alles, um Sponsoren zu finden, so dass der Förderbetrag noch höher ist."
      },
      "shubAward": {
        "title": "1 Jahr Accelerator Award",
        "place": "1. bis 2. Platz • Challenge unabhängig",
        "prize": "2x S-HUB Accelerator",
        "description": "Kostenfreie Teilnahme am <a class='link' target='_blank' href='https://www.shub-mannheim.de'>S-HUB Accelerator Programm</a> mit zeitlich individuellem Start einer ca. 1-jährigen systematischen und intensiven Betreuung von der Idee bis zur Gründung. Voraussetzung ist eine angestrebte Gründung als Team in Mannheim, die Ernsthaftigkeit hinter dem Gründungswunsch sollte hoch sein und alle Teilnehmer müssen ein gewisses Maß an Gemeinwohl- und Umweltempfinden mitbringen."
      },
      "projectTogetherAward": {
        "title": "6 Monate Accelerator Award",
        "place": "3. bis 12. Platz • Challenge unabhängig",
        "prize": "10x ProjectTogether Accelerator",
        "description": "Kostenfreie Teilnahme am <a class='link' target='_blank' href='https://projecttogether.org/climate-action/'>ProjectTogether Accelerator Programm</a> mit zeitlich direktem Start einer ca. 6-Monatigen systematischen und intensiven Betreuung von der Idee bis zur Gründung. Voraussetzung ist eine angestrebte Gründung als Team in Deutschland, die Ernsthaftigkeit hinter dem Gründungswunsch sollte hoch sein und alle Teilnehmer müssen ein gewisses Maß an Gemeinwohl- und Umweltempfinden mitbringen."
      },
      "climateGlobal": {
        "title": "Climathon Global Awards",
        "place": "Auswahl über Climate-KIC nach der Veranstaltung • Challenge unabhängig",
        "prize": "Max. 10.000 € Globaler Bürgerpreis",
        "description": "Die Gewinner von Vorschlägen und Finalisten können Preise von bis zu 10.000 € erhalten, darunter eine Einladung zur Climathon Global Awards Ceremony während des ChangeNOW-Gipfels am 31. Januar in Paris. Erfahren Sie mehr über die Climathon Global Awrads <a href='https://www.climathonglobalawards.org' class='link' target='_blank'>hier</a>."
      },
      "cityPrize": {
        "title": "Stadtpreise",
        "place": "alle Teams einer City Challenge",
        "prize": "1x Überraschungs-Shirt pro Teammitlgied von der Klimaschutzagentur Mannheim",
        "description": "Wenn du an einer City Challenge teilnimmst, dann hast du bereits gewonnen. Nicht nur, dass dein Projekt garantiert eine Quelle der Inspiration für die Stadt ist, sondern jedes Team in einer Stadtherausforderung erhält einen Preis für seine Teilnahme."
      },
      "mvvPrize": {
        "title": "MVV Challenge",
        "place": "Challenge Sieger",
        "prize": "Adler Mannheim Tickets",
        "description": "Das Sieger Team der MVV-Challenge kann zusätzliche Preise gewinnen. Der Sieger dieser Sponsor-Challenge wird nicht durch die hier angekündigte Hauptjury bestimmt, sondern durch eine*n Vertreter*in des Sponsors die/der mit in der Jury sitz. Jedes Teammitglied (max. Sieben) erhält ein Ticket."
      },
      "obPrize": {
        "title": "objective partner Challnege",
        "place": "Challenge Sieger",
        "prize": "Edelstahl Thermosflasche von avoid waste",
        "description": "Das Sieger Team der objective partner Challenge kann zusätzliche Preise gewinnen. Der Sieger dieser Sponsor-Challenge wird nicht durch die hier angekündigte Hauptjury bestimmt, sondern durch eine*n Vertreter*in des Sponsors die/der mit in der Jury sitz. Jedes Teammitglied (max. Sieben) erhält eine Flasche."
      },
      "rnvPrize": {
        "title": "rnv Challenge",
        "place": "alle Teams der rnv Challenge",
        "prize": "Überraschungs-Goodie-Bag pro Teilnehmer",
        "description": "Jedes Team, das an der rnv Challenge gearbeitet hat, erhält einen Preis für dessen Teilnahme."
      }
    },
    "button": {
      "showChallenge": "Challenge anzeigen"
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
    h4
      font-family Roboto Condensed,sans-serif
      font-weight 600
      font-size 14px
      font-style normal
      line-height 1.2
      letter-spacing 0.5px
      text-transform uppercase
      color rgba(255, 255, 255, 0.6)
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
