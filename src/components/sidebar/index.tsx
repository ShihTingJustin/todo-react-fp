import { useState } from 'react';

import { Divider } from 'antd';

import './sidebar.scss';

const SidebarItem = ({ title, icon }: SidebarItemProps) => {
  return (
    <div className={`todo-list-menu-item pl-3 h-[3.5rem] flex items-center`} role="listbox">
      <div className="todo-list-menu-item-content flex items-center w-full">
        <div>icon</div>
        <div className="content-wrap w-full ml-4">
          <div className="title-container">
            <div className="title">
              <div className="inline-editable">
                <div className={`inline-editable-label text-title-3`} role="textbox">
                  {title}
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

type SidebarItemProps = {
  id: string;
  title: string;
  icon: string;
};

const Sidebar = ({ sidebarItem }: { sidebarItem: Array<SidebarItemProps> }) => {
  const [selectedId, setSelectedId] = useState(sidebarItem[0].id);

  return (
    <div className="scrollable-area px-3 pt-3">
      <div className="todo-list-menu rounded-[12px] overflow-hidden bg-bg-white1" role="menu">
        {sidebarItem.map((item, index) => (
          <>
            <div onClick={() => setSelectedId(item.id)} data-selected={selectedId === item.id}>
              <SidebarItem key={item.id} {...item} />
            </div>
            {sidebarItem.length !== index + 1 && <Divider className="m-0 ml-6" />}
          </>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
