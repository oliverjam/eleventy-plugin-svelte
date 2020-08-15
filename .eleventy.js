const path = require("path");
const EleventySvelte = require("./EleventySvelte");

function sveltePlugin(config) {
  const eleventySvelte = new EleventySvelte();

  config.addFilter("getSvelteCssForPage", eleventySvelte.getStyles);
  config.addFilter("getSvelteHeadForPage", eleventySvelte.getHead);
  // runs on subsequent builds after initial
  // stops duplicate CSS piling up
  config.on("beforeWatch", () => {
    eleventySvelte.reset();
  });

  config.addTemplateFormats("svelte");
  config.addExtension("svelte", {
    read: false,
    getData: true,
    getInstanceFromInputPath: (inputPath) => {
      return require(path.join(process.cwd(), inputPath));
    },
    compile: eleventySvelte.compile,
  });
}

module.exports = sveltePlugin;
