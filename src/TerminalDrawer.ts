import * as readline from "readline";
import chalk from "chalk";

class TerminalDrawer {
  private rl: readline.Interface;

  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  clearScreen(): void {
    console.clear();
  }

  printTitle(title: string): void {
    console.log(chalk.blueBright(title));
  }

  printSubTitle(subTitle: string): void {
    console.log(chalk.underline(subTitle));
  }

  printMessage(message: string): void {
    console.log(chalk.green(message));
  }

  printError(error: string): void {
    console.log(chalk.red(error));
  }

  askQuestion(question: string, callback: (answer: string) => void): void {
    this.rl.question(chalk.cyan(question + ": "), (answer) => {
      callback(answer);
    });
  }

  confirmAction(
    question: string,
    callback: (isConfirmed: boolean) => void
  ): void {
    this.rl.question(chalk.yellow(question + " (y/n): "), (answer) => {
      callback(answer.toLowerCase() === "y");
    });
  }

  close(): void {
    this.rl.close();
  }
}

export default TerminalDrawer;
