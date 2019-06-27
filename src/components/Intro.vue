<template>
  <section>
    <h1>
      <div>CLIMATHON 2019</div>
      <div>MANNHEIM</div>
    </h1>
    <h2>Drive climate action!</h2>
    <h3>{{$t("date")}}&nbsp;•&nbsp;{{$t("event")}}</h3>

    <v-container color="transparent" class="d-flex logo-footer">
      <div>
        <p>
          <span>A hackathon made with</span>
          <span>by</span>
        </p>
        <v-img
            :src="uri.imgHackerstolz"
            height="40"
            width="200"
            contain>
        </v-img>
      </div>
      <v-img
          :src="uri.imgMannheim"
          height="40"
          width="200"
          contain>
      </v-img>
      <v-spacer/>
      <v-img
          :src="uri.imgKICEU"
          height="40"
          width="200"
          contain>
      </v-img>
    </v-container>
  </section>
</template>

<script>
import imgHackerstolz from '../assets/logo-hackerstolz.svg'
import imgMannheim from '../assets/logo-mannheim.svg'
import imgKICEU from '../assets/logo-KIC-EU.svg'

export default {
  name: 'Intro',
  data () {
    return {
      uri: {
        imgHackerstolz,
        imgMannheim,
        imgKICEU
      }
    }
  }
}
</script>

<i18n>
{
  "en": {
    "date": "25.-27. October",
    "event": "40h Hackathon"
  },
  "de": {
    "date": "25.-27. Oktober",
    "event": "40h Hackathon"
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

.logo-footer
  position absolute
  left 0
  right 0
  bottom 0
  align-items flex-end
</style>
