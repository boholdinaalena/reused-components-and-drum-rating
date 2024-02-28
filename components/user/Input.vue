<template>
  <div class="container">
    <input 
      class="input" 
      :class="{ 'input-errors': errors }"
      v-model="value"
      type="text" 
      :placeholder="placeholder"/>
    <div class="errors">
      {{ errors }}
    </div>
  </div>
</template>

<script setup>

const props = defineProps({  
    placeholder: {
    type: String,
    default: "example@mail.com",
  },
  errors: {
    type: String,
    required: false,
  }
});

const value = defineModel();


</script>

<style lang="scss" scoped>

.container {
  width: 100%;
}

.input {
  border-radius: 10px;
  padding: 10px;
  background: none;
  border: 1px solid rgb(135, 135, 255);
  outline: none;
  color: inherit;
  font-size: 16px;
  width: 100%;
}

.input-errors {
  border: 1px solid red;
}
.errors {
  display: flex;
  justify-content: center;
  color: red;
  font-size: 15px;
}
</style>
