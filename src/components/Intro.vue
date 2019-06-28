<template>
  <section>
    <h1>
      <div>CLIMATHON 2019</div>
      <div>MANNHEIM</div>
    </h1>
    <h2>{{$t("subtitle")}}</h2>
    <h3>{{$t("date")}}&nbsp;•&nbsp;{{$t("event")}}</h3>

    <div class="footer-bgr-gradient"></div>
    <v-container color="transparent" class="footer">
      <div class="organizer">
        <p class="made-by-slogan">
          <span>{{$t('sloganBeforeHeart')}}</span>
          <v-img
            class="d-inline-block mx-1"
            :src="require('../assets/icon-heart.svg')"
            height="24"
            width="24"
            contain>
          </v-img>
          <span>{{$t('sloganAfterHeart')}}</span>
        </p>
        <div class="logos">
          <v-img
              class="mr-2"
              :src="require('../assets/logo-hackerstolz.svg')"
              max-height="40"
              width="20%"
              contain>
          </v-img>
          <v-img
              class="mr-2"
              :src="require('../assets/logo-mannheim.svg')"
              max-height="40"
              width="20%"
              contain>
          </v-img>
          <v-spacer/>
          <v-img
              class="mx-2"
              :src="require('../assets/logo-KIC-EU.svg')"
              max-height="40"
              width="58%"
              contain>
          </v-img>
        </div>
      </div>
    </v-container>
  </section>
</template>

<script>
export default {
  name: 'Intro'
}
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
    "subtitle": "Klimaschutz voran treiben!",
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
  background-image url("../assets/earth.svg")
  background-size cover
  background-position center center
  display flex
  flex-direction column
  justify-content center
  align-items center
  color #ffffff

  h1
    font-family Gagalin,sans-serif
    font-weight 400
    font-style normal

  h2
    font-family steinzeit,sans-serif
    font-weight 400
    font-style normal

  h3
    font-family click-clack,sans-serif
    font-weight 400
    font-style normal

  .footer-bgr-gradient
    position absolute
    bottom 0
    left 0
    right 0
    background-image linear-gradient(0deg, rgba(16,24,47,1), rgba(16,24,47,0))
    height 376px

  .footer
    position absolute
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
        justify-content flex-start
        > *
          flex-grow 0
      .logos
        display flex
        align-items center
        justify-content flex-start
</style>
