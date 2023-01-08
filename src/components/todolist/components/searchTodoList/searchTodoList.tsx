import { useState } from 'react';
import { todoApi } from '@Services/todoApi';
import { listApi } from '@Services/listApi';
import TodoListHeader from '@Components/todolist/components/header/header';
import TodoItem from '@Components/todolist/components/todoItem/todoItem';
import { UpdateTodoReqBody, ITodo, SearchTodoResponse } from '@Interfaces/I_todo';
import { useAppSelector } from '@Hooks/useAppRedux';

const SearchTodoList = ({
  result,
}: {
  result: SearchTodoResponse & { isError: boolean; isLoading: boolean };
}) => {
  const { selectedListId } = useAppSelector((state) => state.list);

  const [hiddenTodo, setHiddenTodo] = useState<Set<string>>(new Set());

  const [updateTodo, { isLoading: isUpdateTodoLoading, isError: isUpdateTodoError }] =
    todoApi.useUpdateTodoMutation();
  const [deleteTodo, { isLoading: isDeleteTodoLoading, isError: isDeleteTodoError }] =
    todoApi.useDeleteTodoMutation();
  const [getListById] = listApi.useLazyGetListByIdQuery();

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
    <div data-testid="searchTodoList">
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
          <></>
        )}
      </div>
    </div>
  );
};

export default SearchTodoList;
