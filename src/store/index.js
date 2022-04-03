import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate"

const store = createStore({
    state: {
        taskArray: []
    },
    mutations: {
        addTask(state, payload) {
            state.taskArray.push(payload)
        },
        removeTask(state, i) {
            state.taskArray.splice(i, 1)
        },
        toggleTask(state, i) {
            state.taskArray[i].done = !state.taskArray[i].done
        },
        removeCompletedTasks(state) {
            state.taskArray = state.taskArray.filter(task => !task.done)
        }
    },
    getters: {
        getTaskArray: (s) => s.taskArray
    },
    plugins: [createPersistedState()],
})

export default store