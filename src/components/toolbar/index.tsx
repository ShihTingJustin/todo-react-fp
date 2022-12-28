import { useState } from 'react';

const Toolbar = () => {
  return (
    <div
      data-testid="toolbar"
      className="w-full flex justify-between items-center bg-bg-gray1 border-b border-solid border-border-gray1 h-11"
    >
      <div className="pl-8 py-4">
        <div className="text-title-1 text-primary-blue">TodoLists</div>
      </div>
      <div>
        {/* <div>image</div> */}
      </div>
    </div>
  );
};

export default Toolbar;
