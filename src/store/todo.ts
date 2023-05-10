import { defineStore } from 'pinia'
import { faker } from '@faker-js/faker'
import type { TTodoForm } from '@/types/todo'

// fake data
const createRandomTodo = () => {
  return {
    id: Number(faker.random.numeric(2)),
    title: faker.name.jobTitle(),
    description: faker.lorem.lines(1),
    createdAt: faker.date.past().toString()
  }
}

const todo = Array(6).fill(null).map(createRandomTodo)

const useTodoStore = defineStore('todo', {
  state: () => ({
    list: todo
  }),
  actions: {
    createTodo({ title, description }: TTodoForm) {
      this.list.push({
        id: Number(faker.random.numeric(2)),
        title,
        description,
        createdAt: new Date().toString()
      })
    },
    updateTodo(id: number, { title, description }: TTodoForm) {
      const foundIndex = this.list.findIndex((todo) => todo.id === id)

      if (foundIndex === -1) return

      this.list[foundIndex].title = title
      this.list[foundIndex].description = description
    },
    deleteTodo(id: number) {
      const foundIndex = this.list.findIndex((todo) => todo.id === id);

      if (foundIndex === -1) return

      this.list.splice(foundIndex, 1);
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'list',
        storage: localStorage
      }
    ]
  }
})

export default useTodoStore;
