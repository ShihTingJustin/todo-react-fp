import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '@Hooks/useAppRedux';
import { Divider, Skeleton } from 'antd';
import { listApi } from '@Services/listApi';
import { setSelectedListId } from '@Slices/listSlice';
import { setMode } from '@Slices/todoSlice';
import ListIcon from '@Assets/list';
import { TodoListMode } from '@Interfaces/I_todo';

import './sidebar.scss';

const SidebarItem = ({ id, title, icon, incompleteTodoAmount }: SidebarItemProps) => {
  const { selectedListId } = useAppSelector((state) => state.list);

  const [count, setCount] = useState(incompleteTodoAmount);

  const selectDataFromList = listApi.endpoints.getListById.select(selectedListId);
  const listApiRes = useSelector(selectDataFromList);

  useEffect(() => {
    if (listApiRes) {
      const incompleteTodoAmount = listApiRes?.data?.data?.incompleteTodoAmount || 0;
      if (
        listApiRes.isSuccess &&
        id === listApiRes.data.data.id &&
        count !== incompleteTodoAmount
      ) {
        setCount(incompleteTodoAmount);
      }
    }
  }, [listApiRes, id, count]);

  return (
    <div className={`todo-list-menu-item pl-3 h-[3.5rem] flex items-center`} role="listbox">
      <div className="todo-list-menu-item-content flex items-center w-full">
        <div className="min-w-[2rem] min-h-[2rem] bg-icon-blue1 rounded-full">
          <ListIcon />
        </div>
        <div className="content-wrap w-full ml-4 flex items-center justify-between">
          <div className="title-container">
            <div className="title">
              <div className="inline-editable">
                <div className={`inline-editable-label text-title-3`} role="textbox">
                  {title}
                </div>
              </div>
            </div>
          </div>
          <div className="count mr-5">{count}</div>
        </div>
      </div>
    </div>
  );
};

type SidebarItemProps = {
  id: string;
  title: string;
  icon?: string;
  incompleteTodoAmount: number;
};

type SidebarProps = {
  isError?: boolean;
  isLoading?: boolean;
  data?: SidebarItemProps[];
};

const Sidebar = ({ isError, isLoading, data }: SidebarProps) => {
  const dispatch = useAppDispatch();

  const { selectedListId } = useAppSelector((state) => state.list);
  const { mode } = useAppSelector((state) => state.todo);

  const [getListById] = listApi.useLazyGetListByIdQuery();

  useEffect(() => {
    if (!selectedListId && data?.[0]?.id && mode === TodoListMode.NORMAL) {
      dispatch(setSelectedListId(data?.[0]?.id));
    }
  }, [selectedListId, data, mode, dispatch]);

  return (
    <div className="scrollable-area px-3 pt-3">
      <div className="todo-list-menu rounded-[12px] overflow-hidden bg-bg-white1" role="menu">
        {isError ? (
          <>Oh no, there was an error</>
        ) : isLoading ? (
          <div className="p-6">
            <Skeleton active />
          </div>
        ) : data?.length ? (
          data?.map((item, index) => (
            <div key={item.id}>
              <div
                onClick={() => {
                  if (mode === TodoListMode.SEARCH) {
                    dispatch(setMode(TodoListMode.NORMAL));
                  }
                  dispatch(setSelectedListId(item.id));
                  getListById(item.id);
                }}
                data-selected={mode === TodoListMode.NORMAL ? selectedListId === item.id : false}
              >
                <SidebarItem {...item} />
              </div>
              {data?.length !== index + 1 && <Divider className="m-0 ml-6" />}
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
