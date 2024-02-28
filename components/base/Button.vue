<template>
  <div>
    <button
      :style="{
        backgroundColor: darkColor(),
        boxShadow: 'inset 0px 0px 45px ' + mainColor,
      }"
    >
    <NuxtImg v-if="imgSrc" :src="imgSrc" class="icon"></NuxtImg>
      <slot />
    </button>
  </div>
</template>
<script setup>
const props = defineProps({
  mainColor: {
    type: String,
    default: "hsl(125, 100%, 62%)",
  },

  imgSrc: {
    type: String,
    default: ''
  }
});

function darkColor() {
  let color = props.mainColor;
  if (color.slice(0, 3) == "hsl") {
    let lightValue = color.slice(-5, -1);
    return color.replace(lightValue, " 10%");
  } else return color;
}

</script>
<style lang="scss" scoped>
button {
  border: none;
  color: #ffff;
  font-size: 14pt;
  font-weight: bold;
  padding: 12px 60px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.icon {
  width: 20px;
}
</style>
