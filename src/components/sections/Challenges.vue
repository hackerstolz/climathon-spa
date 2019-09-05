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
          v-for="(category, i) in categories"
          :key="i"
          class="stack-grid-item"
        >
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
            @click="toggleTile(i)"
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
                    <v-btn
                      class="ma-0"
                      color="accent"
                      flat
                      @click="category.show = false"
                      icon
                    >
                      <v-icon>close</v-icon>
                    </v-btn>
                  </v-layout>
                  <v-img :src="category.img" max-height="128px" contain></v-img>
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
                  <v-btn color="accent" flat @click="category.show = false">{{
                    $t("button.close")
                  }}</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card>
        </stack-item>
      </stack>

      <div class="submitArea">
        <h2 class="align-left">{{ $t("titleSubmit") }}</h2>
        <v-img
          :src="require('../../assets/flat-icon-puzzle.svg')"
          max-height="128px"
          contain
        ></v-img>
        <v-btn
          class="link-to-cgoal my-4"
          href="https://forms.gle/d5EmFpQPosEJD2PKA"
          target="_blank"
          color="info"
          outline
          flat
        >
          {{ $t("button.link2Form") }}
          <v-icon dark right>open_in_new</v-icon>
        </v-btn>
        <p class="submitText">{{ $t("submitText") }}</p>
        <p class="submitDeadline">{{ $t("submitDeadline") }}</p>
        <p class="submitInfo">{{ $t("submitInfo") }}</p>
      </div>
    </v-container>
  </section>
</template>

<script>
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
  computed: {
    sectionColor: function() {
      return Object.keys(this.$vuetify.theme).indexOf(this.themeColor) !== -1
        ? this.$vuetify.theme[this.themeColor]
        : this.$vuetify.theme.primary;
    }
  },
  methods: {
    toggleTile(i) {
      const clickedCategory = this.categories[i];
      const prevShow = this.categories[i].show;

      this.categories.forEach(c => (c.show = false));
      clickedCategory.show = !prevShow;
    },
    reflow: debounce(function() {
      this.$refs.stack.reflow();
    }, 100)
  },
  data() {
    return {
      categories: [
        {
          key: "smartCity",
          img: require("../../assets/flat-icon-smartCity.svg"),
          show: false,
          challenges: []
        },
        {
          key: "mobility",
          img: require("../../assets/flat-icon-mobility.svg"),
          show: false,
          challenges: []
        },
        {
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
          key: "circularEconomy",
          img: require("../../assets/flat-icon-circularEconomy.svg"),
          show: false,
          challenges: []
        },
        {
          key: "food",
          img: require("../../assets/flat-icon-food.svg"),
          show: false,
          challenges: [
            {
              type: CHALLENGE_TYPE.COMMUNITY,
              i18nAuthor: [
                "Micro Agriculture • Community Vegetable Growing e.V.",
                "Mikro Landwirtschaft • gemeinschaftlicher Gemüseanbau e.V."
              ],
              i18nTitle: [
                "How can everyone grow their own vegetables in the fields in a climate-friendly way?",
                "Wie kann jeder auf dem Acker sein eigenes Gemüse gemeinschaftlich klimagerecht selbst anbauen?"
              ],
              i18nSummary: [
                "Digital supports the cultivation of your own vegetables on the field. Mikro Landwirtschaft wants to set up an online platform for the rental of arable land as communal fields on which even laymen can successfully grow their own vegetables with digital support and smart tools. Protecting the bees, improving the soil, fresh vegetables, packaging-free, without chemicals and long transport routes, a meeting place in the district and promotion of health could thus become a reality.",
                "Digital unterstützt auf dem Acker das eigene Gemüse anbauen. Mikro Landwirtschaft will dazu eine Online-Plattform aufbauen für die Vermietung von Ackerflächen als Gemeinschaftsäcker auf denen auch Laien mit digitaler Unterstützung und smarten Tools erfolgreich ihr eigenes Gemüse anbauen können. Schutz der Bienen, Verbesserung der Böden, Frisches Gemüse, verpackungsfrei, ohne Chemie und lange Transportwege, ein Treffpunkt im Stadtteil und eine Förderung für die Gesundheit könnte so Wirklichkeit werden."
              ],
              i18nDescription: [
                "With so far three pilot community farmers in Mannheim, Micro Agriculture has extensive experience and data on the needs of users and has conducted some experiments and built up test. In addition, research has been carried out into possible tools and approaches. An actual implementation of the results is possible. Micro agriculture is a new concept of agriculture. Industrial agriculture manages to produce food cheaply, but causes problems for the climate, biodiversity, soils, groundwater and health. Alternative agricultural concepts are often not scalable. Micro Agriculture wants to rebuild the lost link between agriculture and consumers. Data sets, existing concepts and further information will be provided very soon.",
                "Mit bisher drei Pilot-Gemeinschaftsäckern in Mannheim hat Mikro Landwirtschaft umfangreiche Erfahrung und Daten zu den Bedürfnissen der Nutzer und hat einige Experimente durchgeführt und Test aufgebaut. Außerdem ist eine Recherche möglicher Tools und Ansätze gemacht. Eine tatsächliche Umsetzung der Ergebnisse ist möglich. Mikro Landwirtschaft ist ein neues Konzept der Landwirtschaft. Die industrielle Landwirtschaft schafft es billig Lebensmittel zu produzieren, dabei verursacht sie aber Probleme für das Klima, die Artenvielfalt, die Böden, das Grundwasser und die Gesundheit schafft. Alternative Konzepte der Landwirtschaft sind bisher oft nicht skallierbar. Die verlorene Verbindung zwischen Landwirtschaft und Verbrauchern möchte Mikro Landwirtschaft wieder aufbauen. Datensätze, existierende Konzepte und weiter Informationen werden in sehr bald nachgeliefert."
              ],
              i18nVision: [
                "<ul class='list'><li>What tools and instruments are needed to successfully grow your own vegetables on a communal farmland as a layperson?</li><li>How can cultivation planning be simplified, which vegetables have to be sown when, when do I have to take care of them how?</li><li>How can the exchange between micro farmers be supported?</li><li>How can the knowledge transfer of the horticultural basics be solved?</li><li>How to distinguish weeds from vegetables?</li><li>Wear smart tools and sensors show at home that you have to water?</li><li>How can pieces of the common field be rented?<li>How can I find a partner for my field piece?</li><li>How can farmers or other operators of communal farmyards rent their field plots as easily as possible?</li><li>How could community farmer operators manage and care for their fields as easily as possible?</li></ul>The result could be an online platform with an online marketplace, with various loosely coupled or integrated tools. Components could include a social media tool for internal communication, crop planners and the ability to integrate your own smart devices. For operators, computers could be created for the required shortage of compost, manure, tools and water, which could be determined on the basis of various factors such as size, location, soil condition and nutrient supply.<br/>The non-profit association Mikro Landwirtschaft could then implement the solution found into reality and enable many new community farmers in Germany and thus make a major contribution to climate-friendly agriculture.",
                "<ul class='list'><li>Welche Tools und Instrumente braucht es, um auf einem Gemeinschaftsacker als Laie erfolgreich sein eigenes Gemüse anzubauen?</li><li>Wie kann die Anbauplanung vereinfacht werden, welches Gemüse muss wann gesät werden, wann muss ich es wie pflegen?</li><li>Wie kann der Austausch zwischen den Mikro Landwirten unterstützt werden?</li><li>Wie kann die Wissensvermittlung der gärtnerischen Grundlagen gelöst werden?</li><li>Wie kann man Unkraut von Gemüse unterscheiden?</li><li>Weche smarten Tools und Sensoren zeigen schon Zuhause an, dass man gießen muss?</li><li>Wie können Feldstücke des Gemeinschaftsackers vermietet werden?<li>Wie finde ich Mitmacher für mein Feldstück?</li><li>Wie können Landwirte oder andere Betreiber von Gemeinschaftsäckern möglichst einfach ihre Feldstücke vermieten?</li><li>Wie könnten Betreiber von Gemeinschaftsäckern die Äcker möglichst einfach verwalten und betreuen?</li></ul>Das Ergebnis könnte eine Online Plattform mit einem Online Marktplatz sein, mit verschiedenen lose gekoppelten oder integrierten Tools. Bestandteile könnten ein Social Media Tool für die interne Kommunikation, Anbauplaner und die Möglichkeit eigene smarte Geräte zu integrieren beinhalten. Für Betreiber könnten Rechner für die benötigte Mange Kompost, Mist, Werkzeug und Wasser entstehen, die anhand verschiedener Faktoren wie Größe, Standort, Bodenbeschaffenheit und Nährstoffversorgung ermittelt werden könnten.<br/>Die gefundene Lösung könnte der gemeinnützige Verein Mikro Landwirtschaft dann in die Realität umsetzen und viele neue Gemeinschaftsäcker in Deutschland ermöglichen und so einen großen beitrag für eine klimagerechte Landwirtschaft leisten."
              ]
            }
          ]
        },
        {
          key: "finance",
          img: require("../../assets/flat-icon-finance.svg"),
          show: false,
          challenges: []
        },
        {
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
          key: "water",
          img: require("../../assets/flat-icon-water.svg"),
          show: false,
          challenges: []
        },
        {
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
                "Wie kann ein Videoclip die Bürger davon überzeugen, Solarstrom auf ihren Dächern zu bauen?",
                "How can a Video Clip convince citizens to build Solar Power on their roofs?"
              ],
              i18nSummary: [
                "Fossil Free Karlsruhe ist eine regionale NGO und hat die Initiative <string>FAKTOR2</strong> in der Stadt Karlsruhe gestartet. Die wichtigsten Inhalte finden Sie auf der untenstehenden WEBsite: <a class='link' target='_blank' href='www.faktor2.solar'>www.faktor2.solar</a><br/>Fossil Free Karlsruhe will die Bewohner mit FAKTOR2 und der Frage herausfordern: \"Wie lange wird es dauern, bis sich die installierte kWpeakPower (Spitzenleistung) auf unseren Dächern verdoppelt hat?\" FAKTOR2 sammelt alle Akteure in einer Stadt wie Karlsruhe und bildet eine breite Koalition, um die Bewohner zu motivieren, ein Solarkraftwerk auf ihren Dächern zu bauen.  Fossil Free Karlsruhe erkannte schnell: Das daraus resultierende Potenzial ist ausreichend und groß genug, um FAKTOR2 national zu starten. Deshalb will Fossil Free Karlsruhe einen Werbevideo-Clip in die Kinos bringen, um die Menschen für FAKTOR2 bundesweit in Brand zu setzen. Die Videoclip-Szenerie ist ein CrashTest und zeigt 2 Dummies, die sich bewusst werden, dass ihr Leben nur in wenigen Sekunden endet. Aber anstatt sofort zu brechen, achten die beiden Tester lieber darauf, ihre Tasse Kaffee nicht zu vergießen. \"Wenn du jetzt Pause machst, werde ich meinen Kaffee verschütten.\" Fossil Free Karlsruhe will mit diesem Clip die Aufmerksamkeit eines breiten Spektrums von Einwohnern auf sich ziehen und bereits jetzt gegen die Klimakatastrophe vorgehen.",
                "Fossil Free Karlsruhe ist a regional NGO and started an initiative called <string>FAKTOR2</strong> in the city of Karlsruhe, Germany. Main Contents to be found in their WEBsite below: <a class='link' target='_blank' href='www.faktor2.solar'>www.faktor2.solar</a><br/>Fossil Free Karlsruhe wants to challenge the residents with FAKTOR2 with the question: \"How long will it take until doubling the installed kWpeakPower on their roofs?\" FAKTOR2 collects all the different players in a city like Karlsruhe and establish a wide coalition to motivate residents to build Solar Power Station on their roofs. Fossil Free Karlsruhe recognized quickly: The resulting potential is adequate and big enough to start FAKTOR2 nationally. Therefore, Fossil Free Karlsruhe wants to bring an advertisment Video Clip into cinemas, to set the people national-wide on fire for FAKTOR2. The Video Clip Scenary is a CrashTest and shows 2 dummies getting aware that their life just ends in very few seconds. But instead of breaking immediately, the two testers prefer being attentive not to slop their cup of coffee. \"...if you break now, I‘ll spill my coffee.\" Fossil Free Karlsruhe wants this clip to attract attention of a wide range of habitants, to take action right now against climate catastrophy."
              ],
              i18nDescription: [
                'Fossil Free Karlsruhe setzt sich für eine große Koalition aller Akteure in der Stadt Karlsruhe ein, wie Parteien, Verbände, Sportgruppen, NGOs, IHK etc. Öffentliche Verkehrsdienstleister können Netzwerkpartner von FAKTOR2 sein, den Slogan von FAKTOR2 in Straßenbahnen drucken oder Jahreskarten für Personen anbieten, die ihr Solarkraftwerk auf dem Dach installiert haben. Jeder Netzwerkpartner kann FAKTOR2 als eigene Kampagne in einem eigenen Skalenformat starten. So könnten z.B. Fußballvereine ihre Fans dazu animieren, ihr Solardach zu starten und ihnen eine Jahreskarte zum halben Preis zu verkaufen. Je mehr Einwohner einer Stadt sich der Notwendigkeit bewusst werden, jetzt, an jeder Ecke, von jeder Seite persönlich etwas zu unternehmen, desto eher beginnen sie zu fragen: Warum nicht ich? Warum nicht jetzt? Jeder Verband, jede Schulklasse sollte sich der Initiative bewusst sein und seine Mitglieder davon überzeugen, jetzt zu handeln und die Solarstromanlage auf Dächern zu installieren. Bei einem derzeitigen Anteil von nur 4% der Karlsruher Dächer gibt es noch viele Menschen zu überzeugen. Werden dagegen 100 Prozent der passenden Montagedächer mit Solarstromanlagen gedeckt, ergibt sich die doppelte elektrische Energie, die die Karlsruher Haushalte verbrauchen. Das zeigt: Es gibt viel zu gewinnen für unsere gesamte Gesellschaft! National skaliert, ist die Situation ziemlich gleich. In jeder Stadt Mitteleuropas finden wir nur einen kleinen Prozentsatz an Solarstromdächern. Fossil Free Karlsruhe will auch andere Städte mit einem momentan unbekannten und völlig neuen Asset herausfordern: der Konkurrenzfrage: Welche Stadt schafft das schnellere PV-Dachwachstum. Wenn sich verschiedene Städte darauf einigen, einen Solarstromwettbewerb zu starten, wird dies die Motivation der Stadtbevölkerung enorm beschleunigen. Und das ist noch nicht alles: Die Strategien der Städte sind nun miteinander vergleichbar, Fossil Free Karlsruhe hat gerade mit der Kommunikation mit anderen NGOs in anderen mitteleuropäischen Städten begonnen. Um diese Initiative schnell und erfolgreich auf die nationale Ebene zu bringen und viele Städte zu aktivieren, will Fossil Free Karlsruhe einen Werbevideo-Clip in die Kinos bringen, um die Menschen für FAKTOR2 bundesweit in Brand zu setzen. Die Videoclip-Szenerie ist ein CrashTest! 2 Dummies sitzen in einem Auto bei 200km/h. 250m vor der Wand, sagt Dummy1: "Wenn wir nicht sofort brechen, werden wir gegen die Wand schlagen und für immer tot sein." Dummy2 (mit einer Tasse Kaffee in der Hand) antwortet: "Das ist der Fall, aber wenn du jetzt unterbrichst, werde ich meinen Kaffee verschütten." // CUT // Nachdem die Dummies szenisch eine Off-Sprachbrücke zum Themenbereich "Klimakatastrophe" // CUT // Der Clip zeigt nun einige Bürger, die interviewt werden und erklärt, warum sie die Initiative FAKTOR2 unterstützen // CUT // Der Clip endet nun mit einem angemessenen Appell an alle, z.B......: Jetzt liegt es an Ihnen, FAKTOR2 auf Ihrem eigenen Dach zu starten oder den Eigentümer Ihrer Mietwohnung zu überzeugen. Fossil Free Karlsruhe beschreibt die Dummies also szenisch als genau die gleiche Situation wie unsere gesamte Zivilisation! Fossil Free Karlsruhe glaubt, dass dieser Clip den Geist der Menschen bemerkenswert beeinflussen und sie dazu bringen kann, jetzt zu handeln. Fossil Free Karlsruhe sucht einen Partner, um diesen Clip zu erstellen.',
                'Fossil Free Karlsruhe is active to create a big coalition of all players in the city of Karlsruhe, such as political parties, associations, sport groups, NGOs, IHK etc. Public traffic providers could be a network partner for FAKTOR2, printing FAKTOR2’s Slogan on Trams, or offering annual tickets to people having installed their Solar Power Station on their roof. Every Network partner can start FAKTOR2 as ist own campaign in its own scale format. E.g. Football Clubs could animate their fans to start their Solar roof in selling them an annual card at half price. The more residents of a city get aware of the need to take personally action right now, at any corner, from any side, the sooner they start to ask: Why not me? Why not now? Every association, every school class should be aware of the initiative and convince its members to take action now and install Solar Power System on roofs. At a momentary scale of ons 4% of Karlsruhe’s roofs there is still a lot of people to convince. On the other hand, if 100 percent of the adequate fitting roofs are set with Solar Power Systems, this will provide twice the electrical energy that Karlsruhe’s housholds consume. This shows: there is a lot to win for our whole society! Scaled national wide, the situation is pretty the same. In every city in Central Europe we find only a small percentage of Solar Power roofs. Fossil Free Karlsruhe wants to challenge also other cities with a momentarily unknown and totally new asset: the competition question: Which City creates the faster PV-roof-growth. If various cities agree to start a Solar Power Competition to each other, this will accelerate the motivation oft he cities populations tremendously. What is more: The cities strategies are now comparable to each other, Fossil Free Karlsruhe just started communication with other NGOs in other central european cities. To bring this initiative quickly and successfully into national level and activate many cities, Fossil Free Karlsruhe wants to bring an advertisment Video Clip into cinemas, to set the people national-wide on fire for FAKTOR2. Video Clip Scenary is a CrashTest! 2 dummies sitting in a car at 200km/h. 250m in Front of the wall, Dummy1 says: "If we do not break immediately, we‘re going to crash against the wall and be dead forever." Dummy2 (with a Cup of coffee in his hand) replys: "That‘s the case but if you break now, I‘ll spill my coffee." // CUT // After the Dummies scenary an off voice bridges to the subject area "Climate Catastrophy" // CUT // The Clip now shows some citizens being interviewed, explaining why they support the initiative FAKTOR2 // CUT // The Clip now ends with an adequate appeal to everybody, e.g.: Now it’s up to you to start FAKTOR2 at your own roof, or to convince the owner of your rented apartment. So Fossil Free Karlsruhe describes the dummies scenary as exactly the same situation as of our whole civilization! Fossil Free Karlsruhe thinks that this Clip can affect the people’s mind remarkably and bring them to take action now. Fossil Free Karlsruhe searches for partner to create this Clip.'
              ],
              i18nVision: [
                "Der Videoclip muss in einer hohen, kinoreifen Auflösung vorliegen. Um die Umsetzung einfach zu halten: Die Szenerie der Fahrzeuginnenausstattung konnte aus einem professionellen Car Race Video Game übernommen und entsprechend angepasst werden. Die ganze Szenerie rund um den CrashTest könnte synthetisch spielen, in einer Art Car Race Animation oder ähnlichem. Die entlegene Landschaft könnte von einer bereits bestehenden Gruppe von Karlsruher HFG-Studenten mit Zugang zu einem professionellen Kamera-Drohnen-Tool extern hinzugefügt werden. Das folgende Interviewszenario kann auch extern durchgeführt werden. Die Lösung Fossil Free Karlsruhe needs ist ein überzeugendes, attraktives Video, das Menschen, die emotional über Solarstrom auf Dächern nachdenken, dazu bringt, gegen die Auswirkungen des Klimawandels anzugehen. Ein Solardach zu haben, muss sexy sein als ohne. Eine Wohnung ohne Solardach zu mieten, muss für jeden Vermieter beschämend sein. Solange unsere demokratischen Regierungen weder bereit noch in der Lage sind, Hausbesitzer von *allem* Haus zu drängen, Solardächer zu installieren, ist FAKTOR2 eine Initiative mit einer Menge brechender Vermögenswerte. FAKTOR2 kann problemlos mitteleuropäisch fliegen, da Fossil Free Karlsruhe bereits mit anderen NGOs in anderen Städten vernetzt ist.",
                "The Video Clip must be in a high, cinema fitting resolution. To keep the realization simple: The car interieur scenery could be grabbed from a professional Car Race Video Game and adequately adapted. The whole scenary around the CrashTest could play synthetically, in some kind of Car Race animation or similar. The outlying scenary could be added externally by a already existing group of Karlsruhe’s HFG students with access to a professional camera drone tool. The following interview scenario can be done externaly as well. The Solution Fossil Free Karlsruhe needs is a convincing, attractive Video that brings people thinking emotionally about Solar Power on roofs to stand against climate change effects. Having a Solar roof must be more sexy than without. Renting an appartement without a Solar roof on top must be ashaming for each landlord. As long as our democratic governments are neither willing nor able to urge house owners of *all* houses to install Solar roofs, FAKTOR2 is one inititative with a lot of breaking assets. FAKTOR2 can easily fly central-european wide, since Fossil Free Karlsruhe is already starting in networking with other NGOs in other cities."
              ]
            }
          ]
        },
        {
          key: "extremeWeather",
          img: require("../../assets/flat-icon-extremeWeather.svg"),
          show: false,
          challenges: []
        },
        {
          key: "waste",
          img: require("../../assets/flat-icon-waste.svg"),
          show: false,
          challenges: []
        },
        {
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
    "intro": "Wow, the first challenges are already online, but many will follow. Here you will find a list of all categories for which challenges can be offered, highlighted in green the categories for which at least one challenge already exists. Why is this important? At the Climathon you have to decide as a team for <strong>ONE CHALLENGE</strong> on which you want to work and at the end submit your solution.",
    "titleSubmit": "Submit your own challenge",
    "submitText": "I bet you can come up with something so much more innovative than we do! Go ahead and submit your own challenge to complete our puzzle – if we agree with it, it will be listed on this side as well. This also means that other teams can work on solutions for your challenge, even if you decide spontaneously for another challenge.",
    "submitDeadline": "Submit deadline is Friday 25. Oct 15:00",
    "submitInfo": "Please be aware that you can only attend when working on a published challenge.",
    "button": {
      "link2Form": "Open submit form",
      "close": "Close"
    },
    "challengeCount": "no challenge, yet | one challenge | {count} challenges",
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
    "intro": "Wow, die ersten Challenges sind bereits online, aber viele werden noch folgen. Hier findest du aufgelistet alle Kategorien zu denen Challenges angeboten werden können, grün hervorgehoben die Kategorien zu denen bereits mind. eine Challenge existiert. Warum das wichtig ist? Auf dem Climathon musst du dich als Team für <strong>EINE CHALLENGE</strong> entscheiden an der du arbeiten möchtest und am Ende deine Lösung zu einreichst.",
    "titleSubmit": "Reichen Sie Ihre eigene Herausforderung ein",
    "submitText": "Ich wette, du kannst dir etwas so viel Innovativeres einfallen lassen als wir! Reiche deine eigene Herausforderung ein – wenn wir diese genehmigen, wird diese auch auf der Climathon Seite aufgeführt. Das bedeutet auch, dass andere Teams an Lösungen für deine Herausforderung arbeiten können, auch wenn du dich auf dem Event spontan für eine andere Herausforderung entscheiden solltest.",
    "submitDeadline": "Einsendeschluss ist Freitag, der 25. Okt 15:00",
    "submitInfo": "Bitte beachte, dass du nur teilnehmen kannst, wenn du an einer veröffentlichten Herausforderung arbeitest.",
    "button": {
      "link2Form": "Formular öffnen",
      "close": "Schliessen"
    },
    "challengeCount": "keine Herausforderung, bisher | eine Herausforderung | {count} Herausforderungen",
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
    margin-bottom 128px
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
