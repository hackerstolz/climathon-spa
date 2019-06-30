<template>
  <section>
    <v-container>
      <h2 class="align-left">{{ $t("titleWhy") }}</h2>
      <div class="small-earth d-inline-block mx-1">
        <v-img
          :src="require('../../assets/earth-small.svg')"
          height="245"
          width="364"
          contain
        >
        </v-img>
        <div class="pa-4">{{ $t("imgDescription") }}</div>
        <v-btn
          class="link-to-cgoal mb-4"
          href="https://youtu.be/VOQArPuEWU0"
          target="_blank"
          color="accent"
          outline
          flat
        >
          {{ $t("button.link2Goal") }}
          <v-icon dark right>open_in_new</v-icon>
        </v-btn>
      </div>
      <p class="align-left">
        {{ $t("textWhy") }}
      </p>

      <h2 class="align-center">{{ $t("titleWhat") }}</h2>
      <p class="align-center">{{ $t("textWhat[0]") }}</p>
      <p class="align-center">{{ $t("textWhat[1]") }}</p>
    </v-container>
  </section>
</template>

<script>
export default {
  name: "About"
};
</script>

<i18n>
{
  "en": {
    "titleWhy": "Why a climathon?",
    "textWhy": "In a world where information is power 2019 is hopefully the year the world finally realizes that we need to do something about global warming (no Donald, its not working how you think, please find out the difference between weather and climate first). Unfortunately, we are at a point where confidence in our government is waning as far as achieving our climate targets is concerned, and a serious change of course is not discernible. We therefore see it as our duty – as citizens of Planet Earth – to do everything in our power to help tackle this global problem and hopefully make a difference. We want to not just talk about sustainability but try to see what technology can do to fight climate change. That is why Hackerstolz and the City of Mannheim is hosting the Climathon. The Climathon is an over regional initiative by the EIT that take place in hundreds of cities all over the world. Become part of it!",
    "titleWhat": "What is the climathon about?",
    "textWhat": [
      "For 40 hours you have the opportunity to develop prototypes for digital solutions together in a team. We provide you with public and non-public environmental data as well as data from the economy, with  which you can develop innovative solutions.",
      "Throughout the entire hackathon, you will be supported by a team of experts who will help you develop your ideas."
    ],
    "imgDescription": "1,5° and zero-carbon  goal by 2050",
    "button": {
      "link2Goal": "why this matters"
    }
  },
  "de": {
    "titleWhy": "Warum ein Climathon?",
    "textWhy": "In einer Welt, in der Informationen Macht sind, ist 2019 hoffentlich das Jahr, in dem die Welt endlich erkennt, dass wir etwas gegen die globale Erwärmung unternehmen müssen (nein Donald, es funktioniert nicht so, wie du denkst, bitte finde zuerst den Unterschied zwischen Wetter und Klima heraus). Leider befinden wir uns an einem Punkt, an dem das Vertrauen in unsere Regierung bei der Erreichung unserer Klimaziele schwindet und ein ernsthafter Kurswechsel nicht erkennbar ist. Deshalb sehen wir es als unsere Pflicht an – als Bürger des Planeten Erde –, alles in unserer Macht Stehende zu tun, um zur Lösung dieses globalen Problems beizutragen und etwas zu bewirken. Wir wollen nicht nur über Nachhaltigkeit sprechen, sondern versuchen zu sehen, was die Technologie zur Bekämpfung des Klimawandels beitragen kann. Deshalb veranstalten Hackerstolz und die Stadt Mannheim den Climathon. Der Climathon ist eine überregionale Initiative des ETI, die in Hunderten von Städten auf der ganzen Welt stattfindet. Werden Sie Teil davon!",
    "titleWhat": "Worum geht es beim Climathon?",
    "textWhat": [
      "40 Stunden lang haben Sie die Möglichkeit, im Team gemeinsam Prototypen für digitale Lösungen zu entwickeln. Wir stellen Ihnen öffentliche und nicht-öffentliche Umweltdaten sowie Daten aus der Wirtschaft zur Verfügung, mit denen Sie innovative Lösungen entwickeln können.",
      "Während des gesamten Hackathons werden Sie von einem Expertenteam unterstützt, das Ihnen bei der Entwicklung Ihrer Ideen hilft."
    ],
    "imgDescription": "1,5° und Null-Kohlenstoff-Ziel bis 2050",
    "button": {
      "link2Goal": "Warum das wichtig ist"
    }
  }
}
</i18n>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
// FIXME: get import globals work
// @import '../globals'

section
  h2
    font-family Gagalin,sans-serif
    font-weight 400
    font-style normal
    font-size 28px
    letter-spacing 1.4px
    color #ffffff
    margin-top 128px
    margin-bottom 64px
    &.align-left
      text-align left
    &.align-center
      text-align center

  p
    font-family Roboto Condensed,sans-serif
    font-weight 400
    font-style normal
    font-size 20px
    line-height 1.4
      // TODO: replace with constants
    color rgba(255, 255, 255, 0.8)
    &.align-left
      text-align left
    &.align-center
      text-align center

  .small-earth
    float right
    div
      font-family click-clack,sans-serif
      font-weight 300
      font-size 20px
      line-height 1.2
      // TODO: replace with constants
      color #A8E5A3
    .link-to-cgoal
      font-family Roboto Condensed,sans-serif
      font-weight 400
      font-style normal
      letter-spacing 1px
</style>
