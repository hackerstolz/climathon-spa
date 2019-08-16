<template>
  <div class="countdown">
    <div class="items">
      <div class="item year">
        <div class="number">{{ years }}</div>
        <div class="label">{{ $t("years") }}</div>
      </div>
      <div class="item day">
        <div class="number">{{ days }}</div>
        <div class="label">{{ $t("days") }}</div>
      </div>
      <div class="item hour">
        <div class="number">{{ hours }}</div>
        <div class="label">{{ $t("hours") }}</div>
      </div>
      <div class="item minute">
        <div class="number">{{ minutes }}</div>
        <div class="label">{{ $t("minutes") }}</div>
      </div>
      <div class="item second">
        <div class="number">{{ seconds }}</div>
        <div class="label">{{ $t("seconds") }}</div>
      </div>
    </div>
    <div
      class="title-text"
      v-if="title && title.length > 0"
      :style="{
        width: (width + 32) + 'px'
      }"
    >
      <!-- <VueResponsiveText :transition="100"> -->
      {{ title }}
      <!-- </VueResponsiveText> -->
    </div>
  </div>
</template>

<script>
import VueResponsiveText from "vue-responsive-text";

const MILLISECONDS_SECOND = 1000;
const MILLISECONDS_MINUTE = 60 * MILLISECONDS_SECOND;
const MILLISECONDS_HOUR = 60 * MILLISECONDS_MINUTE;
const MILLISECONDS_DAY = 24 * MILLISECONDS_HOUR;
const MILLISECONDS_YEAR = 365 * MILLISECONDS_DAY;
const EVENT_VISIBILITY_CHANGE = "visibilitychange";

export default {
  name: "Countdown",

  components: {
    VueResponsiveText
  },

  data() {
    return {
      /**
       * It is counting down.
       * @type {boolean}
       */
      counting: false,

      /**
       * The absolute end time.
       * @type {number}
       */
      endTime: 0,

      /**
       * The remaining milliseconds.
       * @type {number}
       */
      totalMilliseconds: 0,

      /**
       * Width of title container.
       * @type {number}
       */
      width: 200
    };
  },

  props: {
    /**
     * Title of the countdown.
     */
    title: {
      type: String,
      default: ""
    },

    /**
     * Starts the countdown automatically when initialized.
     */
    autoStart: {
      type: Boolean,
      default: true
    },

    /**
     * Emits the countdown events.
     */
    emitEvents: {
      type: Boolean,
      default: false
    },

    /**
     * The interval time (in milliseconds) of the countdown progress.
     */
    interval: {
      type: Number,
      default: 1000,
      validator: value => value >= 0
    },

    /**
     * Generate the current time of a specific time zone.
     */
    now: {
      type: Function,
      default: () => Date.now()
    },

    /**
     * The time (in milliseconds) to count down from.
     */
    time: {
      type: Number,
      default: 0,
      validator: value => value >= 0
    },

    /**
     * Transforms the output props before render.
     */
    transform: {
      type: Function,
      default: props => props
    }
  },

  computed: {
    /**
     * Remaining years.
     * @returns {number} The computed value.
     */
    years() {
      return Math.floor(this.totalMilliseconds / MILLISECONDS_YEAR);
    },

    /**
     * Remaining days.
     * @returns {number} The computed value.
     */
    days() {
      return Math.floor(
        (this.totalMilliseconds % MILLISECONDS_YEAR) / MILLISECONDS_DAY
      );
    },

    /**
     * Remaining hours.
     * @returns {number} The computed value.
     */
    hours() {
      return Math.floor(
        (this.totalMilliseconds % MILLISECONDS_DAY) / MILLISECONDS_HOUR
      );
    },

    /**
     * Remaining minutes.
     * @returns {number} The computed value.
     */
    minutes() {
      return Math.floor(
        (this.totalMilliseconds % MILLISECONDS_HOUR) / MILLISECONDS_MINUTE
      );
    },

    /**
     * Remaining seconds.
     * @returns {number} The computed value.
     */
    seconds() {
      return Math.floor(
        (this.totalMilliseconds % MILLISECONDS_MINUTE) / MILLISECONDS_SECOND
      );
    },

    /**
     * Remaining milliseconds.
     * @returns {number} The computed value.
     */
    milliseconds() {
      return Math.floor(this.totalMilliseconds % MILLISECONDS_SECOND);
    },

    /**
     * Total remaining years.
     * @returns {number} The computed value.
     */
    totalYears() {
      return this.years;
    },

    /**
     * Total remaining days.
     * @returns {number} The computed value.
     */
    totalDays() {
      return Math.floor(this.totalMilliseconds / MILLISECONDS_DAY);
    },

    /**
     * Total remaining hours.
     * @returns {number} The computed value.
     */
    totalHours() {
      return Math.floor(this.totalMilliseconds / MILLISECONDS_HOUR);
    },

    /**
     * Total remaining minutes.
     * @returns {number} The computed value.
     */
    totalMinutes() {
      return Math.floor(this.totalMilliseconds / MILLISECONDS_MINUTE);
    },

    /**
     * Total remaining seconds.
     * @returns {number} The computed value.
     */
    totalSeconds() {
      return Math.floor(this.totalMilliseconds / MILLISECONDS_SECOND);
    }
  },

  watch: {
    $props: {
      deep: true,
      immediate: true,

      /**
       * Update the countdown when props changed.
       */
      handler() {
        this.totalMilliseconds = this.time;
        this.endTime = this.now() + this.time;

        if (this.autoStart) {
          this.start();
        }
      }
    }
  },

  methods: {
    /**
     * Starts to countdown.
     * @public
     * @emits Countdown#start
     */
    start() {
      if (this.counting) {
        return;
      }

      this.counting = true;

      if (this.emitEvents) {
        /**
         * Countdown start event.
         * @event Countdown#start
         */
        this.$emit("start");
      }

      this.continue();
    },

    /**
     * Continues the countdown.
     * @private
     */
    continue() {
      if (!this.counting) {
        return;
      }

      const delay = Math.min(this.totalMilliseconds, this.interval);

      if (delay > 0) {
        if (window.requestAnimationFrame) {
          let start;
          const step = timestamp => {
            if (!start) {
              start = timestamp;
            }

            if (timestamp - start < delay) {
              this.requestId = requestAnimationFrame(step);
            } else {
              this.progress();
            }
          };

          this.requestId = requestAnimationFrame(step);
        } else {
          this.timeoutId = setTimeout(() => {
            this.progress();
          }, delay);
        }
      } else {
        this.end();
      }
    },

    /**
     * Pauses the countdown.
     * @private
     */
    pause() {
      if (window.requestAnimationFrame) {
        cancelAnimationFrame(this.requestId);
      } else {
        clearTimeout(this.timeoutId);
      }
    },

    /**
     * Progresses to countdown.
     * @private
     * @emits Countdown#progress
     */
    progress() {
      if (!this.counting) {
        return;
      }

      this.totalMilliseconds -= this.interval;

      if (this.emitEvents && this.totalMilliseconds > 0) {
        /**
         * Countdown progress event.
         * @event Countdown#progress
         */
        this.$emit("progress", {
          years: this.years,
          days: this.days,
          hours: this.hours,
          minutes: this.minutes,
          seconds: this.seconds,
          milliseconds: this.milliseconds,
          totalYears: this.totalYears,
          totalMonths: this.totalMonths,
          totalDays: this.totalDays,
          totalHours: this.totalHours,
          totalMinutes: this.totalMinutes,
          totalSeconds: this.totalSeconds,
          totalMilliseconds: this.totalMilliseconds
        });
      }

      this.continue();
    },

    /**
     * Aborts the countdown.
     * @public
     * @emits Countdown#abort
     */
    abort() {
      if (!this.counting) {
        return;
      }

      this.pause();
      this.counting = false;

      if (this.emitEvents) {
        /**
         * Countdown abort event.
         * @event Countdown#abort
         */
        this.$emit("abort");
      }
    },

    /**
     * Ends the countdown.
     * @public
     * @emits Countdown#end
     */
    end() {
      if (!this.counting) {
        return;
      }

      this.pause();
      this.totalMilliseconds = 0;
      this.counting = false;

      if (this.emitEvents) {
        /**
         * Countdown end event.
         * @event Countdown#end
         */
        this.$emit("end");
      }
    },

    /**
     * Updates the count.
     * @private
     */
    update() {
      if (this.counting) {
        this.totalMilliseconds = Math.max(0, this.endTime - this.now());
      }
    },

    /**
     * visibility change event handler.
     * @private
     */
    handleVisibilityChange() {
      switch (document.visibilityState) {
        case "visible":
          this.update();
          this.continue();
          break;

        case "hidden":
          this.pause();
          break;

        default:
      }
    },

    /**
     * Updates width of countdown title container.
     * @private
     */
    calcWidth() {
      this.width = this.$el.querySelector(".items").clientWidth;
    }
  },

  mounted() {
    document.addEventListener(
      EVENT_VISIBILITY_CHANGE,
      this.handleVisibilityChange
    );
    this.calcWidth();
  },

  beforeDestroy() {
    document.removeEventListener(
      EVENT_VISIBILITY_CHANGE,
      this.handleVisibilityChange
    );
    this.pause();
  }
};
</script>

<i18n>
{
  "en": {
    "years": "Years",
    "days": "Days",
    "hours": "Hours",
    "minutes": "Minutes",
    "seconds": "Seconds"
  },
  "de": {
    "years": "Jahre",
    "days": "Tage",
    "hours": "Stunden",
    "minutes": "Minuten",
    "seconds": "Sekunden"
  }
}
</i18n>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.countdown
  display flex
  flex-direction column
  align-items center
  margin-bottom 6px
  .items
    display flex
    flex-direction row
    .item
      &:not(:last-child)
        margin-right 16px
      .number
        font-family Roboto Condensed,sans-serif
        font-weight 600
        font-size 28px
        font-style normal
        line-height 1.18
        letter-spacing -0.5px
        text-align center
        text-transform uppercase
        color #ffffff
      .label
        opacity 0.5
        font-family Roboto Condensed,sans-serif
        font-weight 600
        font-size 14px
        font-style normal
        line-height 1.18
        letter-spacing normal
        text-align center
        text-transform uppercase
        color #ffffff
  .title-text
    overflow visible
    white-space nowrap
    opacity 0.75
    font-family Gagalin,sans-serif
    font-weight 400
    font-style normal
    font-size 20px
    font-stretch normal
    line-height 1.1
    letter-spacing 0.5px
    text-align center
    text-transform uppercase
    color #ffffff
</style>
