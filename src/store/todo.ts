import { defineStore } from 'pinia'
import { faker } from '@faker-js/faker'
import type { ITodo, TTodoForm } from '@/types/todo'

// fake data
const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const createRandomTodo = (): ITodo => {
  return {
    id: Number(faker.random.numeric(2)),
    title: faker.name.jobTitle(),
    description: faker.lorem.lines(1),
    createdAt: faker.date.past().toString(),
    items: Array(randomNumber(1, 10)).fill(null).map(() => ({
      id: Number(faker.random.numeric(2)),
      title: faker.lorem.words(3),
      description: faker.lorem.sentence(),
      dueDate: faker.date.future().toString(),
      priority: faker.helpers.arrayElement(['low', 'medium', 'high'])
    }))
  }
}

const todo = Array(6).fill(null).map(createRandomTodo)

const useTodoStore = defineStore('todo', {
  state: () => ({
    list: todo
  }),
  getters: {
    getTodo: (state) => (id: Number) => state.list.find(t => t.id === id)
  },
  actions: {
    createTodo({ title, description }: TTodoForm) {
      this.list.push({
        id: Number(faker.random.numeric(2)),
        title,
        description,
        createdAt: new Date().toString(),
        items: []
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
        storage: localStorage,
      }
    ]
  }
})

export default useTodoStore;
