export const consoleColors = {
  BgRed: '\x1b[41m',
  FgGreen: '\x1b[32m',
  FgBlue: '\x1b[34m',
};

export const colorizeLog = (str: string, color = consoleColors.FgBlue) =>
  `${color}${str}\x1b[0m`;

export const throwError = (error: string) => {
  throw new Error(colorizeLog(error, consoleColors.BgRed));
};
