import { useState } from 'react';

const SidebarItem = () => {
  return (
    <div>
      <div className="rm-list-menu-item bg-bg-white1" role="listbox">
        <div className="rm-list-menu-item-content">
          <div>icon</div>
          <div className="underlined-section">
            <div className="title-container">
              <div className="title">
                <div className="inline-editable">
                  <div className="inline-editable-label" role="textbox">
                    Daily 1.01 rule not not-selected
                  </div>
                </div>
              </div>
            </div>
            <div className="count"></div>
          </div>
        </div>
      </div>
      <div className="todo-list-menu-item is-selected bg-bg-gray3" role="listbox">
        <div className="todo-list-menu-item-content">
          <div>icon</div>
          <div className="underlined-section">
            <div className="title-container">
              <div className="title">
                <div className="inline-editable">
                  <div className="inline-editable-label" role="textbox">
                    Daily 1.01 rule
                  </div>
                </div>
              </div>
            </div>
            <div className="count"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Sidebar = () => {
  return (
    <div className="main-view bg-bg-gray2">
      <div className="scrollable-area">
        <div className="todo-list-menu" role="menu">
          <SidebarItem />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
