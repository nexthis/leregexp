<script lang="ts" setup>
const model = defineModel<string>()

function highlightCode(code?: string) {
    if (!code) return '';
    let group = 0;
    return code
        .replace(/\s/g, "&nbsp;") // Whitespace 
        .replace(/(^\/)|(\/(?:.(?!\/))+$|\/$)/g, (text) => `<span class="primary">${text}</span>`) // Close and Open tag + falgs 
        .replace(/\*|\$|\^|\.|\||\[|\]|\?/g, (text) =>  `<span class="base">${text}</span>`) // Keywords
        .replace(/\(([^\)]+)\)/g, (text) =>  {
            group++;
            return `<span style="background-color: ${groupColors(group, 0.6)}">${text}</span>`
        }) //Groups 
        


        // .replace(/(\/\*.*?\*\/|\/\/.*?$)/gm, '<span class="comment">$1</span>') // Comments
        // .replace(/(\d+)/g, '<span class="number">$1</span>'); // Numbers
}

const highlightedCode = computed(() => highlightCode(model.value));


</script>

<template>
    <div class="relative min-h-11">
        <input :value="model" class="absolute block text-transparent bg-transparent caret-white left-0 right-0 p-2.5 w-full h-full border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500" placeholder="/regex/" @input="(e) => model = e.target.value" >
        <div class=" w-full min-h-11 p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white rounded-md highlight" v-html="highlightedCode" />
    </div>
</template>

