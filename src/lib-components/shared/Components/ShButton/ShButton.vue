<template>
  <button class="example-button">
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "ShButton"
});
</script>

<style lang="scss">
.example-button {
  border: 1px solid deeppink;
  padding: 12px;
  border-radius: 5px;
}
</style>
