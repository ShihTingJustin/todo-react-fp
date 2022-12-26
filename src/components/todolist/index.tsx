import { useEffect } from 'react';
import { useState } from 'react';
import { todoApi } from '@Services/todoApi';
import TodoListHeader from '@Components/todolist/components/header';
import TodoItem from '@Components/todolist/components/todoItem';
import { useAppSelector } from '@Hooks/useAppRedux';
import { CreateTodoReqBody, UpdateTodoReqBody, TodoStatus, ITodo } from '@Interfaces/I_todo';

const TodoList = () => {
  const { selectedListId } = useAppSelector((state) => state.list);
  const [trigger, result] = todoApi.useLazyGetAllQuery();
  const [createTodo, { isLoading, isError }] = todoApi.useCreateTodoMutation();
  const [updateTodo, { isLoading: isUpdateTodoLoading, isError: isUpdateTodoError }] =
    todoApi.useUpdateTodoMutation();
  const [deleteTodo, { isLoading: isDeleteTodoLoading, isError: isDeleteTodoError }] =
    todoApi.useDeleteTodoMutation();

  useEffect(() => {
    if (selectedListId) {
      trigger(selectedListId);
    }
  }, [selectedListId]);

  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);

  const [showNewTodo, setShowNewTodo] = useState(false);

  const handleCreate = async (todo: CreateTodoReqBody) => {
    try {
      const res = await createTodo(todo).unwrap();
      trigger(res?.data.listId);
    } catch (error) {}
  };

  const handleUpdate = async (todo: UpdateTodoReqBody) => {
    updateTodo(todo);
  };

  const handleDelete = async (todoId: ITodo['id']) => {
    try {
      deleteTodo(todoId);
      trigger(selectedListId);
    } catch (error) {}
  };

  const edit = (todoId: ITodo['id'] | null) => {
    setEditingTodoId(todoId);
  };

  return (
    <div className="todo-list flex flex-col h-full">
      <TodoListHeader title={'list title'} plusButtonDisabled={showNewTodo} />
      <div className="flex flex-col grow">
        {result?.isError ? (
          <>Oh no, there was an error</>
        ) : result?.isLoading ? (
          <>Loading...</>
        ) : result?.data ? (
          result?.data?.data?.map((todo, index) => (
            <TodoItem
              key={index}
              todo={todo}
              onEdit={edit}
              onBlur={(todoInfo) => {
                if (todoInfo.title) {
                  const { id, ...rest } = todoInfo;
                  handleUpdate({ todoId: id, ...rest });
                } else {
                  handleDelete(todoInfo.id);
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
              } else {
                setShowNewTodo(false);
              }
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
