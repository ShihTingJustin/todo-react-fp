import { useEffect, useState } from 'react';
import { todoApi } from '@Services/todoApi';
import { listApi } from '@Services/listApi';
import TodoListHeader from '@Components/todolist/components/header/header';
import TodoItem from '@Components/todolist/components/todoItem/todoItem';
import { UpdateTodoReqBody, ITodo, SearchTodoResponse } from '@Interfaces/I_todo';
import { useAppSelector } from '@Hooks/useAppRedux';
import { Skeleton, Divider } from 'antd';

const SearchTodoList = ({ result }: { result: SearchTodoResponse }) => {
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
    <div>
      <TodoListHeader title={result.title} />
      <div className="flex flex-col grow">
        {result.todo?.map((todo, index) => (
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
        ))}
      </div>
    </div>
  );
};

const SearchResult = ({ keyword }: { keyword: string }) => {
  const [searchResultData, setSearchResultData] = useState<SearchTodoResponse[]>([]);

  const [searchTodo, { isError, isFetching }] = todoApi.useLazySearchQuery();

  const handleSearch = async (keyword: string) => {
    if (keyword.trim()) {
      const result = await searchTodo(keyword).unwrap();
      setSearchResultData(result.data);
    }
  };

  useEffect(() => {
    handleSearch(keyword);
  }, [keyword]);

  return (
    <div data-testid="searchResult">
      {isError ? (
        <></>
      ) : isFetching ? (
        <div className="flex justify-start w-[80%] ml-4 mt-4">
          <Skeleton active />
        </div>
      ) : (
        searchResultData.map((item) => (
          <div key={item.id}>
            <SearchTodoList result={{ ...item }} />
            <Divider className="my-2" />
          </div>
        ))
      )}
    </div>
  );
};

export default SearchResult;
