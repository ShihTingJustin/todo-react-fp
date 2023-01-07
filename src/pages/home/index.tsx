import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { listApi } from '@Services/listApi';
import { todoApi } from '@Services/todoApi';
import { useAppDispatch, useAppSelector } from '@Hooks/useAppRedux';
import { setMode } from '@Slices/todoSlice';
import Toolbar from '@Components/toolbar';
import Sidebar from '@Components/sidebar';
import TodoList from '@Components/todolist';
import { SearchTodoList } from '@Components/todolist';
import SearchField from '@Components/sidebar/components/searchField';
import ITodo, { TodoListMode, SearchTodoResponse } from '@Interfaces/I_todo';
import './home.scss';
import { Divider } from 'antd';

function Home() {
  const dispatch = useAppDispatch();

  const { mode } = useAppSelector((state) => state.todo);
  const { selectedListId } = useAppSelector((state) => state.list);

  const [stateKeyword, setKeyword] = useState('');
  const [searchResult, setSearchResult] = useState<SearchTodoResponse[]>([]);

  const [getListAndTodo, { data, isError, isLoading }] = todoApi.useLazyGetAllQuery();

  const [todoListData, setTodoListData] = useState(data?.data.todo[selectedListId]);

  useEffect(() => {
    dispatch(setMode(TodoListMode.NORMAL));
    getListAndTodo();
  }, []);

  useEffect(() => {
    if (selectedListId) setTodoListData(data?.data.todo[selectedListId]);
  }, [selectedListId, data]);

  const selectDataFromList = listApi.endpoints.getListById.select(selectedListId);
  const res = useSelector(selectDataFromList);
  const updateData = res?.data?.data;

  useEffect(() => {
    setTodoListData({
      listTitle: updateData?.title,
      todo: updateData?.todos,
    } as unknown as {
      listTitle: string;
      todo: ITodo[];
    });
  }, [updateData]);

  const [searchTodo, { isLoading: isSearchTodoLoading, isError: isSearchTodoError }] =
    todoApi.useLazySearchQuery();

  const handleSearch = async (keyword: string) => {
    dispatch(setMode(keyword ? TodoListMode.SEARCH : TodoListMode.NORMAL));
    if (!keyword.trim()) return;
    setKeyword(keyword);

    const result = await searchTodo(keyword).unwrap();
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
            <TodoList isError={isError} isLoading={isLoading} data={todoListData} />
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
