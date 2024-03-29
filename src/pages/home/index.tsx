import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { listApi } from '@Services/listApi';
import { todoApi } from '@Services/todoApi';
import { useAppDispatch, useAppSelector } from '@Hooks/useAppRedux';
import { setMode } from '@Slices/todoSlice';
import Toolbar from '@Components/toolbar';
import Sidebar from '@Components/sidebar';
import TodoList from '@Components/todolist';
import SearchResult from '@Components/todolist/components/searchResult/searchResult';
import SearchField from '@Components/sidebar/components/searchField';
import ITodo, { TodoListMode } from '@Interfaces/I_todo';
import './home.scss';

function Home() {
  const dispatch = useAppDispatch();

  const { mode } = useAppSelector((state) => state.todo);
  const { selectedListId } = useAppSelector((state) => state.list);

  const [stateKeyword, setKeyword] = useState('');

  const [getListAndTodo, { data, isError, isLoading }] = todoApi.useLazyGetAllQuery();

  const [todoListData, setTodoListData] = useState<{
    title: string;
    todo: ITodo[];
  }>(data?.data.todo[selectedListId] || { title: '', todo: [] });

  useEffect(() => {
    dispatch(setMode(TodoListMode.NORMAL));
    getListAndTodo();
  }, []);

  const [getListById] = listApi.useLazyGetListByIdQuery();
  const selectDataFromList = listApi.endpoints.getListById.select(selectedListId);
  const listApiRes = useSelector(selectDataFromList);

  useEffect(() => {
    if (selectedListId) {
      if (listApiRes.isUninitialized && data?.data.todo[selectedListId]) {
        setTodoListData(data?.data.todo[selectedListId]);
      } else {
        getListById(selectedListId);
      }
    }
  }, [getListById, listApiRes.isUninitialized, selectedListId, data]);

  useEffect(() => {
    if (listApiRes?.data?.data) {
      const { id, ...rest } = listApiRes?.data?.data;
      if (rest) setTodoListData(rest);
    }
  }, [listApiRes?.data?.data]);

  const handleKeywordChange = async (keyword: string) => {
    dispatch(setMode(keyword ? TodoListMode.SEARCH : TodoListMode.NORMAL));
    if (!keyword.trim()) return;
    setKeyword(keyword);
  };

  return (
    <div className="home--root h-screen flex flex-col">
      <Toolbar />
      <div className="main-view flex grow">
        <div className="w-[335px] bg-bg-gray2">
          <div className="px-3 pt-3">
            <SearchField onChange={handleKeywordChange} />
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
              <SearchResult keyword={stateKeyword} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
