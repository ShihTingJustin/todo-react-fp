import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@Hooks/useAppRedux';
import { Divider } from 'antd';
import { listApi } from '@Services/listApi';
import { setSelectedListId } from '@Slices/listSlice';
import ListIcon from '@Assets/list';
import { RootState } from '@Redux/store';

import './sidebar.scss';

const SidebarItem = ({ title, icon }: SidebarItemProps) => {
  return (
    <div className={`todo-list-menu-item pl-3 h-[3.5rem] flex items-center`} role="listbox">
      <div className="todo-list-menu-item-content flex items-center w-full">
        <div className="min-w-[2rem] min-h-[2rem] bg-icon-blue1 rounded-full">
          <ListIcon />
        </div>
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
  icon?: string;
};

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const { selectedListId } = useAppSelector((state: RootState) => state.list);

  const { data } = listApi.useGetAllQuery();

  useEffect(() => {
    if (data?.data[0]?.id) {
      dispatch(setSelectedListId(data?.data[0]?.id));
    }
  }, [data]);

  return (
    <div className="scrollable-area px-3 pt-3">
      <div className="todo-list-menu rounded-[12px] overflow-hidden bg-bg-white1" role="menu">
        {data?.data?.map((item, index) => (
          <>
            <div
              onClick={() => dispatch(setSelectedListId(item.id))}
              data-selected={selectedListId === item.id}
            >
              <SidebarItem key={item.id} {...item} />
            </div>
            {data?.data?.length !== index + 1 && <Divider className="m-0 ml-6" />}
          </>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
