export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export type TodoItemProps = {
  todo: Todo;
  editing: boolean;
  onToggle: () => void;
  onDestroy: () => void;
  onEdit: (id: Todo['id'] | null) => void;
  onSave: (title: Todo['title']) => void;
  onCancel: () => void;
};
