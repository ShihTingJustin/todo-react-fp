import { useEffect, useState } from 'react';

import { listApi } from '@Services/listApi';
import { todoApi } from '@Services/todoApi';

import Toolbar from '@Components/toolbar';
import Sidebar from '@Components/sidebar';
import TodoList from '@Components/todolist';
import SearchField from '@Components/sidebar/components/searchField';
import { TodoListMode } from '@Interfaces/I_todo';
import './home.scss';

function Home() {
  const [mode, setMode] = useState(TodoListMode.NORMAL);

  useEffect(() => {
    setMode(TodoListMode.NORMAL);
  }, []);

  const handleSearch = (searchText: string) => {
    setMode(searchText ? TodoListMode.SEARCH : TodoListMode.NORMAL);
    console.log(searchText);
  };

  return (
    <div className="home--root h-screen flex flex-col">
      <Toolbar />
      <div className="main-view flex grow">
        <div className="w-[335px] bg-bg-gray2">
          <div className="px-3 pt-3">
            <SearchField onChange={handleSearch} />
          </div>
          <Sidebar />
        </div>
        <div className="grow">
          {mode === TodoListMode.NORMAL ? <TodoList /> : <div>search</div>}
        </div>
      </div>
    </div>
  );
}

export default Home;
