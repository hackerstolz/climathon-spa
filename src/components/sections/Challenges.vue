<template>
  <section
    :style="{ backgroundColor: sectionColor }">
    <v-container>
      <h2 class="align-left">{{ $t("title") }}</h2>
      <stack 
        ref="stack"
        :column-min-width="320" 
        :gutter-width="24" 
        :gutter-height="24" 
        monitor-images-loaded>
        <stack-item 
          v-for="(category, i) in categories" :key="i"
          class="stack-grid-item">

          <v-card
            :class="{
              'card': true,
              'pa-3': true,
              'active-challenges': category.challenges.length > 0
            }"
            color="rgba(255,255,255,0.1)"
            ripple
            flat
            @click="toogleTile(i)">

            <h3 class="mb-3">{{ $t(`categories.${category.key}.title`) }}</h3>
            <v-img
              :src="category.img"
              max-height="128px"
              contain
              @load="reflow"
            ></v-img>
            <div class="count my-3">{{ $tc('challengeCount', category.challenges.length) }}</div>
            <p class="description">{{ $t(`categories.${category.key}.description`).slice(0, 100).concat('...') }}</p>

            <!-- dialog -->
            <v-dialog
              v-model="category.show" 
              scrollable
              width="80%"
              max-width="640px"
              :fullscreen="isMobile">
              <v-card
                :class="{
                  'card': true,
                  'active-challenges': category.challenges.length > 0
                }"
                color="#2f3a58">
                <div
                  :class="{
                    'dialog-card-content': true,
                    'pa-3': true
                  }">
                  <h3 class="mb-3">{{ $t(`categories.${category.key}.title`) }}</h3>
                  <v-img
                    :src="category.img"
                    max-height="128px"
                    contain
                  ></v-img>
                  <div class="count my-3">{{ $tc('challengeCount', category.challenges.length) }}</div>
                  <p class="description" v-show="category.show">{{ $t(`categories.${category.key}.description`) }}</p>
                  <div class="challenge" v-for="(challenge, j) in category.challenges" :key="j">
                    <v-img
                      :class="{
                        'batch': true,
                        [challenge.type.toLowerCase()]: true,
                        'mt-5': true,
                        'mb-4': true
                      }"
                      :src="require(`../../assets/challenge-${challenge.type.toLowerCase()}.svg`)"
                      max-height="84px"
                      contain
                    ></v-img>
                    <h4 class="mb-4">
                      {{ challenge.title }}
                    </h4>
                    <h5 class="mb-2">{{ $t('challangeSummary') }}</h5>
                    <p class="mb-4">
                      {{ challenge.summary }}
                    </p>
                    <h5 class="mb-2">{{ $t('challangeDescription') }}</h5>
                    <p class="mb-4">
                      {{ challenge.description }}
                    </p>
                    <h5 class="mb-2">{{ $t('challangeVision') }}</h5>
                    <p class="mb-4">
                      {{ challenge.vision }}
                    </p>
                  </div>
                </div>
                <v-card-actions class="dialog-card-footer">
                  <v-spacer/>
                  <v-btn color="accent" flat @click="category.show = false">{{ $t('button.close') }}</v-btn>
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
import debounce from 'lodash/debounce'
import { Stack, StackItem } from 'vue-stack-grid'

const CHALLENGE_TYPE = {
  CITY: "CITY",
  COMMUNITY: "COMMUNITY",
  SPONSOR: "SPONSOR"
}

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
    sectionColor: function () {
      return Object.keys(this.$vuetify.theme).indexOf(this.themeColor) !== -1
        ? this.$vuetify.theme[this.themeColor]
        : this.$vuetify.theme.primary
    }
  },
  methods: {
    toogleTile(i) {
      const clickedCategory = this.categories[i]
      const prevShow = this.categories[i].show

      this.categories.forEach(c => c.show = false)
      clickedCategory.show = !prevShow
    },
    reflow: debounce(function() {
      this.$refs.stack.reflow()
    }, 100)
  },
  data() {
    return {
      categories: [{
          key: "smartCity",
          img: require('../../assets/flat-icon-smartCity.svg'),
          show: false,
          challenges: [
            // {
            //   type: CHALLENGE_TYPE.CITY,
            //   title: "How can I make my city or district Smart?",
            //   summary: "Lorem ipsum…",
            //   description: "Lorem ipsum. Think about and write down how the current situation in your challenge area looks like and identify the main issues. Furthermore, this is the right section to link to existing data or APIs that can be used by the participating teams to work on your challenge. Think about and write down why the current solutions on the market are not sufficient and cannot solve your challenge.",
            //   vision: "Lorem ipsum. Think about and write down how the best case scenario for your city could look like in the future and what specific output (app, product, service, network etc.) you would like to generate in 40 hours."
            // },{
            //   type: CHALLENGE_TYPE.COMMUNITY,
            //   title: "How can I make my city or district Smart?",
            //   summary: "Lorem ipsum…",
            //   description: "Lorem ipsum. Think about and write down how the current situation in your challenge area looks like and identify the main issues. Furthermore, this is the right section to link to existing data or APIs that can be used by the participating teams to work on your challenge. Think about and write down why the current solutions on the market are not sufficient and cannot solve your challenge.",
            //   vision: "Lorem ipsum. Think about and write down how the best case scenario for your city could look like in the future and what specific output (app, product, service, network etc.) you would like to generate in 40 hours."
            // },{
            //   type: CHALLENGE_TYPE.SPONSOR,
            //   title: "How can I make my city or district Smart?",
            //   summary: "Lorem ipsum…",
            //   description: "Lorem ipsum. Think about and write down how the current situation in your challenge area looks like and identify the main issues. Furthermore, this is the right section to link to existing data or APIs that can be used by the participating teams to work on your challenge. Think about and write down why the current solutions on the market are not sufficient and cannot solve your challenge.",
            //   vision: "Lorem ipsum. Think about and write down how the best case scenario for your city could look like in the future and what specific output (app, product, service, network etc.) you would like to generate in 40 hours."
            // }
          ]
        },{
          key: "mobility",
          img: require('../../assets/flat-icon-mobility.svg'),
          show: false,
          challenges: []
        },{
          key: "retrofitting",
          img: require('../../assets/flat-icon-retrofitting.svg'),
          show: false,
          challenges: []
        },{
          key: "circularEconomy",
          img: require('../../assets/flat-icon-circularEconomy.svg'),
          show: false,
          challenges: []
        },{
          key: "food",
          img: require('../../assets/flat-icon-food.svg'),
          show: false,
          challenges: []
        },{
          key: "finance",
          img: require('../../assets/flat-icon-finance.svg'),
          show: false,
          challenges: []
        },{
          key: "behaviour",
          img: require('../../assets/flat-icon-behaviour.svg'),
          show: false,
          challenges: []
        },{
          key: "water",
          img: require('../../assets/flat-icon-water.svg'),
          show: false,
          challenges: []
        },{
          key: "energy",
          img: require('../../assets/flat-icon-energy.svg'),
          show: false,
          challenges: []
        },{
          key: "extremeWeather",
          img: require('../../assets/flat-icon-extremeWeather.svg'),
          show: false,
          challenges: []
      },{
          key: "waste",
          img: require('../../assets/flat-icon-waste.svg'),
          show: false,
          challenges: []
      },{
          key: "pollution",
          img: require('../../assets/flat-icon-pollution.svg'),
          show: false,
          challenges: []
      }]
    }
  }
};
</script>

<i18n>
{
  "en": {
    "title": "Challenges",
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
    font-size 20px
    letter-spacing 1px
    color rgba(255, 255, 255, 0.8)
  .count
    font-family Roboto Condensed,sans-serif
    font-weight 600
    font-size 16px
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
      font-size 32px
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
  &.active-challenges
    div.count
      // TODO: replace with constants
      color #a8e5a3
</style>
