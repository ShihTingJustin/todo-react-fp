import { useState } from 'react';

import TodoListHeader from '@Components/todolist/components/header';
import TodoItem from '@Components/todolist/components/todoItem';

import { TodoStatus, TodoPriority } from '@Interfaces/I_todo';

const mock = [
  {
    id: '0',
    title: '000',
    status: TodoStatus.FINISH,
    priority: TodoPriority.LOW
  },
  {
    id: '1',
    title: '111',
    status: TodoStatus.UNFINISH,
    // priority: TodoPriority.LOW
  }
];

const TodoList = () => {
  const [todoList, setTodoList] = useState(mock)
  
  return (
    <div className="todo-list h-screen">
      <TodoListHeader title={'list title'} />
      <div>
        {todoList.map((item, index) => (
          <TodoItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
