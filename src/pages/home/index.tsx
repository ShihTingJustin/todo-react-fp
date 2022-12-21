import React from 'react';

import Toolbar from '@Components/toolbar';
import Sidebar from '@Components/sidebar';
import TodoList from '@Components/todolist';

import './home.scss';

const mockSidebarItem = [
  {
    id: '0',
    title: 'sidebar title 0',
    icon: '321'
  },
  {
    id: '1',
    title: 'sidebar title 1',
    icon: '321'
  },
  {
    id: '2',
    title: 'sidebar title 2',
    icon: '321'
  }
];

function Home() {
  return (
    <div className="home--root ">
      <Toolbar />
      <div className="main-view flex">
        <div className="w-[335px] bg-bg-gray2">
          <Sidebar sidebarItem={mockSidebarItem} />
        </div>
        <div className="grow">
          <TodoList />
        </div>
      </div>
    </div>
  );
}

export default Home;
