import fs from "fs";
import path from "path";
import { parse } from "yaml";

class Config {
  private config: Record<string, any> = {};
  private configFilePath: string;

  constructor() {
    this.configFilePath = path.resolve(__dirname, "./config.yaml");
  }

  loadConfig(): void {
    try {
      const filePath = path.resolve(this.configFilePath);
      const fileContents = fs.readFileSync(filePath, "utf8");
      this.config = parse(fileContents);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Error reading configuration file: ${error.message}`);
      } else {
        console.error("Error reading configuration file: Unknown error");
      }
      throw new Error("Failed to load config.yaml");
    }
  }

  get(key: string): any {
    if (!this.config.hasOwnProperty(key)) {
      throw new Error(`Key '${key}' not found in configuration.`);
    }
    return this.config[key];
  }
}

export default Config;
