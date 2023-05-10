export interface ITodoItem {
  id: number
  title: string
  description: string
  dueDate: string
  priority: 'low' | 'medium' | 'high'
}

export interface ITodo {
  id: number
  title: string
  description: string
  createdAt: string
  items: ITodoItem[]
}

export type TTodoForm = Pick<ITodo, 'title' | 'description'>
export type TTodoItemForm = Omit<ITodoItem, 'id'>
