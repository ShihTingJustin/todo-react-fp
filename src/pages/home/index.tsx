import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import { listApi } from '@Services/listApi';
import { todoApi } from '@Services/todoApi';

import Toolbar from '@Components/toolbar';
import Sidebar from '@Components/sidebar';
import TodoList from '@Components/todolist';

import './home.scss';

function Home() {
  return (
    <div className="home--root h-screen flex flex-col">
      <Toolbar />
      <div className="main-view flex grow">
        <div className="w-[335px] bg-bg-gray2">
          <Sidebar />
        </div>
        <div className="grow">
          <TodoList />
        </div>
      </div>
    </div>
  );
}

export default Home;
