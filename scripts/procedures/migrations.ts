import { compat, matches, types as T } from "../deps.ts";

export const migration: T.ExpectedExports.migration = compat.migrations
  .fromMapping({
    "1.18.3": {
      up: compat.migrations.updateConfig(
        (config) => {
          config["email-notifications"] = { enabled: "false" };
          return config;
        },
        true,
        { version: "1.18.3", type: "up" },
      ),
      down: compat.migrations.updateConfig(
        (config) => {
          if (
            matches.shape({
              "email-notifications": matches.unknown,
            }).test(config)
          ) {
            delete config["email-notifications"];
          }
          return config;
        },
        true,
        { version: "1.18.3", type: "down" },
      ),
    },
  }, "1.18.3");
