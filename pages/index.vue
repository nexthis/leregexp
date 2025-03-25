<script setup lang="ts">
const { data: pages } = await useTasks()

const {completed} = await useProgress()

useSeoMeta({
    title: "Your regex adventure! ",
    description: "This project is loosely inspired by Rustlings, and its goal is to test your skills in using regex. It's also a great opportunity to start learning with real examples."
})
</script>

<template>
    <div class="max-w-4xl mx-auto">

        <h1 class="text-4xl mb-4">Hey, thanks for being here!</h1>

        <p class="mb-5">This project is loosely inspired by Rustlings, and its goal is to test your skills in using regex. It's also a great opportunity to start learning with "real" examples.</p>
        <p class="mb-2">P.S. I deliberately skipped the most overused topics, like email validation, to better showcase other uses of regex.</p>
        <p>P.S.2 Not all examples are realistic (especially the easiest ones).</p>

        <p class="mt-5 text-center font-bold text-lg">List of exercises</p>
        <nav class="mt-3">
            <ul class="flex flex-col gap-4 ">
                <li v-for="item in pages" :key="item.id" :class="{'bg-green-700 hover:bg-green-600': completed.includes(item.id)}" class="focus:ring-blue-500 focus:border-blue-500 block w-full bg-gray-700 hover:bg-gray-600 transition-colors border-gray-600 placeholder-gray-400 text-white rounded-md">
                    <NuxtLink class=" py-2.5 px-4 flex justify-between items-center" :to="item.path">
                        <span> {{ item.title }} </span>

                        <span :style="{backgroundColor: difficultyInfo(item.difficulty).color}" class="rounded-md px-1.5 py-0.5"> {{difficultyInfo(item.difficulty).name}}</span>
                    </NuxtLink>
                </li>
            </ul>
        </nav>
    </div>
</template>