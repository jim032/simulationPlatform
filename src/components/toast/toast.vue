<template>
  <div class="wrap" v-if="showWrap" :class="showContent ?'fadein':'fadeout'">{{text}}</div>
</template>

<style scoped>
  .wrap{
    position: fixed;
    left: 50%;
    top:50%;
    background: rgba(0,0,0,.5);
    padding:5px 10px;
    border-radius: 5px;
    transform: translate(-50%,-50%);
    color:#fff;
    z-index: 9999;
  }
  .fadein {
  	-webkit-animation: animate_in 0.25s;
    -moz-animation: animate_in 0.25s;
    -ms-animation: animate_in 0.25s;
    -o-animation: animate_in 0.25s;
    animation: animate_in 0.25s;
  }
  .fadeout {
    -webkit-animation: animate_out 0.25s;
    -moz-animation: animate_out 0.25s;
    -ms-animation: animate_out 0.25s;
    -o-animation: animate_out 0.25s;
    animation: animate_out 0.25s;
    opacity: 0;
  }
  @keyframes animate_in { 0% { opacity: 0; } 100%{ opacity: 1; } }
  @-webkit-keyframes animate_in { 0% { opacity: 0; } 100%{ opacity: 1; } }
  @-moz-keyframes animate_in { 0% { opacity: 0; } 100%{ opacity: 1; } }
  @-o-keyframes animate_in { 0% { opacity: 0; } 100%{ opacity: 1; } }

  @keyframes animate_out { 0% { opacity: 1; } 100%{ opacity: 0; } }
  @-webkit-keyframes animate_out { 0% { opacity: 1; } 100%{ opacity: 0; } }
  @-moz-keyframes animate_out { 0% { opacity: 1; } 100%{ opacity: 0; } }
  @-o-keyframes animate_out { 0% { opacity: 1; } 100%{ opacity: 0; } }
</style>
