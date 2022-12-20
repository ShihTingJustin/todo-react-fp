import { useState } from 'react';

const SidebarItem = () => {
  return (
    <div
      // onClick bg-bg-gray3
      className="rm-list-menu-item pl-3 h-[3.5rem] flex items-center bg-bg-white1"
      role="listbox"
    >
      <div className="rm-list-menu-item-content flex w-full">
        <div>icon</div>
        <div className="underlined-section ml-4">
          <div className="title-container">
            <div className="title">
              <div className="inline-editable">
                <div className="inline-editable-label text-title-2" role="textbox">
                  Daily 1.01 rule not not-selected
                </div>
              </div>
            </div>
          </div>
          <div className="count"></div>
        </div>
      </div>
    </div>
  );
};

const Sidebar = () => {
  return (
    <div className="scrollable-area px-3 pt-3">
      <div className="todo-list-menu rounded-[12px] overflow-hidden" role="menu">
        {Array.from({ length: 5 }).map((item, index) => (
          <div className={`${index === 0}`}>
            <SidebarItem />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
