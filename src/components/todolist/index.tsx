import { useEffect } from 'react';
import { useState } from 'react';
import { todoApi } from '@Services/todoApi';
import TodoListHeader from '@Components/todolist/components/header';
import TodoItem from '@Components/todolist/components/todoItem';
import { useAppSelector } from '@Hooks/useAppRedux';
import { CreateTodoReqBody, UpdateTodoReqBody, TodoStatus, ITodo } from '@Interfaces/I_todo';

const TodoList = () => {
  const { selectedListId } = useAppSelector((state) => state.list);
  const [getTodoByListId, todoList] = todoApi.useLazyGetAllQuery();
  const [createTodo, { isLoading, isError }] = todoApi.useCreateTodoMutation();
  const [updateTodo, { isLoading: isUpdateTodoLoading, isError: isUpdateTodoError }] =
    todoApi.useUpdateTodoMutation();
  const [deleteTodo, { isLoading: isDeleteTodoLoading, isError: isDeleteTodoError }] =
    todoApi.useDeleteTodoMutation();

  useEffect(() => {
    if (selectedListId) {
      getTodoByListId(selectedListId);
    }
  }, [selectedListId]);

  const [showNewTodo, setShowNewTodo] = useState(false);

  const handleCreate = async (todo: CreateTodoReqBody) => {
    try {
      const res = await createTodo(todo).unwrap();
      getTodoByListId(res?.data.listId);
    } catch (error) {}
  };

  const handleUpdate = async (todo: UpdateTodoReqBody) => {
    updateTodo(todo);
  };

  const handleDelete = async (todoId: ITodo['id']) => {
    try {
      deleteTodo(todoId);
      getTodoByListId(selectedListId);
    } catch (error) {}
  };

  const handleToggle = (todoInfo: ITodo) => {
    updateTodo({ todoId: todoInfo.id, status: todoInfo.status });
  };

  return (
    <div className="todo-list flex flex-col h-full">
      <TodoListHeader title={'list title'} plusButtonDisabled={showNewTodo} />
      <div className="flex flex-col grow">
        {todoList?.isError ? (
          <>Oh no, there was an error</>
        ) : todoList?.isLoading ? (
          <>Loading...</>
        ) : todoList?.data ? (
          todoList?.data?.data?.map((todo, index) => (
            <TodoItem
              key={index}
              todo={todo}
              onToggle={handleToggle}
              onBlur={(todoInfo) => {
                console.log(todoInfo.title);
                if (todoInfo.title) {
                  const { id, ...rest } = todoInfo;
                  handleUpdate({ todoId: id, ...rest });
                } else {
                  handleDelete(todoInfo.id);
                  setShowNewTodo(false);
                }
              }}
            />
          ))
        ) : (
          <></>
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
