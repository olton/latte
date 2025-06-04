import {term} from "@olton/terminal";
import pkg from "../../package.json" with { type: "json" };
import { DIVIDER, FLAME, LOGO } from '../config/index.js'

export const banner = () => {
    console.log(term(DIVIDER, {color: 'gray'}))
    console.log(`${term(`${LOGO} Latte`, {style: 'bold'})} ${term(`v${pkg.version}`, {color: 'cyanBright', style: 'bold'})}. ${term("Copyright (c) 2025 by", {color: 'gray'})} ${term("Serhii Pimenov", {color: 'whiteBright', style: 'bold'})}.💙💛 `)
    console.log(`${term(`${FLAME} Support Latte by PayPal to`, {color: 'gray'})} ${term("serhii@pimenov.com.ua", {color: 'cyan', style: 'bold'})}. ${term(`Thank you! ${FLAME}`, {color: 'gray'})}`)
    console.log(term(DIVIDER, {color: 'gray'}))
};