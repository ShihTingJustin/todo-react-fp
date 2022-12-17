import React, { useEffect, useState, useRef } from 'react';

import { TodoItemProps } from '@Interfaces/I_Todo';
import { ESCAPE_KEY, ENTER_KEY } from '@Constants/index';

const TodoItem = ({
  todo: { id, title, completed },
  editing,
  onToggle,
  onDestroy,
  onEdit,
  onSave
}: TodoItemProps) => {
  const editField = useRef<HTMLInputElement | null>(null);

  const [editText, setEditText] = useState('');

  useEffect(() => {
    if (editing) {
      const node = editField.current;
      node?.focus();
      node?.setSelectionRange(node.value.length, node.value.length);
    }
  }, [editing]);

  const handleSubmit = (event: React.FormEvent) => {
    const val = editText.trim();
    if (val) {
      onSave(val);
      setEditText(val);
    } else {
      onDestroy();
    }
    onEdit(null);
  };

  const handleEdit = () => {
    onEdit(id);
    setEditText(title);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    console.log(event.key);
    if (event.key === ESCAPE_KEY) {
      onEdit(null);
      setEditText(title);
    }
    if (event.key === ENTER_KEY) {
      // TODO: update API
    }
  };

  const handleChange = (event: React.FormEvent) => {
    var input: any = event.target;
    setEditText(input.value);
  };

  console.log(editing);

  return (
    <li className={`${completed && 'completed'} ${editing && 'editing'}`}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={completed} onChange={onToggle} />
        <label onDoubleClick={(e) => handleEdit()}>{title}</label>
        <button className="destroy" onClick={onDestroy} />
      </div>
      <input
        ref={editField}
        className="edit"
        value={editText}
        onBlur={(e) => handleSubmit(e)}
        onChange={(e) => handleChange(e)}
        onKeyDown={(e) => handleKeyDown(e)}
      />
    </li>
  );
};

export default TodoItem;
