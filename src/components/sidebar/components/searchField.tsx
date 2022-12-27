import { useEffect, useState } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import useDebounce from '@Hooks/useDebounce';
import { useAppSelector } from '@Hooks/useAppRedux';
import { TodoListMode } from '@Interfaces/I_todo';

const SearchField = ({ onChange }: { onChange: (searchText: string) => void }) => {
  const { mode } = useAppSelector((state) => state.todo);

  const [inputValue, setInputValue] = useState('');

  const handleChange = () => {
    onChange(inputValue);
  };

  useEffect(() => {
    if (mode === TodoListMode.NORMAL) {
      setInputValue('');
    }
  }, [mode]);

  useDebounce(handleChange, 250, [inputValue]);

  return (
    <div>
      <div>
        <Input
          value={inputValue}
          className="rounded-[12px]"
          prefix={<SearchOutlined />}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchField;
