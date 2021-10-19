import { ReactNode } from 'react';

export type Type = 'info' | 'warning' | 'success' | 'error';

export interface IOptions {
  type?: Type;
  duration?: number;
}

export interface IToastItem extends IOptions {
  content: ReactNode;
}
