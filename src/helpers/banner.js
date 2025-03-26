import chalk from "chalk";
import pkg from "../../package.json" with { type: "json" };
import {LOGO} from "../config/index.js";

export const banner = () => {
    console.log(chalk.gray(`-----------------------------------------------------------------`))
    console.log(`${chalk.bold(`${LOGO} Latte`)} ${chalk.bold.cyanBright(`v${pkg.version}`)}. ${chalk.gray("Copyright (c) 2025 by")} ${chalk.bold.whiteBright("Serhii Pimenov")}.💙💛 Maid in Ukraine!`)
    console.log(`${chalk.gray("Support Latte by PayPal to")} ${chalk.bold.cyan("serhii@pimenov.com.ua")}. ${chalk.gray('Thank you!')}`)
    console.log(chalk.gray(`-----------------------------------------------------------------`))
};