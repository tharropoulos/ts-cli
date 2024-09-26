import { getPackageInfo } from "../src/utils/package-info";
import fs from "fs-extra";
import path from "path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("fs-extra");
vi.mock("path");

describe("getPackageInfo", () => {
  const mockPackageJson = {
    name: "test-package",
    version: "1.0.0",
    dependencies: {
      "fs-extra": "^10.0.0",
    },
  };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should read and return package.json content", () => {
    vi.mocked(path.join).mockReturnValue("/mock/path/package.json");
    vi.mocked(fs.readJSONSync).mockReturnValue(mockPackageJson);

    const result = getPackageInfo();

    expect(path.join).toHaveBeenCalledWith("package.json");
    expect(fs.readJSONSync).toHaveBeenCalledWith("/mock/path/package.json");
    expect(result).toEqual(mockPackageJson);
  });

  it("should throw an error if package.json is not found", () => {
    vi.mocked(path.join).mockReturnValue("/mock/path/package.json");
    vi.mocked(fs.readJSONSync).mockImplementation(() => {
      throw new Error("File not found");
    });

    expect(() => getPackageInfo()).toThrow("File not found");
  });
});
