import React, { useCallback, useState, useRef } from 'react';
import Footer from '@Components/footer';
import TodoItem from '@Components/todoItem';
import { ENTER_KEY } from '@Constants/index';
import { Todo } from '@Interfaces/I_Todo';

import './home.scss';

const defaultTodoItems = [
  {
    id: '1',
    title: 'qwe',
    completed: false
  }
];

function Home() {
  const newField = useRef<HTMLInputElement | null>(null);

  const [todoList, setTodoList] = useState(defaultTodoItems);
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);

  const activeTodoCount = todoList.reduce((acc, todo) => {
    return todo.completed ? acc : acc + 1;
  }, 0);

  const handleNewTodoKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key !== ENTER_KEY) {
      return;
    }

    event.preventDefault();

    const val = newField.current?.value.trim();
    if (val) {
      // TODO: create todo api
      setTodoList((prev) => [...prev, { id: val, title: val, completed: false }]);

      if (newField.current) newField.current.value = '';
    }
  }, []);

  const toggleAll = (event: React.FormEvent) => {
    var target: any = event.target;
    var checked = target.checked;

    // TODO: create todo api
    setTodoList((prev) => prev.map((item) => ({ ...item, completed: checked })));
  };

  const destroy = (todo: Todo) => {
    // TODO: delete API
    setTodoList((prev) => prev.filter((item) => item.id !== todo.id));
  };

  const edit = (todoId: Todo['id'] | null) => {
    setEditingTodoId(todoId);
  };

  const save = () => {
    // TODO: update API
    setEditingTodoId(null);
  };

  const cancel = () => {
    setEditingTodoId(null);
  };

  return (
    <div className="todoapp">
      <h1>todos</h1>
      <header className="header">
        <input
          ref={newField}
          className="new-todo"
          placeholder="What needs to be done?"
          onKeyDown={handleNewTodoKeyDown}
          autoFocus={true}
        />
      </header>
      <section className="main">
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          onChange={toggleAll}
          checked={activeTodoCount === 0}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul className="todo-list">
          {todoList.map((todo, index) => (
            <TodoItem
              key={todo.id + index}
              todo={todo}
              editing={editingTodoId === todo.id}
              onToggle={() => {}}
              onDestroy={() => destroy(todo)}
              onEdit={(id) => edit(id)}
              onSave={save}
              onCancel={cancel}
            />
          ))}
        </ul>
      </section>
      <Footer />
    </div>
  );
}

export default Home;
