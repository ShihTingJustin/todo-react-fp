import React from 'react';

import Toolbar from '@Components/toolbar';
import Sidebar from '@Components/sidebar';
import TodoList from '@Components/todolist'

import './home.scss';

function Home() {
  return (
    <div className="home--root">
      <Toolbar />
      <div className='flex'>
        <div className='w-[335px]'>
          <Sidebar />
        </div>
        <div className='grow'>
          <TodoList />
        </div>
      </div>
    </div>
  );
}

export default Home;
