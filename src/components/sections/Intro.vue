<template>
  <section>
    <v-spacer />
    <div class="title">
      <h1>
        <div>CLIMATHON 2019</div>
        <div>MANNHEIM</div>
      </h1>
      <h2>{{ $t("subtitle") }}</h2>
      <h3>{{ $t("date") }}&nbsp;•&nbsp;{{ $t("event") }}</h3>
    </div>
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
export default {
  name: "Intro"
};
</script>

<i18n>
{
  "en": {
    "date": "25.-27. October",
    "event": "40h Hackathon",
    "subtitle": "Drive climate action!",
    "sloganBeforeHeart": "A hackathon made with",
    "sloganAfterHeart": "by"
  },
  "de": {
    "date": "25.-27. Oktober",
    "event": "40h Hackathon",
    "subtitle": "Klimaschutz antreiben!",
    "sloganBeforeHeart": "Ein Hackathon gemacht mit",
    "sloganAfterHeart": "von"
  }
}
</i18n>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
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

  .title
    z-index 1
    transition transform 0.3s ease-in-out
    @media screen and (max-width: 600px)
        transform scale(0.5)
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
      font-size 70px
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

  .footer-bgr-gradient
    position absolute
    bottom 0
    left 0
    right 0
    background-image linear-gradient(0deg, rgba(16,24,47,1), rgba(16,24,47,0))
    height 376px
    max-height 75vh

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
</style>
