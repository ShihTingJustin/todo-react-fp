import { useEffect, useState, useRef } from 'react';

import { Input, InputRef } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

import Unfinished from '@Assets/unfinished';
import Finished from '@Assets/finished';

import { ITodo, TodoStatus } from '@Interfaces/I_todo';

import './todoItem.scss';

const TodoItem = ({
  todo,
  onToggle,
  onBlur,
  onDelete,
  onPressEnter,
  showNewTodo,
  className,
}: {
  todo: ITodo;
  onToggle?: (todoInfo: ITodo) => void;
  onBlur?: (todoInfo: ITodo) => void;
  onDelete?: (todoId: ITodo['id']) => void;
  onPressEnter?: (todoInfo: ITodo) => void;
  showNewTodo?: boolean;
  className?: string;
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

  const handleClick = () => {
    setTodoInfo((prev) => {
      const updateStatus =
        prev.status === TodoStatus.FINISH ? TodoStatus.UNFINISH : TodoStatus.FINISH;
      const updateTodoInfo = { ...prev, status: updateStatus };
      onToggle?.(updateTodoInfo);
      return updateTodoInfo;
    });
  };

  return (
    <div data-testid="todoItem" tabIndex={0} className={`"rowgroup" ${className}`}>
      <div className="content flex items-center py-3 pr-5 pl-6 w-full">
        <div className="mr-3">
          <Input
            id={todoInfo.id}
            className="toggle hidden"
            type="checkbox"
            checked={todoInfo.status === TodoStatus.FINISH}
          />
          <label htmlFor={todoInfo.id} onClick={handleClick}>
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
              onChange={(e) => {
                setTodoInfo((prev) => ({ ...prev, title: e.target.value }));
              }}
              onPressEnter={() => {
                editField.current?.blur();
              }}
            />
            {!showNewTodo && (
              <div
                className="delete-button px-3 py-1 cursor-pointer"
                onClick={() => onDelete?.(todoInfo.id)}
              >
                <CloseOutlined />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
