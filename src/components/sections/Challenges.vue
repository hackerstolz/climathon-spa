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
          challenges: []
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
          challenges: []
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
    "intro": "We already have commitments for at least 2 more challenges (a total of 4). We can hardly wait to publish them soon.",
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
    "intro": "Wir haben bereits Zusagen für mind. 2 weitere Challenges (insgesamt dann 4). Wir können kaum erwarten diese bald zu veröffentlichen.",
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
