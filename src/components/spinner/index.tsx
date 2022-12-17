import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const Spinner = ({ fontSize = 60 }: { fontSize?: number }) => (
  <div
    className="w-screen h-screen absolute top-[0%] left-[0%]"
    style={{ backgroundColor: 'rgba(255,255,255,0.5)', zIndex: 49 }}
  >
    <div className="absolute top-[50%] left-[50%] z-50">
      <Spin indicator={<LoadingOutlined style={{ fontSize }} spin />} />
    </div>
  </div>
);

export default Spinner;
