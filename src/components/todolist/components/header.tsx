import { useState } from 'react';

import { Button } from 'antd';

import MoreIcon from '@Assets/more';
import PlusIcon from '@Assets/plus';

interface TodoListHeaderProps {
  title: string;
  onPlusClick?: () => void;
  onMoreClick?: () => void;
}

const TodoListHeader = ({
  title = 'list title',
  onPlusClick = () => {},
  onMoreClick = () => {}
}: TodoListHeaderProps) => {
  return (
    <div className="flex justify-between items-center pl-6 pr-5 h-[3.125rem]">
      <div className="text-title-2 text-primary-blue h-[2.625rem]">{title}</div>
      <div>
        <Button
          className="mr-6"
          size="small"
          shape="circle"
          type="text"
          icon={<PlusIcon fill="#0071EB" />}
          onClick={onPlusClick}
        />
        <Button
          size="small"
          shape="circle"
          type="text"
          icon={<MoreIcon fill="#0071EB" />}
          onClick={onMoreClick}
        />
      </div>
    </div>
  );
};

export default TodoListHeader;
