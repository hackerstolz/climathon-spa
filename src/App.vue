<template>
  <div id="app">
    <Intro />
    <About />
  </div>
</template>

<script>
import Intro from "./components/Intro.vue";
import About from "./components/About.vue";

export default {
  components: {
    Intro,
    About
  }
};
</script>
<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
</style>
