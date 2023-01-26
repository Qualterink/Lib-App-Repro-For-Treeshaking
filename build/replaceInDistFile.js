const fs = require("fs");
const fse = require("fs-extra");
const packageJSON = require("../package.json");
const { dom } = require("@fortawesome/fontawesome-svg-core");
const cleanCSS = require("clean-css");

/**
 *
 * @param src
 * @param dest
 *
 * Code editor (like intelij) can show component declaration after click on component.
 *
 */
function vueComponentsReplace(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectorySrc = exists && stats.isDirectory();
  const isExistDest = fs.existsSync(dest);

  if (isDirectorySrc && isExistDest) {
    try {
      fs.rmSync(dest, { recursive: true });

      fse.copySync(src, dest, {
        overwrite: true,
        filter: (el) => !el.endsWith(".story.vue")
      });

      console.log(
        "\x1b[32m%s\x1b[0m",
        "______SUCCESS_____",
        "\x1b[0m",
        "vueComponentsReplace"
      );
    } catch (e) {
      console.log(
        "\x1b[31m%s\x1b[0m",
        "______ERROR______",
        "\x1b[0m",
        "vueComponentsReplace",
        e
      );
    }
  } else {
    console.log(
      "\x1b[31m%s\x1b[0m",
      "______ERROR______",
      "\x1b[0m",
      "vueComponentsReplace - directory not found"
    );
  }
}

// add font awesome to styles, useful when we use webcomponents
function concatCssWithFontAwesomeCss() {
  const pathDistCssFile = "dist/style.css";

  if (fs.lstatSync(pathDistCssFile).isFile()) {
    const data = fs.readFileSync(pathDistCssFile, "utf8");

    if (data?.toString()) {
      try {
        fs.appendFileSync(pathDistCssFile, dom.css());
        console.log(
          "\x1b[32m%s\x1b[0m",
          "______SUCCESS_____",
          "\x1b[0m",
          "concatCssWithFontAwesomeCss"
        );
      } catch (error) {
        console.log(
          "\x1b[31m%s\x1b[0m",
          "______ERROR______",
          "\x1b[0m",
          "concatCssWithFontAwesomeCss",
          error
        );
      }
    }
  }
}

// minimalizuje i optymalizuje finalny plik css
function dedupeAndMinify() {
  const pathDistCssFile = "dist/style.css";

  if (fs.lstatSync(pathDistCssFile).isFile()) {
    const data = fs.readFileSync(pathDistCssFile, "utf8");
    if (data?.toString()) {
      const output = new cleanCSS({
        level: {
          1: {
            all: true
          },
          2: {
            all: true
          }
        }
      }).minify(data);
      try {
        fs.writeFileSync(pathDistCssFile, output.styles, "utf8");
        console.log(
          "\x1b[32m%s\x1b[0m",
          "______SUCCESS_____",
          "\x1b[0m",
          "CSS DEDUPE AND MINIFY"
        );
      } catch (err) {
        console.log(
          "\x1b[31m%s\x1b[0m",
          "______ERROR______",
          "\x1b[0m",
          "CSS DEDUPE AND MINIFY",
          err
        );
      }
    }
  } else {
    console.log(
      "\x1b[31m%s\x1b[0m",
      "______ERROR______",
      "\x1b[0m",
      "CSS CANT OPEN FILE"
    );
  }
}

console.log(
  "\x1b[36m%s\x1b[0m",
  `example-library-repro-font-awesome-treeshaking v${packageJSON.version}`
);
concatCssWithFontAwesomeCss();
dedupeAndMinify();
vueComponentsReplace(
  "src/lib-components/shared",
  "dist/src/lib-components/shared"
);
