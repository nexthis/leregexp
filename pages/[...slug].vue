<script setup lang="ts">
const route = useRoute()


const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('tasks').path(route.path).first()
})

const {complete} = await useProgress()

const text = getText();
const search = ref("")
const surrender = ref(0)


const isComplete = computed(() => {
    const flags = search.value.replace(/.*\/(?!.*(.).*\1)([gimy]*)$/, '$2');
    const pattern = search.value.replace(new RegExp('^/(.*?)/'+flags+'$'), '$1');
    const regex = safeRegExp(pattern, flags);
    const regexSolution = safeRegExp(page.value?.solution[0] ?? '', page.value?.solution[1])
    

    if(!regex || !regexSolution) return false
    return text.every(item => item.replace(regex, "") === item.replace(regexSolution, ""))//text.value.replace(regex, "") === text.value.replace(regexSolution, "")
})

function getText() {
    if(!page.value) return ["ERROR: DATA NOT FOUND"];
    if(Array.isArray(page.value.data)){
        return page.value.data.map(item => item.replaceAll("\\n", "\n"))
    }
    return [page.value.data.replaceAll("\\n", "\n")]
}


function onSurrender(){
    if( surrender.value < 3){
        surrender.value++;
        return
    }
    search.value = `/${page.value?.solution[0]}/${page.value?.solution[1]}`
}

useSeoMeta({
    title: page.value?.title,
    description: page.value?.description
})

</script>


<template>
    <div class="max-w-4xl mx-auto">
        <div class="mb-4 ">
            <ContentRenderer v-if="page" class="content" :value="page" />
        </div>
        <RegExpEditor  v-model="search"  />
        
        <RegExpOutput v-for="item of text" :key="item" :search="search" :text="item"/>
        <div v-if="page" class="mt-5 flex justify-center">
            <button type="button" :class="{'bg-black/30':  surrender <= 3, 'bg-yellow-600  hover:bg-yellow-700 focus:ring-yellow-800': surrender >= 3}" class="focus:outline-none text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" @click="onSurrender">Surrender ({{ surrender > 0 ? surrender : "click" }})</button>
            <button type="button" :disabled="!isComplete" class="focus:outline-none text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-green-600 disabled:bg-black/30 hover:bg-green-700 focus:ring-green-800" @click="() => complete(page!.id)">Complete</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>