import { logger } from "../src/utils/logger";
import chalk from "chalk";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mockConsole = {
  error: vi.fn(),
  warn: vi.fn(),
  info: vi.fn(),
  log: vi.fn(),
};

vi.mock("chalk", () => ({
  default: {
    red: vi.fn((str) => `RED:${str}`),
    yellow: vi.fn((str) => `YELLOW:${str}`),
    cyan: vi.fn((str) => `CYAN:${str}`),
    green: vi.fn((str) => `GREEN:${str}`),
  },
}));

describe("logger", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(mockConsole.error);
    vi.spyOn(console, "warn").mockImplementation(mockConsole.warn);
    vi.spyOn(console, "info").mockImplementation(mockConsole.info);
    vi.spyOn(console, "log").mockImplementation(mockConsole.log);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("logs errors in red", () => {
    logger.error("Test error");
    expect(mockConsole.error).toHaveBeenCalledWith("RED:Test error");
    expect(chalk.red).toHaveBeenCalledWith("Test error");
  });

  it("logs warnings in yellow", () => {
    logger.warn("Test warning");
    expect(mockConsole.warn).toHaveBeenCalledWith("YELLOW:Test warning");
    expect(chalk.yellow).toHaveBeenCalledWith("Test warning");
  });

  it("logs info in cyan", () => {
    logger.info("Test info");
    expect(mockConsole.info).toHaveBeenCalledWith("CYAN:Test info");
    expect(chalk.cyan).toHaveBeenCalledWith("Test info");
  });

  it("logs success in green", () => {
    logger.success("Test success");
    expect(mockConsole.log).toHaveBeenCalledWith("GREEN:Test success");
    expect(chalk.green).toHaveBeenCalledWith("Test success");
  });

  it("handles multiple arguments", () => {
    logger.error("Error:", "Multiple", "Args");
    expect(mockConsole.error).toHaveBeenCalledWith("RED:Error:", "RED:Multiple", "RED:Args");
  });

  it("logs a blank line for break", () => {
    logger.break();
    expect(mockConsole.log).toHaveBeenCalledWith("");
  });
});
