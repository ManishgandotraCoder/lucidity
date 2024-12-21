import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["./jest.setup.ts"], // Optional: For setup files
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Optional: For CSS module mocking
  },
};

export default config;
