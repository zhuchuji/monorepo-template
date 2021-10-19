import React, { ReactNode } from 'react';
import { render } from 'react-dom';

import Toast from './Toast';
import { IOptions, IToastItem } from './typings';

class ToastFactory {
  private container: HTMLDivElement;

  constructor() {
    this.container = document.createElement('div');
    document.body.appendChild(this.container);
  }

  public createToast({ content, type, duration }: IToastItem) {
    render(
      <Toast key={this.generateId()} type={type} duration={duration}>
        {content}
      </Toast>,
      this.container,
    );
  }

  private generateId() {
    return Math.random();
  }
}

let toastFactory: ToastFactory | undefined;

export default function toast(content: ReactNode, options?: IOptions) {
  if (toastFactory == null) {
    toastFactory = new ToastFactory();
  }

  toastFactory.createToast({
    content,
    ...options,
  });
}
