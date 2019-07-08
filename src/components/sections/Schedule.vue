<template>
  <section
    class="pb-5"
    :style="{ backgroundColor: sectionColor }">
    <v-container>
      <h2 class="align-left">{{ $t("title") }}</h2>
      <v-card
        v-for="(day, i) in days" :key="i"
        class="card pa-3 mb-5"
        width="100%"
        color="rgba(255,255,255,0.1)"
        flat>
        <h3 class="mt-2 mb-3">{{ $i18n.locale === "en" ? day.i18nTitle[0] : day.i18nTitle[1] }}</h3>
        <h4 class="mb-5">{{ $i18n.locale === "en" ? day.i18nDate[0] : day.i18nDate[1] }}</h4>
        <div 
          class="schedule-item mb-5"
          v-for="(item, j) in day.schedule" :key="j">
          <v-img
            class="mx-4"
            :src="item.icon"
            max-height="96px"
            max-width="96px"
            width="96px"
            contain
          ></v-img>
          <div class="info-area">
            <div class="time my-1">{{ item.time }}</div>
            <p class="item-title my-1">{{ $i18n.locale === "en" ? item.i18nTitle[0] : item.i18nTitle[1] }}</p>
            <p class="item-description my-1">{{ $i18n.locale === "en" ? item.i18nDescription[0] : item.i18nDescription[1] }}</p>
          </div>
        </div>
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
    }
  },
  computed: {
    sectionColor: function () {
      return Object.keys(this.$vuetify.theme).indexOf(this.themeColor) !== -1
        ? this.$vuetify.theme[this.themeColor]
        : this.$vuetify.theme.primary
    }
  },
  data() {
    return {
      days: [{
        i18nTitle: ["Friday", "Freitag"],
        i18nDate: ["25. Oct 2019", "25. Okt 2019"],
        schedule: [{
          icon: require("../../assets/flat-icon-schedule-batch.svg"),
          time: "08:30",
          i18nTitle: ["Registration & Onboarding", ""],
          i18nDescription: ["No worries, for all people not coming for the talks, registration will be open until 15:00.", ""]
        },{
          icon: require("../../assets/flat-icon-schedule-mic.svg"),
          time: "10:00",
          i18nTitle: ["Key Note & Talks", ""],
          i18nDescription: ["Our awesome speakers talking about climate change. The complete agenda of all talks will be available soon.", ""]
        }]
      },{
        i18nTitle: ["Saturday", "Samstag"],
        i18nDate: ["26. Oct 2019", "26. Okt 2019"],
        schedule: []
      },{
        i18nTitle: ["Sunday", "Sonntag"],
        i18nDate: ["27. Oct 2019", "27. Okt 2019"],
        schedule: []
      }]
    }
  }
};
</script>

<i18n>
{
  "en": {
    "title": "Schedule"
  }
}
</i18n>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
section
  h2
    font-family Gagalin,sans-serif
    font-weight 400
    font-style normal
    font-size 28px
    letter-spacing 1.4px
    text-align center
    color #ffffff
    margin-top 128px
    margin-bottom 64px

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
