<script setup lang="ts">


const props = defineProps<{
    text: string,
    search: string
}>()

const positions = ref<Array<GroupItemIterface>>([])
const content = computed(() => highlightCode())

const text = props.text.replaceAll("\\n", "\n");

watchEffect(() => {
    positions.value.length = 0

    if(!props.search) return

    const flags = props.search.replace(/.*\/(?!.*(.).*\1)([gimy]*)$/, '$2');
    const pattern = props.search.replace(new RegExp('^/(.*?)/'+flags+'$'), '$1');
    const regex = safeRegExp(pattern, flags);

    if(!regex){
        console.log("Invalid RegExp");
        return
    }

    if(!regex.global){
        const match = text.match(regex)
        if(match === null) return
        positions.value.push(createGroupItem(match));
        return
    }
    
    for (const match of text.matchAll(regex)) {
        positions.value.push(createGroupItem(match));
    }
})

function highlightCode() {

    let highlightedText = text;
    let offset = 0;

    positions.value.forEach(({ start, end, match, group }) => {


        const style = match.length ? `style="color:${groupColors(group)}"` : `class="text-red-500 animate-pulse"`;
        const text =  match.length ? match : '|';

        const before = highlightedText.slice(0, start + offset);
        const middle = `<span ${style}>${text}</span>`;
        const after = highlightedText.slice(end + offset);
        highlightedText = before + middle + after;
        offset += middle.length - match.length;
    });

    return highlightedText;
}



function createGroupItem(item: RegExpMatchArray): GroupItemIterface{

    const group = item.findIndex((value, index) => {
        return value === item[0] && index !== 0
    });

    //Verifi if ! is ok 
    return { match: item[0], start: item.index!, end: item.index! + item[0].length, group: group }
}



</script>

<template>
     <p class="bg-gray-700 border-gray-600 rounded-md whitespace-pre-wrap break-words mt-5 p-4 " v-html="content" />
</template>