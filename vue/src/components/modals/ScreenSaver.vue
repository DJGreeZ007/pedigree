<template>
  <div class="screen-saver" :style="{ backgroundColor: colorBg }">
    <svg
      :style="{ transform: `translate(${x}px, ${y}px)` }"
      height="120px" 
      width="120px" 
      version="1.1" 
      xmlns="http://www.w3.org/2000/svg" 
      xmlns:xlink="http://www.w3.org/1999/xlink" 
      viewBox="0 0 15.465 15.465" 
      xml:space="preserve" 
    >
    <g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g> <g> <g> <g> 
    <path 
        :style="{ fill: colorSvg }" 
        d="M7.4,8.959c-4.132,0-7.4,0.55-7.4,1.227c0,0.678,3.268,1.227,7.4,1.227s7.543-0.549,7.543-1.227 C14.944,9.508,11.533,8.959,7.4,8.959z M7.263,10.51c-0.957,0-1.733-0.237-1.733-0.53s0.776-0.53,1.733-0.53 s1.732,0.237,1.732,0.53S8.219,10.51,7.263,10.51z M13.319,4.052H9.701L7.769,6.291l-0.92-2.208H1.145L0.933,5.045h2.269 c0,0,1.037-0.136,1.071,0.694c0,1.438-2.376,1.316-2.376,1.316l0.444-1.5H0.869L0.194,7.988h2.668c0,0,2.821-0.25,2.821-2.218 c0,0,0.114-0.574,0.066-0.827L7.124,8.62l3.435-3.565h2.606c0,0,0.798,0.068,0.798,0.685c0,1.438-2.359,1.288-2.359,1.288 l0.365-1.472h-1.287L9.946,7.989h2.453c0,0,3.066-0.19,3.066-2.279C15.465,5.709,15.404,4.052,13.319,4.052z">
    </path> </g> </g> </g> </g></svg>
  </div>
</template>
  
<script>
export default {
  name: 'ScreenSaver',
  data () {
    return {
      x: 0,
      y: 0,
      colorBg: '#000000',
      colorSvg: '#000000'
    }
  },
  mounted () {
    this.moveSvg()
  },
  computed: {
    colors () {
      return [
        '#9BB1FF',
        '#809848',
        '#FBF7F4',
        '#F7F052',
        '#FF0035'
      ]
    },
    backGround () {
      return [
        '#FFFFFF',
        '#000000',
      ]
    },
    params () {
      const hRange = window.innerWidth - 120
      const vRange = window.innerHeight - 120
      return [hRange, vRange]
    }
  },
  methods: {
    moveSvg () {
      const [width, height] = [...this.params]
      const time = performance.now() * 0.2
      const rebound = Math.floor(time / width) + Math.floor(time / height)
      this.x = Math.abs((time % (width * 2)) - width)
      this.y = Math.abs((time % (height * 2)) - height)
      this.colorSvg = this.colors[rebound % this.colors.length]
      this.colorBg = this.backGround[rebound % this.backGround.length]
      requestAnimationFrame(this.moveSvg)
    },
  }
}
</script>
  
<style scoped lang="less">
.screen-saver {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100vh;
}
</style>
  