<template>
  <Transition>
    <div
      class="timer"
      :style="{
        background: `conic-gradient( rgb(11, 3, 49) ${progress}%, rgb(196, 206, 255) 0)`,
      }"
    >
      <div class="timer-counter">
        {{ time }}
      </div>
    </div></Transition
  >
</template>
<script setup>
const props = defineProps({
  countSecond: {
    type: Number,
    default: 21,
  },
});

const time = ref(props.countSecond);
const progress = ref(0);

const loop = () => {
  const progressInterval = 100 / time.value;
  const interval = setInterval(() => {
    if (time.value > 0) {
      time.value -= 1;
      progress.value += progressInterval;
    } else {
      clearInterval(interval);
      emitEvent();
    }
  }, 1000);
};

const emits = defineEmits(['customEvent']);

const emitEvent = () => {
  emits('customEvent', 'Timer stop');
}

onMounted(() => {
  loop();
});
</script>
<style scoped lang="scss">

.timer {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;

  &-counter {
    background-color: rgb(11, 3, 49);
    color: rgb(196, 206, 255);
    font-size: 12px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
