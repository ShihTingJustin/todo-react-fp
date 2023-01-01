import { useEffect, useState, useMemo } from 'react';
import { todoApi } from '@Services/todoApi';
import { listApi } from '@Services/listApi';
import TodoListHeader from '@Components/todolist/components/header/header';
import TodoItem from '@Components/todolist/components/todoItem/todoItem';
import Blank from '@Components/todolist/components/blank/blank';
import { useAppSelector } from '@Hooks/useAppRedux';
import {
  CreateTodoReqBody,
  UpdateTodoReqBody,
  TodoStatus,
  ITodo,
  TodoListMode,
} from '@Interfaces/I_todo';

type TodoListProps = {
  isError?: boolean;
  isLoading?: boolean;
  data?: { listTitle: string; todo: ITodo[] };
};

const TodoList = ({ data, isError, isLoading }: TodoListProps) => {
  const { selectedListId } = useAppSelector((state) => state.list);
  const { mode } = useAppSelector((state) => state.todo);

  const [showNewTodo, setShowNewTodo] = useState(false);
  const [hiddenTodo, setHiddenTodo] = useState<Set<string>>(new Set());

  const [createTodo, { isLoading: isCreateTodoLoading, isError: isCreateTodoError }] =
    todoApi.useCreateTodoMutation();
  const [updateTodo, { isLoading: isUpdateTodoLoading, isError: isUpdateTodoError }] =
    todoApi.useUpdateTodoMutation();
  const [deleteTodo, { isLoading: isDeleteTodoLoading, isError: isDeleteTodoError }] =
    todoApi.useDeleteTodoMutation();
  const [getAllList] = listApi.useLazyGetAllQuery();

  useEffect(() => {
    if (mode === TodoListMode.NORMAL && selectedListId) {
      // getAllTodoByListId(selectedListId);
    }
  }, [mode, selectedListId]);

  const handleCreate = async (todo: CreateTodoReqBody) => {
    try {
      if (!todo.title.trim()) return;
      setShowNewTodo(false);
      const res = await createTodo(todo).unwrap();
      getAllList();
      // TODO: get todo by list
      // getAllTodoByListId(res?.data.listId);
    } catch (error) {}
  };

  const handleUpdate = async (todo: UpdateTodoReqBody) => {
    updateTodo(todo);
  };

  const handleDelete = async (todoId: ITodo['id']) => {
    try {
      setHiddenTodo((prev) => prev.add(todoId));
      deleteTodo(todoId);
      getAllList();
      // TODO: get todo by list
      // getAllTodoByListId(selectedListId);
    } catch (error) {}
  };

  const handleToggle = (todoInfo: ITodo) => {
    updateTodo({ todoId: todoInfo.id, status: todoInfo.status });
  };

  return (
    <div data-testid="normalTodoList" className="todo-list flex flex-col h-full">
      <TodoListHeader
        title={data?.listTitle || ''}
        plusButtonDisabled={showNewTodo}
        onPlusClick={() => setShowNewTodo(true)}
      />
      <div className="flex flex-col grow">
        {isError ? (
          <>Oh no, there was an error</>
        ) : isLoading ? (
          <>Loading...</>
        ) : data?.todo?.length ? (
          data?.todo?.map((todo, index) => (
            <TodoItem
              key={index}
              todo={todo}
              className={`${hiddenTodo.has(todo.id) && 'hidden'}`}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onBlur={(todoInfo) => {
                if (todoInfo.title.trim()) {
                  const { id, ...rest } = todoInfo;
                  handleUpdate({ todoId: id, ...rest });
                } else {
                  handleDelete(todoInfo.id);
                }
              }}
            />
          ))
        ) : (
          !showNewTodo && <Blank text="No Todos" onClick={() => setShowNewTodo(true)} />
        )}
        {showNewTodo ? (
          <TodoItem
            todo={{
              id: '123',
              title: '',
              status: TodoStatus.UNFINISH,
              listId: selectedListId,
            }}
            showNewTodo={showNewTodo}
            onBlur={(todoInfo) => {
              if (todoInfo.title.trim()) {
                const { id, ...rest } = todoInfo;
                handleCreate(rest);
              }
              setShowNewTodo(false);
            }}
          />
        ) : (
          data?.todo?.length && <Blank text="" onClick={() => setShowNewTodo(true)} />
        )}
      </div>
    </div>
  );
};

export default TodoList;
