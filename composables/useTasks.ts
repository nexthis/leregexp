export function useTasks() {
    return useAsyncData('navigation', () => {
        return queryCollection('tasks')
          .order('difficulty', 'ASC')
          .order("title", "DESC").all()
    })
}