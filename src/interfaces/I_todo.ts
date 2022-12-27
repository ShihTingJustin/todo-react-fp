import React from 'react';

export enum TodoListMode {
  NORMAL = 'normal',
  SEARCH = 'search',
}

export enum TodoPriority {
  LOW = 'low',
  MED = 'medium',
  HIGH = 'high',
}

export enum TodoStatus {
  FINISH = 'finished',
  UNFINISH = 'unfinished',
}

export type ITodo = {
  id: string;
  listId: string;
  title: string;
  status: TodoStatus;
  priority?: TodoPriority;
};

export type CreateTodoReqBody = Omit<ITodo, 'id'>;
export type UpdateTodoReqBody = Partial<Omit<ITodo, 'id'>> & { todoId: string };

export default ITodo;
