<template>
  <section :style="{ backgroundColor: sectionColor }">
    <v-container>
      <h2>{{ $t("title") }}</h2>
      <p class="intro my-5" v-html="$t('intro')"></p>
      <stack
        ref="stack"
        :column-min-width="320"
        :gutter-width="24"
        :gutter-height="24"
        monitor-images-loaded
      >
        <!-- Bleib deinem Becher Treu Becher -->
        <stack-item class="stack-grid-item">
          <v-card
            class="card pa-3"
            width="100%"
            color="rgba(255,255,255,0.1)"
            flat
          >
            <h3 class="mb-3">{{ $t("cup") }}</h3>
            <div class="icon">{{ "☕️" }}</div>
            <p class="mb-3">{{ $t("cupDescription") }}</p>
          </v-card>
        </stack-item>

        <!-- Bügelflasche -->
        <stack-item class="stack-grid-item">
          <v-card
            class="card pa-3"
            width="100%"
            color="rgba(255,255,255,0.1)"
            flat
          >
            <h3 class="mb-3">{{ $t("bottle") }}</h3>
            <div class="icon">{{ "🚰" }}</div>
            <p class="mb-3">{{ $t("bottleDescription") }}</p>
          </v-card>
        </stack-item>

        <!-- Stoffbeutel -->
        <stack-item class="stack-grid-item">
          <v-card
            class="card pa-3"
            width="100%"
            color="rgba(255,255,255,0.1)"
            flat
          >
            <h3 class="mb-3">{{ $t("smallBag") }}</h3>
            <div class="icon">{{ "👝" }}</div>
            <p class="mb-3">{{ $t("smallBagDescription") }}</p>
          </v-card>
        </stack-item>

        <!-- Post-Its -->
        <stack-item class="stack-grid-item">
          <v-card
            class="card pa-3"
            width="100%"
            color="rgba(255,255,255,0.1)"
            flat
          >
            <h3 class="mb-3">{{ $t("postItsBag") }}</h3>
            <div class="icon">{{ "📝" }}</div>
            <p class="mb-3">{{ $t("postItsBagDescription") }}</p>
          </v-card>
        </stack-item>

        <!-- Sattelschutz -->
        <stack-item class="stack-grid-item">
          <v-card
            class="card pa-3"
            width="100%"
            color="rgba(255,255,255,0.1)"
            flat
          >
            <h3 class="mb-3">{{ $t("saddleProtectionBag") }}</h3>
            <div class="icon">{{ "🚲" }}</div>
            <p class="mb-3">{{ $t("saddleProtectionBagDescription") }}</p>
          </v-card>
        </stack-item>

        <!-- Seedbomb -->
        <stack-item class="stack-grid-item">
          <v-card
            class="card pa-3"
            width="100%"
            color="rgba(255,255,255,0.1)"
            flat
          >
            <h3 class="mb-3">{{ $t("seedbomb") }}</h3>
            <div class="icon">{{ "🌺" }}</div>
            <p class="mb-3">{{ $t("seedbombDescription") }}</p>
          </v-card>
        </stack-item>
      </stack>
    </v-container>
  </section>
</template>

<script>
import debounce from "lodash/debounce";
import { Stack, StackItem } from "vue-stack-grid";

export default {
  name: "EventBag",
  components: { Stack, StackItem },
  props: {
    themeColor: {
      type: String,
      default: "primary"
    }
  },
  methods: {
    reflow: debounce(function() {
      this.$refs.stack.reflow();
    }, 100)
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
    "title": "Whats in your Bag?",
    "intro": "Unfortunately, not everyone can have a participant bag and not everyone will find all the goodies in his bag again. Why is that? Organizing a climate-neutral event is difficult. We wanted to avoid overordering, because throwing away is stupid, so there is only max. 120 of each goodie. Together with all speakers, mentors and jury members there will be far more than 120 people coming to the Climathon. But we have come up with something different: Not everyone needs saddle protection and some others already have a reusable coffee mug. In the atrium you will therefore find a large basket for sharing and giving: put things in that you don't need and take some goodies that you can use.",
    "cup": "Stay faithful to your cup cup",
    "cupDescription": "A reusable coffee mug so you can refill at Café Agáta around the clock. Thanks to the Climate Protection Agency Mannheim.",
    "bottle": "0,5l clip-on bottle",
    "bottleDescription": "A glass drinking bottle with a swing stopper and enlarged mouth opening. Even if there is mate, cola and more, we want to motivate you to drink the clean Mannheim tap water.",
    "smallBag": "Small fabric bag",
    "smallBagDescription": "A miniature fabric bag for fruit and vegetables. Thanks to the Climate Protection Agency Mannheim.",
    "postItsBag": "Post-It Blocks",
    "postItsBagDescription": "Post-It blocks made of recycled paper, which you can use directly in your early concept and design thinking. Ask your mentors, they are sure to have good tips on how to work with them. Thanks to BASF.",
    "saddleProtectionBag": "saddle protection",
    "saddleProtectionBagDescription": "A saddle protector made of recycled plastic. Thanks to valantic.",
    "seedbomb": "Seedbomb",
    "seedbombDescription": "A sea bomb for guerilla gardening, throwing into nature, waiting for rain and flowers. Thanks to Onwerk."
  },
  "de": {
    "title": "Was ist in deiner Tasche?",
    "intro": "Leider kann nicht jeder eine Teilnehmertasche haben und nicht jeder wird alle Goodies in seiner Tasche wieder finden. Warum ist das so? Ein Klimaneutrales Event zu organisieren ist schwierig. Wir wollten Überbestellungen unbedingt vermeiden, denn wegwerfen ist blöd, daher gibt es von jedem Goodie nur max. 120. Zusammen mit allen Speakern, Mentoren und Jury-Mitgliedern werden es jedoch weit mehr als 120 Personen die zum Climathon kommen. Dafür haben wir uns etwas anderes einfallen lassen: Nicht jeder braucht einen Sattelschutz und manch andere haben bereits einen Mehrwegkaffeebecher. Im Atrium findest du daher einen großen Korb zum Teilen und Schenken: Lege Sachen rein die du nicht brauchst und bedien dich an Goodies die du gebrauchen kannst.",
    "cup": "Bleib deinem Becher Treu Becher",
    "cupDescription": "Ein Mehrweg Kaffeebecher, damit du Rund um die Uhr bei Café Agáta nachüllen kannst. Danke an die Klimaschutzagentur Mannheim.",
    "bottle": "0,5l Buegelflasche",
    "bottleDescription": "Eine Trankflasche aus Glas und mit Bügelverschluss sowie vergrößerter Mundöffnung. Auch wenn es Mate, Cola und mehr gibt, wollen wir wollen dich motivieren das saubere Mannheimer Leitungswasser zu trinken.",
    "smallBag": "Kleiner Stoffbeutel",
    "smallBagDescription": "Ein Stoffbeutel in Miniaturform für Obst und Gemüse. Danke an die Klimaschutzagentur Mannheim.",
    "postItsBag": "Post-It Blöcke",
    "postItsBagDescription": "Post-It Blöcke aus recycletem Papier, diese könnt ihr direkt bei eurer frühen Konzept und Design Thinking verwenden. Fragt mal die Mentoren, die haben garantiert gute Tipps, wie ihr damit gut arbeitet. Danke an die BASF.",
    "saddleProtectionBag": "Sattelschutz",
    "saddleProtectionBagDescription": "Ein Sattelschutz aus recycletem Plastik. Damnke an valantic.",
    "seedbomb": "Seedbomb",
    "seedbombDescription": "Eine Seedbomb für Guerilla-Gardening, in die Natur werfen, auf Regen warten und die Blumen abwarten. Danke an Onwerk."
  }
}
</i18n>

<!-- Global scope -->
<style lang="stylus"></style>

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
    margin 64px 0

  .intro
    font-family Roboto Condensed,sans-serif
    font-weight 400
    font-size 20px
    line-height 1.4
    letter-spacing normal
    text-align center
    color #A8E5A3

  .card
    h3
      font-family Gagalin,sans-serif
      font-weight 400
      font-style normal
      font-size 20px
      letter-spacing 1px
      color rgba(255, 255, 255, 0.8)
    .icon
      font-size 60px
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
</style>
