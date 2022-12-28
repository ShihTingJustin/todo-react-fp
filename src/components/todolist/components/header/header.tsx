import { useState } from 'react';
import { useAppSelector } from '@Hooks/useAppRedux';
import { TodoListMode } from '@Interfaces/I_todo';

import { Button } from 'antd';

import MoreIcon from '@Assets/more';
import PlusIcon from '@Assets/plus';

import './header.scss';

interface TodoListHeaderProps {
  title: string;
  plusButtonDisabled?: boolean;
  onPlusClick?: () => void;
  onMoreClick?: () => void;
}

const TodoListHeader = ({
  title = 'list title',
  plusButtonDisabled = false,
  onPlusClick = () => {},
  onMoreClick = () => {},
}: TodoListHeaderProps) => {
  const { mode } = useAppSelector((state) => state.todo);

  return (
    <div
      data-testid="todoListHeader"
      className="flex justify-between items-center pl-6 pr-5 h-[3.125rem]"
    >
      <div className="text-title-2 text-primary-blue h-[2.625rem]">{title}</div>
      <div className="right-wrap">
        {mode === TodoListMode.NORMAL && (
          <>
            <Button
              className="mr-6"
              size="small"
              shape="circle"
              type="text"
              disabled={plusButtonDisabled}
              data-disabled={plusButtonDisabled}
              icon={<PlusIcon fill="#0071EB" />}
              onClick={onPlusClick}
            />
            {/* <Button
              size="small"
              shape="circle"
              type="text"
              data-disabled={false}
              icon={<MoreIcon fill="#0071EB" />}
              onClick={onMoreClick}
            /> */}
          </>
        )}
      </div>
    </div>
  );
};

export default TodoListHeader;
