import { Command } from "commander";

const program = new Command();

program.option(
  "--mode <mode>",
  "Switch between production, test and development databases",
  "prod"
);

program.parse();

export default program;
