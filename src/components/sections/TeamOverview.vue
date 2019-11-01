<template>
  <section :style="{ backgroundColor: sectionColor }">
    <v-container>
      <h2>{{ $t("prices") }}</h2>
      <stack
        class="mb-5"
        ref="stack"
        :column-min-width="320"
        :gutter-width="24"
        :gutter-height="24"
        monitor-images-loaded
      >
        <stack-item
          v-for="(price, i) in prices"
          :key="i"
          class="stack-grid-item"
        >
          <v-card
            class="card pb-2"
            width="100%"
            color="rgba(255,255,255,0.1)"
            flat
          >
            <v-img
              class="white--text align-end mb-4"
              :height="isMobile ? '200px' : '250px'"
              :src="price.img"
              @load="reflow"
            >
              <v-card-title
                ><h3 class="mb-1">{{ $t(price.text) }}</h3></v-card-title
              >
            </v-img>
            <v-chip
              :class="{
                'mr-1': true,
                'mb-1': true,
                tags: true,
                winner: price.winner
              }"
              :color="price.color"
              :large="!isMobile"
              text-color="black"
            >
              <v-icon v-if="price.winner" light left>emoji_events</v-icon>
              {{ price.text }}
            </v-chip>
            <p class="description px-2 my-4" v-html="$t(price.description)"></p>
          </v-card>
        </stack-item>
      </stack>

      <h2>{{ $t("title") }}</h2>
      <stack
        ref="stack"
        :column-min-width="320"
        :gutter-width="24"
        :gutter-height="24"
        monitor-images-loaded
      >
        <stack-item
          v-for="(winner, i) in winners"
          :key="i"
          class="stack-grid-item"
        >
          <v-card
            class="card pa-3"
            width="100%"
            color="rgba(255,255,255,0.1)"
            flat
          >
            <h3 class="mb-1">{{ $t(winner.title) }}</h3>
            <v-img
              v-if="winner.img"
              :src="winner.img"
              max-height="128px"
              height="128px"
              contain
              @load="reflow"
            ></v-img>
            <p
              class="description mb-4"
              v-html="$t(winner.descriptionI18n[$i18n.locale])"
            ></p>
            <v-chip
              v-for="(award, i) in winner.awards"
              :key="i"
              :class="{
                'mr-1': true,
                'mb-1': true,
                tags: true,
                winner: award.winner
              }"
              :color="award.color"
              :large="!isMobile"
              text-color="black"
            >
              <v-icon v-if="award.winner" light left>emoji_events</v-icon>
              {{ award.text }} </v-chip
            ><br />
            <v-btn
              class="mt-4"
              width="auto"
              color="white"
              :href="winner.sulutionURL"
              target="_blank"
              outline
              flat
              small
            >
              {{ $t("btnShowSolution") }}
            </v-btn>
          </v-card>
        </stack-item>
      </stack>
    </v-container>
  </section>
</template>

<script>
import debounce from "lodash/debounce";
import { Stack, StackItem } from "vue-stack-grid";

export default {
  name: "TeamOverview",
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
      prices: [
        {
          text: "Climate Grant Award",
          description: "Bike Drop, 1&ONLY, LoRaWahn",
          color: this.$vuetify.theme.warning,
          winner: true,
          img: require("../../assets/price/price-climategrant.jpg")
        },
        {
          text: "S-HUB Award",
          description: "1&ONLY, Zero2",
          color: this.$vuetify.theme.warning,
          winner: true,
          img: require("../../assets/price/price-shub.jpg")
        },
        {
          text: "ProjectTogether Award",
          description:
            "Escape Apocalypse, Localot, Mvua Nzuri, MeetMe, Tender, Videoclip Crashtest",
          color: this.$vuetify.theme.warning,
          winner: true,
          img: require("../../assets/price/price-projecttogether.jpg")
        },
        {
          text: "MVV Challenge Winner",
          description: "LoRaWahn",
          color: this.$vuetify.theme.info,
          winner: true,
          img: require("../../assets/price/price-mvv.jpg")
        },
        {
          text: "CAMELOT Challenge Winner",
          description: "1&ONLY, Zero2",
          color: this.$vuetify.theme.info,
          winner: true,
          img: require("../../assets/price/price-camelot.jpg")
        },
        {
          text: "objective partner Challenge Winner",
          description: "Intel Inside",
          color: this.$vuetify.theme.info,
          winner: true,
          img: require("../../assets/price/price-camelot.jpg")
        },
        {
          text: "rnv Challenge",
          description: "Bike Drop, op, Team Awesome, MaGreenLife, MeetMe",
          color: this.$vuetify.theme.info,
          winner: true,
          img: require("../../assets/price/price-rnv.jpg")
        },
        {
          text: "City Challenge",
          description:
            "Bike Drop, Zero2, Escape Apocalypse, Extremwetter, MaGreenLife, Localot, MeetMe, Tender, Plantzilla",
          color: this.$vuetify.theme.error,
          winner: true,
          img: require("../../assets/price/price-city.jpg")
        }
      ],
      winners: [
        {
          title: "Bike Drop",
          // img: require("../../assets/winner/winner-shub.png"),
          awards: [
            {
              text: "Climate Grant Award",
              color: this.$vuetify.theme.warning,
              winner: true
            },
            {
              text: "City Challenge",
              color: this.$vuetify.theme.error,
              winner: false
            },
            {
              text: "RNV Challenge",
              color: this.$vuetify.theme.info,
              winner: false
            }
          ],
          descriptionI18n: {
            de: "Der Fahrradbaum - eine Design-Bike-Station.",
            en: "The Bike Tree – a design bike station."
          },
          sulutionURL:
            "https://climathon.climate-kic.org/en/solutions/biketree-final"
        },
        {
          title: "1&ONLY",
          // img: require("../../assets/winner/winner-shub.png"),
          awards: [
            {
              text: "Climate Grant Award",
              color: this.$vuetify.theme.warning,
              winner: true
            },
            {
              text: "S-HUB Award",
              color: this.$vuetify.theme.warning,
              winner: true
            },
            {
              text: "CAMELOT Challenge Winner",
              color: this.$vuetify.theme.info,
              winner: true
            }
          ],
          descriptionI18n: {
            de:
              "BeniT - Eine Plattform zur Beschleunigung der industriellen Symbiose.",
            en: "BeniT - A platform to accelerate Industrial symbiosis."
          },
          sulutionURL:
            "https://climathon.climate-kic.org/en/solutions/benit-the-industrial-symbiosis-accelerator"
        },
        {
          title: "LoRaWahn",
          // img: require("../../assets/winner/winner-shub.png"),
          awards: [
            {
              text: "Climate Grant Award",
              color: this.$vuetify.theme.warning,
              winner: true
            },
            {
              text: "MVV Challenge Winner",
              color: this.$vuetify.theme.info,
              winner: true
            }
          ],
          descriptionI18n: {
            de:
              "Zeigen Sie dem Anwender mit LoRaWan-Sensoren, wie viel CO2 er sparen kann.",
            en: "Show the user with LoRaWan sensors how much co2 he can save."
          },
          sulutionURL:
            "https://climathon.climate-kic.org/en/solutions/consider-your-consequences"
        },
        {
          title: "Zero2",
          // img: require("../../assets/winner/winner-shub.png"),
          awards: [
            {
              text: "S-HUB Award",
              color: this.$vuetify.theme.warning,
              winner: true
            },
            {
              text: "CAMELOT Challenge Winner",
              color: this.$vuetify.theme.info,
              winner: true
            },
            {
              text: "City Challenge",
              color: this.$vuetify.theme.error,
              winner: false
            }
          ],
          descriptionI18n: {
            de: "FoodAbdruck- eine umweltfreundliche Einkaufsliste.",
            en: "FoodAbdruck- an environmental friendly shopping list."
          },
          sulutionURL:
            "https://climathon.climate-kic.org/en/solutions/foodabdruck"
        },
        {
          title: "op",
          // img: require("../../assets/winner/winner-shub.png"),
          awards: [
            {
              text: "RNV Challenge",
              color: this.$vuetify.theme.info,
              winner: false
            }
          ],
          descriptionI18n: {
            de:
              "Informationen zum öffentlichen Nahverkehr für Menschen mit Behinderungen.",
            en: "Public transportation information for handicapped people."
          },
          sulutionURL:
            "https://climathon.climate-kic.org/en/solutions/public-transportation-information-for-handicapped-people"
        },
        {
          title: "Team Awesome",
          // img: require("../../assets/winner/winner-shub.png"),
          awards: [
            {
              text: "RNV Challenge",
              color: this.$vuetify.theme.info,
              winner: false
            }
          ],
          descriptionI18n: {
            de: "tram! Wieder auf Kurs kommen.",
            en: "tramn! Getting back on track."
          },
          sulutionURL: "https://climathon.climate-kic.org/en/solutions/tramn"
        },
        {
          title: "Intel Inside",
          // img: require("../../assets/winner/winner-shub.png"),
          awards: [
            {
              text: "Objective Partner Challenge Winner",
              color: this.$vuetify.theme.info,
              winner: true
            }
          ],
          descriptionI18n: {
            de:
              "Bereitstellung eines tragbaren Sensorpakets und einer App für eine Heatmap für die Bewässerung.",
            en:
              "Providing portable Sensor pack and App for an irrigation Heatmap."
          },
          sulutionURL:
            "https://climathon.climate-kic.org/en/solutions/helping-low-income-farmers-with-intelligent-water-management-systems"
        },
        {
          title: "Escape Apocalypse",
          // img: require("../../assets/winner/winner-shub.png"),
          awards: [
            {
              text: "ProjectTogether Award",
              color: this.$vuetify.theme.warning,
              winner: true
            },
            {
              text: "City Challenge",
              color: this.$vuetify.theme.error,
              winner: false
            }
          ],
          descriptionI18n: {
            de:
              "App, die Informationen vermittelt und spielerisch umweltbewusstes Handeln in den Alltag integriert.",
            en:
              "App that conveys information and integrates environmentally conscious actions into everyday life in a playful way."
          },
          sulutionURL:
            "https://climathon.climate-kic.org/en/solutions/escape-apocalypse"
        },
        {
          title: "Extremwetter",
          // img: require("../../assets/winner/winner-shub.png"),
          awards: [
            {
              text: "City Challenge",
              color: this.$vuetify.theme.error,
              winner: false
            },
            {
              text: "GBG Challenge",
              color: this.$vuetify.theme.info,
              winner: false
            }
          ],
          descriptionI18n: {
            de: "Heute auf das Extremwetter von morgen vorbereiten.",
            en: "Preparing Today for Extreme Weather Tomorrow."
          },
          sulutionURL:
            "https://climathon.climate-kic.org/en/solutions/extreme-weather"
        },
        {
          title: "MaGreenLife",
          // img: require("../../assets/winner/winner-shub.png"),
          awards: [
            {
              text: "City Challenge",
              color: this.$vuetify.theme.error,
              winner: false
            },
            {
              text: "RNV Challenge",
              color: this.$vuetify.theme.info,
              winner: false
            }
          ],
          descriptionI18n: {
            de:
              "MaGreenLife belohnt den Nutzer für sein klimafreundliches Verhalten und gibt der Stadt oder den öffentlichen Verkehrsunternehmen die Möglichkeit, Daten und Ideen von ihren Mitnutzern zu sammeln.",
            en:
              "MaGreenLife rewards the user for climate-friendly behavior and gives the city or public transport organisation a possibility to gather data and ideas from their fellow users."
          },
          sulutionURL:
            "https://climathon.climate-kic.org/en/solutions/magreenlife"
        },
        {
          title: "Localot",
          // img: require("../../assets/winner/winner-shub.png"),
          awards: [
            {
              text: "ProjectTogether Award",
              color: this.$vuetify.theme.warning,
              winner: true
            },
            {
              text: "City Challenge",
              color: this.$vuetify.theme.error,
              winner: false
            }
          ],
          descriptionI18n: {
            de:
              "Localot ist DIE Plattform, um lokale Einzelhändler mit ihren Kunden durch einen nachhaltigen und abfallfreien Lieferservice zu verbinden.",
            en:
              "Localot is THE platform to connect local retailers with their customers through a sustainable and zero-waste delivery service."
          },
          sulutionURL: "https://climathon.climate-kic.org/en/solutions/localot"
        },
        {
          title: "Mvua Nzuri",
          // img: require("../../assets/winner/winner-shub.png"),
          awards: [
            {
              text: "ProjectTogether Award",
              color: this.$vuetify.theme.warning,
              winner: true
            }
          ],
          descriptionI18n: {
            de:
              "Über ein in sich geschlossenes und selbstorganisierendes Bewässerungssystem, das sogar bessere Bewässerungsstrategien vorschlagen kann.",
            en:
              "About a self-contained and self-organizing irrigation system that can even suggest better farming strategies."
          },
          sulutionURL:
            "https://climathon.climate-kic.org/en/solutions/make-irrigation-great-again"
        },
        {
          title: "MeetMe",
          // img: require("../../assets/winner/winner-shub.png"),
          awards: [
            {
              text: "ProjectTogether Award",
              color: this.$vuetify.theme.warning,
              winner: true
            },
            {
              text: "City Challenge",
              color: this.$vuetify.theme.error,
              winner: false
            },
            {
              text: "RNV Challenge",
              color: this.$vuetify.theme.info,
              winner: false
            }
          ],
          descriptionI18n: {
            de:
              "Unsere App MeetMe hilft Menschen, während ihrer Reise mit öffentlichen Verkehrsmitteln echte soziale Kontakte zu knüpfen, die nicht nur helfen, Probleme der sozialen Isolation zu bewältigen, sondern auch dazu beitragen, dass öffentliche Verkehrsmittel eine völlig neue Erfahrung werden.",
            en:
              "Our app MeetMe helps people to get genuine social contacts during their journey on public transportation which not only helps to face against problems of social isolation but helps public transportation to be a totally new experience."
          },
          sulutionURL:
            "https://climathon.climate-kic.org/en/solutions/mobile-application-to-make-public-transport-more-attractive-by-facing-against-social-isolation"
        },
        {
          title: "Tender",
          // img: require("../../assets/winner/winner-shub.png"),
          awards: [
            {
              text: "ProjectTogether Award",
              color: this.$vuetify.theme.warning,
              winner: true
            },
            {
              text: "City Challenge",
              color: this.$vuetify.theme.error,
              winner: false
            }
          ],
          descriptionI18n: {
            de: "Garten-App, die soziale Kontakte und Bildung ermöglicht.",
            en: "Gardening app facilitating social connections and education."
          },
          sulutionURL:
            "https://climathon.climate-kic.org/en/solutions/community-gardening-app"
        },
        {
          title: "Plantzilla",
          // img: require("../../assets/winner/winner-shub.png"),
          awards: [
            {
              text: "City Challenge",
              color: this.$vuetify.theme.error,
              winner: false
            }
          ],
          descriptionI18n: {
            de:
              "Eine Anwendung zur Überwachung, Steuerung und Interaktion mit Anlagen.",
            en: "An application to monitor, control, and interact with plants."
          },
          sulutionURL:
            "https://climathon.climate-kic.org/en/solutions/plantopia"
        },
        {
          title: "Videoclip Crashtest",
          // img: require("../../assets/winner/winner-shub.png"),
          awards: [
            {
              text: "ProjectTogether Award",
              color: this.$vuetify.theme.warning,
              winner: true
            }
          ],
          descriptionI18n: {
            de:
              'Fossil Free Karlsruhe will die Bewohner mit FAKTOR2 mit Fragen herausfordern: "Wie schnell kann die Stromerzeugung durch Dachsolarzellen verdoppelt werden?" Deshalb will Fossil Free Karlsruhe eine Werbung schalten, um die Menschen bundesweit für FAKTOR2 zu begeistern.',
            en:
              'Fossil Free Karlsruhe wants to challenge residents with FAKTOR2 by asking: "How quickly can power generation by rooftop solar panels be doubled?" Therefore, Fossil Free Karlsruhe wants to create an advertisement to fire up people nationwide in support for FAKTOR2.'
          },
          sulutionURL:
            "https://climathon.climate-kic.org/en/solutions/videoclip-crashtest-with-two-animated-dummies-on-their-way-to-death"
        }
      ]
    };
  }
};
</script>

<i18n>
{
  "en": {
    "title": "Teams",
    "prices": "Prize Categories",
    "btnShowSolution": "Show Solution"
  },
  "de": {
    "title": "Teams",
    "prices": "Preiskategorien",
    "btnShowSolution": "Lösung anzeigen"
  }
}
</i18n>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
section
  padding 64px 0px
  padding-bottom 128px
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
    .description
      font-family Roboto Condensed,sans-serif
      font-weight 400
      font-size 20px
      line-height 1.4
      letter-spacing 1px
      text-align center
      color rgba(255, 255, 255, 0.8)
    .tags
      font-family Roboto Condensed,sans-serif
      font-weight 400
      &.winner
        font-weight 600


  .infoArea
    margin-bottom 128px
    .winnerInfo
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
