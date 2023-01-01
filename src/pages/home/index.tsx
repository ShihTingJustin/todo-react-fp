import { useEffect, useState } from 'react';

import { todoApi } from '@Services/todoApi';
import { useAppDispatch, useAppSelector } from '@Hooks/useAppRedux';
import { setMode } from '@Slices/todoSlice';
import Toolbar from '@Components/toolbar';
import Sidebar from '@Components/sidebar';
import TodoList from '@Components/todolist';
import { SearchTodoList } from '@Components/todolist';
import SearchField from '@Components/sidebar/components/searchField';
import { TodoListMode, SearchTodoResponse } from '@Interfaces/I_todo';
import './home.scss';
import { Divider } from 'antd';

function Home() {
  const dispatch = useAppDispatch();

  const { mode } = useAppSelector((state) => state.todo);
  const { selectedListId } = useAppSelector((state) => state.list);

  const [stateKeyword, setKeyword] = useState('');
  const [searchResult, setSearchResult] = useState<SearchTodoResponse[]>([]);

  const [getListAndTodo, { data, isError, isLoading }] = todoApi.useLazyGetAllQuery();

  useEffect(() => {
    dispatch(setMode(TodoListMode.NORMAL));
    getListAndTodo();
  }, []);

  const [searchTodo, { isLoading: isSearchTodoLoading, isError: isSearchTodoError }] =
    todoApi.useSearchMutation();

  const handleSearch = async (keyword: string) => {
    dispatch(setMode(keyword ? TodoListMode.SEARCH : TodoListMode.NORMAL));
    if (!keyword.trim()) return;
    setKeyword(keyword);

    const result = await searchTodo({ keyword }).unwrap();
    setSearchResult(result.data);
  };

  return (
    <div className="home--root h-screen flex flex-col">
      <Toolbar />
      <div className="main-view flex grow">
        <div className="w-[335px] bg-bg-gray2">
          <div className="px-3 pt-3">
            <SearchField onChange={handleSearch} />
          </div>
          <Sidebar isError={isError} isLoading={isLoading} data={data?.data?.list} />
        </div>
        <div className="grow">
          {mode === TodoListMode.NORMAL ? (
            <TodoList
              isError={isError}
              isLoading={isLoading}
              data={data?.data.todo[selectedListId]}
            />
          ) : (
            <div className="todo-list flex flex-col h-full">
              <div className="text-title-4 text-primary-gray1 ml-6">
                Results for "{stateKeyword}"
              </div>
              {searchResult.map((item) => (
                <div key={item.id}>
                  <SearchTodoList
                    result={{ ...item, isLoading: isSearchTodoLoading, isError: isSearchTodoError }}
                  />
                  <Divider className="my-2" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
