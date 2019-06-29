<template>
  <section>
    <v-container>
      <h2>{{ $t('titleWhy') }}</h2>
      <h2>{{ $t('titleWhat') }}</h2>
    </v-container>
  </section>
</template>

<script>
export default {
  name: 'About'
}
</script>

<i18n>
{
  "en": {
    "titleWhy": "Why a climathon?",
    "titleWhat": "What is the climathon about?"
  },
  "de": {
    "titleWhy": "Warum ein Climathon?",
    "titleWhat": "Worum geht es beim Climathon?"
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
    color #ffffff
    margin-top 128px
    &:first-child
      text-align left
    &:nth-child(2)
      text-align right
</style>
