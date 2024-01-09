/*
 * Copyright (c) naily.cc 2024.
 *
 * The code contained in this file is the property of naily.cc.
 * This code is provided "AS IS" without warranty of any kind, either expressed or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
 * Unauthorized copying, distribution, or use for commercial purposes is strictly prohibited.
 */

import { format } from "winston";
import { TransformableInfo } from "logform";
import { cyan, cyanBright, green, greenBright, magenta, magentaBright, red, redBright, yellow, yellowBright } from "chalk";

export const consoleFormat = format.printf((info: TransformableInfo) => {
  const { level, message, context } = info;
  const timestamp = new Date().toLocaleString();
  const pid = process.pid;
  const formattedLevel = level.toUpperCase();
  const label = "Naily";
  if (level === "error") {
    return `${red(`[${label}] ${pid}  -`)} ${timestamp}    ${red(`${formattedLevel} ${redBright(context ? `[${context}]` : "")} ${message}`)}`;
  } else if (level === "info") {
    return `${green(`[${label}] ${pid}  -`)} ${timestamp}    ${green(`${formattedLevel} ${greenBright(context ? `[${context}]` : "")} ${message}`)}`;
  } else if (level === "debug") {
    return `${cyan(`[${label}] ${pid}  -`)} ${timestamp}    ${cyan(`${formattedLevel}  ${cyanBright(context ? `[${context}]` : "")} ${message}`)}`;
  } else if (level === "warn") {
    return `${yellow(`[${label}] ${pid}  -`)} ${timestamp}    ${yellow(
      `${formattedLevel}  ${yellowBright(context ? `[${context}]` : "")} ${message}`,
    )}`;
  } else if (level === "verbose") {
    return `${magenta(`[${label}] ${pid}  -`)} ${timestamp}    ${magenta(
      `${formattedLevel}  ${magentaBright(context ? `[${context}]` : "")} ${message}`,
    )}`;
  } else {
    return `${green(`[${label}] ${pid}  -`)} ${timestamp}    ${green(`${formattedLevel}  ${greenBright(context ? `[${context}]` : "")} ${message}`)}`;
  }
});
