import React, { Ref, useEffect, useState, useRef } from 'react';

import { Input, InputRef } from 'antd';

import Unfinished from '@Assets/unfinished';
import Finished from '@Assets/finished';

import { ITodo, TodoStatus } from '@Interfaces/I_todo';

const TodoItem = ({
  todo: { id, title, status, priority },
  onEdit,
  onBlur,
  showNewTodo,
}: {
  todo: ITodo;
  onEdit?: (id: ITodo['id']) => void;
  onBlur?: (inputValue: ITodo['title']) => void;
  showNewTodo?: boolean;
}) => {
  const editField = useRef<InputRef | null>(null);
  const [checked, setChecked] = useState(status === TodoStatus.FINISH);

  useEffect(() => {
    if (showNewTodo) {
      const node = editField.current;
      node?.focus();
    }
  }, [showNewTodo]);

  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    setChecked((prev) => !prev);
  };

  return (
    <div className="rowgroup">
      <div className="content flex items-center py-3 pr-5 pl-6 w-full">
        <div className="mr-3">
          <Input id={id} className="toggle hidden" type="checkbox" checked={checked} />
          <label htmlFor={id} onClick={toggle}>
            <div className="w-[1.375rem] h-[1.375rem]">
              {checked ? <Finished fill="#0071EB" /> : <Unfinished fill="#c4c4c6" />}
            </div>
          </label>
        </div>
        <div className="todo-item w-full">
          <div className="flex items-center w-full border-b border-border-gray2">
            {priority && <div>!</div>}
            <Input
              ref={editField}
              defaultValue={title}
              className="edit w-full text-content-1"
              bordered={false}
              onBlur={() => {
                onBlur?.(editField.current?.input?.value || '');
              }}
              // onChange={(e) => handleChange(e)}
              // onPressEnter={(e) => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
