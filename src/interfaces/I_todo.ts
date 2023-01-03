import React from 'react';
import { IList } from '@Interfaces/I_list';

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

export type SearchTodoResponse = IList & {
  todo: ITodo[];
};
export type CreateTodoReqBody = Omit<ITodo, 'id'>;
export type UpdateTodoReqBody = Partial<Omit<ITodo, 'id'>> & Pick<ITodo, 'id'>;

export default ITodo;
