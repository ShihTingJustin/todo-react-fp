import { useEffect, useState, useMemo } from 'react';
import { todoApi } from '@Services/todoApi';
import { listApi } from '@Services/listApi';
import TodoListHeader from '@Components/todolist/components/header/header';
import TodoItem from '@Components/todolist/components/todoItem/todoItem';
import Blank from '@Components/todolist/components/blank/blank';
import { useAppSelector } from '@Hooks/useAppRedux';
import { CreateTodoReqBody, UpdateTodoReqBody, ITodo, TodoListMode } from '@Interfaces/I_todo';

type TodoListProps = {
  isError?: boolean;
  isLoading?: boolean;
  data?: { title: string; todo: ITodo[] };
};

const TodoList = ({ data, isError, isLoading }: TodoListProps) => {
  const { selectedListId } = useAppSelector((state) => state.list);
  const { mode } = useAppSelector((state) => state.todo);

  const [todos, setTodos] = useState<ITodo[]>([]);
  const [showNewTodo, setShowNewTodo] = useState(false);
  const [hiddenTodo, setHiddenTodo] = useState<Set<string>>(new Set());

  const [createTodo, { isLoading: isCreateTodoLoading, isError: isCreateTodoError }] =
    todoApi.useCreateTodoMutation();
  const [updateTodo, { isLoading: isUpdateTodoLoading, isError: isUpdateTodoError }] =
    todoApi.useUpdateTodoMutation();
  const [deleteTodo, { isLoading: isDeleteTodoLoading, isError: isDeleteTodoError }] =
    todoApi.useDeleteTodoMutation();
  const [getListById] = listApi.useLazyGetListByIdQuery();

  useEffect(() => {
    if (mode === TodoListMode.NORMAL && selectedListId) {
      getListById(selectedListId);
    }
  }, [mode, selectedListId]);

  useEffect(() => {
    setTodos(data?.todo || []);
  }, [data]);

  const handleCreate = async (todo: CreateTodoReqBody) => {
    try {
      if (!todo.title.trim()) return;
      setShowNewTodo(false);
      await createTodo(todo);
      getListById(selectedListId);
    } catch (error) {}
  };

  const handleUpdate = async (todo: UpdateTodoReqBody) => {
    updateTodo(todo);
  };

  const handleDelete = async (todoId: ITodo['id']) => {
    try {
      setHiddenTodo((prev) => prev.add(todoId));
      await deleteTodo(todoId);
      getListById(selectedListId);
    } catch (error) {}
  };

  const handleToggle = (todoInfo: ITodo) => {
    updateTodo({ id: todoInfo.id, completed: todoInfo.completed });
  };

  return (
    <div data-testid="normalTodoList" className="todo-list flex flex-col h-full">
      <TodoListHeader
        title={data?.title || ''}
        plusButtonDisabled={showNewTodo}
        onPlusClick={() => setShowNewTodo(true)}
      />
      <div className="flex flex-col grow">
        {isError ? (
          <>Oh no, there was an error</>
        ) : isLoading ? (
          <>Loading...</>
        ) : todos?.length ? (
          todos?.map((todo, index) => (
            <TodoItem
              key={index}
              todo={todo}
              className={`${hiddenTodo.has(todo.id) && 'hidden'}`}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onBlur={(todoInfo) => {
                if (todoInfo.title.trim()) {
                  handleUpdate(todoInfo);
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
              completed: false,
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
