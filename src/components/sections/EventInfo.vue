<template>
  <section :style="{ backgroundColor: sectionColor }">
    <v-container>
      <h2>{{ $t("title") }}</h2>
      <stack
        ref="stack"
        :column-min-width="320"
        :gutter-width="24"
        :gutter-height="24"
        monitor-images-loaded
      >
        <!-- WLAN -->
        <stack-item class="stack-grid-item">
          <v-card
            class="card pa-3"
            width="100%"
            color="rgba(255,255,255,0.1)"
            flat
          >
            <h3 class="mb-3">{{ $t("wlan") }}</h3>
            <p class="mb-3" v-html="$t('wlanSSID')"></p>
            <p class="mb-3">{{ $t("wlanPassword") }}</p>
          </v-card>
        </stack-item>

        <!-- ONBOARDING -->
        <stack-item class="stack-grid-item">
          <v-card
            class="card pa-3"
            width="100%"
            color="rgba(255,255,255,0.1)"
            flat
          >
            <h3 class="mb-3">{{ $t("onboarding") }}</h3>
            <p class="mb-3">{{ $t("onboardingText") }}</p>
            <v-btn
              class="onboarding my-3"
              href="https://forms.gle/k6VneYnai3pQiocSA"
              target="_blank"
              raised
              ripple
              large
              color="success"
            >
              {{ $t("onboardingBtn") }}
              <v-icon dark right>open_in_new</v-icon>
            </v-btn>
          </v-card>
        </stack-item>

        <!-- SOCIAL MEDIA -->
        <stack-item class="stack-grid-item">
          <v-card
            class="card pa-3"
            width="100%"
            color="rgba(255,255,255,0.1)"
            flat
          >
            <h3 class="mb-3">{{ $t("socialMediaTag") }}</h3>
            <p class="mb-3">{{ $t("socialMediaTagCopy") }}</p>
            <v-btn
              class="hashtag my-3"
              flat
              outline
              ripple
              large
              color="info"
              v-clipboard:copy="'#climathonMA'"
              v-clipboard:success="
                () =>
                  onCopySuccess(
                    $t('hashtagCopySuccess', { hashtag: '#climathonMA' })
                  )
              "
              @click="() => {}"
            >
              #climathonMA
            </v-btn>
            <v-btn
              class="hashtag my-3"
              flat
              outline
              ripple
              large
              color="info"
              v-clipboard:copy="'#Climathon'"
              v-clipboard:success="
                () =>
                  onCopySuccess(
                    $t('hashtagCopySuccess', { hashtag: '#Climathon' })
                  )
              "
              @click="() => {}"
            >
              #Climathon
            </v-btn>
          </v-card>
        </stack-item>

        <!-- COMMUNITY -->
        <stack-item>
          <v-card
            class="card pa-3"
            width="100%"
            color="rgba(255,255,255,0.1)"
            flat
          >
            <h3 class="mb-3">{{ $t("joinSlack") }}</h3>
            <p class="mb-3">{{ $t("joinSlackDescription") }}</p>
            <v-btn
              class="my-3"
              width="auto"
              href="https://join.slack.com/t/hackerstolz-community/shared_invite/enQtNzg4MjAyNDY3ODI1LWFhODJmYzJhMWQ2MmM3YzExMDg3NzI3NzcyODk5YzY1YjMwZjA3YjQ3ZGU4MmIyYTQ0NDI3NTgzZDJjZjYyYWE"
              target="_blank"
              color="accent"
              outline
              flat
            >
              {{ $t("link2Slack") }}
              <v-icon dark right>open_in_new</v-icon>
            </v-btn>
            <v-btn
              class="my-3"
              width="auto"
              href="https://hackerstolz-community.slack.com/messages/CL3RDQNAV"
              target="_blank"
              color="accent"
              outline
              flat
            >
              {{ $t("link2SlackChannel") }}
              <v-icon dark right>open_in_new</v-icon>
            </v-btn>
          </v-card>
        </stack-item>

        <!-- BADGES -->
        <stack-item>
          <v-card
            class="card pa-3"
            width="100%"
            color="rgba(255,255,255,0.1)"
            flat
          >
            <h3 class="mb-3">{{ $t("badges") }}</h3>
            <p class="mb-3">{{ $t("badgesDescription") }}</p>
            <v-chip
              class="ma-2 tags"
              color="yellow"
              label
              :large="!isMobile"
              text-color="black"
            >
              <v-icon light left>local_offer</v-icon>
              {{ $t("badgeYello").toUpperCase() }}
            </v-chip>
            <v-chip
              class="ma-2 tags"
              color="red"
              label
              :large="!isMobile"
              text-color="black"
            >
              <v-icon light left>local_offer</v-icon>
              {{ $t("badgeRed").toUpperCase() }}
            </v-chip>
            <v-chip
              class="ma-2 tags"
              color="indigo"
              label
              :large="!isMobile"
              text-color="white"
            >
              <v-icon left>local_offer</v-icon>
              {{ $t("badgeIndigo").toUpperCase() }}
            </v-chip>
            <v-chip
              class="ma-2 tags"
              color="orange"
              label
              :large="!isMobile"
              text-color="black"
            >
              <v-icon light left>local_offer</v-icon>
              {{ $t("badgeOrange").toUpperCase() }}
            </v-chip>
            <v-chip
              class="ma-2 tags"
              color="light-blue"
              label
              :large="!isMobile"
              text-color="black"
            >
              <v-icon light left>local_offer</v-icon>
              {{ $t("badgeBlue").toUpperCase() }}
            </v-chip>
            <v-chip
              class="ma-2 tags"
              color="green"
              label
              :large="!isMobile"
              text-color="black"
            >
              <v-icon light left>local_offer</v-icon>
              {{ $t("badgeGreen").toUpperCase() }}
            </v-chip>
          </v-card>
        </stack-item>

        <!-- MILESTONES -->
        <stack-item>
          <v-card
            class="card pa-3"
            width="100%"
            color="rgba(255,255,255,0.1)"
            flat
          >
            <h3 class="mb-3">{{ $t("participantMilestones") }}</h3>
            <p class="mb-3">{{ $t("participantMilestonesDescription") }}</p>
            <p class="mt-3 my-1" :style="{ color: $vuetify.theme.info }">
              {{ $t("readRulesText") }}
            </p>
            <v-btn
              class="my-3"
              width="auto"
              color="info"
              outline
              flat
              @click="rulesShow = true"
            >
              {{ $t("readRules") }}
            </v-btn>
            <p class="mt-3 my-1" :style="{ color: $vuetify.theme.warning }">
              {{ $t("deadlineTeamSubmission") }}
            </p>
            <v-btn
              class="my-3"
              width="auto"
              href="https://forms.gle/mFXwVSbUUvz8jwM38"
              target="_blank"
              color="warning"
              outline
              flat
            >
              {{ $t("registerYourTeam") }}
              <v-icon dark right>open_in_new</v-icon>
            </v-btn>
            <p class="mt-3 my-1" :style="{ color: $vuetify.theme.error }">
              {{ $t("deadlineSolutionSubmission") }}
            </p>
            <v-btn
              class="my-3"
              width="auto"
              href="https://climathon.climate-kic.org/en/mannheim-challenges-page-2019"
              target="_blank"
              color="error"
              outline
              flat
            >
              {{ $t("submitSolution") }}
              <v-icon dark right>open_in_new</v-icon>
            </v-btn>
          </v-card>
        </stack-item>
      </stack>
    </v-container>

    <!-- SNACKBAR -->
    <v-snackbar
      class="snackbar"
      auto-height
      top
      v-model="notification.show"
      :color="notification.color"
      :multi-line="isMobile"
      :vertical="isMobile"
      :timeout="notification.timeout"
    >
      {{ notification.text }}
      <v-btn
        class="app-btn-snackbar"
        color="primary"
        dark
        flat
        @click="notification.show = false"
      >
        {{ $t("snackbarClose") }}
      </v-btn>
    </v-snackbar>

    <!-- rules -->
    <v-dialog
      v-model="rulesShow"
      scrollable
      width="80%"
      max-width="640px"
      :fullscreen="isMobile"
      @click="rulesShow = true"
    >
      <v-card class="card" color="#2f3a58">
        <div class="dialog-card-content pa-4">
          <v-layout row>
            <div class="ml-3 mr-4">&nbsp;</div>
            <v-spacer />
            <h3 class="mb-3">
              {{ $t("codeOfConduct") }}
            </h3>
            <v-spacer />
            <v-btn
              class="ma-0"
              color="accent"
              flat
              @click="rulesShow = false"
              icon
            >
              <v-icon>close</v-icon>
            </v-btn>
          </v-layout>
          <p
            class="mb-4"
            v-html="$i18n.locale === 'en' ? rulesI18nText[0] : rulesI18nText[1]"
          ></p>
        </div>
        <v-card-actions class="dialog-card-footer">
          <v-spacer />
          <v-btn color="accent" flat @click="rulesShow = false">{{
            $t("close")
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
import debounce from "lodash/debounce";
import { Stack, StackItem } from "vue-stack-grid";

export default {
  name: "EventInfo",
  components: { Stack, StackItem },
  props: {
    isMobile: Boolean,
    themeColor: {
      type: String,
      default: "primary"
    }
  },
  data() {
    return {
      rulesShow: false,
      notification: {
        show: false,
        color: "success",
        timeout: 3000,
        text: ""
      },
      rulesI18nText: [
        "<strong>Eligibility</strong><ul><li>Attendees from all backgrounds, genders, geographies and skills are welcome. The only criteria is that you are PASSIONATE about contributing your creativity to solve this issue.</li><li>There is no age restriction to attend the hackathon. In case you are under 18, you need a signed waiver from the parent/legal guardian authorizing you to attend the hackathon. </li><li>Team members and employees of prize sponsors are not eligible to participate at the challenges owned by the sponsor. </li><li>There is no country restriction but you must be eligible to receive prizes (in case you win) and you are responsible for paying any taxes on the prize winnings.</li></ul><br/><strong>Actually Build Something</strong><ul><li>This isn’t a slidedeck hackathon! Build and demonstrate a working project or prototype, don’t just show us screenshots and slides. Seriously, you will not win the hackathon by building some fake mock-up.</li></ul><br/><strong>Write Your Code Here</strong><ul><li>The project you present must be coded entirely during the Hackathon. The only exceptions are for publicly available frameworks/APIs and open-source code that has been available for at least a month. If it feels shady to use the code, don’t.</li></ul><br/> <strong>Team Forming</strong><ul><li>Teams may include three to seven members.</li><li>Teams should have members with diverse skills (developer, designer) and skill levels (beginner, intermediate, expert).</li><li>Teams must be submitted by Midnight on the first day of the hackathon, Friday October 25.</li><li>Teams may submit to more than one challenge category, but we recommend that you focus and submit for only one!</li></ul><br/><strong>Conduct</strong><ul><li>This is, by all means, the most important rule. This is a very diverse environment, made up of many different humans, religions, sexual orientations, genders, and gender identities. </li><li>Any behavior or presentation that objectifies or belittles others will be halted, with the presenters immediately disqualified and removed from the event. Be Respectful Be kind to others. Don't insult or put down other attendees. Behave professionally. Remember that harassment and racist, sexist, or exclusionary jokes are not appropriate for this event. </li><li>Have Fun! Talk, work, connect - and don’t let the time crunch prevent you from having fun! Please remember to take a break now and then and relax.</li></ul><br/><strong>Code Audits</strong><ul><li>Participants will have their code audited by us to make sure it’s all new and legit.</li>Your code belongs to you and we won’t share it with anyone, but we will want to see it if you win. However, open sourcing the code is relatively normal at a hackathon.</li></ul><br/><strong>UseCode Version Control</strong><ul><li>Use Git or an equivalent to track your code as you write it. It’s good practice, and if it comes down to an audit, it’ll help you prove your code is new.</li></ul><br/><strong>Present The Project You Submitted</strong><ul><li>You must present your hack as described in your submission – if you deviate from your accepted submission, we’ll have to boot you from the stage. Don’t submit one thing and then abuse the stage and respect of the audience to present something different. Think about this presentation as combination of a pitch and a live demo. You only have 3 minutes, so hury yourself.</li></ul><br/><strong>Ownership</strong><ul><li>All intellectual property rights of hacks produced at the event belong to the attendees, and not to the organisers, sponsors, or partners. Teams will have full ownership of what they have created during the hackathon.</li><li>However, hackathon sponsors reserve the right to show off the great work you have done on our website, press releases, marketing materials and in promotion of next year’s hack. (We’re here to give you a leg-up, not to steal your work!).</li></ul>",
        "<strong>Berechtigung</strong><ul><li>Teilnehmer aus allen Bereichen, Geschlechtern, Regionen und Kompetenzen sind willkommen. Das einzige Kriterium ist, dass du leidenschaftlich bist, wenn es darum geht, deine Kreativität einzubringen, um dieses Problem zu lösen.</li><li>Es gibt keine Altersbeschränkung für die Teilnahme am Hackathon. Wenn du unter 18 Jahre alt bist, benötigst du eine unterschriebene Verzichtserklärung der Erziehungsberechtigten, die dich zur Teilnahme am Hackathon berechtigt. </li><Teammitglieder und Mitarbeiter von Preisstiftern sind nicht berechtigt, an den Herausforderungen des Sponsors teilzunehmen. </li><li>Es gibt keine Länderbeschränkung, aber ihr müsst berechtigt sein, Preise zu erhalten (falls ihr gewinnt) und ihr seid für die Zahlung von Steuern auf die Preisgewinne verantwortlich.</li></ul><br/><strong>Aktuell etwas bauen</strong><ul><li>Das ist kein Slidedeck-Hackathon! Erstellt und demonstriert ein funktionierendes Projekt oder einen Prototyp, zeigt uns nicht nur Screenshots und Folien. Ernsthaft, du wirst den Hackathon nicht gewinnen, indem du ein gefälschtes Mock-up baust.</ul><br/><strong>Schreibt euren Code hier</strong><ul><li>Das Projekt, das ihr präsentiert, muss während des Hackathons vollständig entstanden sein. Ausgenommen sind nur öffentlich zugängliche Frameworks/APIs und Open-Source-Code, der seit mindestens einem Monat verfügbar ist.</li></ul><br/><strong>Teambildung</strong><ul><li>Teams können drei bis sieben Mitglieder umfassen.</li><li>Teams sollten Mitglieder mit unterschiedlichen Fähigkeiten (Entwickler, Designer) und Fähigkeiten (Anfänger, Mittelstufe, Experte) haben.<li>Teams müssen bis Mitternacht am ersten Tag des Hackathons, Freitag, den 25. Oktober, eingereicht werden.<li>Teams können sich bei mehr als einer Challenge-Kategorie anmelden, aber wir empfehlen, dass ihr euch auf eine einzige Kategorie konzentrieren und euch nur für eine Kategorie anmelden!</li></ul><br/><strong>Verhalten</strong><ul><li>Das ist auf jeden Fall die wichtigste Regel. Dies ist ein sehr vielfältiges Umfeld, das sich aus vielen Menschen unterschiedlicher Herkunft, Religionen, sexuellen Orientierungen, Geschlechtern und Geschlechtsidentitäten zusammensetzt. </li><li>Jedes Verhalten oder jede Präsentation, die andere objektiv oder herabwürdigt, wird gestoppt, wobei die Moderatoren sofort disqualifiziert und aus der Veranstaltung entfernt werden. Seid respektvoll und freundlich zu anderen. Beleidigt oder macht andere Teilnehmer nicht runter. Benimmt euch professionell. Denkt daran, dass Belästigung und rassistische, sexistische oder ausschließende Witze für dieses Ereignis nicht angemessen sind.</li><li>Hab Spaß! Sprechen, arbeiten, verbinden - und lasst euch nicht von der Zeitnot davon abhalten, Spaß zu haben! Bitte denkt daran, ab und zu eine Pause zu machen und euch zu entspannen.</li></ul><br/><strong>Code-Prüfungen</strong><ul><li>Teilnehmer werden ihren Code von uns auditieren lassen, um sicherzustellen, dass er neu und regelkonform ist.</li><li>Euer Code gehört euch und wir werden ihn mit niemandem teilen, aber wir werden ihn sehen wollen, wenn ihr gewinnt. Allerdings ist Open Sourcing der Code bei einem Hackathon relativ normal.</li></ul><br/><strong>Versionskontrolle des Codes verwenden</strong><ul><li>Verwendet git oder ein Äquivalent, um euren Code zu verfolgen, während ihr ihn schreibt. Es ist eine gute Praxis, und wenn es zu einem Audit kommt, wird es euch helfen zu beweisen, dass euer Code neu ist.</li></ul><br/><strong>Präsentiert das Projekt, das ihr eingereicht habt</strong>.<ul><li>Ihr müsst euren Hack bzw. eure Lösung wie in eurer Einreichung beschrieben präsentieren - wenn ihr von eurer Einreichung abweicht, müssen wir euch von der Bühne booten. Reiche nicht eine Sache ein und missbrauche dann die Bühne und den Respekt des Publikums, um etwas anderes zu präsentieren. Denkt an diese Präsentation als Kombination aus Pitch und Live-Demo. Du hast nur 3 Minuten, also beeil dich.</ul><br/><strong>Eigentümerschaft</strong><ul><li>Alle geistigen Eigentumsrechte an den auf der Veranstaltung produzierten Hacks liegen bei den Teilnehmern und nicht bei den Organisatoren, Sponsoren oder Partnern. Die Teams haben die volle Eigentümerschaft an dem, was sie während des Hackathons erstellt haben.</li><li>Die Organisatoren des Hackathons behalten sich jedoch das Recht vor, eure großartige Arbeit auf Websiten, in Pressemitteilungen, Marketingmaterialien und zur Förderung des Hacks im nächsten Jahr zu präsentieren. (Wir sind hier, um dir zu helfen, nicht um deine Arbeit zu stehlen!).</li></ul>"
      ]
    };
  },
  methods: {
    reflow: debounce(function() {
      this.$refs.stack.reflow();
    }, 100),
    onCopySuccess(text) {
      this.notification.text = text;
      this.notification.show = true;
    }
  },
  computed: {
    sectionColor: function() {
      return Object.keys(this.$vuetify.theme).indexOf(this.themeColor) !== -1
        ? this.$vuetify.theme[this.themeColor]
        : this.$vuetify.theme.primary;
    }
  }
};
</script>

<i18n>
{
  "en": {
    "close": "Close",
    "title": "The most important information at a glance",
    "onboarding": "Onboarding",
    "onboardingText": "You just got here? Then you should first go through the Onboarding.",
    "onboardingBtn": "Start Onboarding",
    "socialMediaTag": "Social Media Tag",
    "socialMediaTagCopy": "Click to copy a hashtag.",
    "hashtagCopySuccess": "You just copied '{hashtag}'.",
    "snackbarClose": "Close",
    "wlan": "WLAN • Your gate to productivity",
    "wlanSSID": "SSID: <span class='code'>MAFINEX by Pfalzkom MAnet</span>",
    "wlanPassword": "Password: There is no password.",
    "joinSlack": "Join Climathon Community",
    "joinSlackDescription": "Here on Slack are all participants and the organization team, exchange yourself, ask questions, stay informed 24/7.",
    "link2Slack": "1. Join Community",
    "link2SlackChannel": "2. Join Channel",
    "participantMilestones": "Participants Milestones at a glance",
    "participantMilestonesDescription": "You shoudn't miss these deadlines and events.",
    "readRules": "Read Rules and Code of Conduct",
    "registerYourTeam": "Register your team",
    "submitSolution": "Submit result",
    "readRulesText": "1) please read the rules of the event in peace through.",
    "deadlineTeamSubmission": "2) team registration is possible until Friday midnight at the latest.",
    "deadlineSolutionSubmission": "3) Solutions can be submitted no later than Sunday 09:00h, if the submission is too late, your team can be excluded from the scoring.",
    "codeOfConduct": "Code of Conduct",
    "badges": "Badge Meaning",
    "badgesDescription": "As you may have noticed, there are different lanyard colors (these are the ribbons you wear around your neck). What these colors mean you can find here, we hope it will help you.",
    "badgeYello": "Participant • Tech",
    "badgeRed": "Participant • Maker",
    "badgeIndigo": "Participant • Designer",
    "badgeOrange": "Jury • Speaker • Mentor",
    "badgeBlue": "Visitor",
    "badgeGreen": "Orga"
  },
  "de": {
    "close": "Schliessen",
    "title": "Die wichtigsten Infos auf einem Blick",
    "onboarding": "Onboarding",
    "onboardingText": "Du bist grade erst angekommen? Dann solltest du zu aller erst das Onboarding durchlaufen.",
    "onboardingBtn": "Onboarding starten",
    "socialMediaTag": "Social Media Tag",
    "socialMediaTagCopy": "Klicke um einen Hashtag zu kopieren.",
    "hashtagCopySuccess": "Du hast \"{hashtag}\" kopiert.",
    "snackbarClose": "Schliessen",
    "wlan": "WLAN • Dein Zugang zur Produktivität",
    "wlanSSID": "SSID: <span class='code'>MAFINEX by Pfalzkom MAnet</span>",
    "wlanPassword": "Passwort: Es gibt kein Passwort.",
    "joinSlack": "Climathon Community beitreten",
    "joinSlackDescription": "Hier auf Slack sind alle Teilnehmer und das Orga-Team, tausche dich aus, stelle Fragen, bleibe 24/7 informiert.",
    "link2Slack": "1. Community beitreten",
    "link2SlackChannel": "2. Channel beitreten",
    "participantMilestones": "Teilnehmer Meilensteine auf einem Blick",
    "participantMilestonesDescription": "Diese Deadlines und Ereignisse darfst du nicht verpassen.",
    "readRules": "Regeln und Verhaltenskodex lesen",
    "registerYourTeam": "Registriere dein Team",
    "submitSolution": "Ergebnis einreichen",
    "readRulesText": "1. Lest bitte die Regeln des Events in Ruhe durch.",
    "deadlineTeamSubmission": "2. Teamregistrierung ist bis spätestens Freitag Mitternacht möglich.",
    "deadlineSolutionSubmission": "3. Lösungen können bis spätestens Sonntag 09:00h eingereicht werden, erfolgt die Einreichung zu spät kann euer Team von der Wertung ausgeschlossen werden.",
    "codeOfConduct": "Verhaltenskodex",
    "badges": "Badge Bedeutung",
    "badgesDescription": "Wie euch vielleicht aufgefallen ist, gibt es unterschiedliche Lanyard Farben (das sind die Bänder die ihr um euren Hals tragt). Was diese Farben bedeuten findet ihr hier, wir hoffen es hilft euch weiter.",
    "badgeYello": "Teilnehmer • Tech",
    "badgeRed": "Teilnehmer • Maker",
    "badgeIndigo": "Teilnehmer • Designer",
    "badgeOrange": "Jury • Speaker • Mentor",
    "badgeBlue": "Besucher",
    "badgeGreen": "Orga"
  }
}
</i18n>

<!-- Global scope -->
<style lang="stylus">
.v-dialog--fullscreen
  background-color #2f3a58
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
section
  padding 64px 0
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
    p
      font-family Roboto Condensed,sans-serif
      font-weight 400
      font-size 20px
      line-height 1.4
      letter-spacing 1px
      text-align center
      color rgba(255, 255, 255, 0.8)
      &.code
        color rgb(255, 197, 51)
        font-family monospace
        font-weight 600
        background rgba(255,255,255,0.2)
        padding 2px 8px
        display inline-block
        border-radius 4px
    .onboarding
      font-family Gagalin,sans-serif
      font-weight 400
      font-size 20px
      font-style normal
      color #ffffff !important
    .hashtag
      font-family Roboto Condensed,sans-serif
      font-weight 600
      letter-spacing 2px
      text-transform none
    .tags
      font-weight 600

  .snackbar
    font-family Roboto Condensed,sans-serif
    font-weight 600
    line-height 1.4
    color rgba(0,0,0,0.8)
    .app-btn-snackbar
      font-family Gagalin,sans-serif
      font-weight 400
      font-style normal
      letter-spacing 1.5px

.card
  height 100%
  h3
    font-family Gagalin,sans-serif
    font-weight 400
    font-style normal
    font-size 24px
    letter-spacing 1px
    color rgba(255, 255, 255, 0.8)
  p
    font-family Roboto Condensed,sans-serif
    font-size 20px
    line-height 1.4
    letter-spacing 1px
    text-align left
    color rgba(255, 255, 255, 0.8)
  .dialog-card-footer
    button
      font-family Gagalin,sans-serif
      font-weight 400
      font-style normal
      font-size 20px
      letter-spacing 1.5px
</style>
