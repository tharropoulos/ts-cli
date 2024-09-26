import { logger } from "~/src/utils/logger";

type ErrorWithMessage = {
  message: string;
};

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message === "string"
  );
}

function toErrorWithMessage(couldBeError: unknown): ErrorWithMessage {
  if (isErrorWithMessage(couldBeError)) return couldBeError;

  try {
    if (typeof couldBeError === "string") {
      return new Error(couldBeError);
    }
    return new Error(JSON.stringify(couldBeError));
  } catch {
    return new Error(String(couldBeError));
  }
}

function getErrorMessage(error: unknown) {
  return toErrorWithMessage(error).message;
}

function handleError(error: unknown) {
  logger.error(getErrorMessage(error));
  process.exit(1);
}

export { handleError };
