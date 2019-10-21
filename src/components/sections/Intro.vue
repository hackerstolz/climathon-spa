<template>
  <section
    :class="{
      'simulated-2050': simulate2050
    }"
  >
    <div
      :class="{
        'simulation-blend': true,
        'start-transition': simulate2050,
        'reverse-transition': simulate2050 === false
      }"
    ></div>
    <v-spacer />
    <header>
      <div class="countdown-wrapper-co2">
        <Countdown
          :time="
            simulate2050
              ? 0
              : new Date(2028, 0, 1, 12, 0).getTime() - Date.now()
          "
          :title="$t('countdownCO2Budget')"
        />
        <v-btn
          class="link-to-co2-budget ma-0"
          href="https://www.mcc-berlin.net/en/research/co2-budget.html"
          target="_blank"
          color="#ffffff"
          outline
          small
          flat
        >
          {{ $t("link2C02Budget") }}
          <v-icon dark right small>open_in_new</v-icon>
        </v-btn>
      </div>
      <div class="title-box mx-5">
        <v-switch
          class="simulation-switch"
          v-model="simulate2050"
          inset
          :label="$t('simulateSwitch')"
          color="error"
        >
        </v-switch>
        <h1>
          <div>
            {{ simulate2050 ? $t("simulation.titleLine1") : $t("titleLine1") }}
          </div>
          <div>
            {{ simulate2050 ? $t("simulation.titleLine2") : $t("titleLine2") }}
          </div>
        </h1>
        <h2>{{ simulate2050 ? $t("simulation.subtitle") : $t("subtitle") }}</h2>
        <h3>{{ $t("date") }}&nbsp;•&nbsp;{{ $t("event") }}</h3>
      </div>
      <div class="countdown-wrapper-event">
        <Countdown
          :time="
            simulate2050
              ? 0
              : new Date(2019, 9, 25, 8, 30).getTime() - Date.now()
          "
          :title="$t('countdownEvent')"
        />
      </div>
    </header>
    <v-spacer />
    <v-spacer />

    <div class="footer-bgr-gradient"></div>
    <v-container color="transparent" class="footer mx-0">
      <div class="organizer">
        <p class="made-by-slogan my-3">
          <span>{{ $t("sloganBeforeHeart") }}</span>
          <img
            class="d-inline-block mx-1"
            :src="require('../../assets/icon-heart.svg')"
            height="24"
            width="24"
          />
          <span>{{ $t("sloganAfterHeart") }}</span>
        </p>
        <div class="logos ma-3">
          <v-img
            class="mr-2"
            :src="require('../../assets/logo-hackerstolz.svg')"
            max-height="40"
            max-width="232"
            width="20%"
            position="center"
            contain
          />
          <v-img
            class="mr-2"
            :src="require('../../assets/logo-mannheim.svg')"
            :style="{
              'max-height': '40px',
              'max-width': '160px'
            }"
            max-height="40"
            max-width="160"
            width="20%"
            position="center"
            contain
          />
        </div>
        <div class="logos ma-3">
          <img
            :src="require('../../assets/logo-KIC-EU.svg')"
            :style="{
              'max-height': '40px'
            }"
            width="58%"
          />
        </div>
      </div>
    </v-container>
  </section>
</template>

<script>
import Countdown from "../Countdown";

export default {
  name: "Intro",
  components: { Countdown },
  data() {
    return {
      simulate2050: null // null it indicates, that it was not used, yet, else a boolean
    };
  },
  watch: {
    simulate2050(simulation) {
      // toggle theme colors
      this.$vuetify.theme.primary = simulation ? "#140807" : "#10182F";
      this.$vuetify.theme.secondary = simulation ? "#270F0D" : "#182445";
    }
  }
};
</script>

<i18n>
{
  "en": {
    "date": "25.-27. October",
    "event": "40h Hackathon",
    "titleLine1": "CLIMATHON 2019",
    "titleLine2": "MANNHEIM",
    "subtitle": "Drive climate action!",
    "sloganBeforeHeart": "A hackathon made with",
    "sloganAfterHeart": "by",
    "countdownEvent": "Countdown to the Climathon",
    "countdownCO2Budget": "Time to CO2 budget collapse",
    "link2C02Budget": "Lear more",
    "simulateSwitch": "Simulate 4° in 2050",
    "simulation": {
      "titleLine1": "APOCALYPSATHON",
      "titleLine2": "2050 MANNHEIM",
      "subtitle": "Drive survival action!"
    }
  },
  "de": {
    "date": "25.-27. Oktober",
    "event": "40h Hackathon",
    "titleLine1": "CLIMATHON 2019",
    "titleLine2": "MANNHEIM",
    "subtitle": "Klimaschutz antreiben!",
    "sloganBeforeHeart": "Ein Hackathon gemacht mit",
    "sloganAfterHeart": "von",
    "countdownEvent": "Countdown bis zum Climathon",
    "countdownCO2Budget": "Zeit bis zum CO2-Budget Kollaps",
    "link2C02Budget": "Erfahre mehr",
    "simulateSwitch": "Simuliere 4° in 2050",
    "simulation": {
      "titleLine1": "APOCALYPSATHON",
      "titleLine2": "2050 MANNHEIM",
      "subtitle": "Überlebensstrategie vorantreiben!"
    }
  }
}
</i18n>

<!-- Global scope -->
<style lang="stylus">
.simulation-switch
  label
    font-family Roboto Condensed,sans-serif
    font-weight 600
    font-style normal
    font-size 24px
    text-transform uppercase
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@keyframes blend {
  0% {
    background rgba(255,255,255,1)
  }
  100% {
    background rgba(255,255,255,0)
  }
}
@keyframes blend-reverse {
  0% {
    background rgba(255,255,255,1)
  }
  100% {
    background rgba(255,255,255,0)
  }
}

section
  position relative
  height 100vh
  background-image url("../../assets/earth.svg")
  background-size cover
  background-position center center
  display flex
  flex-direction column
  justify-content center
  align-items center
  color #ffffff

  .simulation-blend
    position fixed
    pointer-events none
    width 100vw
    height 100vh
    background: rgba(255,255,255,0);
    z-index 0
    &.start-transition
      animation blend 3s ease-out forwards
    &.reverse-transition
      animation blend-reverse 1s ease-out forwards


  header
    z-index 1
    display flex
    flex-direction row
    align-items flex-end
    & > *
      transition all 0.3s ease-in-out
    @media screen and (max-width: 1250px)
      .title-box
        transform scale(0.75)
      .countdown-wrapper-event
        transform scale(0.75) translateX(-50%) translateY(-50%)
      .countdown-wrapper-co2
        transform scale(0.75) translateX(50%) translateY(-50%)
    @media screen and (max-width: 1000px)
      flex-direction column
      align-items center
      .title-box
        order 0
      .countdown-wrapper-event
        order 1
        opacity 0.8
        transform scale(1) translateY(-25%)
        margin-bottom 16px
      .countdown-wrapper-co2
        order 2
        opacity 0.8
        transform scale(1) translateY(-25%)
    @media screen and (max-width: 600px)
      .title-box
        transform scale(0.5) translateY(25%)
        margin-bottom 32px
      .countdown-wrapper-event
        transform scale(0.75) translateY(-80px)
        margin-bottom 0px
      .countdown-wrapper-co2
        transform scale(0.75) translateY(-80px)
    .title-box
      display flex
      flex-direction column
      justify-content center
      align-items center
      z-index 1

      h1
        font-family Gagalin,sans-serif
        font-weight 400
        font-style normal
        > div:first-child
          font-size 76px
          line-height 1
          letter-spacing normal
          text-align center
        > div:nth-child(2)
          font-size 100px
          line-height 1
          letter-spacing 10px
          text-align center
          margin-top -15px

      h2
        font-family steinzeit,sans-serif
        font-weight 400
        font-style normal
        font-size 62px
        line-height 1.33
        letter-spacing 1.2px
        text-align center

      h3
        font-family click-clack,sans-serif
        font-weight 400
        font-style normal
        font-size 28px
        line-height 1.24
        letter-spacing 2px
        text-align center

    .countdown-wrapper-co2, .countdown-wrapper-event
      position relative
      overflow visible
      .link-to-co2-budget
        position absolute
        top 100%
        left 50%
        transform translateX(-50%)

  .footer-bgr-gradient
    position absolute
    bottom 0
    left 0
    right 0
    background-image linear-gradient(0deg, rgba(16,24,47,1), rgba(16,24,47,0))
    height 376px
    max-height 75vh
    transition background-image 0.3s ease-in-out

  .footer
    position absolute
    width 100%
    max-width none !important
    max-width initial
    display flex
    left 0
    right 0
    bottom 0
    align-items flex-end
    > *
      flex-grow 0

    .organizer
      width 100%
      .made-by-slogan
        color rgba(255,255,255,0.8)
        font-family click-clack,sans-serif
        font-weight 400
        font-style normal
        display flex
        align-items center
        justify-content center
        > *
          flex-grow 0
      .logos
        display flex
        align-items center
        justify-content center
        > *
          flex-grow 1

section.simulated-2050
  background-image url("../../assets/earth-2050.svg")
  header
    .title-box
      h1
        font-family crackhouse,sans-serif
        font-weight 400
        font-style normal
        > div:first-child
          font-size 80px
          margin-bottom 4px
        > div:nth-child(2)
          font-size 64px

      h2
        font-family battery-park,sans-serif
        font-weight 400
        font-style normal
        font-size 26px

      h3
        font-family battery-park,sans-serif
        font-weight 400
        font-style normal
        font-size 26px

  .footer-bgr-gradient
    background-image linear-gradient(0deg, rgba(20,8,7,1), rgba(20,8,7,0))
</style>
