import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { handleError } from "~/src/utils/error";
import { logger } from "~/src/utils/logger";

vi.mock("../src/utils/logger", () => ({
  logger: {
    error: vi.fn(),
  },
}));

describe("Error Handler", () => {
  const originalExit = process.exit;

  beforeEach(() => {
    vi.clearAllMocks();
    process.exit = vi.fn() as never;
  });

  afterEach(() => {
    vi.restoreAllMocks();
    process.exit = originalExit;
  });

  describe("handleError", () => {
    it("logs the error message and exits the process", () => {
      const errorMessage = "Test error message";
      handleError(new Error(errorMessage));

      expect(logger.error).toHaveBeenCalledWith(errorMessage);
      expect(process.exit).toHaveBeenCalledWith(1);
    });

    it("handles string errors", () => {
      const errorMessage = "String error";
      handleError(errorMessage);

      expect(logger.error).toHaveBeenCalledWith(errorMessage);
      expect(process.exit).toHaveBeenCalledWith(1);
    });

    it("handles number errors", () => {
      const errorNumber = 42;
      handleError(errorNumber);

      expect(logger.error).toHaveBeenCalledWith("42");
      expect(process.exit).toHaveBeenCalledWith(1);
    });

    it("handles object errors", () => {
      const errorObject = { custom: "error" };
      handleError(errorObject);

      expect(logger.error).toHaveBeenCalledWith('{"custom":"error"}');
      expect(process.exit).toHaveBeenCalledWith(1);
    });

    it("handles null errors", () => {
      handleError(null);

      expect(logger.error).toHaveBeenCalledWith("null");
      expect(process.exit).toHaveBeenCalledWith(1);
    });

    it("handles undefined errors", () => {
      handleError(undefined);

      expect(logger.error).toHaveBeenCalledWith("");
      expect(process.exit).toHaveBeenCalledWith(1);
    });

    it("handles errors that cannot be stringified", () => {
      interface CircularReference {
        circularReference: CircularReference;
      }

      const circularReference: CircularReference = { circularReference: {} as CircularReference };

      circularReference.circularReference = circularReference;
      handleError(circularReference);

      expect(logger.error).toHaveBeenCalledWith("[object Object]");
      expect(process.exit).toHaveBeenCalledWith(1);
    });
  });
});
