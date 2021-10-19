// 单行溢出显示省略号
export function ellipsis() {
  return `
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  `;
}

// 多行溢出显示省略号
export function ellipsisLine(line: number) {
  return `
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: ${line};
  `;
}
