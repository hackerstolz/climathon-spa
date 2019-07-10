<template>
  <div id="app">
    <v-app :dark.sync="darkMode">
      <v-navigation-drawer class="navigation" app v-model="drawer">
        <v-toolbar class="ma-0 pa-0" color="transparent" flat>
          <v-menu bottom>
            <v-btn slot="activator" flat>
              {{ $t(`label.${$i18n.locale}`) }}
            </v-btn>

            <v-list class="language-list">
              <v-list-tile
                v-for="(lang, i) in langs"
                :key="i"
                @click="onSetNewLocale(lang)"
              >
                <v-list-tile-title>
                  {{ $t(`label.${lang}`) }}
                </v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
          <v-spacer />
          <v-btn flat @click.stop="drawer = !drawer" icon>
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-btn
          color="info"
          width="100%"
          href="mailto:climathon@hackerstolz.de?subject=I%20want%20to%20be%20sponsor,%20mentor,%20speaker,%20etc."
          large
          flat
        >
          {{ $t("button.contactus") }}
          <v-icon right>email</v-icon>
        </v-btn>
        <v-list>
          <template v-for="(item, i) in menu">
            <v-list-tile
              v-scroll-to="`#${item}`"
              :key="item"
              ripple
              @click="() => {}"
            >
              <v-list-tile-title class="menu-item">{{
                $t(`label.${item}`)
              }}</v-list-tile-title>
            </v-list-tile>
            <v-divider v-if="i < menu.length - 1" :key="i" inset />
          </template>
        </v-list>
      </v-navigation-drawer>

      <v-toolbar class="toolbar" app color="transparent" flat scroll-off-screen>
        <v-toolbar-side-icon @click.stop="drawer = !drawer" />
        <v-spacer></v-spacer>
        <v-btn
          color="info"
          href="mailto:climathon@hackerstolz.de?subject=I%20want%20to%20be%20sponsor,%20mentor,%20speaker,%20etc."
          flat
          :icon="isMobile"
        >
          {{ isMobile ? null : $t("button.contactus") }}
          <v-icon v-if="isMobile">email</v-icon>
        </v-btn>
        <v-btn
          :class="{ 'app-btn-register': true, large: !isMobile }"
          color="success"
          v-scroll-to="'#registration'"
        >
          {{ $t("button.register") }}
        </v-btn>
      </v-toolbar>

      <v-content class="pa-0">
        <Intro id="intro" />
        <About id="about" themeColor="primary" />
        <Challenges
          id="challenges"
          themeColor="secondary"
          :isMobile="isMobile"
        />
        <Awards id="awards" themeColor="primary" />
        <Location id="location" themeColor="secondary" />
        <Schedule id="schedule" themeColor="secondary" />
        <Registration
          id="registration"
          themeColor="primary"
          :isMobile="isMobile"
        />
        <Staff id="staff" themeColor="secondary" :isMobile="isMobile" />
        <FAQ id="faq" themeColor="primary" />
        <Parties id="parties" themeColor="secondary" :isMobile="isMobile" />
        <Team id="team" themeColor="primary" :isMobile="isMobile" />
        <Footer id="footer" themeColor="primary" />
      </v-content>

      <v-snackbar
        auto-height
        v-model="snackbar.show"
        :color="snackbar.color"
        :multi-line="isMobile"
        :vertical="isMobile"
        :timeout="snackbar.timeout"
      >
        {{ `${$t("label.snackbarText")}&nbsp;✌️` }}
        <v-btn
          class="app-btn-snackbar"
          color="accent"
          dark
          flat
          @click="snackbar.show = false"
        >
          {{ $t("label.snackbarConfirm") }}
        </v-btn>
      </v-snackbar>
    </v-app>
  </div>
</template>

<script>
import { setI18nLanguage } from "./i18n";
import { setTimeout } from "timers";

const sectionsContext = require.context(
  "@/components/sections/",
  true,
  /\.vue$/
);

export default {
  components: {
    ...sectionsContext.keys().reduce(
      (map, key) => ({
        ...map,
        [sectionsContext(key).default.name]: sectionsContext(key).default
      }),
      {}
    )
  },
  data() {
    return {
      isMobile: false,
      langs: ["en", "de"],
      darkMode: true,
      drawer: false,
      snackbar: {
        show: false,
        color: "primary",
        timeout: 6000
      },
      menu: [
        "intro",
        "about",
        "challenges",
        "awards",
        "location",
        "schedule",
        "registration",
        "staff",
        "faq",
        "parties",
        "team",
        "footer"
      ]
    };
  },
  mounted() {
    // show snackbar with delay
    setTimeout(() => {
      this.snackbar.show = true;
    }, 500);

    // reigster resize handler
    this.onResize();
    window.addEventListener("resize", this.onResize, { passive: true });
  },
  methods: {
    onSetNewLocale(lang) {
      // switch locale
      setI18nLanguage(lang);

      // switch vuetify locale
      this.$vuetify.lang.current = lang;
    },
    onResize() {
      this.isMobile = window.innerWidth <= 600;
    }
  }
};
</script>

<i18n>
{
  "en": {
    "label": {
      "snackbarText": "We don't need any analysis tools so enjoy a cookie-free experience.",
      "snackbarConfirm": "OK",
      "en": "English",
      "de": "German",
      "intro": "Intro",
      "about": "About Climathon",
      "challenges": "Challenges",
      "awards": "Awards",
      "location": "Event Location",
      "schedule": "Event Schedule",
      "registration": "Registration",
      "staff": "Speakers, Jury & Mentors",
      "faq": "FAQ",
      "parties": "Sponsors & Partners",
      "team": "Orga Team",
      "footer": "Credits"
    },
    "button": {
      "register": "Register Here",
      "contactus": "Contact us"
    }
  },
  "de": {
    "label": {
      "snackbarText": "We don't need any analysis tools so enjoy a cookie-free experience.",
      "snackbarConfirm": "OK",
      "en": "Englisch",
      "de": "Deutsch",
      "intro": "Intro",
      "about": "Über den Climathon",
      "challenges": "Herausforderungen",
      "awards": "Auszeichnungen",
      "location": "Austragungsort",
      "schedule": "Eventablauf",
      "registration": "Registrierung",
      "staff": "Referenten, Jury & Mentoren",
      "faq": "FAQ",
      "parties": "Sponsoren & Partner",
      "team": "Orga-Team",
      "footer": "Credits"
    },
    "button": {
      "register": "Hier Registrieren",
      "contactus": "Kontaktiere uns"
    }
  }
}
</i18n>

<style lang="stylus">
@import '~vuetify/src/stylus/main'

@font-face
  font-family Gagalin
  font-style normal
  font-font-weight 400
  text-rendering optimizeLegibility
  src local('Gagalin-Regular'),
    url("./assets/fonts/Gagalin-Regular.woff2") format('woff2'),
    url("./assets/fonts/Gagalin-Regular.woff"),
    url("./assets/fonts/Gagalin-Regular.ttf"),
    url("./assets/fonts/Gagalin-Regular.otf")

#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50

  .toolbar
    z-index 5
    .app-btn-register
      font-family Gagalin,sans-serif
      font-weight 400
      font-style normal
      letter-spacing 1.5px
      &.large
        font-size 22px

  .navigation
    background-color #10182F
    .menu-item
      font-family Gagalin,sans-serif
      font-weight 400
      font-style normal
      letter-spacing 1.5px
      color rgba(255,255,255,0.8)

  .language-list
    background-color #182445

  .app-btn-snackbar
    font-family Gagalin,sans-serif
    font-weight 400
    font-style normal
    letter-spacing 1.5px


  a.link
    color #70B4DF !important
    text-decoration none
</style>
