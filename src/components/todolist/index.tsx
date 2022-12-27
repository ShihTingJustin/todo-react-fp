import { useEffect, useState, useMemo } from 'react';
import { todoApi } from '@Services/todoApi';
import TodoListHeader from '@Components/todolist/components/header';
import TodoItem from '@Components/todolist/components/todoItem';
import Blank from '@Components/todolist/components/blank';
import { useAppSelector } from '@Hooks/useAppRedux';
import {
  CreateTodoReqBody,
  UpdateTodoReqBody,
  TodoStatus,
  ITodo,
  TodoListMode,
} from '@Interfaces/I_todo';

const TodoList = ({ mode }: { mode: TodoListMode }) => {
  const { selectedListId } = useAppSelector((state) => state.list);

  const [showNewTodo, setShowNewTodo] = useState(false);
  const [hiddenTodo, setHiddenTodo] = useState<Set<string>>(new Set());

  const [getAllTodoByListId, todoList] = todoApi.useLazyGetAllTodoByListIdQuery();
  const [createTodo, { isLoading: isCreateTodoLoading, isError }] = todoApi.useCreateTodoMutation();
  const [updateTodo, { isLoading: isUpdateTodoLoading, isError: isUpdateTodoError }] =
    todoApi.useUpdateTodoMutation();
  const [deleteTodo, { isLoading: isDeleteTodoLoading, isError: isDeleteTodoError }] =
    todoApi.useDeleteTodoMutation();

  useEffect(() => {
    if (mode === TodoListMode.NORMAL && selectedListId) {
      getAllTodoByListId(selectedListId);
    }
  }, [mode, selectedListId]);

  const handleCreate = async (todo: CreateTodoReqBody) => {
    try {
      const res = await createTodo(todo).unwrap();
      getAllTodoByListId(res?.data.listId);
    } catch (error) {}
  };

  const handleUpdate = async (todo: UpdateTodoReqBody) => {
    updateTodo(todo);
  };

  const handleDelete = async (todoId: ITodo['id']) => {
    try {
      deleteTodo(todoId);
      getAllTodoByListId(selectedListId);
    } catch (error) {}
  };

  const handleToggle = (todoInfo: ITodo) => {
    updateTodo({ todoId: todoInfo.id, status: todoInfo.status });
  };

  return (
    <div className="todo-list flex flex-col h-full">
      <TodoListHeader
        title={todoList?.data?.data.listTitle || ''}
        plusButtonDisabled={showNewTodo}
        onPlusClick={() => setShowNewTodo(true)}
      />
      <div className="flex flex-col grow">
        {todoList?.isError ? (
          <>Oh no, there was an error</>
        ) : todoList?.isLoading ? (
          <>Loading...</>
        ) : todoList?.data?.data?.todo?.length ? (
          todoList?.data?.data?.todo?.map((todo, index) => (
            <TodoItem
              key={index}
              todo={todo}
              className={`${hiddenTodo.has(todo.id) && 'hidden'}`}
              onToggle={handleToggle}
              onBlur={(todoInfo) => {
                console.log(todoInfo.title);
                if (todoInfo.title) {
                  const { id, ...rest } = todoInfo;
                  handleUpdate({ todoId: id, ...rest });
                } else {
                  handleDelete(todoInfo.id);
                  setHiddenTodo((prev) => prev.add(todoInfo.id));
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
              if (todoInfo.title) {
                const { id, ...rest } = todoInfo;
                handleCreate(rest);
              }
              setShowNewTodo(false);
            }}
          />
        ) : (
          todoList?.data?.data?.todo?.length && (
            <Blank text="" onClick={() => setShowNewTodo(true)} />
          )
        )}
      </div>
    </div>
  );
};

export default TodoList;
