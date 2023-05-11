import { defineStore } from 'pinia'
import type { ITodo, TTodoForm, TTodoItemForm } from '@/types/todo'

// fake data
const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
interface IRootState {
  list: ITodo[]
}

const useTodoStore = defineStore('todo', {
  state: () => ({
    list: []
  } as IRootState),
  getters: {
    getTodo: (state) => (id: number) => state.list.find(t => t.id === id),
    getTodoItem: (state) => (parentId: number, id: number) => {
      const parentTodo = state.list.find((todo) => todo.id === parentId);

      if (!parentTodo) return;

      return parentTodo.items.find((item) => item.id === id)
    }
  },
  actions: {
    createTodo({ title, description }: TTodoForm) {
      this.list.push({
        id: randomNumber(1, 900),
        title,
        description,
        createdAt: new Date().toString(),
        items: []
      })
    },
    createTodoItem(parentId: number, form: TTodoItemForm) {
      const todo = this.list.find(todo => todo.id === parentId)

      if (!todo) return

      todo.items.push({
        id: randomNumber(1, 100),
        ...form
      })
    },
    updateTodo(id: number, { title, description }: TTodoForm) {
      const foundIndex = this.list.findIndex((todo) => todo.id === id)

      if (foundIndex === -1) return

      this.list[foundIndex].title = title
      this.list[foundIndex].description = description
    },
    updateTodoItem(parentId: number, id: number, form: TTodoItemForm) {
      const parentTodo = this.list.find((todo) => todo.id === parentId)

      if (!parentTodo) return

      const foundIndex = parentTodo.items.findIndex((item) => item.id === id)

      if (foundIndex === -1) return

      parentTodo.items[foundIndex] = {
        ...parentTodo.items[foundIndex],
        ...form
      }
    },
    deleteTodo(id: number) {
      const foundIndex = this.list.findIndex((todo) => todo.id === id);

      if (foundIndex === -1) return

      this.list.splice(foundIndex, 1);
    },
    deleteTodoItem(parentId: number, id: number) {
      const parentTodo = this.list.find((todo) => todo.id === parentId);

      if (!parentTodo) return;

      const foundIndex = parentTodo.items.findIndex((item) => item.id === id);

      if (foundIndex === -1) return;

      parentTodo.items.splice(foundIndex, 1);
    },
    toggleCheckTodoItem(parentId: number, id: number) {
      const parentTodo = this.list.find((todo) => todo.id === parentId);

      if (!parentTodo) return;

      const foundIndex = parentTodo.items.findIndex((item) => item.id === id);

      if (foundIndex === -1) return;

      parentTodo.items[foundIndex].done = !parentTodo.items[foundIndex].done;
    },

  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'list',
        storage: localStorage,
      }
    ]
  }
})

export default useTodoStore;
