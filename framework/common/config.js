const path = require("path");
const fs = require("fs");
const merge = require("deepmerge");

const ALLOWED_FW = ["shopify", "bigcommerce", "shopify_local"];
const FALLBACK_FW = "shopify";

function withFrameworkConfig(defaultConfig = {}) {
  let framework = defaultConfig?.framework?.name;

  if (!framework) {
    throw new Error("API framework is missing, please add a valid provider");
  }

  if (!ALLOWED_FW.includes(framework)) {
    throw new Error(
      `API framerwork: ${framework} cannot be found, please use one of the following ${ALLOWED_FW.join(
        ", "
      )}`
    );
  }

  if (framework === "shopify_local") {
    framework = FALLBACK_FW;
  }

  const frameworkNextConfig = require(path.join(
    "../",
    framework,
    "next.config"
  ));

  const config = merge(defaultConfig, frameworkNextConfig);

  const tsPath = path.join(process.cwd(), "tsconfig.json");
  const tsConfig = require(tsPath);

  tsConfig.compilerOptions.paths["@framerwork"] = [`framework/${framework}`];
  tsConfig.compilerOptions.paths["@framerwork/*"] = [
    `framework/${framework}/*`,
  ];

  fs.writeFileSync(tsPath, JSON.stringify(tsConfig, null, 2));

  return config;
}

module.exports = { withFrameworkConfig };
