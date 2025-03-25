

interface StateInterface {
    completed: Array<string>
    current: number
}

function loadData(): StateInterface {
    const data = JSON.parse(localStorage.getItem('state') ?? '{ "completed": [], "current": 0}')
    return data 
}

function saveData(value: StateInterface) {
    localStorage.setItem('state', JSON.stringify(value))
}

const useData = () => {
    const state = useState<StateInterface>('state', () => loadData() )
    watchEffect(() =>   saveData(state.value))
    return state
}


export async function useProgress() {

    const router = useRouter()
    const data = useData();

    const { data: pages } = await useTasks()
    
    const completed = computed(() => data.value.completed)
    const next =  computed(() => pages.value ? pages.value[data.value.current + 1] : undefined)
    const previous =  computed(() => pages.value ? pages.value[data.value.current - 1] : undefined)


    async function complete(id: string) {

        if(!pages.value) return


        const current = pages.value.findIndex((item) => item.id === id)
        const next = pages.value[current + 1]
        
        console.log(data.value.completed.includes(pages.value[current]?.id), pages.value[current]?.id,data.value.completed );
        
        if(!data.value.completed.includes(id)){
            data.value.completed.push(id)
            data.value.current = current + 1;
        }


        alert("!! JEJ !!")
        console.log(next.path);
        await router.push(next.path)
    }


    return {completed, next, previous, complete}
}