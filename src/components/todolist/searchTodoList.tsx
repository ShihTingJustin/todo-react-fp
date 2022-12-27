import { useState } from 'react';
import { todoApi } from '@Services/todoApi';
import TodoListHeader from '@Components/todolist/components/header';
import TodoItem from '@Components/todolist/components/todoItem';
import { UpdateTodoReqBody, TodoStatus, ITodo, SearchTodoResponse } from '@Interfaces/I_todo';

const SearchTodoList = ({
  result,
}: {
  result: SearchTodoResponse & { isError: boolean; isLoading: boolean };
}) => {
  const [hiddenTodo, setHiddenTodo] = useState<Set<string>>(new Set());

  const [updateTodo, { isLoading: isUpdateTodoLoading, isError: isUpdateTodoError }] =
    todoApi.useUpdateTodoMutation();
  const [deleteTodo, { isLoading: isDeleteTodoLoading, isError: isDeleteTodoError }] =
    todoApi.useDeleteTodoMutation();

  const handleUpdate = async (todo: UpdateTodoReqBody) => {
    updateTodo(todo);
  };

  const handleDelete = async (todoId: ITodo['id']) => {
    try {
      deleteTodo(todoId);
    } catch (error) {}
  };

  const handleToggle = (todoInfo: ITodo) => {
    updateTodo({ todoId: todoInfo.id, status: todoInfo.status });
  };

  return (
    <div>
      <TodoListHeader title={result.title} />
      <div className="flex flex-col grow">
        {result?.isError ? (
          <>Oh no, there was an error</>
        ) : result?.isLoading ? (
          <>Loading...</>
        ) : result?.todo?.length ? (
          result?.todo?.map((todo, index) => (
            <TodoItem
              key={todo.id}
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
          <></>
        )}
      </div>
    </div>
  );
};

export default SearchTodoList;
