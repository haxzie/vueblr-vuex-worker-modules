<template>
  <div id="app">
    <div class="contents">
      <h3>{{ time }}</h3>
      <img src="@/assets/nyancat.gif" />
      <button class="btn" @click="handleClick">Ba Ba Button!</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: "App",
  data() {
    return {
      time: 0,
    };
  },
  methods: {
    ...mapActions("App", ["expensiveFn"]),
    async handleClick() {
      console.log("Clickity clack!")
      this.expensiveFn()
    },
  },
  mounted() {
    // this.interval = setInterval(() => {
    //   this.time = this.time + 1;
    // }, 100);
  },
  beforeDestroy() {
    clearInterval(this.interval)
  }
};
</script>

<style lang="scss" scoped>
#app {
  width: 100%;
  height: 100%;
  background: #013368;
  display: flex;
  align-items: center;
  justify-content: center;

  .contents {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h3 {
      color: white;
      font-size: 3rem;
      margin: 20px;
    }

    .btn {
      margin: 10px 0;
      border: 0;
      padding: 15px 20px;
      border-radius: 10px;
      // box-shadow: 0 10px 10px rgba(0, 0, 0, 0.25);
      background: rgb(235, 44, 149);
      border: 3px solid white;
      color: white;
      transition: 0.2s all ease-in-out;

      &:hover {
        cursor: pointer;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.25);
      }

      &:active {
        transform: scale(0.95);
      }
    }

    .message {
      color: white;
    }
  }
}
</style>
