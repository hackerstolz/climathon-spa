<template>
  <div id="app">
    <v-app :dark.sync="darkMode">
      
      <v-navigation-drawer 
        app
        v-model="drawer">
        <v-menu bottom left="">
          <v-btn
            slot="activator"
            flat
          >
            {{ $t(`label.${$i18n.locale}`) }}
          </v-btn>

          <v-list>
            <v-list-tile
              v-for="(lang, i) in langs"
              :key="i"
              @click="onSetNewLocale(lang)">
              <v-list-tile-title>{{ $t(`label.${lang}`) }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-navigation-drawer>

      <v-toolbar app color="transparent" flat>
        <v-toolbar-side-icon
          @click.stop="drawer = !drawer" />
        <v-spacer></v-spacer>
        <v-btn 
          :class="{'app-btn-register': true, large: !isMobile}"
          color="success" 
          v-scroll-to="'#registration'">
          {{ $t('button.register') }}
        </v-btn>
      </v-toolbar>
      
      <v-content class=pa-0>
          <Intro id="intro" />
          <About id="about" />
          <Challenges id="challenges" />
          <Awards id="awards" />
          <Location id="location" />
          <Schedule id="schedule" />
          <Registration id="registration" />
          <Staff id="staff" />
          <FAQ id="faq" />
          <Parties id="parties" />
          <Team id="team" />
          <Footer id="footer" />
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
import {setI18nLanguage} from './i18n';
import { setTimeout } from 'timers';

const sectionsContext = require.context('@/components/sections/', true, /\.vue$/)

export default {
  components: {
    ...sectionsContext.keys().reduce((map, key) => ({
      ...map,
      [sectionsContext(key).default.name]: sectionsContext(key).default
    }), {})
  },
  data () {
    return {
        isMobile: false,
        langs: ['en', 'de'],
        darkMode: true,
        drawer: false,
        snackbar: {
          show: false,
          color: 'primary',
          timeout: 6000
        }
    }
  },
  mounted() {
    // show snackbar with delay
    setTimeout(() => {
      this.snackbar.show = true
    }, 500)

    // reigster resize handler
    this.onResize()
    window.addEventListener('resize', this.onResize, { passive: true })
  },
  methods: {
    onSetNewLocale(lang) {
      // switch locale
      setI18nLanguage(lang);

      // switch vuetify locale
      this.$vuetify.lang.current = lang;
    },
    onResize () {
      this.isMobile = window.innerWidth <= 600
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
      "de": "German"
    },
    "button": {
      "register": "Register Here"
    }
  },
  "de": {
    "label": {
      "snackbarText": "We don't need any analysis tools so enjoy a cookie-free experience.",
      "snackbarConfirm": "OK",
      "en": "Englisch",
      "de": "Deutsch"
    },
    "button": {
      "register": "Hier Registrieren"
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
  src url("./assets/fonts/Gagalin-Regular.woff2"),
    url("./assets/fonts/Gagalin-Regular.woff"),
    url("./assets/fonts/Gagalin-Regular.ttf"),
    url("./assets/fonts/Gagalin-Regular.otf")

$color-primary = '#10182F'
$color-secondary = '#182445'
$color-accent = '#A8E5A3'
$color-error = '#DD543B'
$color-info = '#DAEEFB'
$color-success = '#4CAE79'
$color-warning = '#FFC533'

#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50

  .app-btn-register
    font-family Gagalin,sans-serif
    font-weight 400
    font-style normal
    letter-spacing 1.5px
    &.large
      font-size 22px

  .app-btn-snackbar
    font-family Gagalin,sans-serif
    font-weight 400
    font-style normal
    letter-spacing 1.5px
</style>
