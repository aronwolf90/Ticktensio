<template lang='pug'>
  b-button(variant="success", type="submit", @click="$emit('click')")
    b-spinner(small="", v-if="saving")
    | &nbsp
    slot
</template>

<script>
export default {
  props: ['saving']
}
</script>
