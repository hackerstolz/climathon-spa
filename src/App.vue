<template>
  <div id="app">
    <v-app :dark.sync="darkMode">
      <v-navigation-drawer class="navigation" app v-model="drawer">
        <v-toolbar class="ma-0 pa-0" color="transparent" flat>
          <v-menu bottom>
            <v-btn slot="activator" flat>
              {{ $t(`button.${$i18n.locale}`) }}
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
        <v-layout row="">
          <v-btn
            color="info"
            href="mailto:climathon@hackerstolz.de?subject=I%20want%20to%20be%20sponsor,%20mentor,%20speaker,%20etc."
            flat
          >
            {{ $t("button.contactus") }}
          </v-btn>
          <!-- <v-btn
            color="info"
            target="_blank"
            href="https://betterplace.org/p71036"
            flat
          >
            {{ $t("button.donate") }}
          </v-btn> -->
        </v-layout>
        <v-list v-if="$route.name !== 'event'">
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
        <v-list v-if="$route.name === 'event'">
          <template v-for="(item, i) in menuEvent">
            <v-list-tile
              v-scroll-to="`#${item}`"
              :key="item"
              ripple
              @click="() => {}"
            >
              <v-list-tile-title class="menu-item">{{
                $t(`label.eventMenu.${item}`)
              }}</v-list-tile-title>
            </v-list-tile>
            <v-divider v-if="i < menu.length - 1" :key="i" inset />
          </template>
        </v-list>
        <router-link :to="$route.name !== 'event' ? '/event' : '/overview'">
          <v-btn color="success" width="100%" raised @click="() => {}">
            {{
              $route.name !== "event"
                ? $t("button.toEvent")
                : $t("button.toOverview")
            }}
            <v-icon right>{{
              $route.name !== "event" ? "room" : "public"
            }}</v-icon>
          </v-btn>
        </router-link>
      </v-navigation-drawer>

      <v-toolbar
        class="toolbar"
        app
        color="transparent"
        flat
        :scroll-off-screen="isMobile"
      >
        <v-toolbar-side-icon @click.stop="drawer = !drawer" />
        <v-btn
          class="hashtag"
          flat
          outline
          ripple
          small
          v-clipboard:copy="'#climathonMA'"
          v-clipboard:success="
            () => onCopySuccess($t('label.hashtagCopySuccess'))
          "
          @click="() => {}"
        >
          #climathonMA
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          :class="{ 'app-btn-register': true, large: !isMobile }"
          color="info"
          href="mailto:climathon@hackerstolz.de?subject=I%20want%20to%20be%20sponsor,%20mentor,%20speaker,%20etc."
          flat
          :icon="isMobile"
        >
          {{ isMobile ? null : $t("button.contactus") }}
          <v-icon v-if="isMobile">email</v-icon>
        </v-btn>
        <v-btn
          v-if="$route.name !== 'event' && !postEvent"
          :class="{ 'app-btn-register': true, large: !isMobile }"
          color="success"
          :small="isMobile"
          v-scroll-to="'#registration'"
        >
          {{ isMobile ? $t("button.registerShort") : $t("button.register") }}
        </v-btn>
      </v-toolbar>

      <router-view :isMobile="isMobile"></router-view>

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
          {{ $t("label.snackbarClose") }}
        </v-btn>
      </v-snackbar>
      <v-snackbar
        class="snackbar"
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
          color="primary"
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

export default {
  name: "App",
  data() {
    return {
      postEvent: true,
      isMobile: false,
      langs: ["en", "de"],
      darkMode: true,
      drawer: false,
      snackbar: {
        show: false,
        color: "success",
        timeout: 10000
      },
      notification: {
        show: false,
        color: "success",
        timeout: 3000,
        text: ""
      },
      menu: [
        "intro",
        "about",
        "challenges",
        "awards",
        "teams",
        "location",
        "schedule",
        "registration",
        "staff",
        "faq",
        "parties",
        "team",
        "footer"
      ],
      menuEvent: ["info", "location", "bag", "footer"]
    };
  },
  mounted() {
    setTimeout(() => {
      // show snackbar with delay
      this.snackbar.show = true;
    }, 500);

    setTimeout(() => {
      // nav to section initially
      if (this.$route) {
        this.routeUpdate(this.$route);
      }
    }, 1500);

    // reigster resize handler
    this.onResize();
    window.addEventListener("resize", this.onResize, { passive: true });
  },
  methods: {
    onCopySuccess(text) {
      this.notification.text = text;
      this.notification.show = true;
    },
    onSetNewLocale(lang) {
      // switch locale
      setI18nLanguage(lang);

      // switch vuetify locale
      this.$vuetify.lang.current = lang;
    },
    onResize() {
      this.isMobile = window.innerWidth <= 600;
    },
    routeUpdate($route) {
      if (
        $route &&
        ($route.name === "overview" || $route.name === "overviewDetails") &&
        $route.params.section
      ) {
        this.$scrollTo(`#${$route.params.section}`);
      }
    }
  },
  watch: {
    $route: function(value) {
      this.routeUpdate(value);
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
      "snackbarClose": "Close",
      "hashtagCopySuccess": "You just copied '#climathonMA'.",
      "en": "English",
      "de": "German",
      "intro": "Intro",
      "about": "About Climathon",
      "challenges": "Challenges",
      "awards": "Awards",
      "teams": "Teams",
      "location": "Event Location",
      "schedule": "Event Schedule",
      "registration": "Registration",
      "staff": "Speakers, Jury & Mentors",
      "faq": "FAQ",
      "parties": "Sponsors & Partners",
      "team": "Orga Team",
      "footer": "Credits",
      "eventMenu": {
        "info": "Infos at a glance",
        "location": "Room plan",
        "bag": "Event-Bag",
        "footer": "Credits"
      }
    },
    "button": {
      "en": "Language • EN",
      "de": "Language • DE",
      "register": "Register Here",
      "registerShort": "Register",
      "contactus": "Contact us",
      "donate": "Donate",
      "toEvent": "On-Event App",
      "toOverview": "Climathon Overview"
    }
  },
  "de": {
    "label": {
      "snackbarText": "We don't need any analysis tools so enjoy a cookie-free experience.",
      "snackbarConfirm": "OK",
      "snackbarClose": "Schließen",
      "hashtagCopySuccess": "Du hast \"#climathonMA\" kopiert.",
      "en": "Englisch",
      "de": "Deutsch",
      "intro": "Intro",
      "about": "Über den Climathon",
      "challenges": "Herausforderungen",
      "awards": "Auszeichnungen",
      "teams": "Teams",
      "location": "Austragungsort",
      "schedule": "Eventablauf",
      "registration": "Registrierung",
      "staff": "Referenten, Jury & Mentoren",
      "faq": "FAQ",
      "parties": "Sponsoren & Partner",
      "team": "Orga-Team",
      "footer": "Credits",
      "eventMenu": {
        "info": "Infos auf einem Blick",
        "location": "Raumplan",
        "bag": "Veranstaltungstasche",
        "footer": "Credits"
      }
    },
    "button": {
      "en": "Sprache • EN",
      "de": "Sprache • DE",
      "register": "Hier Registrieren",
      "registerShort": "Registrieren",
      "contactus": "Kontaktiere uns",
      "donate": "Spenden",
      "toEvent": "On-Event App",
      "toOverview": "Climathon Übersicht"
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

html, body
  -webkit-overflow-scrolling touch
  overflow-x hidden

#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50

  .toolbar
    z-index 5
    .hashtag
      font-family Roboto Condensed,sans-serif
      font-weight 600
      text-transform none
    .app-btn-contact
      font-family Gagalin,sans-serif
      font-weight 400
      font-style normal
      letter-spacing 1.5px
      &.large
        font-size 22px
    .app-btn-register
      font-family Gagalin,sans-serif
      font-weight 400
      font-style normal
      letter-spacing 1.5px
      &.large
        font-size 22px

  .navigation
    z-index 10
    background-color #10182F
    .menu-item
      font-family Gagalin,sans-serif
      font-weight 400
      font-style normal
      letter-spacing 1.5px
      color rgba(255,255,255,0.8)

  .language-list
    background-color #182445

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

  /*
   * Styles fo v-html content elements.
   */
  a
    text-decoration none
    color #70B4DF
  a:-webkit-any-link
    text-decoration none
    color #70B4DF
  a.link
    text-decoration none
    color #70B4DF !important
  ul.list
    li
      margin 1rem 0
      font-style italic
      list-style none
      &:after
        content '\00a0\00a0~'
      &:before
        content '~\00a0\00a0'

  // override max width of other media queries
  .container
    max-width 1000px
</style>
