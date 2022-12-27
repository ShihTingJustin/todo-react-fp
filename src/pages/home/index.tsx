import { useEffect, useState } from 'react';

import { listApi } from '@Services/listApi';
import { todoApi } from '@Services/todoApi';
import { useAppDispatch } from '@Hooks/useAppRedux';
import { setSelectedListId } from '@Slices/listSlice';
import Toolbar from '@Components/toolbar';
import Sidebar from '@Components/sidebar';
import TodoList from '@Components/todolist';
import SearchTodoList from '@Components/todolist/searchTodoList';
import SearchField from '@Components/sidebar/components/searchField';
import { TodoListMode, SearchTodoResponse } from '@Interfaces/I_todo';
import './home.scss';
import { Divider } from 'antd';

function Home() {
  const dispatch = useAppDispatch();

  const [mode, setMode] = useState(TodoListMode.NORMAL);
  const [searchResult, setSearchResult] = useState<SearchTodoResponse[]>([]);

  useEffect(() => {
    setMode(TodoListMode.NORMAL);
  }, []);

  const [searchTodo, { isLoading: isSearchTodoLoading, isError: isSearchTodoError }] =
    todoApi.useSearchMutation();

  const handleSearch = async (keyword: string) => {
    setMode(keyword ? TodoListMode.SEARCH : TodoListMode.NORMAL);
    if (!keyword.trim()) return;

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
          <Sidebar mode={mode} />
        </div>
        <div className="grow">
          {mode === TodoListMode.NORMAL ? (
            <TodoList mode={mode} />
          ) : (
            <div className="todo-list flex flex-col h-full">
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
