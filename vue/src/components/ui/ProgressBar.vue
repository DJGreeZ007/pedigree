<template>
  <div class="progress-bar">
    <div class="progress-bar__circle">
      <div class="progress-bar__circle--out">
        <div class="progress-bar__circle--inner">
          <span class="value">{{ value }}%</span>
        </div>
      </div>
      <svg class="progress-bar__progress-line" viewBox="0 0 36 36">
        <path 
          class="progress-bar__circle-bg"
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.8309
            a 15.9155 15.9155 0 0 1 0 -31.8309"/>
        <path 
          class="progress-bar__circle-progress"
          :style="{ strokeDasharray: circumference, strokeDashoffset: offset, stroke: colors[ Math.ceil((this.value / 10) - 1) ] }"
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.8309
            a 15.9155 15.9155 0 0 1 0 -31.8309"/>
      </svg>
    </div>
  </div>
</template>
    
<script>
export default {
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      offset: 0
    };
  },
  watch: {
    value(newValue) {
      this.animateCircle(newValue)
    }
  },
  mounted() {
    this.animateCircle(this.value)
  },
  computed: {
    colors () {
      return [
          '#3190cd', '#6975c8', '#8859bf', '#bf599e', '#de5769', '#df7447', '#f19730', '#f0b02e', '#80c15f', '#00d197'
      ]
    },
    radius () {
      return 16
    },
    circumference () {
      return 2 * Math.PI * this.radius
    }
  },
  methods: {
    animateCircle(newValue) {
      const progress = this.circumference - (newValue / 100) * this.circumference
      this.offset = progress
    }
  }
};
</script>
    
<style scoped lang="less">
.progress-bar {
  position: relative;
  &__circle {
    position: relative;
    width: 150px;
    height: 150px;
    &--out {
      width: 125px;
      height: 125px;
      position: absolute;
      top: 8%;
      left: 8%;
      background: #666567;
      border-radius: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0px 5px 10px 2px rgb(0 0 0 / 46%);
      z-index: 10;
    }
    &--inner {
      background: #313133;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      box-shadow: 0px 5px 10px 2px rgb(21 21 21 / 58%) inset;
      display: flex;
      justify-content: center;
      align-items: center;
      .value {
        color: #ffffff;
        font-weight: 600;
        font-size: 18px;
      }
    }
    .progress-line {
      position: absolute;
      .circle-bg {
        fill: none;
        stroke: #202022;
        stroke-width: 2;
      }
      .circle-progress {
        fill: none;
        stroke-width: 2;
        stroke-linecap: round;
        transition: stroke-dashoffset 0.5s;
      }
    }
  }
}
</style>
  