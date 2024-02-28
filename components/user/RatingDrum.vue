<template>
  <div ref="drumUpdate" class="drum" :key="componentKey">
    <div
      class="drum-number"
      :style="{ animationDuration: `${(userInput * 0.9) / drum}s` }"
    >
      <p class="drum-number-value" v-for="num in drum" :key="num">
        {{ num }}
      </p>
    </div>
    <div class="drum-rating">
      <div class="drum-rating-title">Ваш рейтинг</div>
      <div class="drum-rating-value">
        <Icon name="noto:crown" />
        {{ counter }}
      </div>
    </div>
  </div>
  <div class="restart">
    <form>
      <UserInput
        class="modal-input"
        v-model="userInput"
        :placeholder="'Рейтинг'"
      />
      <BaseButton
        :mainColor="'hsl(220, 100%, 50%)'"
        :imgSrc="'/reload.svg'"
        @click="restart(userInput)"
        >Запустить</BaseButton
      >
    </form>
  </div>
</template>

<script setup>
const props = defineProps({
  userRating: {
    type: Number,
    default: 500,
  },
});

const counter = ref(0);
const drum = ref(200);

function valueLoop(arg) {
  counter.value = 0;
  const interval = setInterval(() => {
    if (counter.value < Number(arg)) {
      counter.value += 1;
    } else {
      clearInterval(interval);
      emitEvent();
    }
  }, 1);
}

const componentKey = ref(0);
const forceRender = () => {
  componentKey.value += 1;
};

const emits = defineEmits(["endRatingDrum"]);
const emitEvent = () => {
  emits("endRatingDrum", "Drum stop");
};

const userInput = ref("");
function restart(arg) {
  forceRender();
  valueLoop(arg);
}

onMounted(() => {
  valueLoop(props.userRating);
  userInput.value = props.userRating;
});
</script>

<style lang="scss" scoped>
.drum {
  min-width: 300px;
  height: 60px;
  background: #100230;
  padding: 20px 0;
  display: flex;
  flex-direction: row;
  overflow-y: hidden;
  box-shadow: 0px 0px 29px 5px #004cff;

  &-number {
    margin-top: 5215px;
    animation: ruletka 1.8s ease;
    width: 50px;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;

    &-value {
      box-shadow: 0px 0px 4px 5px #004cff52;
      padding: 0 10px;
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
    }
  }

  &-rating {
    margin: -20px 0;
    border-left: 1px solid #3874ffe2;
    text-align: left;
    padding: 0 20px;
    font-weight: bold;

    &-title {
      padding-top: 20px;
    }

    &-value {
      display: flex;
      align-items: center;
      gap: 5px;
      color: #ffd903;
      font-size: 25px;
      margin-top: 10px;
    }
  }
}

.restart {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 30px 0;
  gap: 20px;

  form {
    display: flex;
    gap: 30px;

    input {
      width: 90%;
    }
  }
}

@keyframes ruletka {
  0% {
    transform: translate-y(200px);
    margin-top: -5215px;
  }

  100% {
    margin-top: 5215px;
    transform: translate-y(0px);
  }
}
</style>
