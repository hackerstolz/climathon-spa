<template>
  <section :style="{ backgroundColor: sectionColor }">
    <v-container>
      <h2 class="align-left">{{ $t("titleWhy") }}</h2>
      <div class="small-earth d-inline-block mx-1">
        <v-img
          :src="require('../../assets/earth-small.svg')"
          height="216"
          width="320"
          contain
        >
        </v-img>
        <div class="pa-2">{{ $t("imgDescription") }}</div>
        <v-btn
          class="link-to-cgoal"
          href="https://www.ipcc.ch/sr15/"
          target="_blank"
          color="accent"
          outline
          flat
        >
          {{ $t("button.link2Goal") }}
          <v-icon dark right>open_in_new</v-icon>
        </v-btn>
      </div>
      <p class="align-left">
        {{ $t("textWhy") }}
      </p>

      <h2 class="align-center">{{ $t("titleWhat") }}</h2>
      <p class="align-center">{{ $t("textWhat[0]") }}</p>
      <p class="align-center">{{ $t("textWhat[1]") }}</p>

      <v-layout
        class="article-container"
        align-center
        justify-center
        flexbox
        wrap
      >
        <v-card
          v-for="(article, i) in articles"
          :key="i"
          :href="article.href"
          target="_blank"
          class="blog-article mr-4 mb-4"
          width="225px"
          ripple
          flat
        >
          <v-img :src="article.img" height="118px">
            <v-container fill-height fluid pa-2>
              <v-icon class="link-icon pa-1" small>
                open_in_new
              </v-icon>
              <v-layout fill-height column>
                <v-spacer />
                <v-flex xs6 align-end>
                  <span class="article-text pa-1">
                    {{ $t(article.i18nLink) }}
                  </span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-img>
        </v-card>
      </v-layout>

      <h2 class="align-left">{{ $t("unoGoalsTitle") }}</h2>
      <p class="align-left" v-html="$t('unoGoalsText')"></p>
      <v-layout
        row
        :align-center="isMobile"
        :justify-center="isMobile"
        flexbox
        wrap
      >
        <v-card
          v-for="(goal, j) in goals"
          :key="j"
          class="uno-goal-card ma-1"
          :href="goal"
          target="_blank"
          ripple
          flat
        >
          <v-img
            :src="require(`../../assets/uno-goals/uno-goal-${j}.png`)"
            class="uno-goal-img"
            :max-height="isMobile ? '96px' : '128px'"
            :max-width="isMobile ? '96px' : '128px'"
            :height="isMobile ? '96px' : '128px'"
            :width="isMobile ? '96px' : '128px'"
          >
          </v-img>
        </v-card>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
export default {
  name: "About",
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
  data() {
    return {
      goals: [
        "https://www.un.org/sustainabledevelopment/sustainable-development-goals/",
        "https://www.un.org/sustainabledevelopment/poverty/",
        "https://www.un.org/sustainabledevelopment/hunger/",
        "https://www.un.org/sustainabledevelopment/health/",
        "https://www.un.org/sustainabledevelopment/education/",
        "https://www.un.org/sustainabledevelopment/gender-equality/",
        "https://www.un.org/sustainabledevelopment/water-and-sanitation/",
        "https://www.un.org/sustainabledevelopment/energy/",
        "https://www.un.org/sustainabledevelopment/economic-growth/",
        "https://www.un.org/sustainabledevelopment/infrastructure-industrialization/",
        "https://www.un.org/sustainabledevelopment/inequality/",
        "https://www.un.org/sustainabledevelopment/cities/",
        "https://www.un.org/sustainabledevelopment/sustainable-consumption-production/",
        "https://www.un.org/sustainabledevelopment/climate-change/",
        "https://www.un.org/sustainabledevelopment/oceans/",
        "https://www.un.org/sustainabledevelopment/biodiversity/",
        "https://www.un.org/sustainabledevelopment/peace-justice/",
        "https://www.un.org/sustainabledevelopment/globalpartnerships/"
      ],
      articles: [
        // {
        //   img: require("../../assets/img-article-01.jpg"),
        //   i18nLink: "button.link2Article1",
        //   href:
        //     "https://medium.com/@Hackerstolz/7-reasons-why-you-should-go-to-a-hackathon-5242c092e2c4"
        // },
        // {
        //   img: require("../../assets/img-article-02.jpg"),
        //   i18nLink: "button.link2Article2",
        //   href:
        //     "https://medium.com/@Hackerstolz/42-hours-at-a-hackathon-4f6444a3c3bd"
        // }
      ]
    };
  }
};
</script>

<i18n>
{
  "en": {
    "titleWhy": "Why climathon?",
    "textWhy": "In a world where information is power 2019 is hopefully the year the world finally realizes that we need to do something about global warming (to all dissenting heads of government - Donald *cough* -, its not working how you think, please find out the difference between weather and climate first). Unfortunately, we are at a point where confidence in our government is waning as far as achieving our climate targets is concerned, and a serious change of course is not discernible. We therefore see it as our duty – as citizens of Planet Earth – to do everything in our power to help tackle this global problem and hopefully make a difference. We want to not just talk about sustainability but try to see what technology can do to fight climate change. That is why Hackerstolz and the City of Mannheim is hosting the Climathon. The Climathon is an over regional initiative by the Climate-KIC from EIT that take place in hundreds of cities all over the world. Become part of it!",
    "titleWhat": "What is climathon about?",
    "textWhat": [
      "For 40 hours you have the opportunity to develop prototypes for digital solutions together in a team. We provide you with public and non-public environmental data as well as data from the economy, with  which you can develop innovative solutions.",
      "Throughout the entire hackathon, you will be supported by a team of experts who will help you develop your ideas."
    ],
    "imgDescription": "1,5° and zero-carbon  goal by 2050",
    "unoGoalsTitle": "Support the UNO sustainability development goals",
    "unoGoalsText": "The Sustainable Development Goals are the blueprint to achieve a better and more sustainable future for all. Goal 13 calls for urgent action to combat climate change and its impacts. It is intrinsically linked to all 16 of the other Goals of the 2030 Agenda for Sustainable Development. To address climate change, countries adopted the Paris Agreement to limit global temperature rise to well below 2 degrees Celsius. Learn more about <a class='link' target='_blank' href='https://www.un.org/sustainabledevelopment/climate-change/'>Goal 13</a>.",
    "button": {
      "link2Goal": "why this matters",
      "link2Article1": "7 reasons why you should go to a hackathon",
      "link2Article2": "24 hours at a hackathon"
    }
  },
  "de": {
    "titleWhy": "Warum ein Climathon?",
    "textWhy": "In einer Welt, in der Informationen Macht sind, ist 2019 hoffentlich das Jahr, in dem die Welt endlich erkennt, dass wir etwas gegen die globale Erwärmung unternehmen müssen (nein Donald, es funktioniert nicht so, wie du denkst, bitte finde zuerst den Unterschied zwischen Wetter und Klima heraus). Leider befinden wir uns an einem Punkt, an dem das Vertrauen in unsere Regierung bei der Erreichung unserer Klimaziele schwindet und ein ernsthafter Kurswechsel nicht erkennbar ist. Deshalb sehen wir es als unsere Pflicht an – als Bürger des Planeten Erde –, alles in unserer Macht Stehende zu tun, um zur Lösung dieses globalen Problems beizutragen und etwas zu bewirken. Wir wollen nicht nur über Nachhaltigkeit sprechen, sondern versuchen zu sehen, was die Technologie zur Bekämpfung des Klimawandels beitragen kann. Deshalb veranstalten Hackerstolz und die Stadt Mannheim den Climathon. Der Climathon ist eine überregionale Initiative des Climate-KIC vom EIT, die in Hunderten von Städten auf der ganzen Welt stattfindet. Werde Teil davon!",
    "titleWhat": "Worum geht es beim Climathon?",
    "textWhat": [
      "40 Stunden lang hast du die Möglichkeit, im Team gemeinsam Prototypen für digitale Lösungen zu entwickeln. Wir stellen dir öffentliche und nicht-öffentliche Umweltdaten sowie Daten aus der Wirtschaft zur Verfügung, mit denen du innovative Lösungen entwickeln kannst.",
      "Während des gesamten Hackathons wirst du von einem Expertenteam unterstützt, das dir bei der Entwicklung deiner Ideen hilft."
    ],
    "imgDescription": "1,5° und Null-Kohlenstoff-Ziel bis 2050",
    "button": {
      "link2Goal": "Warum das wichtig ist",
      "link2Article1": "7 Gründe, warum du zu einem Hackathon gehen solltest",
      "link2Article2": "24 Stunden bei einem Hackathon"
    }
  }
}
</i18n>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
// FIXME: get import globals work
// @import '../globals'

section
  padding-bottom 104px
  h2
    font-family Gagalin,sans-serif
    font-weight 400
    font-style normal
    font-size 28px
    letter-spacing 1.4px
    color #ffffff
    margin-top 128px
    margin-bottom 64px
    &.align-left
      text-align left
    &.align-center
      text-align center

  p
    font-family Roboto Condensed,sans-serif
    font-weight 400
    font-style normal
    font-size 20px
    line-height 1.4
      // TODO: replace with constants
    color rgba(255, 255, 255, 0.8)
    &.align-left
      text-align left
    &.align-center
      text-align center

  .small-earth
    float right
    div
      font-family click-clack,sans-serif
      font-weight 300
      font-size 20px
      line-height 1.2
      // TODO: replace with constants
      color #A8E5A3
    .link-to-cgoal
      font-family Roboto Condensed,sans-serif
      font-weight 400
      font-style normal
      letter-spacing 1px

  .article-container
    margin-top 64px
    .blog-article
      position relative
      cursor pointer
      overflow hidden
      border-radius 8px
      .link-icon
        position absolute
        top 8px
        right 8px
        // TODO: replace with constants
        background-color #1c88c6
      .article-text
        width 196px
        height 54px
        font-family Gagalin,sans-serif
        font-weight 400
        font-style normal
        font-size 16px
        line-height 1.13
        letter-spacing 1.6px
        text-align center
        // TODO: replace with constants
      &:nth-child(odd)
        .article-text, .link-icon
          color #ffffff
          background-color #1c88c6
      &:nth-child(even)
        .article-text, .link-icon
          color #10182F
          background-color #A8E5A3

  .uno-goal-card
    .uno-goal-img
      opacity 0.25
      transition all 300ms
      &:hover
        opacity 1
      @media screen and (max-width: 600px)
        opacity 1
</style>
