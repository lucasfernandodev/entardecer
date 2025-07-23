export const cn = (...args: string[]): string => {
  const classes: string[] = [];

  for (const arg of args) {
    if (typeof arg === 'string') {
      classes.push(arg)
    }
  }

  return classes.join(' ').trim();
}