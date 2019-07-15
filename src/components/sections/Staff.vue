<template>
  <section :style="{ backgroundColor: sectionColor }">
    <v-container>
      <h2>{{ $t("speakersTitle") }}</h2>
      <p class="introSpeakers my-5" v-html="$t('introSpeakers')"></p>
      <v-img
        v-if="speakers.length === 0"
        class="icon-large mt-4"
        :src="require('../../assets/flat-icon-mic-large.svg')"
        max-height="245px"
        max-width="245px"
        width="245px"
        contain
      ></v-img>
      <v-layout
        v-if="speakers.length > 0"
        class="my-4"
        row
        wrap
        align-start
        justify-center
      >
        <v-flex
          v-for="(speaker, i) in speakers"
          :key="i"
          :class="{
            'stack-grid-item': true,
            'pa-2': true,
            xs4: !isMobile,
            xs12: isMobile
          }"
        >
          <v-img
            class="mx-4 my-2"
            :src="speaker.icon"
            max-height="96px"
            max-width="96px"
            width="96px"
            contain
          ></v-img>
          <p class="speaker-title my-1">
            {{
              $i18n.locale === "en"
                ? speaker.i18nTitle[0]
                : speaker.i18nTitle[1]
            }}
          </p>
          <p class="speaker-description my-1">
            {{
              $i18n.locale === "en"
                ? speaker.i18nDescription[0]
                : speaker.i18nDescription[1]
            }}
          </p>
        </v-flex>
      </v-layout>

      <h2>{{ $t("juryTitle") }}</h2>
      <p class="introJury my-5" v-html="$t('introJury')"></p>
      <v-layout
        v-if="jury.length > 0"
        class="my-4"
        row
        wrap
        align-start
        justify-center
      >
        <v-flex
          v-for="(judge, i) in jury"
          :key="i"
          :class="{
            'stack-grid-item': true,
            'pa-2': true,
            xs4: !isMobile,
            xs12: isMobile
          }"
        >
          <v-img
            class="mx-4 my-2"
            :src="judge.icon"
            max-height="96px"
            max-width="96px"
            width="96px"
            contain
          ></v-img>
          <p class="judge-title my-1">
            {{
              $i18n.locale === "en" ? judge.i18nTitle[0] : judge.i18nTitle[1]
            }}
          </p>
          <p class="judge-description my-1">
            {{
              $i18n.locale === "en"
                ? judge.i18nDescription[0]
                : judge.i18nDescription[1]
            }}
          </p>
        </v-flex>
      </v-layout>

      <h2>{{ $t("mentorsTitle") }}</h2>
      <p class="introMentors my-5" v-html="$t('introMentors')"></p>
      <v-img
        v-if="speakers.length === 0"
        class="icon-large mt-4"
        :src="require('../../assets/flat-icon-persons-large.svg')"
        max-height="245px"
        max-width="245px"
        width="245px"
        contain
      ></v-img>
      <v-layout
        v-if="mentors.length > 0"
        class="my-4"
        row
        wrap
        align-start
        justify-center
      >
        <v-flex
          v-for="(mentor, i) in mentors"
          :key="i"
          :class="{
            'stack-grid-item': true,
            'pa-2': true,
            xs4: !isMobile,
            xs12: isMobile
          }"
        >
          <v-img
            class="mx-4 my-2"
            :src="mentor.icon"
            max-height="96px"
            max-width="96px"
            width="96px"
            contain
          ></v-img>
          <p class="mentor-title my-1">
            {{
              $i18n.locale === "en" ? mentor.i18nTitle[0] : mentor.i18nTitle[1]
            }}
          </p>
          <p class="mentor-description my-1">
            {{
              $i18n.locale === "en"
                ? mentor.i18nDescription[0]
                : mentor.i18nDescription[1]
            }}
          </p>
        </v-flex>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
export default {
  name: "Staff",
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
      speakers: [],
      jury: [
        {
          icon: require("../../assets/flat-icon-scientist.svg"),
          i18nTitle: ["The Scientist", "Die Wissenschaftlerin"],
          i18nDescription: [
            "She observes, discusses and concludes with a knife sharp mind and a concentrated understanding.",
            "Sie beobachtet, diskutiert und besticht mit einem messerscharfen Verstand und einem konzentrierten Verständnis."
          ]
        },
        {
          icon: require("../../assets/flat-icon-alien.svg"),
          i18nTitle: ["The Second Scientist", "Der zweite Wissenschaftler"],
          i18nDescription: [
            "Experienced, brilliant and heard, our scientists cannot be ignored.",
            "Erfahren, brillant und hörenswert, können unsere Wissenschaftler nicht ignoriert werden."
          ]
        },
        {
          icon: require("../../assets/flat-icon-man.svg"),
          i18nTitle: ["The Economist", "Der Ökonom"],
          i18nDescription: [
            "Every project must also be financed, if there are gaps in the business model our expert will find them.",
            "Jedes Projekt muss auch finanziert werden, wenn es Lücken im Geschäftsmodell gibt, wird unser Experte sie finden."
          ]
        },
        {
          icon: require("../../assets/flat-icon-man-sunglasses.svg"),
          i18nTitle: ["Media Expert", "Medienexperte"],
          i18nDescription: [
            "With a broad overview of other climate projects, the media expert knows which needs are not yet covered.",
            "Mit einem breiten Überblick über andere Klimaprojekte weiß der Medienexperte, welche Bedürfnisse noch nicht abgedeckt sind."
          ]
        },
        {
          icon: require("../../assets/flat-icon-man-beard.svg"),
          i18nTitle: ["Rep of the City", "Vertreter der Stadt"],
          i18nDescription: [
            "Mannheim is his specialty, you think you are already an expert of your city? Think about it again.",
            "Mannheim ist seine Spezialität. Du denkst, du bist schon ein Experte deiner Stadt? Denke noch einmal darüber nach."
          ]
        },
        {
          icon: require("../../assets/flat-icon-woman.svg"),
          i18nTitle: ["Hackerwoman", "Hackerwoman"],
          i18nDescription: [
            "0010 1001 1111 1001 1001 1000 0000 0111 0001 0110 1010 0101 0011 1100 0011 0000 0010 0100",
            "0010 1001 1111 1001 1001 1000 0000 0111 0001 0110 1010 0101 0011 1100 0011 0000 0010 0100"
          ]
        }
      ],
      mentors: []
    };
  }
};
</script>

<i18n>
{
  "en": {
    "speakersTitle": "Speakers",
    "introSpeakers": "Here we will soon publish the speakers who will give you a goose bump moment at the opening ceremony on Friday. <a class='link' href='mailto:climathon@hackerstolz.de?subject=I%20want%20to%20be%20sponsor,%20mentor,%20speaker,%20etc.'>Contact us</a> to become a speaker.",
    "juryTitle": "Jury",
    "introJury": "These faces and names will soon be replaced by really cool jury members. And because science has not been given enough attention so far, we have two jury members from this category. <a class='link' href='mailto:climathon@hackerstolz.de?subject=I%20want%20to%20be%20sponsor,%20mentor,%20speaker,%20etc.'>Contact us</a> to become a jury member.",
    "mentorsTitle": "Mentors",
    "introMentors": "So that you have a contact person ready to answer questions on a wide variety of topics, we will put a battalion of mentors at your side. Find out more soon who you can expect here. <a class='link' href='mailto:climathon@hackerstolz.de?subject=I%20want%20to%20be%20sponsor,%20mentor,%20speaker,%20etc.'>Contact us</a> to become a mentor."
  },
  "de": {
    "speakersTitle": "Referenten",
    "introSpeakers": "Hier werden wir in Kürze die Referenten veröffentlichen, die dir bei der Eröffnung am Freitag einen Gänsehautmoment verpassen werden. <a class='link' href='mailto:climathon@hackerstolz.de?subject=I%20want%20to%20be%20sponsor,%20mentor,%20speaker,%20etc.'>Kontaktiere uns</a> um dich als Redner zu bewerben.",
    "juryTitle": "Jury",
    "introJury": "Diese Gesichter und Namen werden bald durch wirklich coole Jurymitglieder ersetzt. Und weil der Wissenschaft bisher nicht genügend Aufmerksamkeit geschenkt wurde, haben wir zwei Jurymitglieder aus dieser Kategorie. <a class='link' href='mailto:climathon@hackerstolz.de?subject=I%20want%20to%20be%20sponsor,%20mentor,%20speaker,%20etc.'>Kontaktiere uns</a> um dich als Jury-Mitglied zu bewerben.",
    "mentorsTitle": "Mentoren",
    "introMentors": "Damit du immer einen Ansprechpartner hast, der dir bei Fragen zu den unterschiedlichsten Themen zur Seite steht, stellen wir dir ein Bataillon von Mentoren zur Seite. Mehr darüber, wen du hier erwarten kannst, erfährst du in Kürze. <a class='link' href='mailto:climathon@hackerstolz.de?subject=I%20want%20to%20be%20sponsor,%20mentor,%20speaker,%20etc.'>Kontaktiere uns</a> um Mentor zu werden."
  }
}
</i18n>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

  .icon-large
    margin 0 auto

  .introSpeakers, .introJury, .introMentors
    font-family Roboto Condensed,sans-serif
    font-weight 400
    font-size 20px
    line-height 1.4
    letter-spacing normal
    text-align center
    color rgba(255, 255, 255, 0.8)

  .stack-grid-item
    transition all 300ms
    display flex
    flex-direction column
    align-items center
    justify-content center
    .speaker-title, .judge-title, .mentor-title
      font-family Gagalin,sans-serif
      font-weight 400
      font-style normal
      font-size 20px
      font-stretch normal
      line-height 1
      letter-spacing 1px
      text-align inherit
      color #ffffff
    .speaker-description, .judge-description, .mentor-description
      font-family click-clack,sans-serif
      font-weight 300
      font-size 20px
      font-style normal
      line-height 1.2
      letter-spacing 0.5px
      text-align inherit
      color rgba(255, 255, 255, 0.8)
</style>
