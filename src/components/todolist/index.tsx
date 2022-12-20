import { useState } from 'react';

const TodoListHeader = () => {
  return <div>Header</div>;
};

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
