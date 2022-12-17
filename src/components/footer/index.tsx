import React, { useState } from 'react';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from '@Constants/index';

const Footer = (props: any) => {
  const ClearButton = () => {
    return (
      <button className="clear-completed" onClick={props.onClearCompleted}>
        Clear completed
      </button>
    );
  };

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{props.count}</strong> {props.count} left
      </span>
      <ul className="filters">
        <li>
          <a href="#/" className={`${'selected' && props.nowShowing === ALL_TODOS}`}>
            All
          </a>
        </li>{' '}
        <li>
          <a href="#/active" className={`${'selected' && props.nowShowing === ACTIVE_TODOS}`}>
            Active
          </a>
        </li>{' '}
        <li>
          <a href="#/completed" className={`${'selected' && props.nowShowing === COMPLETED_TODOS}`}>
            Completed
          </a>
        </li>
      </ul>
      <ClearButton />
    </footer>
  );
};

export default Footer;
