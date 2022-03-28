export const setClass = (...classNames) => {
    return [...classNames].filter(Boolean).join(' ');
  }