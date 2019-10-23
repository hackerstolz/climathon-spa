<template>
  <section :style="{ backgroundColor: sectionColor }">
    <v-container>
      <h2>{{ $t("title") }}</h2>
      <p class="intro my-5" v-html="$t('intro')"></p>
      <stack
        ref="stack"
        :column-min-width="320"
        :gutter-width="24"
        :gutter-height="24"
        monitor-images-loaded
      >
        <stack-item
          v-for="category in categoriesSorted"
          :key="category.id"
          class="stack-grid-item"
        >
          <router-link :to="'/overview/challenges/' + category.id">
            <v-card
              :class="{
                card: true,
                'pa-3': true,
                'active-challenges': category.challenges.length > 0
              }"
              :color="
                category.challenges.length > 0
                  ? 'rgba(76,174,121,0.2)'
                  : 'rgba(255,255,255,0.1)'
              "
              ripple
              flat
            >
              <h3 class="mb-3">{{ $t(`categories.${category.key}.title`) }}</h3>
              <v-img
                :src="category.img"
                max-height="128px"
                contain
                @load="reflow"
              ></v-img>
              <div v-if="category.challenges.length === 0" class="count my-3">
                {{ $tc("challengeCount", category.challenges.length) }}
              </div>
              <v-btn
                v-if="category.challenges.length > 0"
                class="my-3"
                color="accent"
                outline
                flat
                small
              >
                {{ $tc("challengeCount", category.challenges.length) }}
                <!-- <v-icon dark right>open_in_browser</v-icon> -->
              </v-btn>
              <p class="description">
                {{
                  $t(`categories.${category.key}.description`)
                    .slice(0, 100)
                    .concat("...")
                }}
              </p>

              <v-dialog
                v-model="category.show"
                scrollable
                width="80%"
                max-width="640px"
                :fullscreen="isMobile"
                @input="v => v || onNavBack()"
              >
                <v-card
                  :class="{
                    card: true,
                    'active-challenges': category.challenges.length > 0
                  }"
                  color="#2f3a58"
                >
                  <div
                    :class="{
                      'dialog-card-content': true,
                      'pa-3': true
                    }"
                  >
                    <v-layout row>
                      <div class="ml-3 mr-4">&nbsp;</div>
                      <v-spacer />
                      <h3 class="mb-3">
                        {{ $t(`categories.${category.key}.title`) }}
                      </h3>
                      <v-spacer />
                      <router-link to="/overview/challenges">
                        <v-btn
                          class="ma-0"
                          color="accent"
                          flat
                          @click="category.show = false"
                          icon
                        >
                          <v-icon>close</v-icon>
                        </v-btn>
                      </router-link>
                    </v-layout>
                    <v-img
                      :src="category.img"
                      max-height="128px"
                      contain
                    ></v-img>
                    <div class="count my-3">
                      {{ $tc("challengeCount", category.challenges.length) }}
                    </div>
                    <p class="description" v-show="category.show">
                      {{ $t(`categories.${category.key}.description`) }}
                    </p>
                    <div
                      class="challenge"
                      v-for="(challenge, j) in category.challenges"
                      :key="j"
                    >
                      <v-img
                        :class="{
                          batch: true,
                          [challenge.type.toLowerCase()]: true,
                          'mt-5': true,
                          'mb-4': true
                        }"
                        :src="
                          require(`../../assets/challenge-${challenge.type.toLowerCase()}.svg`)
                        "
                        max-height="84px"
                        contain
                      ></v-img>
                      <p
                        :class="{
                          author: true,
                          [challenge.type.toLowerCase()]: true,
                          'mb-4': true
                        }"
                        v-html="
                          $i18n.locale === 'en'
                            ? challenge.i18nAuthor[0]
                            : challenge.i18nAuthor[1]
                        "
                      ></p>
                      <h4
                        class="mb-4"
                        v-html="
                          $i18n.locale === 'en'
                            ? challenge.i18nTitle[0]
                            : challenge.i18nTitle[1]
                        "
                      ></h4>
                      <h5 class="mb-2">{{ $t("challangeSummary") }}</h5>
                      <p
                        class="mb-4"
                        v-html="
                          $i18n.locale === 'en'
                            ? challenge.i18nSummary[0]
                            : challenge.i18nSummary[1]
                        "
                      ></p>
                      <h5 class="mb-2">{{ $t("challangeDescription") }}</h5>
                      <p
                        class="mb-4"
                        v-html="
                          $i18n.locale === 'en'
                            ? challenge.i18nDescription[0]
                            : challenge.i18nDescription[1]
                        "
                      ></p>
                      <h5 class="mb-2">{{ $t("challangeVision") }}</h5>
                      <p
                        class="mb-4"
                        v-html="
                          $i18n.locale === 'en'
                            ? challenge.i18nVision[0]
                            : challenge.i18nVision[1]
                        "
                      ></p>
                    </div>
                  </div>
                  <v-card-actions class="dialog-card-footer">
                    <v-spacer />
                    <router-link to="/overview/challenges">
                      <v-btn color="accent" flat>{{
                        $t("button.close")
                      }}</v-btn>
                    </router-link>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card>
          </router-link>
        </stack-item>
      </stack>

      <div class="submitArea">
        <h2 class="align-left">{{ $t("titleSubmit") }}</h2>
        <v-img
          class="mb-4"
          :src="require('../../assets/flat-icon-puzzle.svg')"
          max-height="128px"
          contain
        ></v-img>
        <v-btn
          v-if="challengeSubmissionOpen"
          class="link-to-cgoal mb-4"
          href="https://forms.gle/d5EmFpQPosEJD2PKA"
          target="_blank"
          color="info"
          outline
          flat
        >
          {{ $t("button.link2Form") }}
          <v-icon dark right>open_in_new</v-icon>
        </v-btn>
        <p v-if="challengeSubmissionOpen" class="submitText">
          {{ $t("submitText") }}
        </p>
        <p v-if="challengeSubmissionOpen" class="submitDeadline">
          {{ $t("submitDeadline") }}
        </p>
        <p v-if="!challengeSubmissionOpen" class="submitInfo">
          {{ $t("submitInfo") }}
        </p>
      </div>
      <!-- <p class="submitInfo">{{ $t("submitDeadline") }}</p> -->
    </v-container>
  </section>
</template>

<script>
import clone from "lodash/clone";
import debounce from "lodash/debounce";
import { Stack, StackItem } from "vue-stack-grid";

const CHALLENGE_TYPE = {
  CITY: "CITY",
  COMMUNITY: "COMMUNITY",
  SPONSOR: "SPONSOR"
};

export default {
  name: "Challenges",
  components: { Stack, StackItem },
  props: {
    themeColor: {
      type: String,
      default: "primary"
    },
    isMobile: Boolean
  },
  mounted() {
    this.routeUpdate(this.$route);
  },
  computed: {
    categoriesSorted() {
      return clone(this.categories).sort(
        (a, b) => b.challenges.length - a.challenges.length
      );
    },
    sectionColor() {
      return Object.keys(this.$vuetify.theme).indexOf(this.themeColor) !== -1
        ? this.$vuetify.theme[this.themeColor]
        : this.$vuetify.theme.primary;
    }
  },
  methods: {
    onNavBack() {
      this.$router.push({
        name: "overview",
        params: { section: "challenges", id: "none" }
      });
    },
    routeUpdate($route) {
      if (
        $route &&
        ($route.name === "overview" || $route.name === "overviewDetails") &&
        $route.params.section === "challenges"
      ) {
        const index = parseInt($route.params.id, 10);

        if (!isNaN(index) && index >= 0 && index < this.categories.length) {
          this.toggleTile(index);
        } else {
          this.closeTiles();
        }
      } else {
        this.closeTiles();
      }
    },
    toggleTile(i) {
      const clickedCategory = this.categories[i];
      const prevShow = this.categories[i].show;

      this.categories.forEach(c => (c.show = false));
      clickedCategory.show = !prevShow;
    },
    closeTiles() {
      this.categories.forEach(c => (c.show = false));
    },
    reflow: debounce(function() {
      this.$refs.stack.reflow();
    }, 100)
  },
  watch: {
    $route: function(value) {
      this.routeUpdate(value);
    }
  },
  data() {
    return {
      challengeSubmissionOpen: false,
      categories: [
        {
          id: 0,
          key: "smartCity",
          img: require("../../assets/flat-icon-smartCity.svg"),
          show: false,
          challenges: [
            {
              type: CHALLENGE_TYPE.SPONSOR,
              i18nAuthor: [
                "GBG - Mannheimer housing company ltd.",
                "GBG - Mannheimer Wohnungsbaugesellschaft mbH"
              ],
              i18nTitle: [
                'How could an algorithm for a smart and climate-friendly calculation of future housing demand, housing location and housing characteristics ("foresighted housing supply") look like and which data could be networked in a new way typical for mashup?',
                'Wie könnte ein Algorithmus zur intelligenten und klimafreundlichen Berechnung von zukünftigem Wohnungsbedarf, Wohnlage und Wohnungseigenschaften ("vorausschauendes Wohnungsangebot") aussehen und welche Daten könnten auf neue Mashup-typische Weise vernetzt werden?'
              ],
              i18nSummary: [
                'With around 18,846 apartments, GBG Mannheim is the largest local housing association in Baden-Württemberg. It provides living space for about 13 percent of Mannheim\'s citizens. On commission from the City of Mannheim, GBG is taking over individual construction projects that are important for the sustainable development of the city. How could an algorithm for a smart and climate-friendly calculation of future housing demand, housing location and housing characteristics ("foresighted housing supply") look like and which data could be networked in a new way typical for meshup?',
                'Die GBG Mannheim ist mit rund 18.846 Wohnungen die größte lokale Wohnungsgesellschaft in Baden-Württemberg. Sie bietet rund 13 Prozent der Mannheimer Bevölkerung Lebensraum. Im Auftrag der Stadt Mannheim übernimmt die GBG einzelne Bauvorhaben, die für die nachhaltige Entwicklung der Stadt wichtig sind. Wie könnte ein Algorithmus zur intelligenten und klimafreundlichen Berechnung von zukünftigem Wohnungsbedarf, Wohnlage und Wohnungseigenschaften ("vorausschauendes Wohnungsangebot") aussehen und welche Daten könnten auf neue Meshup-typische Weise vernetzt werden?'
              ],
              i18nDescription: [
                "<ul class='list'><li>A wide variety of creative and visionary data can be \"linked\"! Also very complex!</li><li>For example: statistical data (birth rate, death rate, place of residence, place of work, but also future data that may become available through an X-Road architecture in Germany), data from the housing sector, social media data or participative data and IoT data (e.g. environmental data).</li></ul>",
                "<ul class='list'><li>Eine Vielzahl von kreativen und visionären Daten kann \"verknüpft\" werden! Auch sehr komplex!</li><li><li>Zum Beispiel: statistische Daten (Geburtenrate, Sterblichkeitsrate, Wohnort, Arbeitsplatz, aber auch zukünftige Daten, die durch eine X-Road-Architektur in Deutschland verfügbar werden können), Daten aus dem Wohnungssektor, Social Media-Daten oder partizipative Daten und IoT-Daten (z.B. Umweltdaten).</li></ul>"
              ],
              i18nVision: [
                "There are no limits to your imagination in this challenge.",
                "Der Fantasie sind bei dieser Herausforderung keine Grenzen gesetzt."
              ]
            },
            {
              type: CHALLENGE_TYPE.SPONSOR,
              i18nAuthor: ["MVV Energy AG", "MVV Energie AG"],
              i18nTitle: [
                "How can life in the city of Mannheim be made more liveable through the use of LoRaWAN technology?",
                "Wie kann das Leben in der Stadt Mannheim durch die Verwendung der LoRaWAN-Technologie lebenswerter gestaltet werden?"
              ],
              i18nSummary: [
                "Create the cities of the future today. The development of a city into a Smart City is an individual task for every community. Smart Cities support the efficient, sustainable and liveable design of cities by intelligently using municipal infrastructure. This will be boosted with the help of IoT and various IT, mobile and cloud computing technologies.",
                "Die Städte der Zukunft schon heute gestalten. Die Entwicklung einer Stadt zur „Smart City“ ist eine kommunale Zukunftsaufgabe. Smart Cities unterstützen eine effiziente, nachhaltige und lebenswerte Gestaltung der Städte durch die intelligente Nutzung der kommunalen Infrastruk-tur. Diese wird mit Hilfe von IoT und diversen IT-, Mobile- und Cloud-Computing-Technologien weiter vorangetrieben."
              ],
              i18nDescription: [
                "In this context, MVV Energie AG is setting up a LoRaWAN (Long Range Wide Area Network) in Mannheim to enable efficient and cost-effective data collection. LoRaWAN is a great technology to collect, transmit and intelligently evaluate environmental data such as meteorological data or air pollutants. We are striving to monitor emissions and derive measures to improve the quality of life. In urban gardening, sensors can be used to measure moisture levels in order to motivate the community to maintain the garden, e.g. through reward systems. Thus the following ques-tion arises: How can life in the city of Mannheim be made more liveable through the use of LoRaWAN technology?",
                "In diesem Zusammenhang baut MVV Energie AG ein LoRaWAN (Long Range Wide Area Network) in Mannheim auf, um so eine effiziente und kostengünstige Datenerfassung zu ermöglichen. Über LoRaWAN können u.a. Umweltdaten (wie z.B. meteorologische Daten oder Luftschadstoffe) erfasst, übertragen und intelligent ausgewertet werden. Diese Informationen können wir nut-zen, um Emissionen zu überwachen und Maßnahmen zur Verbesserung der Lebensqualität umzu-setzen. Aber auch in anderen Bereichen wie beispielsweise beim Urban Gardening können Sen-soren zur Erdfeuchtigkeitsmessung eingesetzt werden und so die Community zur Pflege des Gar-tens (z.B. über Belohnungssysteme) zu motivieren. Somit stellt sich folgende Frage: Wie kann das Leben in der Stadt Mannheim durch die Verwendung der LoRaWAN-Technologie lebenswerter gestaltet werden?"
              ],
              i18nVision: [
                '<ul class="list"><li>The solution can either focus on a specific aspect e.g. mobility, energy supply etc., or con-sider the city as a whole. There are no limits to the ideas as long as LoRaWAN supports this technically. </li><li>For the challenge, current sensor data from the city, transmitted via LoRaWAN, will be made available to you. - You have the possibility to develop a concept or to realize prototypes - if you use the data provided by us is up to you. </li><li>The solution can either be an application for the municipality (B2M e.g. optimization sugges-tions) or for the citizens (B2C e.g. incentive for more sustainable behaviour).</li></ul>We are looking forward to your ideas!',
                '<ul class="list"><li>Die Lösung kann sich entweder auf einen bestimmten Teilbereich (z.B. Mobilität oder Ener-gieversorgung) fokussieren, oder die Stadt als Ganzes betrachten. Den Ideen sind keine Grenzen gesetzt, solange LoRaWAN dies technisch unterstützt. </li><li>Für die Challenge werden Euch aktuelle Sensordaten aus der Stadt zur Verfügung gestellt, die via LoRaWAN übertragen werden.</li><li>Ihr habt die Möglichkeit ein Konzept zu entwickeln oder Prototypen praktisch umzusetzen – ob Ihr die von uns zur Verfügung gestellten Daten nutzt, bleibt dabei euch überlassen. </li>Die Lösung kann entweder eine Anwendung für die Gemeinde (z.B. Optimierungsvorschläge) oder für die Bürger (z.B. Anreiz für nachhaltigeres Verhalten) darstellen.</li></ul>Wir freuen uns auf Eure Ideen!'
              ]
            }
            // {
            //   type: CHALLENGE_TYPE.SPONSOR,
            //   i18nAuthor: [
            //     "GBG - Mannheimer housing company ltd.",
            //     "GBG - Mannheimer Wohnungsbaugesellschaft mbH"
            //   ],
            //   i18nTitle: [
            //     "What new business models can the housing industry offer (e.g. drone loading columns on roofs, logistics hubs, etc.) to support smart and climate-friendly urban development?",
            //     "Welche neuen Geschäftsmodelle kann die Wohnungswirtschaft anbieten (z.B. Drohnenladesäulen auf Dächern, Logistikzentren, etc.), um eine intelligente und klimafreundliche Stadtentwicklung zu unterstützen?"
            //   ],
            //   i18nSummary: [
            //     "With around 18,846 apartments, GBG Mannheim is the largest local housing association in Baden-Württemberg. It provides living space for about 13 percent of Mannheim's citizens. On commission from the City of Mannheim, GBG is taking over individual construction projects that are important for the sustainable development of the city.",
            //     "Die GBG Mannheim ist mit rund 18.846 Wohnungen die größte lokale Wohnungsgesellschaft in Baden-Württemberg. Sie bietet rund 13 Prozent der Mannheimer Bevölkerung Lebensraum. Im Auftrag der Stadt Mannheim übernimmt die GBG einzelne Bauvorhaben, die für die nachhaltige Entwicklung der Stadt wichtig sind."
            //   ],
            //   i18nDescription: ["Feel free!", "Fühlt euch frei!"],
            //   i18nVision: [
            //     "There are no limits to your imagination in this challenge.",
            //     "Der Fantasie sind bei dieser Herausforderung keine Grenzen gesetzt."
            //   ]
            // }
          ]
        },
        {
          id: 1,
          key: "mobility",
          img: require("../../assets/flat-icon-mobility.svg"),
          show: false,
          challenges: [
            {
              type: CHALLENGE_TYPE.SPONSOR,
              i18nAuthor: [
                "Rhein-Neckar-Verkehr GmbH",
                "Rhein-Neckar-Verkehr GmbH"
              ],
              i18nTitle: [
                "By which means does a modern and smart public transportation system really change our behaviour, enhance our lives, and protects the environment?",
                "Mit welchen Mitteln verändert ein modernes und intelligentes öffentliches Verkehrssystem wirklich unser Verhalten, verbessert unser Leben und schützt die Umwelt?"
              ],
              i18nSummary: [
                "Mobility, as a basic need of mankind, affects all of us permanently. The Rhein-Neckar-Verkehr GmbH (rnv) fosters a sustainable strategy of innovation, efficiency, an increase of the modal split, benefits for the environment, and cohesiveness to ensure the highest quality possible for its existing customers. In addition, the rnv strives to attract as many new customers as possible - esp. those switching from the usage of their own car to the usage of public transportation.</br>Now you can be part of this offensive by shaping the public transportation sector towards a customer-focused mobility as a service landscape by using data in new ways, taking advantage of digitalization and new technology, and by the innovative combination of hard- and software in the internet of things.",
                "Mobilität als Grundbedürfnis des Menschen betrifft uns alle dauerhaft. Die Rhein-Neckar-Verkehr GmbH (rnv) fördert eine nachhaltige Strategie der Innovation, Effizienz, Erhöhung des Modal Splits, Nutzen für die Umwelt und Kohäsion, um ihren Bestandskunden die bestmögliche Qualität zu gewährleisten. Darüber hinaus ist die rnv bestrebt, möglichst viele neue Kunden zu gewinnen - insbesondere solche, die von der Nutzung des eigenen Autos auf die Nutzung des öffentlichen Verkehrs umsteigen.<br/><br/>Jetzt kannst du Teil dieser Offensive sein, indem du den ÖPNV durch neue Datennutzung, Nutzung von offenen Daten, Digitalisierung und neuen Technologien sowie durch die innovative Kombination von Hard- und Software im Internet der Dinge zu einer kundenorientierten Mobilitätslandschaft entwickelst."
              ],
              i18nDescription: [
                'The rnv provides its open service Start.Info API as well as already published data on its open data portal for its 81 bus and tram lines plus exclusive data just for this challenge! Together with all kinds of additional data from partner challenges or the web you can focus on one or more topics in the context of the following areas:<ul class="list"><li>Navigation for mobility-impaired and visually handicapped people to and from our stops, within our vehicles, etc. Tons of open maps, open routing services, gits with open source codes are available. Different technologies may apply. Do you want to solve this jigsaw?</li><li>Enhancements of the rnv/VRN eTarif app: What is your dream of seamless traveling without the need of having a ticket? CICO, CIBO, BIBO! Psycho?</li><li>Occupancy rates of our public transportation vehicles allow varieties towards a more efficient usage of our vehicles. But how to get the data as cheap as possible for a given accuracy? How to predict those rates? How to influence customer behaviour in using our vehicles as a win-win? How to…??? It’s your turn!</li><li>User information itself: What are the newest trends or the latest technologies to inform our customers on the go or at a location? What kind of information can be given by stationary monitors and all kinds of wearables? Think for example about mobility hubs or how a new residential quarter should look like, if no individual cars are allowed?</li></ul>',
                "Die rnv bietet seinen offenen Dienst Start.Info API sowie bereits veröffentlichte Daten auf seinem offenen Datenportal für seine 81 Bus- und Straßenbahnlinien sowie exklusive Daten speziell für diese Herausforderung! Zusammen mit möglichen Zusatzdaten von Partnerherausforderungen oder dem Web kannst du dich auf ein oder mehrere Themen im Rahmen der folgenden Bereiche konzentrieren: <br/><br/>Navigation für mobilitätseingeschränkte und sehbehinderte Menschen zu und von unseren Haltestellen, innerhalb unserer Fahrzeuge, etc. Tonnen von offenen Karten, offenen Routing-Diensten, Gits mit offenen Quellcodes sind verfügbar. Es können verschiedene Technologien zum Einsatz kommen. Möchtest du dieses Puzzle lösen? <br/><br/>Erweiterungen der rnv/VRN eTarif App: Was ist dein Traum vom nahtlosen Reisen ohne Ticket? CICO, CIBO, BIBO! Psycho? <br/><br/>Auslastung unserer öffentlichen Verkehrsmittel ermöglicht Varianten zu einer effizienteren Nutzung unserer Fahrzeuge. Aber wie bekommt man die Daten bei einer gegebenen Genauigkeit so günstig wie möglich? Wie kann man die Auslastungvorhersagen? Wie kann man das Kundenverhalten beim Einsatz unserer Fahrzeuge als Win-Win-Situation beeinflussen? Wie kann man....??? Du bist an der Reihe! <br/><br/>Benutzerinformationen selbst: Welche sind die neuesten Trends oder die neuesten Technologien, um unsere Kunden unterwegs oder an einem Standort zu informieren? Welche Informationen können stationäre Monitore und alle Arten von Wearables liefern? Denkezum Beispiel an Mobilitätszentren oder wie ein neues Wohnquartier aussehen soll, wenn keine Pkw mehr im Quartier erlaubt sind?"
              ],
              i18nVision: [
                "We encourage you and strongly believe that you will come up with awesome ideas and thoughts, lovely sketches and scribbles, solutions, prototypes, and demonstrators, we never even dared to dream about before. The sky is the limit!",
                "Wir ermutigen dich und glauben fest daran, dass du fantastische Ideen und Gedanken, schöne Skizzen, Lösungen, Prototypen und Demonstratoren hervorbringen wirst, von denen wir noch nie zuvor geträumt haben. The sky is the limit!"
              ]
            }
          ]
        },
        {
          id: 2,
          key: "retrofitting",
          img: require("../../assets/flat-icon-retrofitting.svg"),
          show: false,
          challenges: [
            {
              type: CHALLENGE_TYPE.CITY,
              i18nAuthor: [
                "City of Mannheim • Department of Real Estate Management",
                "Stadt Mannheim • Fachbereich Immobilienmanagement"
              ],
              i18nTitle: [
                "How must a central data management system be technically prepared in order to integrate sensors of real estate management that have not been able to interact so far?",
                "Wie muss ein zentrales Datenmanagementsystem technisch vorbereitet werden, damit bislang nicht interaktionsfähige Sensoren des Immobilienmanagements eingebunden werden können?"
              ],
              i18nSummary: [
                "All technical tasks and functions are integrated in the technical real estate management of the City of Mannheim in order to view the tasks from the perspective of the entire life cycle of a building. The field of building technology consists of 2 teams (heating, air-conditioning and sanitary technology as well as electrical/telecommunications and elevator technology) and the respective workshops.",
                "Im technischen Immobilienmanagement der Stadt Mannheim sind alle technischen Aufgaben und Funktionen gebündelt, um die Aufgaben mit Blick auf den gesamten Lebenszyklus eines Gebäudes zu betrachten. Das Sachgebiet Gebäudetechnik besteht aus 2 Teams (Wärme, Klima- und Sanitärtechnik sowie Elektro-/Fernmelde- und Aufzugstechnik) und den jeweils zugeordneten Werkstätten."
              ],
              i18nDescription: [
                "The following points must be noted when developing the solution:<ul class='list'><li>About 430 buildings are to be integrated in between 2 and 10 sensors.</li><li>The buildings are spread over the whole area of the city of Mannheim.</li><li>Solutions with wireless technology are preferable to wired solutions.</li><li>Cyber Security Standards according to the German Federal Office for Information Security have to be adhered to.</li></ul>",
                "Zur Entwicklung der Lösung müssen folgende Punkte beachtet werden:<ul class='list'><li>Es sollen in etwa 430 Gebäuden zwischen 2 bis zu 10 Sensoren eingebunden wer-den.</li><li>Die Gebäude sind über das gesamte Gebiet der Stadt Mannheim verstreut.</li><li>Lösungen mit Funktechnik sind kabelgebundenen Lösungen vorzuziehen.</li><li>Cyber Security Standards nach Bundesamt für Sicherheit in der Informationstechnik sind zwingend einzuhalten.</li></ul>"
              ],
              i18nVision: [
                "We hope our criterias are well defined, beside that there are really no limits to your imagination in this challenge.",
                "Wir hoffen unsere Kriterien sind gut definiert, davon abgesehen sind deiner Phantasie in dieser Challenge wirklich keine Grenzen gesetzt."
              ]
            }
          ]
        },
        {
          id: 3,
          key: "circularEconomy",
          img: require("../../assets/flat-icon-circularEconomy.svg"),
          show: false,
          challenges: []
        },
        {
          id: 4,
          key: "food",
          img: require("../../assets/flat-icon-food.svg"),
          show: false,
          challenges: [
            // {
            //   type: CHALLENGE_TYPE.COMMUNITY,
            //   i18nAuthor: [
            //     "Micro Agriculture • Community Vegetable Growing e.V.",
            //     "Mikro Landwirtschaft • gemeinschaftlicher Gemüseanbau e.V."
            //   ],
            //   i18nTitle: [
            //     "How can everyone grow their own vegetables in the fields in a climate-friendly way?",
            //     "Wie kann jeder auf dem Acker sein eigenes Gemüse gemeinschaftlich klimagerecht selbst anbauen?"
            //   ],
            //   i18nSummary: [
            //     "Digital supports the cultivation of your own vegetables on the field. Mikro Landwirtschaft wants to set up an online platform for the rental of arable land as communal fields on which even laymen can successfully grow their own vegetables with digital support and smart tools. Protecting the bees, improving the soil, fresh vegetables, packaging-free, without chemicals and long transport routes, a meeting place in the district and promotion of health could thus become a reality.",
            //     "Digital unterstützt auf dem Acker das eigene Gemüse anbauen. Mikro Landwirtschaft will dazu eine Online-Plattform aufbauen für die Vermietung von Ackerflächen als Gemeinschaftsäcker auf denen auch Laien mit digitaler Unterstützung und smarten Tools erfolgreich ihr eigenes Gemüse anbauen können. Schutz der Bienen, Verbesserung der Böden, Frisches Gemüse, verpackungsfrei, ohne Chemie und lange Transportwege, ein Treffpunkt im Stadtteil und eine Förderung für die Gesundheit könnte so Wirklichkeit werden."
            //   ],
            //   i18nDescription: [
            //     "With so far three pilot community farmers in Mannheim, Micro Agriculture has extensive experience and data on the needs of users and has conducted some experiments and built up test. In addition, research has been carried out into possible tools and approaches. An actual implementation of the results is possible. Micro agriculture is a new concept of agriculture. Industrial agriculture manages to produce food cheaply, but causes problems for the climate, biodiversity, soils, groundwater and health. Alternative agricultural concepts are often not scalable. Micro Agriculture wants to rebuild the lost link between agriculture and consumers. Data sets, existing concepts and further information will be provided very soon.",
            //     "Mit bisher drei Pilot-Gemeinschaftsäckern in Mannheim hat Mikro Landwirtschaft umfangreiche Erfahrung und Daten zu den Bedürfnissen der Nutzer und hat einige Experimente durchgeführt und Test aufgebaut. Außerdem ist eine Recherche möglicher Tools und Ansätze gemacht. Eine tatsächliche Umsetzung der Ergebnisse ist möglich. Mikro Landwirtschaft ist ein neues Konzept der Landwirtschaft. Die industrielle Landwirtschaft schafft es billig Lebensmittel zu produzieren, dabei verursacht sie aber Probleme für das Klima, die Artenvielfalt, die Böden, das Grundwasser und die Gesundheit schafft. Alternative Konzepte der Landwirtschaft sind bisher oft nicht skallierbar. Die verlorene Verbindung zwischen Landwirtschaft und Verbrauchern möchte Mikro Landwirtschaft wieder aufbauen. Datensätze, existierende Konzepte und weiter Informationen werden in sehr bald nachgeliefert."
            //   ],
            //   i18nVision: [
            //     "<ul class='list'><li>What tools and instruments are needed to successfully grow your own vegetables on a communal farmland as a layperson?</li><li>How can cultivation planning be simplified, which vegetables have to be sown when, when do I have to take care of them how?</li><li>How can the exchange between micro farmers be supported?</li><li>How can the knowledge transfer of the horticultural basics be solved?</li><li>How to distinguish weeds from vegetables?</li><li>Wear smart tools and sensors show at home that you have to water?</li><li>How can pieces of the common field be rented?<li>How can I find a partner for my field piece?</li><li>How can farmers or other operators of communal farmyards rent their field plots as easily as possible?</li><li>How could community farmer operators manage and care for their fields as easily as possible?</li></ul>The result could be an online platform with an online marketplace, with various loosely coupled or integrated tools. Components could include a social media tool for internal communication, crop planners and the ability to integrate your own smart devices. For operators, computers could be created for the required shortage of compost, manure, tools and water, which could be determined on the basis of various factors such as size, location, soil condition and nutrient supply.<br/>The non-profit association Mikro Landwirtschaft could then implement the solution found into reality and enable many new community farmers in Germany and thus make a major contribution to climate-friendly agriculture.",
            //     "<ul class='list'><li>Welche Tools und Instrumente braucht es, um auf einem Gemeinschaftsacker als Laie erfolgreich sein eigenes Gemüse anzubauen?</li><li>Wie kann die Anbauplanung vereinfacht werden, welches Gemüse muss wann gesät werden, wann muss ich es wie pflegen?</li><li>Wie kann der Austausch zwischen den Mikro Landwirten unterstützt werden?</li><li>Wie kann die Wissensvermittlung der gärtnerischen Grundlagen gelöst werden?</li><li>Wie kann man Unkraut von Gemüse unterscheiden?</li><li>Weche smarten Tools und Sensoren zeigen schon Zuhause an, dass man gießen muss?</li><li>Wie können Feldstücke des Gemeinschaftsackers vermietet werden?<li>Wie finde ich Mitmacher für mein Feldstück?</li><li>Wie können Landwirte oder andere Betreiber von Gemeinschaftsäckern möglichst einfach ihre Feldstücke vermieten?</li><li>Wie könnten Betreiber von Gemeinschaftsäckern die Äcker möglichst einfach verwalten und betreuen?</li></ul>Das Ergebnis könnte eine Online Plattform mit einem Online Marktplatz sein, mit verschiedenen lose gekoppelten oder integrierten Tools. Bestandteile könnten ein Social Media Tool für die interne Kommunikation, Anbauplaner und die Möglichkeit eigene smarte Geräte zu integrieren beinhalten. Für Betreiber könnten Rechner für die benötigte Mange Kompost, Mist, Werkzeug und Wasser entstehen, die anhand verschiedener Faktoren wie Größe, Standort, Bodenbeschaffenheit und Nährstoffversorgung ermittelt werden könnten.<br/>Die gefundene Lösung könnte der gemeinnützige Verein Mikro Landwirtschaft dann in die Realität umsetzen und viele neue Gemeinschaftsäcker in Deutschland ermöglichen und so einen großen beitrag für eine klimagerechte Landwirtschaft leisten."
            //   ]
            // }
          ]
        },
        {
          id: 5,
          key: "finance",
          img: require("../../assets/flat-icon-finance.svg"),
          show: false,
          challenges: [
            {
              type: CHALLENGE_TYPE.COMMUNITY,
              i18nAuthor: ["BOS Deutschland e.V.", "BOS Deutschland e.V."],
              i18nTitle: [
                "How can we motivate people to support reforestation projects?",
                "Wie können wir Menschen motivieren, Wiederaufforstungsprojekte zu unterstützen?"
              ],
              i18nSummary: [
                "Everybody should plant at least one tree in his lifetime. BOS wants to set up a platform that makes it a real joy to plant trees in Indonesian rainforest. A transparent and individual way to donate new forest -tree by tree. Creating habitat for orangutans and many other endangered species while at the same time helping to turn the lever on climate change by saving a vast peat swamp.",
                "Jeder sollte mindestens einen Baum in seinem Leben pflanzen. BOS will eine Plattform schaffen, die es zu einer wahren Freude macht, Bäume im indonesischen Regenwald zu pflanzen. Eine transparente und individuelle Möglichkeit, neue Waldbäume baumweise zu spenden. Schaffung von Lebensraum für Orang-Utans und viele andere bedrohte Arten und gleichzeitig Beitrag zur Bekämpfung des Klimawandels durch die Rettung eines riesigen Torfsumpfes."
              ],
              i18nDescription: [
                "One of the major driving forces of climate change is the loss of peat swamp forest. BOS has secured a vast area with thousands of hectares degraded peatland that is constantly emitting greenhouse gases into the atmosphere. Reforesting those areas stabilizes the peat, binds greenhouse gases and creates new forest that stores even more CO2. By achieving this goal, we will have a significant positive impact on the global climate and will create desperately needed habitat for critically endangered species.<br/><br/>In order to replant the degraded area BOS Germany relies on donations that will finance the field work. Currently these donations are generated through the campaign website lebenswald.org. The donor has an opportunity to plant a symbolic tree for 7€. There are however two main disadvantages in the current website:<ul class='list'><li>Transparency: Where is the tree planted?</li><li>Individualization: How is that tree planted for me? What makes it “my” tree/strip of land?</li></ul>So far, the representation of the tree planting is solved by a bar with which you can choose how many trees you would like to plant. That does not show where and how your tree has been planted and does not provide any progress reports.<br/><br/>The current stakeholders in the project are:<ul class='list'><li>Fundraisingbox, this is the software providing the donation forms on the website.</li><li>SharePoint as possible backend solution.</li><li>BOS Mawas: Those are the people, who provide the whole data set.</li><li>BOS Germany: As coordinator and NGO that fundraises in Germany</li></ul>Evidences: links and screenshots to the respective areas on the website. The current tree planting sidebar can be found <a class='link' target='_blank' href='https://lebenswald.org/baum-pflanzen/'>here</a>. The current donation / purchasing form <a class='link' target='_blank' href='https://lebenswald.org/baum-pflanzen/?spenden_seite=fb_baum'>here</a>.<br/>What is BOS challenge about?<br/><br/><strong>Dos</strong>: We would like to focus our challenge on a frontend, usability and interaction design solution. The prototype could/should be able to be used by other tree-planting NGOs/projects in future (maybe as an independent platform to connect donators with different tree planting projects in one unified frontend). Obviously this is not scope of the initial prototype.<br/><br/><strong>Don'ts</strong>: The subject of the challenge is not to develop a donation form.<br/><br/>The resources that we can provide so far are:<br/>Maps including geocoordinates, backend in sharepoint – plugin between Wordpress and Sharepoint. Drone pictures, annual update for each of the planted trees, information about the trees – such as name, rough CO2 absorbing capacity, figures about the future fruits.",
                "Eine der wichtigsten Triebkräfte des Klimawandels ist der Verlust von Torfmoorwäldern. BOS hat ein riesiges Gebiet mit Tausenden von Hektar degradiertem Moorland gesichert, das ständig Treibhausgase in die Atmosphäre emittiert. Die Wiederaufforstung dieser Gebiete stabilisiert den Torf, bindet Treibhausgase und schafft neue Wälder, die noch mehr CO2 speichern. Mit der Erreichung dieses Ziels werden wir einen erheblichen positiven Einfluss auf das Weltklima haben und dringend benötigte Lebensräume für stark gefährdete Arten schaffen.<br/><br/> Für die Wiederbepflanzung des abgebauten Gebietes ist BOS Deutschland auf Spenden angewiesen, die die Feldarbeit finanzieren. Derzeit werden diese Spenden über die Kampagnen-Website lebenswald.org generiert. Der Spender hat die Möglichkeit, für 7€ einen symbolischen Baum zu pflanzen. Es gibt jedoch zwei wesentliche Nachteile in der aktuellen Website: <ul class='list'><li>Transparenz: Wo ist der Baum gepflanzt?</li><li>Individualisierung: Wie ist der Baum für mich gepflanzt? Was es zu \"meinem\" Baum/Landstreifen macht?</li></ul>Die Darstellung der Baumpflanzung wird bisher durch einen Balken gelöst, mit dem Sie wählen können, wie viele Bäume Sie pflanzen möchten. Das zeigt nicht, wo und wie Ihr Baum gepflanzt wurde und liefert keine Fortschrittsberichte.<br/><br/>Die aktuellen Stakeholder im Projekt sind:<ul class='list'><li>Fundraisingbox, das ist die Software, die die Spendenformulare auf der Website bereitstellt.</li><li>SharePoint als möglich Backend-Lösung.</li><li>BOS Mawas: Das sind die Menschen, die den gesamten Datensatz zur Verfügung stellen.</li><li>BOS Deutschland: Als Koordinator und NGO, die in Deutschland sammelt</li></ul>Evidences: Links und Screenshots zu den jeweiligen Bereichen auf der Website. Die aktuelle Seitenleiste zur Baumpflanzung finden Sie <a class='link' target='_blank' href='https://lebenswald.org/baum-pflanzen/'>hier</a>. Das aktuelle Spenden-/Kaufformular <a class='link' target='_blank' href='https://lebenswald.org/baum-pflanzen/?spenden_seite=fb_baum'>hier</a>.<br/>Was ist die BOS-Herausforderung über?<br/><br/><strong>Dos</strong>: Wir möchten unsere Herausforderung auf eine Frontend, Usability und Interaction Design Lösung fokussieren. Der Prototyp könnte/sollte in Zukunft von anderen Baumpflanz-NGOs/Projekten genutzt werden können (vielleicht als unabhängige Plattform, um Spender mit verschiedenen Baumpflanzprojekten in einem einheitlichen Frontend zu verbinden). Offensichtlich ist dies nicht der Umfang des ersten Prototyps.<br/><br/><strong>Don'ts</strong>: Das Thema der Herausforderung ist nicht, ein Spendenformular zu entwickeln.<br/><br/>Die Ressourcen, die wir bisher zur Verfügung stellen können, sind:<br/>Karten inklusive Geokoordinaten, Backend im Sharepoint - Plugin zwischen Wordpress und Sharepoint. Drohnenbilder, jährliche Aktualisierung für jeden der gepflanzten Bäume, Informationen über die Bäume - wie Name, grobe CO2-Aufnahmekapazität, Zahlen über die zukünftigen Früchte."
              ],
              i18nVision: [
                "Objective: Better representation of our tree planting activities that will motivate more donors to participate in planting a tree. How to motivate people to plant a tree in a degraded peatland forest in Borneo? What is a simple and emotional way to represent on screen the tree planting that distinguishes us from another tree planting websites / NGO´s, at the moment? How to guarantee long time commitment of the donors or make the donation so desirable that the donors would like to plant a tree as a present for a friend or relative? How to be transparent about the tree planting and how to share the progress with the donors?<br/>The successful solution: A product prototype that shows the possible design and usability frontend of the potential final product. The successful solution would be a website or integration in our current website that addresses the questions from above and motivates critical mass of people (new donors) to plant the so much needed trees for the renaturation of 70.000 hectares peatland forest in Borneo.",
                "Ziel: Bessere Darstellung unserer Baumpflanzaktivitäten, die mehr Spender motivieren, sich an der Pflanzung eines Baumes zu beteiligen. Wie kann man Menschen motivieren, einen Baum in einem geschädigten Moorwald auf Borneo zu pflanzen? Was ist eine einfache und emotionale Art, die Baumpflanzung, die uns von anderen Baumpflanz-Websites / NGO´s unterscheidet, auf dem Bildschirm darzustellen? Wie kann man ein langfristiges Engagement der Spender garantieren oder die Spende so wünschenswert machen, dass die Spender einen Baum als Geschenk für einen Freund oder Verwandten pflanzen möchten? Wie man transparent über die Baumpflanzung ist und wie man den Fortschritt mit den Spendern teilt?<br/>Die erfolgreiche Lösung: Ein Produktprototyp, der das mögliche Design- und Usability-Frontend des potenziellen Endprodukts zeigt. Die erfolgreiche Lösung wäre eine Website oder Integration in unsere bestehende Website, die die Fragen von oben anspricht und die kritische Masse der Menschen (neue Spender) motiviert, die so dringend benötigten Bäume für die Renaturierung von 70.000 Hektar Torfwald in Borneo zu pflanzen."
              ]
            }
          ]
        },
        {
          id: 6,
          key: "behaviour",
          img: require("../../assets/flat-icon-behaviour.svg"),
          show: false,
          challenges: [
            {
              type: CHALLENGE_TYPE.CITY,
              i18nAuthor: [
                "Climate Protection Agency Mannheim",
                "Klimaschutzagentur Mannheim"
              ],
              i18nTitle: [
                "How can we motivate the people of Mannheim to make their lifestyle more sustainable?",
                "Wie können wir die Mannheimer*innen motivieren, ihren Lebensstil nachhaltiger zu gestalten?"
              ],
              i18nSummary: [
                "For several years now, the Climate Protection Agency Mannheim has been organising motivation campaigns and actions on behalf of the City of Mannheim in all areas of sustainable living (energy saving, climate-friendly nutrition, sustainable consumption, waste avoidance, climate-friendly mobility). With your support, the Climate Protection Agency would like to spread this important awareness work more quickly.",
                "Seit mehreren Jahren organisiert die Klimaschutzagentur Mannheim im Auftrag der Stadt Mann-heim Motivationskampagnen und -aktionen zu allen Bereichen des nachhaltigen Lebens (Ener-giesparen, klimafreundliche Ernährung, nachhaltiger Konsum, Abfallvermeidung, klimafreundli-che Mobilität). Mit Ihrer Unterstützung möchte die Klimaschutzagentur diese wichtige Sensibili-sierungsarbeit schneller verbreiten."
              ],
              i18nDescription: [
                "The solution can focus on one area or on several areas. It is important that all Mannheim resi-dents can participate.<br/>The following points must be noted when developing the solution:<ul class='list'><li>The solution must encourage behavioural change.</li><li>The focus should be on local options for action and thereby strengthen the local value chain.</li><li>Consumer behaviour change and supplier best practice should be rewarded and recognised. It should motivate others to imitate iParticipants should feel part of a movement or community. </li><li>The solution could facilitate the exchange between participants.</li><li>Do not forget: Climate protection should be fun!</li></ul>",
                "Die Lösung kann sich auf einen Bereich fokussieren oder auf mehrere fokussieren. Wichtig ist, dass sich alle Mannheimer*innen beteiligen können. Zur Entwicklung der Lösung müssen folgende Punkte betrachtet werden:<ul class='list'><li>Die Lösung muss zur Verhaltensänderung anregen.</li><li>Der Fokus sollte auf lokale Handlungsmöglichkeiten liegen und dabei die lokale Wertschöp-fungskette stärken.</li><li>Die Verhaltensänderung der Verbraucher*innen und die Best-Practice der Anbieter*innen sollten belohnt und anerkannt werden. Es sollte zum Nachahmen motivieren.</li><li>Die Teilnehmer*innen sollten sich als Teil einer Bewegung oder Community fühlen.</li><li>Die Lösung könnte den Austausch zwischen Beteiligten vereinfachen. </li><li>Nicht vergessen: Klimaschutz soll Spaß machen! </li></ul>"
              ],
              i18nVision: [
                "Well we hope our goal is clear, there are really no limits to your imagination in this challenge.",
                "Na wir hoffen unser Ziel ist klar, deiner Phantasie sind in dieser Challenge wirklich keine Grenzen gesetzt."
              ]
            }
          ]
        },
        {
          id: 7,
          key: "water",
          img: require("../../assets/flat-icon-water.svg"),
          show: false,
          challenges: [
            {
              type: CHALLENGE_TYPE.SPONSOR,
              i18nAuthor: ["objective partner AG", "objective partner AG"],
              i18nTitle: [
                "How can technology support African farmers with smarter irrigation?",
                "Wie kann die Technologie afrikanische Landwirte bei der intelligenteren Bewässerung unterstützen?"
              ],
              i18nSummary: [
                "Water is a precious good in countries like Africa. Too much of it is wasted for agriculture, while it would be necessary as drinking water as well. With your help, we want to reduce the waste of water in these scenarios, with the help of technology.",
                "Wasser ist ein kostbares Gut in Ländern wie Afrika. Zu viel davon wird für die Landwirtschaft verschwendet, während es auch als Trinkwasser notwendig wäre. Mit Ihrer Hilfe wollen wir in diesen Szenarien mit Hilfe der Technologie den Wasserverbrauch reduzieren."
              ],
              i18nDescription: [
                'To reduce the waste of water, we want to create a smarter system to water plants. This system consists of a small IoT Device, which monitors the environment and soil and controls the irrigation of the plants.<br/><br/>The following points should be considered when developing the solution:<ul class="list"><li>The system needs to be affordable for everybody and its usage should be profitable in a short amount of time.</li><li>Components should be easily obtainable and in large quantities.</li><li>Algorithm to determine the amount of water, based on current quality of soil, environmental factors as sun intensity as well as the type of plant.</li></ul>We will provide you with the parts for a prototype. However, the final solution needs to include a parts list with recommended parts. We at objective partner AG will provide you with some hardware which can be used for the practical implementation. Among them are a variety of sensors (e.g. temperature, humidity, air pressure, soil moisture, light intensity), microcontrollers with WLAN connection to send the data to your service, as well as pumps, hoses and nozzles to water the plants in a controlled way. You can install them at our "Demo-Garden", test them extensively and present them later. Technical PDF\'s for this are currently being collected and will soon be made available to you centrally.',
                'Um die Verschwendung von Wasser zu reduzieren, wollen wir ein intelligenteres System zur Bewässerung von Pflanzen schaffen. Dieses System besteht aus einem kleinen IoT-Gerät, das die Umwelt und den Boden überwacht und die Bewässerung der Pflanzen steuert. <br/><br/><br/> Folgende Punkte sollten bei der Entwicklung der Lösung berücksichtigt werden: <ul class="list"><li>Das System muss für alle erschwinglich sein und seine Nutzung sollte in kurzer Zeit profitabel sein.</li><li><li>Komponenten sollten leicht und in großen Mengen erhältlich sein.</li><li><li>Algorithmus zur Bestimmung der Wassermenge, basierend auf der aktuellen Bodenqualität, Umweltfaktoren wie Sonnenintensität sowie dem Pflanzentyp.</li></ul>Wir liefern Ihnen die Teile für einen Prototyp. Die endgültige Lösung muss jedoch eine Stückliste mit empfohlenen Teilen enthalten. Wir von objective partner AG werden euch einiges an Hardware bereit stellen, welche bei der praktischen Umsetzung verwendet werden kann. Darunter sind eine Vielzahl von Sensoren (z.B. Temperatur, Luftfeuchtigkeit, Luftdruck, Bodenfeuchte, Lichtintensität), Microcontroller mit WLAN Anbindung um die Daten an euren Service zu senden, sowie Pumpen, Schläuche und Düsen um die Planzen geregelt zu bewässern. Diese könnt ihr an unserem “Demo-Garten” installieren, ausgiebig testen und später präsentieren. Technische PDF’s hierzu werden grade gesammelt und euch bald zentral zur Verfügung gestellt.'
              ],
              i18nVision: [
                "Our vision is to reduce the amount of wasted water on agriculture while helping people in 3rd world countries. The outcome will be a system which supports this vision.<br/>Nonetheless, the specific implementations, parts, algorithms and features are totally up to you and your creativity.",
                "Unsere Vision ist es, die Menge an verschwendeten Wasser für die Landwirtschaft zu reduzieren und gleichzeitig den Menschen in den Ländern der Dritten Welt zu helfen. Das Ergebnis wird ein System sein, das diese Vision unterstützt.<br/>Die spezifischen Implementierungen, Teile, Algorithmen und Features liegen jedoch ganz bei Ihnen und Ihrer Kreativität."
              ]
            }
          ]
        },
        {
          id: 8,
          key: "energy",
          img: require("../../assets/flat-icon-energy.svg"),
          show: false,
          challenges: [
            {
              type: CHALLENGE_TYPE.COMMUNITY,
              i18nAuthor: [
                "Fossil Free Karlsruhe • FAKTOR2",
                "Fossil Free Karlsruhe • FAKTOR2"
              ],
              i18nTitle: [
                "How can a Video Clip convince citizens to build Solar Panels on their roofs? ",
                "Wie kann ein Videoclip die Bürger dafür gewinnen, Solarstrom von ihren Dächern zu ernten?"
              ],
              i18nSummary: [
                "Fossil Free Karlsruhe is a regional NGO which started an initiative called FAKTOR2 in the city of Karlsruhe, Germany. More information can be found on their websites:<br/><a class='link' target='_blank' href='www.faktor2.solar'>www.faktor2.solar</a><br/><a class='link' target='_blank' href='www.fossilfreeka.de'>www.fossilfreeka.de</a><br/>Fossil Free Karlsruhe wants to challenge residents with FAKTOR2 by asking: \"How quickly can power generation by rooftop solar panels be doubled?\" FAKTOR2 organizes key players in a city like Karlsruhe and establishes a large coalition to motivate residents to build solar panels on their roofs. Fossil Free Karlsruhe recognized quickly that such a program has great enough potential that it could be spread nationally. Therefore, Fossil Free Karlsruhe wants to create an advertisement to fire up people nationwide in support for FAKTOR2. The video beings by showing two dummies set up for a crash test. The dummies become aware that their life will end in just a few seconds. But instead of braking immediately to avoid a crash, the dummies prefer to be carefully attentive to their cup of coffee in order to avoid sloshing it around. One of the dummies says to the other, \"...if you brake now, I’ll spill my coffee!\" After this, supporters of the program will be featured, each telling viewers why they are a part of the initiative. Fossil Free Karlsruhe wants this clip to attract the attention of a wide range of citizens so that they will take action immediately in order to avoid a climate catastrophe.",
                "Fossil Free Karlsruhe ist eine regionale NGO und hat in der Stadt Karlsruhe die Initiative FAKTOR2 mit dem Ziel gestartet, die Erzeugung von Strom über Solaranlagen in der Stadt massiv auszubauen. Dies ist ein wesentlicher Beitrag zur Erreichung der Klimaschutzziele auf lokaler Ebene. Die wichtigsten Inhalte sind in der WEBsite unter: <a class='link' target='_blank' href='www.faktor2.solar'>www.faktor2.solar</a> zu finden.<br/>Fossil Free Karlsruhe will die Bewohner mit FAKTOR2 und der Frage herausfordern: \"Wie lange braucht die Stadt, bis sich die installierte kWpeak Leistung (Spitzenleistung) auf den Dächern verdoppelt hat?\" FAKTOR2 verbindet alle Akteure der Stadt und bildet eine breite Koalition, um die Bewohner zu motivieren, eine Solaranlage auf ihren Dächern zu installieren. Für Fossil Free Karlsruhe steht fest: Das Potenzial der Initiative ist groß genug, um FAKTOR2 überregional zu starten. Deshalb will Fossil Free Karlsruhe einen Werbevideo-Clip in die Kinos bringen, um die Menschen für FAKTOR2 landesweit zu begeistern. Der Videoclip beinhaltet einen CrashTest mit 2 Dummies, die sich auf dem Weg in Richtung Betonwand bewusst werden, dass ihr Leben in wenigen Sekunden endet. Aber anstatt sofort zu bremsen, achten die beiden Tester lieber darauf, ihre Tasse Kaffee nicht zu vergießen: \"Wenn du jetzt eine Vollbremsung machst, verschütte ich meinen Kaffee.\" Fossil Free Karlsruhe will mit diesem Clip eine Analogie zur aktuellen Situation beim Klimaschutz herstellen und damit einen Beitrag leisten, breitere Teile der Bevölkerung im Hinblick darauf wachzurütteln."
              ],
              i18nDescription: [
                'Fossil Free Karlsruhe is ready to create a large coalition of all key players in the city of Karlsruhe – including political parties, associations, sports groups, NGOs, IHK, etc. Public transportation providers could be a partner for FAKTOR2 by printing FAKTOR2’s slogan on trams, or by offering annual tickets to people that have installed solar panels on their roof. Every partner could start working with FAKTOR2 by creating a campaign of their own design. For example, football teams could encourage their fans to start constructing their own solar roof by selling them an annual ticket at half price. The more residents of a city that become aware of the need to take action on an individual level immediately – incentivized by advertisements and promotions on every corner, coming from every direction, the better. Soon they start to ask: Why not me? Why not now? Every community association and every school class should be made aware of the initiative and work to convince its members to take action now and go solar. At present, only 4% of Karlsruhe’s roofs are utilizing their full solar potential, leaving many people left to convince. If 100% of the roofs that can support the use of solar panels are put to use, Karlsruhe’s energy consumption can be provided for twofold! This shows that there is a lot to gain for our whole society! Scaled nation-wide, the situation is pretty much the same. In every city in Central Europe, we find only a small percentage roofs taking advantage of solar power. Fossil Free Karlsruhe also wants to challenge other cities by creating a new competition: Which city can achieve the highest number of solar capable roofs the quickest? If multiple cities agree to start a solar power competition with each other, this will motivate the cities’ populations tremendously. What is more, the cities’ strategies for encouraging the construction of solar panels are now comparable to each other. Fossil Free Karlsruhe just started communication with NGOs in other Central European cities. To swiftly bring this initiative to the national level and include many cities, Fossil Free Karlsruhe wants to create a video advertisement to fire up people nationwide in support for FAKTOR2.<br/><br/>The setting of the video clip is during a crash test, and two crash dummies sit in a car at 200 kilometers per hour. At 250 meters in Front of the wall, Dummy 1 says, "If we don’t stop right now, we’re going to crash into the wall and be dead forever!" Dummy 2, with a Cup of coffee in his hand, replies, "Yeah, but if you brake now, I’ll spill my coffee!" There is a cut to the next scene, which is a black screen with the words “Climate Catastrophe,” accompanied by a narrator. Cut to the next scene, and several citizens are interviewed, explaining why they support the FAKTOR2 initiative. Cut to the last scene and a white screen shows “Now it’s up to you –support FAKTOR2 by adding solar to your own roof, or by convincing the owner of your apartment.” A narrator reads the call to action as well.<br/>As can be inferred, the dummies are in exactly the same situation as our whole civilization! Fossil Free Karlsruhe thinks that this clip can really make an impression and cause people to take action now. Fossil Free Karlsruhe is currently searching for a partner to aid in the creation of this advertisement.',
                'Fossil Free Karlsruhe setzt sich für eine große Koalition aller Akteure in der Stadt Karlsruhe ein, also Parteien, Verbände, Sportgruppen, NGOs, IHK etc. Öffentliche Verkehrsdienstleister können Netzwerkpartner von FAKTOR2 sein und beispielsweise die Idee von FAKTOR2 auf Straßenbahnen drucken oder reduzierte Jahreskarten für Personen anbieten, die eine Solaranlage auf dem Dach installiert haben. Jeder Netzwerkpartner kann im Rahmen seiner Möglichkeiten FAKTOR2 als eigene Kampagne bewerben und vorantreiben. So könnten z.B. Fußballvereine ihre Fans dazu anregen, zuhause ein Solardach zu installieren und ihnen als Anerkennung eine Jahreskarte zum halben Preis anbieten. Viele solche Anreize führen dazu, daß Photovoltaik in den Köpfen der Menschen ankommt, ja, sexy wird. Dachbesitzern ohne PV-Anlage muß klar werden, daß da etwas auf ihrem Dach nicht in Ordnung ist. Je mehr Einwohner einer Stadt sich der Notwendigkeit bewusst werden, jetzt persönlich etwas unternehmen zu müssen, desto eher beginnen sie zu fragen: Warum nicht ich? Warum nicht jetzt? Jeder Verband, jede Schulklasse sollte sich mit der Initiative identifizieren und ihre Mitglieder davon überzeugen, jetzt aktiv zu werden und Solaranlagen zu installieren. Bei einem derzeitigen Anteil von nur 4% der Karlsruher Dächer gilt es, viele Menschen zu überzeugen. Wären 100% der geeigneten Dachflächen mit Solaranlagen ausgestattet, ergäbe dies doppelt soviel Strom wie die Karlsruher Haushalte verbrauchen. Dies zeigt: Der gesellschaftliche Gewinn für uns alle ist enorm! Auf nationaler Ebene ist die Situation sehr ähnlich: In jeder mitteleuropäischen Stadt hat nur ein kleiner Prozentsatz Solaranlagen installiert. Die Initiative FAKTOR2 von Fossil Free Karlsruhe kann dies ändern durch die Challenge, mit der sich Städte untereinander herausfordern sollen: Welche Stadt schafft das schnellere PV-Dachwachstum? Wenn verschiedene Städte einen Solar-Wettbewerb starten, kann dies die Motivation der Stadtbevölkerung enorm beschleunigen, ja sogar eine richtige Welle lostreten.Und das ist noch nicht alles: Die Strategien der Städte sind nun miteinander vergleichbar! Fossil Free Karlsruhe beginnt gerade die Kommunikation mit anderen NGOs in anderen mitteleuropäischen Städten. Um diese Initiative schnell und erfolgreich auf überregionaler Ebene zu starten und viele Städte zu aktivieren, will Fossil Free Karlsruhe einen Werbevideo-Clip in die Kinos bringen, um die Menschen bundesweit für FAKTOR2 zu interessieren. Die Videoclip-Hauptszene ist ein CrashTest! 2 Dummies sitzen in einem Auto bei 200km/h. Etwa 250m vor der Wand sagt Dummy1: "Wenn wir nicht sofort bremsen, werden wir an der Wand zerschellen und sterben." Dummy2 (mit einer Tasse Kaffee in der Hand) antwortet: "Stimmt, aber wenn du jetzt bremst, verschütte ich meinen Kaffee." // CUT // Dieser Clip mit den beiden Dummies beschreibt exakt die Situation, in der sich unsere gesamte Zivilisation derzeit befindet! Die Off-Stimme baut nun eine Brücke zum Themenbereich "Klimakatastrophe" // CUT // Nun werden einige Bürger interviewt und erklären, warum sie die Initiative FAKTOR2 unterstützen // CUT // Der Clip endet nun mit einem angemessenen Appell an alle, z.B: „Jetzt liegt es an Ihnen, FAKTOR2 auf Ihrem eigenen Dach zu starten oder den Eigentümer Ihrer Mietwohnung zu überzeugen“. Oder: „FAKTOR2 – sei mit dabei“, oder, oder… Fossil Free Karlsruhe glaubt, dass dieser Clip den Geist der Menschen bemerkenswert beeinflussen und sie dazu bringen kann, jetzt zu handeln. Fossil Free Karlsruhe sucht einen Partner, um diesen Clip zu erstellen.'
              ],
              i18nVision: [
                "The advertisement needs to be created in high, cinema-quality resolution. To keep everything simple, the car interior could be borrowed from a car racing video game and be adapted. The scenery around the crash test could also be animated, possibly borrowed from a video game as well. Outlying scenery could be added by a group of current students from HfG Karlsruhe that have access to a professional drone with a camera. The interview scenario could be done externally as well.<br/>The solution that Fossil Free Karlsruhe needs is an extremely convincing, attractive, and professionally done advertisement that invokes in people an emotional reaction so that they will finally take a stand against climate change effects and invest in solar power. It needs to become sexy to have a solar roof. It should be a source of shame to every landlord to rent out anapartment that is not equipped with solar panels. As long as our democratic governments are neither willing nor able to support homeowners of all kinds in installing solar roofs, FAKTOR2 is an initiative with many strong assets. FAKTOR2 can easily spread throughout all of Central Europe and is already starting to with the networking between Fossil Free Karlsruhe and NGOs in other cities.",
                "Der Videoclip muss in einer hohen, kinoreifen Auflösung generiert werden. Um die Umsetzung einfach zu halten: Die Szenerie der Fahrzeuginnenausstattung könnte aus einem professionellen Car Race Video Game übernommen und entsprechend angepasst werden. Die ganze Szenerie rund um den CrashTest könnte synthetisch spielen, in einer Art Car Race Animation oder ähnlichem. Die Umgebung, also der Blick aus dem Wageninnern aus den Fenstern, könnte von einer bereits bestehenden Gruppe von Karlsruher HFG-Studenten mit Zugang zu einem professionellen Kamera-Drohnen-Tool extern in die Fenster gelegt werden. Das sich anschließende Interviewszenario könnte ebenso extern durchgeführt werden. Die für Fossil Free Karlsruhe notwendige Lösung ist ein überzeugendes, attraktives Video, das Menschen, die bereits ansatzweise über Solarstrom auf Dächern nachdenken, dazu bringt, mit dieser Entscheidung aktiv gegen die Auswirkungen des Klimawandels anzugehen. Ein Solardach zu haben, muss attraktiv sein. Eine Wohnung ohne Solardach zu vermieten, muss für jeden Vermieter beschämend sein. Solange unsere demokratischen Regierungen weder bereit noch in der Lage sind, Hausbesitzer aller Häuser dazu zu drängen, Solardächer zu installieren, bleibt FAKTOR2 eine Initiative einem durchschlagenden Überzeugungspotential. FAKTOR2 kann sich leicht in ganz Zentraleuropa etablieren, da Fossil Free Karlsruhe bereits mit anderen NGOs in anderen Städten vernetzt ist."
              ]
            }
          ]
        },
        {
          id: 9,
          key: "extremeWeather",
          img: require("../../assets/flat-icon-extremeWeather.svg"),
          show: false,
          challenges: [
            {
              type: CHALLENGE_TYPE.CITY,
              i18nAuthor: [
                "City of Mannheim - Climate Protection Control Centre",
                "Stadt Mannheim – Klimaschutzleitstelle"
              ],
              i18nTitle: [
                "How can we sensitize people in Mannheim to the risks of extreme weather events and motivate them to take precautions themselves?",
                "Wie können wir Mannheimerinnen und Mannheimer für die Risiken von Extremwetterereignissen sensibilisieren und sie zur Eigenvorsorge motivieren?"
              ],
              i18nSummary: [
                "In recent decades, extreme weather events such as heat waves, cold waves, intense storms and droughts have become more frequent and more intense. Further unprecedented increases are expected, making the development of resilience an urgent need for all cities.",
                "In den letzten Jahrzehnten sind extreme Wetterereignisse wie Hitzewellen, Kältewellen, intensive Stürme und Dürren häufiger und intensiver geworden. Es wird erwartet, dass es zu weiteren Zunahmen in noch nie dagewesenem Ausmaß kommen wird, weshalb die Entwicklung der Widerstandsfähigkeit für alle Städte ein dringender Bedarf ist."
              ],
              i18nDescription: [
                "In order to make our city more resistant to extreme weather events, we are looking for creative solutions to sensitise urban society to the consequences of climate change and to inform them about adaptation options in relevant areas so that they can then take action themselves. Possible fields of action are:<ul class='list'><li>Public Health and Social Infrastructure</li><li>City society and city structure</li><li>Traffic and air quality</li><li>Urban water resources management</li><li>Buildings and building materials</li><li>Industry, commerce and tourism</li><li>Green areas, agriculture and forestry, biodiversity</li></ul>",
                "Um unsere Stadt widerstandsfähiger gegen Extremwetterereignisse zu machen, suchen wir nach kreativen Lösungen, die Stadtgesellschaft für die Folgen des Klimawandels zu sensibilisieren und zu Anpassungsmöglichkeiten in relevanten Bereichen zu informieren, damit sie dann selbst aktiv werden können. Mögliche Handlungsfelder sind:<ul class='list'><li>Öffentliche Gesundheit und soziale Infrastruktur</li><li>Stadtgesellschaft und Stadtstruktur</li><li>Verkehrswesen und Luftqualität</li><li>Siedlungswasserwirtschaft</li><li>Gebäude und Baumaterialien</li><li>Industrie, Gewerbe und Tourismus</li><li>Grünflächen, Land- und Fortwirtschaft, Biodiversität</li></ul>"
              ],
              i18nVision: [
                "Our goal is a climate-friendly urban structure that can withstand any heat wave and any thunderstorm, thus helping to maintain and improve the quality of urban life. The people of Mannheim are strengthened as urban actors by knowing the risks and dangers of extreme weather events and acting accordingly. Awareness and adaptability increase as a result of the multiplier effect of the citizens.",
                "Unser Ziel ist eine klimaresiliente Stadtstruktur, die jeder Hitzewelle und jedem Gewitter standhält und somit dem Erhalt und der Verbesserung der städtischen Lebensqualität dient. Die Mannheimerinnen und Mannheimer werden als städtische Akteurinnen und Akteure gestärkt, indem sie Risiken und Gefahren von Extremwetterereignissen kennen und dementsprechend vorsorglich handeln. Das Bewusstsein und die Anpassungsfähigkeit steigen durch die Multiplikatorenwirkung durch die Bürgerinnen und Bürger."
              ]
            }
          ]
        },
        {
          id: 10,
          key: "waste",
          img: require("../../assets/flat-icon-waste.svg"),
          show: false,
          challenges: []
        },
        {
          id: 11,
          key: "pollution",
          img: require("../../assets/flat-icon-pollution.svg"),
          show: false,
          challenges: []
        }
      ]
    };
  }
};
</script>

<i18n>
{
  "en": {
    "title": "Challenges",
    "intro": "Wow, the first challenges are already online, but many will follow. Here you will find a list of all categories for which challenges can be offered, highlighted in green the categories for which at least one challenge already exists. Why is this important? At the Climathon you have to decide as a team for <strong>ONE CHALLENGE</strong> on which you want to work and at the end submit your solution. Only in a few exceptions where it makes sense, a solution for <strong>two</strong> challenges can be offered.",
    "titleSubmit": "Submit your own challenge",
    "submitText": "I bet you can come up with something so much more innovative than we do! Go ahead and submit your own challenge to complete our puzzle – if we agree with it, it will be listed on this side as well. This also means that other teams can work on solutions for your challenge, even if you decide spontaneously for another challenge.",
    "submitDeadline": "Submit deadline is Friday 25. Oct 15:00",
    "submitInfo": "PLEASE NOTE THAT NO FURTHER CHALLENGES CAN BE SUBMITTED. There are already enough good challenges online, so we decided not to accept any more challenges. If you disagree and think that we should accept yours, please send us an email.",
    "button": {
      "link2Form": "Open submit form",
      "close": "Close"
    },
    "challengeCount": "Processing at Climathon 2020 | one challenge | {count} challenges",
    "challangeSummary": "Summary",
    "challangeDescription": "Status quo & Resources",
    "challangeVision": "Vision & Outcome",
    "categories": {
      "smartCity": {
        "title": "Smart City",
        "description": "Smart City is the supreme discipline for holistic development concepts aimed at making cities more efficient, technologically advanced, greener and more socially inclusive. These concepts include technical, economic and societal innovations that combine modern technologies in the fields of energy, mobility, urban planning, administration and communications. All with the aim of maximising the city’s sustainability potential and improving the quality of life for its inhabitants."
      },
      "mobility": {
        "title": "Mobility",
        "description": "Until now, the transport industry has been the most resistant to emissions progress. At the same time, cities are key in tackling this challenge as they are faced with the mobility trilemma of clean air, carbon, and congestion whilst facing ever increasing demands to move people and goods around."
      },
      "retrofitting": {
        "title": "Retrofitting",
        "description": "Buildings play a crucial role in mitigating climate change and are directly linked to the resilience of future neighbourhoods, districts, and cities. There is an urgent need for cities to bring about a significant increase in current retrofit rates to realise the „well below two degrees“ Paris goal."
      },
      "circularEconomy": {
        "title": "Circular Economy",
        "description": "Traditional linear economy supports short-sighted design, conspicuous consumption, and inefficient waste handling. Cities are prime candidates for pioneering a new, long-term vision: The circular economy—which integrates sustainable production across supply chains as well as better consumption."
      },
      "food": {
        "title": "Food",
        "description": "World food production needs to double by 2050 to cater to population growth, while also dealing with the impacts of climate change. The need to develop integrated and sustainable urban food systems, including value chains and consumer behaviour, is an urgent call to action for cities."
      },
      "finance": {
        "title": "Climate Finance",
        "description": "In cities, the funding gap for sustainable infrastructure is $93 trillion globally over the next 15 years. Focusing on promising investment vehicles as well as project preparation and capacity building will allow investors to be matched to bankable green assets in cities."
      },
      "behaviour": {
        "title": "Human Behaviour",
        "description": "Citizen behaviour is largely responsible for current trends in global climate change. Hence, changing unsustainable consumption and production patterns unlocks a crucial climate impact potential."
      },
      "water": {
        "title": "Water Management",
        "description": "Cities face increasing water challenges due to climate change. Water utilities, such as drinking water infrastructure, wastewater and drainage can be damaged by storms, sea level rise, and unsustainable policies. Climate change also causes water shortage, affecting over 150 million people globally."
      },
      "energy": {
        "title": "Energy",
        "description": "Cities consume 78% of the world’s energy and produce 60% of its emissions. As urban population increases worldwide, cities are crucial to emission reduction efforts."
      },
      "extremeWeather": {
        "title": "Extreme Weather",
        "description": "In the last decades, extreme climate events, such as heat waves, cold waves, intense storms. and droughts have become more frequent and intense. Further increases are expected to occur at unprecedented levels therefore resilience development is an urgent need for all cities."
      },
      "waste": {
        "title": "Waste Management",
        "description": "As cities face pressure to improve resource management efficiency, confront rising energy prices, and are running out of landfill space, reducing or avoiding waste generation becomes increasingly important. Waste management could improve the emissions of all sectors of the economy."
      },
      "pollution": {
        "title": "Air Pollution",
        "description": "More than 80% of people living in urban areas are exposed to poor air quality. Reducing air pollution should be a priority to all cities, not just for decreasing the negative effects of climate change, but for citizens’ health as well."
      }
    }
  },
  "de": {
    "title": "Herausforderungen",
    "intro": "Wow, die ersten Challenges sind bereits online, aber viele werden noch folgen. Hier findest du aufgelistet alle Kategorien zu denen Challenges angeboten werden können, grün hervorgehoben die Kategorien zu denen bereits mind. eine Challenge existiert. Warum das wichtig ist? Auf dem Climathon musst du dich als Team für <strong>EINE CHALLENGE</strong> entscheiden an der du arbeiten möchtest und am Ende deine Lösung zu einreichst. Nur in wenigen Ausnahmen bei denen es Sinn macht, kann eine Lösung für <strong>zwei</strong> Challenges angeboten werden.",
    "titleSubmit": "Reichen Sie Ihre eigene Herausforderung ein",
    "submitText": "Ich wette, du kannst dir etwas so viel Innovativeres einfallen lassen als wir! Reiche deine eigene Herausforderung ein – wenn wir diese genehmigen, wird diese auch auf der Climathon Seite aufgeführt. Das bedeutet auch, dass andere Teams an Lösungen für deine Herausforderung arbeiten können, auch wenn du dich auf dem Event spontan für eine andere Herausforderung entscheiden solltest.",
    "submitDeadline": "Einsendeschluss ist Freitag, der 25. Okt 15:00",
    "submitInfo": "ACHTUNG, ES KÖNNEN KEINE WEITEREN CHALLENGES MEHR EINGEREICHT WERDEN. Es sind bereits ausreichend viele gute Challenges online, daher haben wir beschlossen keine neuen Challenges mehr anzunehmen. Wenn du anderer Meinung bist und glaubst, dass wir genau deine doch noch annehmen sollen, schreibe uns gerne ein Mail.",
    "button": {
      "link2Form": "Formular öffnen",
      "close": "Schliessen"
    },
    "challengeCount": "Bearbeitung beim Climathon 2020 | eine Herausforderung | {count} Herausforderungen",
    "challangeSummary": "Zusammenfassung",
    "challangeDescription": "Status quo & Ressourcen",
    "challangeVision": "Vision & Ergebnis",
    "categories": {
      "smartCity": {
        "title": "Smart City",
        "description": "Smart City ist die Königsdisziplin für ganzheitliche Entwicklungskonzepte, die darauf abzielen, Städte effizienter, technologisch fortschrittlicher, grüner und sozialer zu gestalten. Dazu gehören technische, wirtschaftliche und gesellschaftliche Innovationen, die moderne Technologien in den Bereichen Energie, Mobilität, Stadtplanung, Verwaltung und Kommunikation kombinieren. Mit dem Ziel, das Nachhaltigkeitspotenzial der Stadt zu maximieren und die Lebensqualität ihrer Bewohner zu verbessern."
      },
      "mobility": {
        "title": "Mobilität",
        "description": "Bislang war die Transportindustrie am widerstandsfähigsten gegen den Fortschritt bei den Emissionen. Gleichzeitig sind die Städte entscheidend für die Bewältigung dieser Herausforderung, da sie mit dem Mobilitäts-Trilemma aus sauberer Luft, Kohlenstoff und Staus konfrontiert sind und gleichzeitig mit immer höheren Anforderungen an den Transport von Menschen und Gütern konfrontiert sind."
      },
      "retrofitting": {
        "title": "Nachrüstung",
        "description": "Gebäude spielen eine entscheidende Rolle bei der Eindämmung des Klimawandels und stehen in direktem Zusammenhang mit der Widerstandsfähigkeit zukünftiger Quartiere, Bezirke und Städte. Es ist dringend erforderlich, dass die Städte die derzeitigen Nachrüstraten deutlich erhöhen, um das Pariser Ziel „deutlich unter zwei Grad“ zu erreichen."
      },
      "circularEconomy": {
        "title": "Zirkuläre Ökonomie",
        "description": "Die traditionelle lineare Ökonomie unterstützt kurzsichtiges Design, auffälligen Verbrauch und ineffiziente Abfallbehandlung. Städte sind erstklassige Kandidaten für die Entwicklung einer neuen, langfristigen Vision: Die Kreislaufwirtschaft – welche eine nachhaltige Produktion sowie einen besseren Verbrauch über die gesamte Lieferketten hinweg integriert."
      },
      "food": {
        "title": "Nahrung",
        "description": "Die weltweite Nahrungsmittelproduktion muss sich bis 2050 verdoppeln, um dem Bevölkerungswachstum gerecht zu werden und gleichzeitig muss sie die Auswirkungen auf den Klimawandel bewältigen. Die Notwendigkeit, integrierte und nachhaltige städtische Ernährungssysteme, einschließlich Wertschöpfungsketten und Verbraucherverhalten, zu entwickeln, ist ein dringender Handlungsbedarf für Städte."
      },
      "finance": {
        "title": "Klimafinanzierung",
        "description": "In den Städten beträgt die Finanzierungslücke für nachhaltige Infrastruktur in den nächsten 15 Jahren weltweit 93 Billionen Dollar. Die Fokussierung auf vielversprechende Investitionsvehikel sowie die Vorbereitung von Projekten und der Aufbau von Kapazitäten können es den Investoren ermöglichen, bankfähige grüne Vermögenswerte in Städten zu erwerben."
      },
      "behaviour": {
        "title": "Menschliches Verhalten",
        "description": "Das Verhalten der Bürger ist weitgehend für die aktuellen Trends des globalen Klimawandels verantwortlich. Die Veränderung nicht nachhaltiger Konsum- und Produktionsmuster erschließt daher ein entscheidendes Klimafolgenpotenzial."
      },
      "water": {
        "title": "Wasserwirtschaft",
        "description": "Die Städte sind aufgrund des Klimawandels mit wachsenden Wasserproblemen konfrontiert. Wasserwerke wie Trinkwasserinfrastruktur, Abwasser und Entwässerung können durch Stürme, Meeresspiegelanstieg und nicht nachhaltige Maßnahmen beschädigt werden. Der Klimawandel verursacht auch Wasserknappheit, von der weltweit über 150 Millionen Menschen betroffen sind."
      },
      "energy": {
        "title": "Energie",
        "description": "Städte verbrauchen 78% der weltweiten Energie und sind verantwortlich für 60% der Emissionen. Da die städtische Bevölkerung weltweit zunimmt, sind Städte entscheidend für die Bemühungen zur Emissionsreduzierung."
      },
      "extremeWeather": {
        "title": "Extremwetter",
        "description": "In den letzten Jahrzehnten sind extreme Klimaereignisse wie Hitzewellen, Kältewellen, intensive Stürme und Dürren häufiger und intensiver geworden. Es wird erwartet, dass es zu weiteren Zunahmen in noch nie dagewesenem Ausmaß kommen wird, weshalb die Entwicklung der Widerstandsfähigkeit für alle Städte ein dringender Bedarf ist."
      },
      "waste": {
        "title": "Abfallwirtschaft",
        "description": "Da die Städte unter Druck stehen, die Effizienz des Ressourcenmanagements zu verbessern, den steigenden Energiepreisen zu begegnen und die Deponieräume knapp werden, wird die Reduzierung oder Vermeidung von Abfall immer wichtiger. Die Abfallwirtschaft könnte die Emissionen aller Wirtschaftssektoren verbessern."
      },
      "pollution": {
        "title": "Luftverschmutzung",
        "description": "Mehr als 80% der Menschen in städtischen Gebieten sind einer schlechten Luftqualität ausgesetzt. Die Verringerung der Luftverschmutzung sollte für alle Städte eine Priorität sein, nicht nur zur Verringerung der negativen Auswirkungen des Klimawandels, sondern auch für die Gesundheit der Bürger."
      }
    }
  }
}
</i18n>

<!-- global rules -->
<style lang="stylus">
.v-dialog--fullscreen
  background-color #2f3a58
</style>

<!-- scoped rules -->
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

  .intro
    font-family Roboto Condensed,sans-serif
    font-weight 400
    font-size 20px
    line-height 1.4
    letter-spacing normal
    text-align center
    color #A8E5A3

  .stack-grid-item
    transition all 300ms
    .card
      cursor pointer

  .submitArea
    h2
      margin-bottom 32px
    .submitText
      font-family Roboto Condensed,sans-serif
      font-weight 400
      font-size 20px
      line-height 1.4
      letter-spacing 1px
      text-align center
      color rgba(255, 255, 255, 0.8)
    .submitDeadline
      font-family Roboto Condensed,sans-serif
      font-weight 600
      font-size 20px
      line-height 1.4
      letter-spacing normal
      text-transform uppercase
      text-align center
      color #dd543b
    .submitInfo
      font-family Roboto Condensed,sans-serif
      font-weight 400
      font-size 20px
      line-height 1.4
      letter-spacing normal
      text-align center
      color #dd543b
  .submitInfo
    font-family Roboto Condensed,sans-serif
    font-weight 600
    font-size 20px
    line-height 1.4
    letter-spacing normal
    text-transform uppercase
    text-align center
    color #FFC533

.v-dialog--fullscreen
  .card
    height auto
    .dialog-card-content
      flex-grow 1
    .dialog-card-footer
      flex-grow 0

.card
  height 100%
  h3
    font-family Gagalin,sans-serif
    font-weight 400
    font-style normal
    font-size 24px
    letter-spacing 1px
    color rgba(255, 255, 255, 0.8)
  .count
    font-family Roboto Condensed,sans-serif
    font-weight 600
    font-size 20px
    line-height 1.4
    letter-spacing 1px
    text-transform uppercase
    text-align center
    // TODO: replace with constants
    color rgba(255, 255, 255, 0.38)
  .description
    font-family Roboto Condensed,sans-serif
    font-weight 400
    font-size 20px
    line-height 1.4
    letter-spacing 1px
    text-align center
    color rgba(255, 255, 255, 0.8)
  .challenge
    .batch:before
      content ''
      height 1px
      width calc(50% - 100px)
      position absolute
      top 30px
      left 0
    .batch:after
      content ''
      height 1px
      width calc(50% - 100px)
      position absolute
      top 30px
      right 0
    .batch.city
      &:before, &:after
        background #DD543B
    .batch.community
      &:before, &:after
        background #A8E5A3
    .batch.sponsor
      &:before, &:after
        background #70B4DF
    h4
      font-family Roboto Condensed,sans-serif
      font-size 26px
      font-weight 600
      line-height 1.4
      letter-spacing 1.5px
      text-align center
      color #ffffff
    h5
      font-family Roboto Condensed,sans-serif
      font-size 20px
      line-height 1.4
      letter-spacing 1px
      text-transform uppercase
      text-align center
      color rgba(255, 255, 255, 0.8)
    p
      font-family Roboto Condensed,sans-serif
      font-size 20px
      line-height 1.4
      letter-spacing 1px
      text-align center
      color rgba(255, 255, 255, 0.8)
      &.author
        font-weight 600
      &.author.city
        color #DD543B
      &.author.community
        color #A8E5A3
      &.author.sponsor
        color #70B4DF
  .dialog-card-footer
    button
      font-family Gagalin,sans-serif
      font-weight 400
      font-style normal
      font-size 20px
      letter-spacing 1.5px
  &.active-challenges
    div.count
      // TODO: replace with constants
      color #a8e5a3
</style>
