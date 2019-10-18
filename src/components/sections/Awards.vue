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
        <v-btn
          v-if="award.officialCriteria"
          class="mt-2"
          width="auto"
          color="warning"
          outline
          flat
          small
          @click="criteriaShow = true"
        >
          {{ $t("button.showCriteria") }}
        </v-btn>
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
            <v-btn
              v-if="award.officialCriteria"
              class="mt-2"
              width="auto"
              color="warning"
              outline
              flat
              small
            >
              {{ $t("button.showCriteria") }}
            </v-btn>
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

      <!-- criteria -->
      <v-dialog
        v-model="criteriaShow"
        scrollable
        width="80%"
        max-width="640px"
        :fullscreen="isMobile"
        @click="criteriaShow = true"
      >
        <v-card class="card" color="#2f3a58">
          <div class="dialog-card-content pa-4">
            <v-layout row>
              <div class="ml-3 mr-4">&nbsp;</div>
              <v-spacer />
              <h3 class="mb-3">
                {{ $t("juryCriteriaTitle") }}
              </h3>
              <v-spacer />
              <v-btn
                class="ma-0"
                color="accent"
                flat
                @click="criteriaShow = false"
                icon
              >
                <v-icon>close</v-icon>
              </v-btn>
            </v-layout>
            <p
              class="annotation-text mb-4"
              v-html="$t('juryCriteriaIntro')"
            ></p>
            <p
              class="long-description mb-4"
              v-html="$t('juryCriteriaList')"
            ></p>
          </div>
          <v-card-actions class="dialog-card-footer">
            <v-spacer />
            <v-btn color="accent" flat @click="criteriaShow = false">{{
              $t("button.close")
            }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
  methods: {
    reflow: debounce(function() {
      this.$refs.stack.reflow();
    }, 100)
  },
  data() {
    return {
      criteriaShow: false,
      mainAwards: [
        {
          key: "climateGlobal",
          img: require("../../assets/award/award-global.png"),
          color: this.$vuetify.theme.success,
          officialCriteria: true
        },
        {
          key: "climateGrant",
          img: require("../../assets/award/award-gold.svg"),
          color: this.$vuetify.theme.warning,
          officialCriteria: true
        }
      ],
      awards: [
        {
          key: "shubAward",
          img: require("../../assets/award/award-shub.png"),
          color: this.$vuetify.theme.warning,
          officialCriteria: true
        },
        {
          key: "projectTogetherAward",
          img: require("../../assets/award/award-projecttogether.png"),
          color: this.$vuetify.theme.warning,
          officialCriteria: true
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
    "juryCriteriaTitle":"Bewertungskriterien der Jury",
    "juryCriteriaIntro":"We have kept very close to the Climathon Global Award criteria of the Climathon and Climate KIC network in creating the scoring sheet. So that it is already certain that the winning teams of the Mannheim Climathon were measured against these criteria. We have only replaced the point \"commercialization potential\" by \"technical implementation\", this is more important for us at a hackathon where technical solutions are more important than the requirement to be able to make profits with an idea.<br/><br/>When selecting ideas, the judges will consider the following criteria: ",
    "juryCriteriaList":"<strong>1. Transformative potential (30%)</strong><ul class='list'><li>Does the solution offer something unique and innovative that challenges conventional thinking or systems?</li><li>Has the solution been tried before?</li><li>Does the solution address a core need, rather than solving an already existing problem?</li><li>Has the solution been designed with a systemic, integrated approach in mind?</li><li>Does the solution have the potential for impact outside the city boundaries?</li><li>Does the solution interact with local/regional city plans, policy or legislation or vice versa?</li><li>Could the solution be used/ benefitted by 10 billion people?</li></ul><br/><strong>2. Operational viability (20%)</strong><ul class='list'><li>Is the timing right for the team to solve the problem they are addressing with the solution?</li><li>Is the solution’s defensibility convincing? (i.e. Why won’t an existing \"demand owner\" or company do this? Why can the team do better or faster?)</li><li>Did the team identify and address potential barriers to (market) entry?</li><li>Did the team identify major product and business development milestones to launch and grow their solution?</li><li>Did the team identify regulatory approvals and have a plan to protect intellectual property?</li></ul><br/><strong>3. Social and environmental value potential (15%)</strong><ul class='list'><li>Is the solution relevant to the Sustainable Development Goal number 13 on Climate Action, at a minimum?</li><li>Does the solution have the potential to significantly avoid or reduce C02 emissions?</li><li>Does the solution contribute to increasing the resilience of cities to climate-related disasters?</li><li>Is the solution inclusive of less active or knowledgeable communities in addressing climate action?</li><li>Does the solution have the potential to create employment opportunities?</li></ul><br/><strong>4. Exchanged: Technical realisation (15%)</strong><ul class='list'><li>Is the prototype usable for producatization? </li><li>Is the technology stack scalable? </li><li>Is the prototype/hack running stable? </li><li>How high is the degree of realization after this short time and how much is just mocked?</li><li>Was the solution well documented (code versioning used, rough draft of a README, a clear open source licensing model chosen, etc.)?</li></ul><br/><strong>5. Team capability (10%)</strong><ul class='list'><li>Did the team show indication of high commitment?</li><li>Does the team have relevant domain experience given the problem they are trying to solve?</li><li>Does the team have any prior entrepreneurial experience?</li><li>Did the team identify key roles that may need to be hired for soon?</li><li>Does the team intend to involve advisers and external experts to introduce the solution?</li></ul><br/><strong>6. Pitch quality (10%)</strong><ul class='list'><li>Did the team present a compelling story to the audience?</li><li>Did the team address the why, how and what of their solution?</li><li>Did the team make their solution understandable to a layperson?</li></ul>",
    "awardInfo": "The rules according to which the jury evaluates the teams are callable at the prizes which require an evaluation. The main jury is not responsible for the selection of the winners of a sponsor challenge (if advertised), but a jury representative of the challenge sponsor. All requirements for your project and your team are listed in the FAQ section. If you still have questions <a class='link' href='mailto:climathon@hackerstolz.de?subject=I%20want%20to%20be%20sponsor,%20mentor,%20speaker,%20etc.'>contact us</a> simply.",
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
      "showChallenge": "Show Challenge",
      "showCriteria": "evaluation criteria",
      "close": "Close"
    }
  },
  "de": {
    "title": "Auszeichnungen",
    "juryCriteriaTitle":"Bewertungskriterien der Jury",
    "juryCriteriaIntro":"Bei der Erstellung des Bewertungsbogens haben wir uns sehr nah den den Kriterien für den Climathon Global Award vom Climathon- und Climate-KIC-Netzwerk gehalten. Sodass bereits sichergestellt ist, dass die Gewinnerteams des Mannheim Climathons an diesen Kriterien gemessen wurden. Wir haben einzig den Punkt \"Kommerzialisierungspotenzial\" durch \"Technische Umsetzung\" ersetzt, dieser ist für uns bei einem Hackathon bei dem es um technische Lösungen wichtiger als die Anforderung mit einer Idee Gewinne erzielen zu können.<br/><br/>Bei der Auswahl der Ideen berücksichtigen die Juroren die folgenden Kriterien:",
    "juryCriteriaList":"<strong>1. Transformatives Potenzial (30%)</strong><ul class='list'><li>Bietet die Lösung etwas Einzigartiges und Innovatives, das konventionelles Denken oder Systeme herausfordert?</li><li>Wurde die Lösung schon einmal ausprobiert?</li><li>Spricht die Lösung ein Kernbedürfnis an, anstatt ein bereits bestehendes Problem zu lösen?</li><li>Wurde die Lösung mit Blick auf einen systemischen, integrierten Ansatz konzipiert?</li><li>Hat die Lösung das Potenzial für Auswirkungen außerhalb der Stadtgrenzen?</li><li>Beeinflusst die Lösung lokale/regionale Stadtpläne, Richtlinien oder Gesetze oder umgekehrt?</li><li>Könnte die Lösung von 10 Milliarden Menschen genutzt/genutzt werden?</li></ul><br/><strong>2. Betriebsfähigkeit (20%)</strong><ul class='list'><li>Ist der Zeitpunkt für das Team, das Problem zu lösen, das es mit der Lösung angeht, richtig?</li><li>Überzeugt die Verteidigungsfähigkeit der Lösung? (d.h. Warum tut ein bestehender \"Demand Owner\" oder Unternehmen dies nicht? Warum kann das Team besser oder schneller werden?)</li><li>Hat das Team potenzielle Barrieren für den (Markt-)Einstieg identifiziert und angegangen?</li><li>Hat das Team wichtige Meilensteine für die Produkt- und Geschäftsentwicklung identifiziert, um ihre Lösung einzuführen und zu erweitern?</li><li>Hat das Team behördliche Genehmigungen identifiziert und einen Plan zum Schutz des geistigen Eigentums vorgelegt?</li></ul><br/><strong>3. Soziales und ökologisches Wertpotenzial (15%)</strong><ul class='list'><li>Ist die Lösung zumindest für das Ziel der nachhaltigen Entwicklung Nr. 13 zum Klimaschutz relevant?</li><li>Hat die Lösung das Potenzial, C02-Emissionen deutlich zu vermeiden oder zu reduzieren?</li><li>Trägt die Lösung dazu bei, die Widerstandsfähigkeit der Städte gegen klimabedingte Katastrophen zu erhöhen?</li><li>Beinhaltet die Lösung weniger aktive oder sachkundige Gemeinschaften bei der Bekämpfung von Klimaschutzmaßnahmen?</li><li>Hat die Lösung das Potenzial, Arbeitsplätze zu schaffen?</li></ul><br/><strong>4. Ausgetauscht: Technische Umsetzung (15%)</strong><ul class='list'><li>Ist der Prototyp für die Produktion nutzbar? </li><li>Ist der Technologie-Stack skalierbar? </li><li>Ist der Prototyp/Hack stabil? </li><li>Wie hoch ist der Realisierungsgrad nach dieser kurzen Zeit und wie viel wird nur verspottet?</li><li>Wurde die Lösung gut dokumentiert (Codeversionierung verwendet, Grobentwurf eines README, ein klares Open-Source-Lizenzmodell gewählt, etc.)?</li></ul><br/><strong>5. Teamfähigkeit (10%)</strong><ul class='list'><li>Hat das Team Anzeichen für ein hohes Engagement gezeigt?</li><li>Verfügt das Team angesichts des Problems, das es zu lösen gilt, über relevante Domänenerfahrung?</li><li>Verfügt das Team über unternehmerische Vorkenntnisse?</li><li>Hat das Team Schlüsselpositionen identifiziert, die möglicherweise bald besetzt werden müssen?</li><li>Beabsichtigt das Team, Berater und externe Experten in die Einführung der Lösung einzubeziehen?</li></ul><br/><strong>6. Tonhöhenqualität (10%)</strong><ul class='list'><li>Hat das Team dem Publikum eine spannende Geschichte präsentiert?</li><li>Hat das Team das Warum, Wie und Was ihrer Lösung angesprochen?</li><li>Hat das Team ihre Lösung für einen Laien verständlich gemacht?</li></ul>",
    "awardInfo": "Die Regeln, nach denen die Jury die Teams bewertet ist an den Preisen die eine Bewertung voraussetzen aufrufbar. Für die Auswahl der Sieger einer Sponsoren-Challenge  (sofern ausgeschrieben) ist nicht die Hauptjury, sondern ein Jury-Vertreter des Challenge-Sponsors zuständig. Alle Anforderungen an dein Projekt und dein Team sind im FAQ-Bereich untergebracht. Sofern du noch Fragen hast <a class='link' href='mailto:climathon@hackerstolz.de?subject=I%20want%20to%20be%20sponsor,%20mentor,%20speaker,%20etc.'>kontaktiere uns</a> einfach.",
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
      "showChallenge": "Challenge anzeigen",
      "showCriteria": "Bewertungskriterien",
      "close": "Schliessen"
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

.card
  height 100%
  h3
    font-family Gagalin,sans-serif
    font-weight 400
    font-style normal
    font-size 24px
    letter-spacing 1px
    color rgba(255, 255, 255, 0.8)
  .annotation-text
    font-family Roboto Condensed,sans-serif
    font-weight 400
    font-size 20px
    font-style normal
    line-height 1.2
    letter-spacing 0.5px
    text-align inherit
    color #ffffff
  .long-description
    font-family Roboto Condensed,sans-serif
    font-size 20px
    line-height 1.4
    letter-spacing 1px
    text-align center
    color rgba(255, 255, 255, 0.8)
  .dialog-card-footer
    button
      font-family Gagalin,sans-serif
      font-weight 400
      font-style normal
      font-size 20px
      letter-spacing 1.5px
</style>
