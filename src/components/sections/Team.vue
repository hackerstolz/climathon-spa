<template>
  <section :style="{ backgroundColor: sectionColor }">
    <v-container>
      <h2>{{ $t("title") }}</h2>
      <p class="intro-text my-5">{{ $t("intro") }}</p>
      <v-layout class="my-4" row wrap align-start justify-center>
        <v-flex
          v-for="(member, i) in members"
          :key="i"
          :class="{
            'stack-grid-item': true,
            'pa-2': true,
            xs4: !isMobile,
            xs12: isMobile
          }"
        >
          <v-img
            class="avatar mx-4 my-2"
            :src="member.avatar"
            max-height="96px"
            max-width="96px"
            width="96px"
            contain
          ></v-img>
          <p class="member-name my-1">{{ member.name }}</p>
          <p
            :style="{ color: member.orgColor }"
            class="member-organisation my-1"
          >
            {{ member.organisation }}
          </p>
          <p class="member-description my-1">
            {{
              $i18n.locale === "en"
                ? member.i18nDescription[0]
                : member.i18nDescription[1]
            }}
          </p>
        </v-flex>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
export default {
  name: "Team",
  props: {
    themeColor: {
      type: String,
      default: "primary"
    },
    isMobile: Boolean
  },
  computed: {
    sectionColor: function() {
      return Object.keys(this.$vuetify.theme).indexOf(this.themeColor) !== -1
        ? this.$vuetify.theme[this.themeColor]
        : this.$vuetify.theme.primary;
    }
  },
  data() {
    return {
      members: [
        {
          avatar: require("../../assets/img-sascha-ulbrich.jpg"),
          name: "Sascha Ulbrich",
          organisation: "Hackerstolz e.V.",
          orgColor: "#70B4DF",
          i18nDescription: [
            "He is king of organizing, making the plans and providing structural progress.",
            ""
          ]
        },
        {
          avatar: require("../../assets/img-jascha-quintern.jpg"),
          name: "Jascha A. Quintern",
          organisation: "Hackerstolz e.V.",
          orgColor: "#70B4DF",
          i18nDescription: [
            "Beside organizing he creates the event experience, pushes the location concepts and creates the hackathon identity.",
            ""
          ]
        },
        {
          avatar: require("../../assets/img-iris-broese.jpg"),
          name: "Iris Bröse",
          organisation: "Hackerstolz e.V.",
          orgColor: "#70B4DF",
          i18nDescription: [
            "She is well experienced in organizing hackathons and a real sustainability professional.",
            ""
          ]
        },
        {
          avatar: require("../../assets/img-michael-bahr.jpg"),
          name: "Michael Bahr",
          organisation: "Hackerstolz e.V.",
          orgColor: "#70B4DF",
          i18nDescription: [
            "The hidden power in the background. Whenever it got tight, he was on the spot and provided the missing strength.",
            ""
          ]
        },
        {
          avatar: require("../../assets/img-georg-pins.jpg"),
          name: "Georg Pins",
          organisation: "City of Mannheim",
          orgColor: "#DD543B",
          i18nDescription: [
            "Our backbone of the city with the tasks of networking the most important parties and ensuring the necessary support of the city for the entire project.",
            ""
          ]
        },
        {
          avatar: require("../../assets/img-nicolas-vierling.jpg"),
          name: "Nicolas Vierling",
          organisation: "City of Mannheim",
          orgColor: "#DD543B",
          i18nDescription: [
            "The mouthpiece between city, KIC and project team. He gets stuff done and is the city’s manpower plant.",
            ""
          ]
        }
      ]
    };
  }
};
</script>

<i18n>
{
  "en": {
    "title": "Orga Team",
    "intro": "Yes folks, these are the people who are responsible... well, for all."
  }
}
</i18n>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
section
  padding-bottom 128px
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

  .intro-text
    font-family Roboto Condensed,sans-serif
    font-weight 400
    font-size 20px
    line-height 1.4
    letter-spacing normal
    text-align center
    color rgba(255, 255, 255, 0.8)

  .stack-grid-item
    transition all 300ms
    display flex
    flex-direction column
    align-items center
    justify-content center
    .avatar
      border-radius 8px
    .member-name
      font-family Gagalin,sans-serif
      font-weight 400
      font-style normal
      font-size 20px
      font-stretch normal
      line-height 1
      letter-spacing 1px
      text-align inherit
      color #ffffff
    .member-organisation
      font-family click-clack,sans-serif
      font-weight 500
      font-size 20px
      font-style normal
      line-height 1.2
      letter-spacing 0.5px
      text-align inherit
      color rgba(255, 255, 255, 0.8)
    .member-description
      font-family click-clack,sans-serif
      font-weight 300
      font-size 20px
      font-style normal
      line-height 1.2
      letter-spacing 0.5px
      text-align inherit
      color rgba(255, 255, 255, 0.8)
</style>
