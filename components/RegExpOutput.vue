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
        positions.value.push(...createGroupItem(match));
        return
    }
    
    for (const match of text.matchAll(regex)) {
        positions.value.push(...createGroupItem(match));
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



function createGroupItem(items: RegExpMatchArray): GroupItemIterface[] {

  if ( items.length === 1) {
    return [{ match: items[0], start: items.index!, end: items.index! + items[0].length, group: 0 }]
  }

  const result: GroupItemIterface[] = [];
  const currentIndex = items.index ?? 0;
  let lastShift = 0

  for (let index = 1; index < items.length; index++) {
    const groupItem = items[index];


    if (!groupItem)  {
        // console.log(items);
        // const start = items[0].length + currentIndex;
        // const end = items[0].length + currentIndex;
      //  console.log(items, "Test");
        
      //  result.push({ match: items[0], start: items.index!, end: items.index! + items[0].length, group: 0 })
        continue
    };


    const last = result?.[index-2+lastShift];

    // Calculate start position by finding the position of the current group (search in string)
    const groupStart = items[0].indexOf(groupItem, 
      items.slice(1, index).reduce((acc, cur) => acc + (cur?.length || 0), 0)
    );

    //start index = index in full text + section of a section of text
    const start = currentIndex + groupStart

    //end index = index in full text + section of a section of text (groupStart) + groupStart length
    const end = currentIndex + groupStart + groupItem.length


    //When is not a part of regex grup 
    if(last && last.end !== start){

        lastShift++;
        result.push({
            match: items[0].slice(last.end, groupStart),
            start: last.end,
            end: groupStart,
            group: 0
        });
    }
   
    // Create group item entry
    result.push({
      match: groupItem,
      start,
      end,
      group: index
    });
  }
  console.log(result);
  
  return result;
}


</script>

<template>
     <p class="bg-gray-700 border-gray-600 rounded-md whitespace-pre-wrap break-words mt-5 p-4 " v-html="content" />
</template>