<template>
  <section
    :style="{ backgroundColor: sectionColor }">
    <v-container>
      <h2 class="align-left">{{ $t("title") }}</h2>
      <stack 
        ref="stack"
        :column-min-width="320" 
        :gutter-width="32" 
        :gutter-height="32" 
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
            <h3 class="headline mb-0">{{ $t(`categories.${category.key}.title`) }}</h3>

            <v-img
              :src="category.img"
              @load="reflow"
              max-height="128px"
              contain
            ></v-img>

            <div>{{ $tc('challengeCount', category.challenges.length) }}</div>

            <p v-show="category.show">{{ $t(`categories.${category.key}.description`) }}</p>
            <p v-show="!category.show">{{ $t(`categories.${category.key}.description`).slice(0, 100).concat('...') }}</p>

            <v-slide-y-transition>
              <div v-show="category.show">
                <div v-for="(challenge, j) in category.challenges" :key="j">
                  <v-img
                    :src="require(`../../assets/challenge-${challenge.type.toLowerCase()}.svg`)"
                    @load="reflow"
                    max-height="84px"
                    contain
                  ></v-img>
                  <h4>
                    {{ challenge.title }}
                  </h4>
                  <h5>{{ $t('challangeSummary') }}</h5>
                  <p>
                    {{ challenge.summary }}
                  </p>
                  <h5>{{ $t('challangeDescription') }}</h5>
                  <p>
                    {{ challenge.description }}
                  </p>
                  <h5>{{ $t('challangeVision') }}</h5>
                  <p>
                    {{ challenge.vision }}
                  </p>
                </div>
              </div>
            </v-slide-y-transition>
          </v-card>
        </stack-item>
      </stack>
      <h2 class="align-left">{{ $t("titleSubmit") }}</h2>
      <v-img
        :src="require('../../assets/flat-icon-puzzle.svg')"
        max-height="128px"
        contain
      ></v-img>
      <v-btn
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
        <p class="submitText">{{ $t("submitText") }}</p>
        <p class="submitDeadline">{{ $t("submitDeadline") }}</p>
        <p class="submitInfo">{{ $t("submitInfo") }}</p>
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
    }
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
      setTimeout(() => {
        this.reflow()
      }, 300)
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
          challenges: [{
            type: CHALLENGE_TYPE.CITY,
            title: "How can I make my city or district Smart?",
            summary: "Lorem ipsum…",
            description: "Lorem ipsum. Think about and write down how the current situation in your challenge area looks like and identify the main issues. Furthermore, this is the right section to link to existing data or APIs that can be used by the participating teams to work on your challenge. Think about and write down why the current solutions on the market are not sufficient and cannot solve your challenge.",
            vision: "Lorem ipsum. Think about and write down how the best case scenario for your city could look like in the future and what specific output (app, product, service, network etc.) you would like to generate in 40 hours."
          }]
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
      "link2Form": "Open submit form"
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
        "description": "Until now, the transport industry has been the most resistant to emissions progress. At the same time, cities are key in tackling this challenge as they are faced with the mobility trilemma of clean air, carbon, and congestion whilst facing ever increasing demands to move people and goods around. Throughout the entire hackathon, you will be supported by a team of experts who will help you develop your ideas."
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
    "title": "Herausforderungen"
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
      height 100%
      cursor pointer
      // &.active-challenges
</style>
