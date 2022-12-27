import { useState } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import useDebounce from '@Hooks/useDebounce';

const SearchField = ({ onChange }: { onChange: (searchText: string) => void }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = () => {
    onChange(inputValue);
  }

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
