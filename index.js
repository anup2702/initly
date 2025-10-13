#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import ora from "ora";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(
  chalk.cyanBright.bold(`
╔══════════════════════════════════╗
║           ${chalk.yellow("INITLY")} 🚀              ║
║    Your Infra Setup Companion    ║
╚══════════════════════════════════╝
`)
);

const stackTemplates = {
  MERN: "mern",
  NextJS: "nextjs",
  FastAPI: "fastapi",
  "Express + Typescript": "express-ts",
  "Express + PostgreSQL": "express-pg",
  Django: "django",
};

const main = async () => {
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "stack",
      message: chalk.cyan.bold("🚀 Choose your tech stack:"),
      choices: Object.keys(stackTemplates),
    },
    {
      type: "input",
      name: "folderName",
      message: chalk.magenta.bold("📁 Enter a name for your output folder:"),
      default: (answers) =>
        `initly-${stackTemplates[answers.stack].toLowerCase().replace(/\s+/g, "-")}`,
    },
    {
      type: "confirm",
      name: "docker",
      message: chalk.blue.bold("🐳 Add Docker support?"),
      default: false,
    },
  ]);

  const spinner = ora(chalk.yellow("Generating your project setup...")).start();

  // Create project folder
  const projectPath = path.join(process.cwd(), answers.folderName);
  if (!fs.existsSync(projectPath)) fs.mkdirSync(projectPath);

  spinner.text = chalk.yellow("📦 Copying template files...");
  await new Promise((res) => setTimeout(res, 500));

  // Dynamically copy the selected template
  const templateKey = answers.stack;
  const templateFolder = stackTemplates[templateKey];
  if (templateFolder) {
    const srcDir = path.join(__dirname, "templates", templateFolder);
    const destDir = projectPath;
    try {
      fs.cpSync(srcDir, destDir, { recursive: true });
      console.log(
        chalk.yellow(
          `\n  📦 ${templateKey} template generated in /${answers.folderName}`
        )
      );
    } catch (err) {
      console.error(
        chalk.red(`❌ Failed to copy ${templateKey} template:`),
        err
      );
    }
  } else {
    console.error(chalk.red("❌ Unknown stack selected."));
  }

  spinner.text = chalk.yellow("⚙️ Configuring project settings...");
  await new Promise((res) => setTimeout(res, 300));

  setTimeout(() => {
    spinner.succeed(
      chalk.greenBright.bold(
        ` Setup complete! Check the '${answers.folderName}' folder.\n`
      )
    );
  }, 500);
};

main();
