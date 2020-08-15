const path = require("path");
require("svelte/register");

// assets stored in a Map with one entry per page URL
// each entry is a Set so we don't store duplicates
// e.g. Map {
//   "/" -> Set ["ul { display: flex; }"],
//   "/blog" -> Set ["ul { display: flex; }", "h2.svelte-123 { color: red; }"],
// }
// We need to persist styles in a Set otherwise the final default.svelte layout breaks styles
// Since it has no knowledge of any Svelte children it overrides past CSS for that URL with ""
// Need to append rather than replace
class AssetManager {
  constructor() {
    this.assets = new Map();
  }
  set(pageUrl, string) {
    if (this.assets.has(pageUrl)) {
      const existingAsset = this.assets.get(pageUrl);
      existingAsset.add(string);
    } else {
      const newAsset = new Set([string]);
      this.assets.set(pageUrl, newAsset);
    }
  }
  get(pageUrl) {
    let output = "";
    const pageAssets = this.assets.get(pageUrl);
    for (let asset of pageAssets) {
      output += asset;
    }
    return output;
  }
  reset() {
    this.assets = new Map();
  }
}

class EleventySvelte {
  constructor() {
    this.styleManager = new AssetManager();
    this.headManager = new AssetManager();
    this.getStyles = this.getStyles.bind(this);
    this.getHead = this.getHead.bind(this);
    this.compile = this.compile.bind(this);
  }
  getStyles(url) {
    return this.styleManager.get(url);
  }
  setStyles(url, css) {
    this.styleManager.set(url, css);
  }
  getHead(url) {
    return this.headManager.get(url);
  }
  setHead(url, head) {
    this.headManager.set(url, head);
  }
  compile(permalink, inputPath) {
    return (data) => {
      if (permalink) {
        // since `read: false` is set 11ty doesn't read file contents
        // so if the first argument has a value, it's a permalink
        return typeof permalink === "function" ? permalink(data) : permalink;
      }
      const Component = require(path.join(process.cwd(), inputPath)).default;
      const { html, css, head } = Component.render({
        data,
      });
      this.setStyles(data.page.url, css.code);
      this.setHead(data.page.url, head);
      return html;
    };
  }
  reset() {
    this.styleManager.reset();
    this.headManager.reset();
  }
}

module.exports = EleventySvelte;
