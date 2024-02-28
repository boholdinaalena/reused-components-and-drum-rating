<template>
  <Teleport to="body">
    <div class="modal-bg" v-if="modal">
      <div class="modal" :style="{ ...styleModal }">
        <div class="modal-glow" v-if="imgSrc"
          :style="{
                boxShadow: '100px 90px 90px 10px ' + glowColor
          }"></div>
        <div class="modal-header">
          <div class="modal-close">
            <BaseReverseTimer 
              class="modal-timer" 
              v-if="haveTimer" 
              @customEvent="hideOrNext()"
              :countSecond="countSecondInTimer"/>
            <button v-if="haveClose" @click="hideOrNext">
              <Icon name="fxemoji:ballottscriptx" size="25px" />
            </button>
          </div>
          <div class="modal-name">
            {{ name }}
          </div>
        </div>
        <div class="modal-body">
          <div class="modal-img" v-if="imgSrc">
            <NuxtImg :src="imgSrc"></NuxtImg>
          </div>
          <div class="modal-title" :style="{ color: titleColor }">
            {{ title }}
          </div>
          <div :style="{ ...styleText }">
            <slot />
          </div>
          <div class="modal-cones" v-if="haveCones">
            <NuxtImg src="/cone.png" :mainColor="'hsl(115, 100%, 50%)'"></NuxtImg>
            {{ conesAmount }}M
          </div>
          <UserInput class="modal-input" v-if="haveInput" v-model="userInput" :errors="errMsgInput"/>
        </div>

        <div class="modal-control" v-if="haveBtn">
          <BaseButton v-if="haveInput && !activateBtn"
            @click="remindAboutInput()"
            :mainColor="'hsl(200, 0%, 50%)'">
            {{  btnText }}
          </BaseButton>
          <BaseButton v-else
            :imgSrc="btnImg"
            :mainColor="btnColor"
            @click="hideOrNext(true)">
            {{ btnText }}
          </BaseButton>
          <BaseButton
            v-if="haveTwoBtn"
            @click="hideOrNext(false)"
            :mainColor="'hsl(9, 100%, 50%)'"
          >
            No
          </BaseButton>
        </div>
        <div v-else></div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { onClickOutside } from "@vueuse/core";
import { ref, defineExpose } from "vue";

const props = defineProps({
  //main params
  name: {
    type: String,
    default: "Название окна",
  },

  title: {
    type: String,
    default: "",
  },

  titleColor: {
    type: String,
    default: "#ffffff",
  },

  haveBtn: {
    type: Boolean,
    default: false,
  },

  haveTwoBtn: {
    type: Boolean,
    default: false,
  },


  btnText: {
    type: String,
    default: "OK",
  },

  btnColor: {
    type: String,
    default: "hsl(115, 100%, 50%)"
  },

  btnImg: {
    type: String,
    default: ''
  },

  haveInput: {
    type: Boolean,
    default: false
  },

  haveClose: {
    type: Boolean,
    default: false,
  },

  haveTimer: {
    type: Boolean,
    default: false
  },

  countSecondInTimer: {
    type: Number,
    default: 10,
  },

  imgSrc: {
    type: String,
    default: '',
  },

  glowColor: {
    type: String,
    default: 'red'
  },

  styleModal: {
    type: Object,
    default: () => {}
  },

  styleText: {
    type: Object,
    default: () => {}
  },

  haveCones: {
    type: Boolean,
    default: false,
  },

  conesAmount: {
    type: String,
    default: '9,000'
  },
});

const modal = ref(false);

onClickOutside(modal, () => {
  if (props.haveClose) {
    hideOrNext();
  }
});

const activateBtn = ref(false)
const errMsgInput = ref('')
const remindAboutInput = () => {
  errMsgInput.value = 'Обязательное поле'
}

const userInput = ref("")
watchEffect(() => {
  if (userInput.value.length > 6) {
    errMsgInput.value = ''
    activateBtn.value = true
  } else activateBtn.value = false
})

const show = () => {
  modal.value = true;
};
const hideOrNext = () => {
  modal.value = false;
};

defineExpose({
  show,
  hideOrNext,
});
</script>

<style lang="scss" scoped>
.modal-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: scroll;
}

.modal {
  width: 420px;
  height: 500px;
  margin: 70px 20px;
  background-color: rgb(31, 52, 101);
  border: 1px solid rgb(25, 36, 80);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  font-size: 20px;
  color: rgb(164, 194, 228);
  z-index: -2;

  &-glow {
    width: 200px;
    position: absolute;
    z-index: -1;
  }
  
  &-name,
  &-control {
    z-index: 1;
    border-radius: 20px;
    background-color: rgb(25, 36, 80);
  }

  &-name {
    width: 100%;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    border-bottom-right-radius: 0px;
    border-bottom-left-radius: 0px;
    color: rgb(111, 169, 255);
  }

  &-input {
    margin: 20px 0;
  }
  
  &-close {
    position: relative;
    display: flex;
    justify-content: right;
    padding: 0;
    box-shadow: insert none;
    padding-right: 10px;

    button {
      margin-bottom: -60px;
      background: none;
      outline: none;
      border: none;
    }
  }

  &-timer {
    position: absolute;
    top: 13px;
    right: 15px;
  }

  &-body {
    padding-top: -50px;
    padding: 0 40px;
  }

  &-img {
    img {
      width: 120px;
      margin-bottom: 20px;
    }
  }

  &-title {
    font-size: 22px;
    font-weight: bolder;
    margin: 20px 0;
    margin-top: 0;
  }

  &-cones {
    width: fit-content;
    margin: 20px auto;
    padding: 10px 20px;
    background: #0900b1;
    border-radius: 20px;
    display: flex;
    align-items: center;
    gap: 5px;
    font-weight: bolder;
    font-size: 20pt;
    color: white;

    img {
      width: 30px;
    }
  }

  &-control {
    display: flex;
    flex-direction: row-reverse;
    justify-content: center;
    gap: 30px;
    padding: 20px;
    border-top-right-radius: 0px;
    border-top-left-radius: 0px;
  }
}

</style>
