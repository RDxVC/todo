<template>
    <main>
        <div class="todo-list_main">
            <div class="create-task_main">
                <input v-model="newTask" @keypress.enter="addTask(newTask)" :class="{ invalid: invalidTask }">
                <button @click="addTask(newTask)">Add task</button>
            </div>
            <div v-if="filteredTaskArray.length">
                <ul>
                    <li v-for="(task, i) in filteredTaskArray" :key="task.desc">
                        <div @click="$store.commit('toggleTask', i)">
                            <img 
                                :src="task.done ? icons.done : icons.inProcess" 
                            >
                            <span>{{ task.desc }}</span>
                            <img 
                                :src="icons.remove" 
                                @click.stop="$store.commit('removeTask', i)"
                            >
                        </div>
                    </li>
                </ul>
            </div>
            <div class="filter_block" v-if="getTaskArray.length">
                <span>Filters:</span>
                <select v-model="activeFilter" >
                    <option 
                        v-for="option in filterOptions" 
                        :key="option.value" 
                        :value="option.value"
                    >
                    {{ option.name }}
                    </option>
                </select>
                <span>Overall task counter: {{ getTaskArray.length }}</span>
                <span>Current task counter: {{ filteredTaskArray.length }}</span>
                <button class="clear-tasks_btn" 
                    v-if="haveCompletedTasks"
                    @click="$store.commit('removeCompletedTasks')"
                >Clear completed tasks</button>
            </div>
            <span class="empty_list" v-else>Empty</span>
        </div>
    </main>
</template>
<script>
import done from '@/assets/images/done.png'
import inProcess from '@/assets/images/in_process.png'
import remove from '@/assets/images/remove.png'
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            newTask: '',
            icons: {
                done,
                inProcess,
                remove,
            },
            invalidTask: false,
            filterOptions: [
                { name: 'All',  value: 'all' },
                { name: 'Done',  value: 'done' },
                { name: 'In process', value: 'inProcess' },
            ],
            activeFilter: 'all'
        }
    },
    methods: {
        addTask() {
            if (!this.newTask) return this.invalidTask = true
            this.$store.commit('addTask', { done: false, desc: this.newTask })
            this.newTask = ''
            this.invalidTask = false
        },
        filterHandler(task) {
            if (this.activeFilter == 'all') return true
            return this.activeFilter == 'done' ? task.done : !task.done
        }
    },
    computed: {
        ...mapGetters([
            'getTaskArray'
        ]),
        filteredTaskArray() {
            return this.getTaskArray.filter(this.filterHandler)
        },
        haveCompletedTasks() {
            return this.getTaskArray.find(task => task.done)
        }
    }
}
</script>
<style scoped>
.todo-list_main {
    margin: 20px auto;
    display: flex;
    flex-direction: column;
    width: 50%;
    max-width: 750px;
    min-width: 320px;
}
.todo-list_main ul {
    margin-top: 15px;
    border: 2px solid gray;
    border-radius: 3px;
    list-style-type: none;
    padding: 3px;
}
.todo-list_main ul > li img {
    height: 30px;
    cursor:pointer;
}
.todo-list_main ul > li span {
    margin-left: 10px;
    word-break: break-all;
    cursor:pointer;
}
.todo-list_main ul > li div {
    display: flex;
    align-items: center;
    margin: 5px;
}
.empty_list {
    text-align: center;
    font-weight: bold;
}
.create-task_main {
    display: flex;
    column-gap: 10px;
    height: 35px;
    margin-top: 15px;
}
.create-task_main input {
    width: 100%;
    transition: all .2s;
    border:2px solid gray;
    border-radius: 10px;
    transition: border-color ease-in-out .2s;
}
.create-task_main button {
    min-width: 100px;
    background: green;
    border: none;
    color: white;
    font-weight: bold;
    border-radius: 10px;
}
input.invalid {
    border-color: red;
}
.filter_block {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    row-gap: 15px;
    margin-top: 20px;
    column-gap: 10px;
}
.filter_block button {
    background: green;
    border: none;
    border-radius: 6px;
    color: white;
    padding: 15px;
}
.filter_block select {
    height: 30px;
    border: 2px solid gray;
    border-radius: 6px;
}
.filter_block span {
    margin-right: 5px;
    font-size: 20px;
}
</style>