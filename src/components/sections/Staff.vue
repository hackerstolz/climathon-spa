<template>
  <section :style="{ backgroundColor: sectionColor }">
    <v-container>
      <h2 id="speaker">{{ $t("speakersTitle") }}</h2>
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
          :id="speaker.speakerID"
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
            class="mx-4 my-2 rounded-image"
            :src="speaker.icon"
            max-height="96px"
            max-width="96px"
            width="96px"
            cover
          ></v-img>
          <p class="speaker-title my-1">
            {{ speaker.name }}
          </p>
          <p class="subtitle my-1">
            {{
              $i18n.locale === "en"
                ? speaker.i18nSubtitle[0]
                : speaker.i18nSubtitle[1]
            }}
          </p>
          <p class="speaker-description my-1">
            {{
              $i18n.locale === "en"
                ? speaker.i18nDescription[0]
                : speaker.i18nDescription[1]
            }}
          </p>
          <v-btn class="my-3" outline flat small @click="toggleSpeaker(i)">
            {{ $t("more") }}
          </v-btn>

          <v-dialog
            v-model="speaker.show"
            scrollable
            width="80%"
            max-width="640px"
            :fullscreen="isMobile"
          >
            <v-card class="card" color="#2f3a58">
              <div class="dialog-card-content pa-3">
                <v-layout row>
                  <div class="ml-3 mr-4">&nbsp;</div>
                  <v-spacer />
                  <h3 class="mb-3">
                    {{ speaker.name }}
                  </h3>
                  <v-spacer />
                  <v-btn
                    class="ma-0"
                    color="accent"
                    flat
                    @click="speaker.show = false"
                    icon
                  >
                    <v-icon>close</v-icon>
                  </v-btn>
                </v-layout>
                <v-img
                  class="mb-4 avatar"
                  :src="speaker.icon"
                  max-height="128px"
                  max-width="128px"
                  width="128px"
                  cover
                ></v-img>
                <h4>{{ $t("talkTitle") }}</h4>
                <p class="description mb-4" v-show="speaker.show">
                  {{
                    $i18n.locale === "en"
                      ? speaker.i18nDescription[0]
                      : speaker.i18nDescription[1]
                  }}
                </p>
                <h4>
                  {{
                    speaker.female
                      ? $t("aboutTheSpeakerFemale")
                      : $t("aboutTheSpeakerMale")
                  }}
                </h4>
                <p
                  class="long-description mb-4"
                  v-html="
                    $i18n.locale === 'en'
                      ? speaker.i18nLongDescription[0]
                      : speaker.i18nLongDescription[1]
                  "
                ></p>
              </div>
              <v-card-actions class="dialog-card-footer">
                <v-spacer />
                <v-btn color="accent" flat @click="speaker.show = false">{{
                  $t("button.close")
                }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
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
        v-if="mentors.length === 0"
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
  methods: {
    toggleSpeaker(i) {
      const clickedSpeaker = this.speakers[i];
      const prevShow = this.speakers[i].show;

      this.speakers.forEach(c => (c.show = false));
      clickedSpeaker.show = !prevShow;
    }
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
      speakers: [
        {
          speakerID: "agnes-schoenfelder",
          icon: require("../../assets/speaker/speaker-agnes.jpg"),
          name: "Agnes Schönfelder",
          i18nSubtitle: [
            "Leiterin der Klimaschutzleitstelle, Stadt Mannheim",
            "Head of the Climate Change Strategy Office, City of Mannheim "
          ],
          i18nDescription: [
            '"Wind of Change for Mannheim on Climate Track"',
            '"Frischer Wind für Mannheim auf Klimakurs"'
          ],
          i18nLongDescription: [
            "Agnes Schönfelder has been acting in public authorities at municipal and state level over 20 years, since 2009 as the Head of the Climate Change Strategy Office for the City of Mannheim in a cross-departmental function. In addition to her activities at the municipality, she had taken over the management of the Climate Action Agency Mannheim at the beginning of 2019 and will thus combine the activities for the implementation of the local climate protection strategy MANNHEIM ON CLIMATE TRACK city-wide. The climate protection and communication expert is a civil engineer by profession and has completed further studies in environmental and climate issues as well as a management consultant. Her main task is to develop climate strategies and to coordinate mitigation and adaptation projects. She is an expert for peer-to-peer exchange and large-scale networking in capacity building processes to transfer of good practice not only within the city but on European and international stage. She is particularly interested in cooperation and communication, both in local and regional and international networks.",
            "Agnes Schönfelder ist seit über 20 Jahren auf kommunaler und nationaler Ebene in der öffentlichen Verwaltung tätig und leitet seit 2009 dezernats- und fachübergreifend die Klimaschutzleitstelle der Stadt Mannheim. Zusätzlich zu ihren Aktivitäten bei der Stadtverwaltung übernahm sie Anfang 2019 die Leitung der Klimaschutzagentur Mannheim und wird damit die Aktivitäten zur Umsetzung der lokalen Klimaschutzstrategie MANNHEIM KLIMAKURS stadtweit zusammenführen. Die Klimaschutz- und Kommunikationsexpertin ist von Beruf Bauingenieur und hat weitere Studien in Umwelt- und Klimafragen sowie als Managementreferentin absolviert. Ihre Hauptaufgabe ist es, Klimastrategien zu entwickeln und Klimaschutz- und Anpassungsprojekte zu koordinieren. Sie ist eine Expertin für den Erfahrungsaustausch und die umfassende Vernetzung zum Aufbau von Strukturen und die Gestaltung von Prozessen nicht nur innerhalb der Stadt, sondern auch auf europäischer und internationaler Ebene. Ihr besonderes Interesse gilt der Zusammenarbeit und Kommunikation in lokalen und regionalen sowie internationalen Netzwerken."
          ],
          female: true,
          show: false
        }
      ],
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
    "introSpeakers": "Here we will publish speaker by speaker who will give you a goose bump moment at the opening ceremony on Friday. <a class='link' href='mailto:climathon@hackerstolz.de?subject=I%20want%20to%20be%20sponsor,%20mentor,%20speaker,%20etc.'>Contact us</a> to become a speaker.",
    "more": "More",
    "talkTitle": "title of the talk",
    "aboutTheSpeakerFemale": "About the speaker",
    "aboutTheSpeakerMale": "About the speaker",
    "juryTitle": "Jury",
    "introJury": "These faces and names will soon be replaced by really cool jury members. And because science has not been given enough attention so far, we have two jury members from this category. <a class='link' href='mailto:climathon@hackerstolz.de?subject=I%20want%20to%20be%20sponsor,%20mentor,%20speaker,%20etc.'>Contact us</a> to become a jury member.",
    "mentorsTitle": "Mentors",
    "introMentors": "So that you have a contact person ready to answer questions on a wide variety of topics, we will put a battalion of mentors at your side. Find out more soon who you can expect here. <a class='link' href='mailto:climathon@hackerstolz.de?subject=I%20want%20to%20be%20sponsor,%20mentor,%20speaker,%20etc.'>Contact us</a> to become a mentor.",
    "button": {
      "close": "Close"
    }
  },
  "de": {
    "speakersTitle": "Referenten",
    "introSpeakers": "Hier werden wir nach und nach die Referenten veröffentlichen, die dir bei der Eröffnung am Freitag einen Gänsehautmoment verpassen werden. <a class='link' href='mailto:climathon@hackerstolz.de?subject=I%20want%20to%20be%20sponsor,%20mentor,%20speaker,%20etc.'>Kontaktiere uns</a> um dich als Redner zu bewerben.",
    "more": "More",
    "talkTitle": "Titel des Vortrags",
    "aboutTheSpeakerFemale": "Über die Speakerin",
    "aboutTheSpeakerMale": "Über den Speaker",
    "juryTitle": "Jury",
    "introJury": "Diese Gesichter und Namen werden bald durch wirklich coole Jurymitglieder ersetzt. Und weil der Wissenschaft bisher nicht genügend Aufmerksamkeit geschenkt wurde, haben wir zwei Jurymitglieder aus dieser Kategorie. <a class='link' href='mailto:climathon@hackerstolz.de?subject=I%20want%20to%20be%20sponsor,%20mentor,%20speaker,%20etc.'>Kontaktiere uns</a> um dich als Jury-Mitglied zu bewerben.",
    "mentorsTitle": "Mentoren",
    "introMentors": "Damit du immer einen Ansprechpartner hast, der dir bei Fragen zu den unterschiedlichsten Themen zur Seite steht, stellen wir dir ein Bataillon von Mentoren zur Seite. Mehr darüber, wen du hier erwarten kannst, erfährst du in Kürze. <a class='link' href='mailto:climathon@hackerstolz.de?subject=I%20want%20to%20be%20sponsor,%20mentor,%20speaker,%20etc.'>Kontaktiere uns</a> um Mentor zu werden.",
    "button": {
      "close": "Schliessen"
    }
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
    .rounded-image
      border-radius 8px
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
    .subtitle
      font-family click-clack,sans-serif
      font-weight 500
      font-size 20px
      font-style normal
      line-height 1.2
      letter-spacing 0.5px
      text-align inherit
      color #A8E5A3
    .speaker-description, .judge-description, .mentor-description
      font-family click-clack,sans-serif
      font-weight 300
      font-size 20px
      font-style normal
      line-height 1.2
      letter-spacing 0.5px
      text-align inherit
      color rgba(255, 255, 255, 0.8)

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
  h4
    font-family Roboto Condensed,sans-serif
    font-size 20px
    font-weight 600
    line-height 1.4
    letter-spacing 1.5px
    text-align center
    text-transform uppercase
    color #ffffff
  .avatar
    margin 0 auto
    border-radius 50%
  .description
    font-family Roboto Condensed,sans-serif
    font-weight 400
    font-size 20px
    line-height 1.4
    letter-spacing 1px
    text-align center
    color rgba(255, 255, 255, 0.8)
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
