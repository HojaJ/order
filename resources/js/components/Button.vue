<template>

    <button
        :type="type"
        class="
            px-6
            py-2
            font-semibold
            text-white
            bg-blue-500
            rounded-md
            hover:opacity-95
            focus:outline-none">
    <slot />
    </button>
</template>
  
<script setup>
const prots = defineProps({
    type: {
      type: String,
      default: 'save',
    },
})
</script>