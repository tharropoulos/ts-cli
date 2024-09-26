import chalk from "chalk";

const logger = {
  error(...args: unknown[]) {
    console.error(...args.map((arg) => chalk.red(String(arg))));
  },
  warn(...args: unknown[]) {
    console.warn(...args.map((arg) => chalk.yellow(String(arg))));
  },
  info(...args: unknown[]) {
    console.info(...args.map((arg) => chalk.cyan(String(arg))));
  },
  success(...args: unknown[]) {
    console.log(...args.map((arg) => chalk.green(String(arg))));
  },
  break() {
    console.log("");
  },
};

export { logger };
