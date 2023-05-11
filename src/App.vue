<template>
  <RouterView />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import useTodoStore from '@/store/todo';
import formatDate from './utils/formatDate';

const store = useTodoStore()
const allTodoItems = store.list.flatMap(todo => todo.items)
allTodoItems.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
const nearestTodoItem = allTodoItems.find(item => new Date(item.dueDate) >= new Date() && !item.done);


onMounted(() => {
  if (!nearestTodoItem) return

  const body = `Todo Item: ${nearestTodoItem.id} - ${formatDate(nearestTodoItem.dueDate)}`

  if (Notification.permission === "granted") {
    new Notification("Upcoming due date", {
      body,
    });
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        new Notification("Upcoming due date", {
          body
        });
      }
    });
  }
})


</script>
