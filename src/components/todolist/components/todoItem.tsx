import React, { Ref, useEffect, useState, useRef } from 'react';

import { Input, InputRef } from 'antd';

import Unfinished from '@Assets/unfinished';
import Finished from '@Assets/finished';

import { ITodo, TodoStatus } from '@Interfaces/I_todo';

const TodoItem = ({
  todo,
  onEdit,
  onBlur,
  showNewTodo,
}: {
  todo: ITodo;
  onEdit?: (id: ITodo['id']) => void;
  onBlur?: (todoInfo: ITodo) => void;
  showNewTodo?: boolean;
}) => {
  const editField = useRef<InputRef | null>(null);
  const [todoInfo, setTodoInfo] = useState(todo);

  useEffect(() => {
    setTodoInfo(todo);
  }, [todo]);

  useEffect(() => {
    if (showNewTodo) {
      const node = editField.current;
      node?.focus();
    }
  }, [showNewTodo]);

  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    setTodoInfo((prev) => ({
      ...prev,
      status: prev.status === TodoStatus.FINISH ? TodoStatus.UNFINISH : TodoStatus.FINISH,
    }));
  };

  return (
    <div className="rowgroup">
      <div className="content flex items-center py-3 pr-5 pl-6 w-full">
        <div className="mr-3">
          <Input
            id={todoInfo.id}
            className="toggle hidden"
            type="checkbox"
            checked={todoInfo.status === TodoStatus.FINISH}
          />
          <label htmlFor={todoInfo.id} onClick={toggle}>
            <div className="w-[1.375rem] h-[1.375rem]">
              {todoInfo.status === TodoStatus.FINISH ? (
                <Finished fill="#0071EB" />
              ) : (
                <Unfinished fill="#c4c4c6" />
              )}
            </div>
          </label>
        </div>
        <div className="todo-item w-full">
          <div className="flex items-center w-full border-b border-border-gray2">
            {todoInfo?.priority && <div>!</div>}
            <Input
              ref={editField}
              value={todoInfo.title}
              className="edit w-full text-content-1"
              bordered={false}
              onBlur={(e) => {
                onBlur?.({ ...todoInfo, title: e.target.value });
              }}
              onChange={(e) => setTodoInfo((prev) => ({ ...prev, title: e.target.value }))}
              // onPressEnter={(e) => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
