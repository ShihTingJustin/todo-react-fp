import { useState } from 'react';

import TodoListHeader from '@Components/todolist/components/header';
import TodoItem from '@Components/todolist/components/todoItem';

import { TodoStatus, TodoPriority, ITodo } from '@Interfaces/I_todo';

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
    status: TodoStatus.UNFINISH
    // priority: TodoPriority.LOW
  }
];

const TodoList = () => {
  const [todoList, setTodoList] = useState(mock);
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);

  const [showNewTodo, setShowNewTodo] = useState(false);
  console.log({ showNewTodo });

  const edit = (todoId: ITodo['id'] | null) => {
    setEditingTodoId(todoId);
  };

  return (
    <div className="todo-list flex flex-col h-full">
      <TodoListHeader title={'list title'} />
      <div className="flex flex-col grow">
        {todoList.map((todo, index) => (
          <TodoItem
            key={index}
            todo={todo}
            onEdit={edit}
            onBlur={(value) => {
              if (value) {
                // TODO: update todo API
              } else {
                // TODO: delete todo API
              }
            }}
          />
        ))}
        {showNewTodo ? (
          <TodoItem
            todo={{ id: '123', title: '', status: TodoStatus.UNFINISH }}
            showNewTodo={showNewTodo}
            onBlur={(value) => {
              if (value) {
                // TODO: create todo API
              } else {
                setShowNewTodo(false);
              }
            }}
          />
        ) : (
          <div
            className="flex flex-col grow justify-center items-center"
            onClick={() => setShowNewTodo(true)}
          >
            <div>nothing</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;
