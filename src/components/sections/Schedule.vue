<template>
  <section :style="{ backgroundColor: sectionColor }">
    <v-container>
      <h2>
        {{ $t("language")
        }}<v-icon class="ml-3" :x-large="!isMobile">g_translate</v-icon>
      </h2>
      <p class="introText mb-5">{{ $t("introText") }}</p>
      <h3>{{ $t("title") }}</h3>
      <v-card
        v-for="(day, i) in days"
        :key="i"
        class="card pa-3 mb-5"
        width="100%"
        color="rgba(255,255,255,0.1)"
        flat
      >
        <h3 class="mt-2 mb-3">
          {{ $i18n.locale === "en" ? day.i18nTitle[0] : day.i18nTitle[1] }}
        </h3>
        <h4 class="mb-5">
          {{ $i18n.locale === "en" ? day.i18nDate[0] : day.i18nDate[1] }}
        </h4>
        <v-card
          v-for="(item, j) in day.schedule"
          :key="j"
          :class="{
            'schedule-item': true,
            'mb-5': true,
            'py-2': item.speaker,
            speaker: item.speaker
          }"
          :color="item.speaker ? 'rgba(255,255,255,0.1)' : 'transparent'"
          :ripple="item.speaker"
          @click="() => (item.speaker ? $scrollTo(`#${item.speakerID}`) : null)"
          flat
        >
          <v-img
            :class="{
              'mx-4': true,
              avatar: item.speaker
            }"
            :src="item.icon"
            max-height="96px"
            max-width="96px"
            width="96px"
            cover
          >
            <v-img
              class="speaker-icon"
              v-if="item.speaker"
              :src="require('../../assets/flat-icon-schedule-mic.svg')"
              max-height="36px"
              max-width="36px"
              width="36px"
              cover
            >
            </v-img>
          </v-img>
          <div class="info-area">
            <div class="time my-1">{{ item.time }}</div>
            <p class="item-title my-1">
              {{
                $i18n.locale === "en" ? item.i18nTitle[0] : item.i18nTitle[1]
              }}
            </p>
            <p
              class="item-description my-1"
              v-html="
                $i18n.locale === 'en'
                  ? item.i18nDescription[0]
                  : item.i18nDescription[1]
              "
            ></p>
            <v-btn
              v-for="(action, k) in item.actions"
              :key="k"
              class="mt-2"
              width="auto"
              :href="action.href"
              target="_blank"
              :color="action.color"
              outline
              flat
            >
              {{
                $i18n.locale === "en" ? action.i18nText[0] : action.i18nText[1]
              }}
              <v-icon dark right>open_in_new</v-icon>
            </v-btn>
          </div>
        </v-card>
      </v-card>
    </v-container>
  </section>
</template>

<script>
export default {
  name: "Schedule",
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
      days: [
        {
          i18nTitle: ["Friday", "Freitag"],
          i18nDate: ["25. Oct 2019", "25. Okt 2019"],
          schedule: [
            {
              icon: require("../../assets/flat-icon-schedule-batch.svg"),
              time: "08:30",
              i18nTitle: ["Registration & Onboarding", ""],
              i18nDescription: [
                "No worries, for all people not coming for the talks, registration will be open until 15:00.",
                "Keine Sorge, für alle, die nicht zu den Vorträgen kommen, die Anmeldung ist bis 15:00 Uhr geöffnet."
              ]
            },
            {
              icon: require("../../assets/flat-icon-schedule-carrot.svg"),
              time: "08:45",
              i18nTitle: ["Welcome Snack", "Willkommens Snack"],
              i18nDescription: [
                "There are pretzels, sandwiches, filled puff pastry snacks, apples and grapes (René's Kitchen).",
                "Es gibt Brezeln, belegte Brötchen, gefüllte Blätterteig-Häppchen, Äpfel und Trauben (Renés Kitchen)."
              ]
            },
            {
              icon: require("../../assets/flat-icon-schedule-mic.svg"),
              time: "10:00",
              i18nTitle: ["Key Note & Talks", "Key Note & Vorträge"],
              i18nDescription: [
                "Our awesome speakers talking about climate change. The complete agenda of all talks will be available soon.",
                "Unsere großartigen Redner sprechen über den Klimawandel. Die vollständige Agenda aller Vorträge wird in Kürze verfügbar sein."
              ]
            },
            {
              speaker: true,
              speakerID: "michael-groetsch",
              icon: require("../../assets/speaker/speaker-mayor.jpg"),
              time: "10:00",
              i18nTitle: ['"Welcoming"', '"Grußwort"'],
              i18nDescription: [
                "Speaker: Mayor Michael Groetsch",
                "Speaker: Bürgermeister Michael Grötsch"
              ]
            },
            {
              speaker: true,
              speakerID: "hannah-helmke",
              icon: require("../../assets/speaker/speaker-hannah.jpg"),
              time: "12:00",
              i18nTitle: [
                '"On the other side of the Rubicon"',
                '"Auf der anderen Seite des Rubikon"'
              ],
              i18nDescription: [
                "Speaker: Hannah Helmke",
                "Speakerin: Hannah Helmke"
              ]
            },
            {
              icon: require("../../assets/flat-icon-schedule-lunch.svg"),
              time: "12:30",
              i18nTitle: ["Lunch time", "Mittagspause"],
              i18nDescription: [
                "Two dishes to choose from, \"Giovanni Gnocchi\" and \"Linse-Lotte powder\" a fruity stew, yummie (Renés Kitchen).",
                "Zwei Gerichte zur Auswahl, \"Giovanni Gnocchi\", sowie \"Linse-Lotte Pulver\" ein fruchtiger Eintopf, yummie (Renés Kitchen)."
              ]
            },
            {
              speaker: true,
              speakerID: "robert-thomann",
              icon: require("../../assets/speaker/speaker-thomann.jpg"),
              time: "13:30",
              i18nTitle: [
                '"Urbanization, digitization, utilities - at the interface to the Smart City."',
                '"Urbanisierung, Digitalisierung, Versorger – An der Nahtstelle zur Smart City."'
              ],
              i18nDescription: [
                "Speaker: Dr. Robert Thomann",
                "Speaker: Dr. Robert Thomann"
              ]
            },
            {
              speaker: true,
              speakerID: "daniel-erlemeier",
              icon: require("../../assets/speaker/speaker-daniel.jpg"),
              time: "14:00",
              i18nTitle: [
                '"Why should you care about Indonesian peat?"',
                '"Warum solltest du dich um indonesischen Torf sorgen?"'
              ],
              i18nDescription: [
                "Speaker: Daniel Erlemeier",
                "Speaker: Daniel Erlemeier"
              ]
            },
            {
              speaker: true,
              speakerID: "agnes-schoenfelder",
              icon: require("../../assets/speaker/speaker-agnes.jpg"),
              time: "14:30",
              i18nTitle: [
                '"Wind of Change for Mannheim on Climate Track"',
                '"Frischer Wind für Mannheim auf Klimakurs"'
              ],
              i18nDescription: [
                "Speaker: Agnes Schönfelder",
                "Speakerin: Agnes Schönfelder"
              ]
            },
            {
              icon: require("../../assets/flat-icon-schedule-deadline.svg"),
              time: "15:00",
              i18nTitle: [
                "Deadline Challenge Submission",
                "Deadline der Einreichung von Challenges"
              ],
              i18nDescription: [
                "IMPORTNAT: No further challenges can be accepted. Please select an existing challenge you would like to work on. All rules and procedures will now be explained in detail.",
                "WICHTIG: Es können keine weiteren Challenges mehr angenommen werden. Bitte suche dir eine existierende Challenge aus an der du arbeiten möchtest. Alle Regeln und Abläufe werden jetzt noch Mal in Ruhe erklärt."
              ]
            },
            {
              icon: require("../../assets/flat-icon-schedule-pitch.svg"),
              time: "16:00",
              i18nTitle: ["Challenge Pitch Time", "Challenge Pitch Zeit"],
              i18nDescription: [
                "All Challenge providers now present their Challenge again in max. 3 minutes. You already have an idea for a challenge and are now looking for support? Then get ready to pitch in 60 seconds why you think other participants should work with you on your idea.",
                "Alle Challenge-Anbieter stellen nun in knackigen 3 Minuten noch Mal ihre Challenge vor. Du hast bereits eine Idee für eine Challenge und suchst nun nach Unterstützung? Dann mach dich bereit, in 60 Sekunden zu pitchen, warum du denkst, dass andere Teilnehmer mit dir an deiner Idee arbeiten sollten."
              ]
            },
            {
              icon: require("../../assets/flat-icon-schedule-code.svg"),
              time: "17:00",
              i18nTitle: ["Start coding!", "Beginn des Programmierens!"],
              // link to team registration site
              i18nDescription: [
                "Most people probably started at 16:30, but that’s no problem, its just a number. Much more important is that you found a team and you registered your team <a class='link' target='_blank' href='https://forms.gle/mFXwVSbUUvz8jwM38'>here (DE)</a>.",
                "Die meisten Leute begannen wahrscheinlich um 16:30 Uhr, aber das ist kein Problem, es ist nur eine Zahl. Wichtiger ist, dass du ein Team gefunden hast und dein Team <a class='link' target='_blank' href='https://forms.gle/mFXwVSbUUvz8jwM38'>hier (DE)</a> registriert ist."
              ],
              actions: [
                {
                  color: "warning",
                  href: "https://forms.gle/mFXwVSbUUvz8jwM38",
                  i18nText: ["Register Your Team", "Registriere dein Team"]
                }
              ]
            },
            {
              icon: require("../../assets/flat-icon-schedule-dinner.svg"),
              time: "19:00",
              i18nTitle: ["Dinner", "Abendessen"],
              i18nDescription: [
                "Two dishes to choose from, \"Simsalabim\" a Moroccan chickpea tajine with sweet potatoes and \"Renédemmi\" a mexican touched chili, naturally climate friendly without meat, this will be a highly aromatic dream (Renés Kitchen).",
                "Zwei Gerichte zur Auswahl, \"Simsalabim\" ein Marokkanische Kichererbsen-Tajine mit Süßkartoffeln und \"Renédemmi\" ein mexikanisch angehauchtes Chili, natürlich klimaschonend ohne Fleisch, das wird ein hocharomatischer Traum (Renés Kitchen)."
              ]
            },
            {
              icon: require("../../assets/flat-icon-schedule-fire.svg"),
              time: "22:00",
              i18nTitle: ["Night Coding", "Nacht-Coding"],
              i18nDescription: [
                "We will provide a chill-out area where you can take a nap!",
                "Wir werden einen Chill-Out-Bereich zur Verfügung stellen, in dem du ein Nickerchen machen kannst!"
              ]
            }
          ]
        },
        {
          i18nTitle: ["Saturday", "Samstag"],
          i18nDate: ["26. Oct 2019", "26. Okt 2019"],
          schedule: [
            {
              icon: require("../../assets/flat-icon-schedule-croissant.svg"),
              time: "08:30",
              i18nTitle: ["Breakfast", "Frühstück"],
              i18nDescription: [
                "Caffeine infusions, sugar, even more sugar and everything you need after an intensive hacking night. In addition there are homemade Bircher muesli, as well as baguette and bread with many spreads (Café Rost).",
                "Koffeinaufgüsse, Zucker, noch mehr Zucker und alles, was du nach einer intensiven Hackernacht brauchen. Dazu gibt es hausgemachtes Bircher Müsli, sowie Baguette und Brot mit vielen Aufstrichen (Café Rost)."
              ]
            },
            {
              icon: require("../../assets/flat-icon-yoga.svg"),
              time: "10:00",
              i18nTitle: [
                "Sweat & Code: Yoga Workout",
                "Schweiß & Code: Yoga-Training"
              ],
              i18nDescription: [
                "You look right, so that you stay fit over the weekend, there is a yoga workout only for you. If you want to participate, please don't forget to bring a towel, optionally you can pack a sleeping pad and sports clothes. By the way: The MAFINEX has a shower.",
                "Du siehst richtig, damit ihr über das Wochenende fit bleibt, gibt es nur für euch ein Yoga-Workout. Wenn du teilnehmen willst, bitte vergiss nicht ein Handtuch mitzubringen, optional kannst du auch Isomatte und Sportklammotten einpacken. Übrigens: Im MAFINEX gibt es eine Dusche."
              ]
            },
            {
              icon: require("../../assets/flat-icon-schedule-noodles.svg"),
              time: "13:00",
              i18nTitle: ["Lunch time", "Mittagszeit"],
              i18nDescription: [
                "The menu: marinated BBQ schnitzel wraps with potato wedges & sour cream and a chickpea potato curry, both dishes obviously vegan (Café Rost).",
                "Vergiss nicht zu essen, wir brauchen dich. Das Menü: marinierte BBQ-Schnitzel-Wraps dazu Kartoffelecken & Sour Cream, sowie ein Kichererbsen-Kartoffelcurry, beide Gerichte natürlich vegan (Café Rost)."
              ]
            },
            {
              icon: require("../../assets/flat-icon-schedule-dinner-gold.svg"),
              time: "19:00",
              i18nTitle: ["Dinner", "Dinner"],
              i18nDescription: [
                "Last warm meal before the deadline, strengthen yourself one more time before the last night. There is pasta with soy Bolognese and lentil potato stew with smoked tofu and bread (Café Rost).",
                "Letzte warme Mahlzeit vor der Deadline, stärke dich noch einmal vor der letzten Nacht. Es gibt Pasta mit Soja-Bolognese, sowie Linsen-Kartoffeleintopf mit Räuchertofu und Brot (Café Rost)."
              ]
            },
            {
              icon: require("../../assets/flat-icon-schedule-owl.svg"),
              time: "22:00",
              i18nTitle: ["Night Coding", "Nacht-Coding"],
              i18nDescription: [
                "Let’s be honest with each other, you really should get some sleep, too.",
                "Seien wir ehrlich miteinander, du solltet wirklich etwas schlafen."
              ]
            }
          ]
        },
        {
          i18nTitle: ["Sunday", "Sonntag"],
          i18nDate: ["27. Oct 2019", "27. Okt 2019"],
          schedule: [
            {
              icon: require("../../assets/flat-icon-schedule-carrot.svg"),
              time: "08:30",
              i18nTitle: ["Breakfast", "Frühstück"],
              i18nDescription: [
                "Almost done, enjoy your breakfast and look back proudly on what you have achieved in the last two days. There is: \"Oat of Space\", a delicious breakfast creation made from oats, cashew milk, dates and fruits (René's Kitchen).",
                "Fast fertig, genieße dein Frühstück und blicke stolz auf das zurück, was du in den letzten zwei Tagen erreicht hast. Es gibt: \"Oat of Space\", eine köstliche Frühstückskreation aus Hafer, Cashewmilch, Datteln und Früchten (Renés Kitchen)."
              ]
            },
            {
              icon: require("../../assets/flat-icon-schedule-timer.svg"),
              time: "09:00",
              i18nTitle: ["Deadline of Coding", "Frist fürs Coden"],
              // link to climathon site
              i18nDescription: [
                "We know, most of the work happens the 10 minutes before the deadline. But don’t forget to publish the documentation of your solution here.",
                "Wir wissen, dass der größte Teil der Arbeit in 10 Minuten vor dem Termin stattfindet. Aber vergesse nicht, die Dokumentation deiner Lösung hier zu veröffentlichen."
              ],
              actions: [
                {
                  color: "warning",
                  href:
                    "https://climathon.climate-kic.org/en/mannheim-challenges-page-2019",
                  i18nText: ["Submit Solution", "Ergebnis einreichen"]
                }
              ]
            },
            {
              icon: require("../../assets/flat-icon-schedule-presentation.svg"),
              time: "10:00",
              i18nTitle: ["Pitches", "Präsentationen der Lösungen"],
              i18nDescription: [
                "Lights out, spot on! Here is the part where your adrenaline is on the highest point.",
                "Licht aus, Spot an! Hier ist der Teil, wo das Adrenalin auf dem höchsten Punkt ist."
              ]
            },
            {
              icon: require("../../assets/flat-icon-schedule-lunch-gold.svg"),
              time: "13:00",
              i18nTitle: ["Lunch Time", "Mittagessen"],
              i18nDescription: [
                "Relax, it’s over, rediscover your taste buds and find the value in deceleration.",
                "Entspannen dich, es ist vorbei, entdecke deine Geschmacksnerven wieder und finde die Bedeutung von Entschleunigung."
              ]
            },
            {
              icon: require("../../assets/flat-icon-schedule-award.svg"),
              time: "14:00",
              i18nTitle: ["Award Ceremony", "Preisverleihung"],
              i18nDescription: ["Money rain and stuff.", "Geldregen und so."]
            },
            {
              icon: require("../../assets/flat-icon-schedule-beer.svg"),
              time: "15:00",
              i18nTitle: ["Meet the Winners", "Treffe die Gewinner"],
              i18nDescription: [
                "Don’t forget to exchange numbers with your new friends. As a small GOod Bye Snack we offer our Hackathon Classic: Vegane Çiğ Köfte Happchen.",
                "Vergiss nicht, Nummern mit deinen neuen Freunden auszutauschen. Als kleinen Good Bye Snack gibt es unseren Hackathon Klassiker: Vegane Çiğ Köfte Häppchen."
              ]
            }
          ]
        }
      ]
    };
  }
};
</script>

<i18n>
{
  "en": {
    "title": "Schedule",
    "language": "Event Language",
    "introText": "The event language is German. This means the talks (unless otherwise marked) and the moderation are in German. However, we welcome all nationalities, languages and dialects. If you have any questions or don't understand something, the whole organizing team will be happy to help you in English. You also have the freedom to decide if you want to pitch in English or German."
  },
  "de": {
    "title": "Eventablauf",
    "language": "Eventsprache",
    "introText": "Die Eventsprache ist Deutsch. Das bedeutet die Vorträge (soweit nicht anders gekennzeichnet) und die Moderation sind auf Deutsch. Wir heißen jedoch alle Nationalitäten, Sprachen und Dialekte willkommen. Wenn ihr Fragen habt oder etwas nicht verstanden habt, hilft euch das gesamte Orga-Team auf Englisch gerne weiter. Darüber hinaus habt ihr auch die Freiheit zu entscheiden ob ihr auf Englisch oder Deutsch pitchen wollt."
  }
}
</i18n>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
section
  padding-bottom 80px
  h2
    font-family Gagalin,sans-serif
    font-weight 400
    font-style normal
    font-size 40px
    letter-spacing 1.4px
    text-align center
    color #ffffff
    margin-top 64px
    margin-bottom 32px
    @media screen and (max-width: 600px)
      font-size 24px

  h3
    font-family Gagalin,sans-serif
    font-weight 400
    font-style normal
    font-size 28px
    letter-spacing 1.4px
    text-align center
    color #ffffff
    margin-top 32px
    margin-bottom 32px

  .introText
    font-family Roboto Condensed,sans-serif
    font-weight 400
    font-size 20px
    line-height 1.4
    letter-spacing normal
    text-align center
    color rgba(255, 255, 255, 0.8)

  .card
    h3
      font-family Gagalin,sans-serif
      font-weight 400
      font-style normal
      font-stretch normal
      font-size 48px
      line-height 1
      letter-spacing 2.5px
      text-align center
      color rgba(255, 255, 255, 0.38)
    h4
      font-family Gagalin,sans-serif
      font-weight 400
      font-style normal
      font-size 20px
      font-stretch normal
      line-height 1
      letter-spacing 1px
      text-align center
      color rgba(255, 255, 255, 0.38)
    .schedule-item
      display flex
      flex-direction row
      justify-content flex-start
      align-items center
      flex 1 1 auto
      &.speaker
        cursor pointer
      .avatar
        position relative
        border-radius 50%
        border 2px solid #ffffff
        .speaker-icon
          position absolute
          top auto
          bottom 4px
          left 28px
          right 28px
      .info-area
        text-align left
        .time
          font-family Roboto Condensed,sans-serif
          font-weight 300
          font-size 36px
          font-style normal
          line-height 1.2
          letter-spacing 2px
          text-align inherit
          color rgba(255, 255, 255, 0.8)
        .item-title
          font-family Gagalin,sans-serif
          font-weight 400
          font-style normal
          font-size 20px
          font-stretch normal
          line-height 1
          letter-spacing 1px
          text-align inherit
          color rgba(255, 255, 255, 0.8)
        .item-description
          font-family click-clack,sans-serif
          font-weight 300
          font-size 20px
          font-style normal
          line-height 1.2
          letter-spacing 0.5px
          text-align inherit
          color rgba(255, 255, 255, 0.8)
      @media screen and (max-width: 600px)
        flex-direction column
        .info-area
          margin-top 16px
          text-align center
</style>
