import { useState } from 'react';

import TodoListHeader from '@Components/todolist/components/header';

const TodoItem = () => {
  return <div>TodoItem</div>;
};

const TodoList = () => {
  return (
    <div className="todo-list h-screen">
      <TodoListHeader />
      <div>
        {Array.from({ length: 5 }).map((item, index) => (
          <TodoItem key={index} />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
