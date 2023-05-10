export interface ITodo {
  id: number;
  title: string;
  description: string;
  createdAt: string;
}

export type TTodoForm = Pick<ITodo, 'title' | 'description'>
