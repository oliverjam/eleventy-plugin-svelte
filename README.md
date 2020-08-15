# Eleventy Plugin Svelte

Use Svelte to write Eleventy templates. Get all the benefits of Svelte's great developer-experience, including a nice templating language and same-file scoped CSS, but for your static websites.

⚠️ **Very much a work in progress** ⚠️

## Installation

```sh
npm install @oliverjam/eleventy-plugin-svelte
```

- Requires Eleventy `0.11.0` or newer
- Requires `ELEVENTY_EXPERIMENTAL=true` to be set before you run the `eleventy` build (so we can use [Custom File Extension Handlers](https://github.com/11ty/eleventy/issues/117))

## Usage

See the `example/` directory for a full code sample.

First add install this plugin, then import it and add it to your config in `.eleventy.js`.

```js
const pluginSvelte = require("@oliverjam/eleventy-plugin-svelte");
module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(pluginSvelte);
};
```

Write your page templates as Svelte components. Whatever HTML the component renders will be used as the contents of the template.

Set Eleventy data (e.g. layouts) using [Svelte's `<script context="module">`](https://github.com/11ty/eleventy/issues/117).

```svelte
<!-- index.svelte -->
<script context="module">
  export const data = { layout: "layouts/base.njk" };
</script>

<h1>Hello world</h1>
```

This plugin will extract any CSS from the component's `<style>` tags and any head contents from its `<svelte:head>` tags. These are made available for you to use in layouts via Eleventy filters named: `getSvelteCssForPage` and `getSvelteHeadForPage`. For example:

```njk
<!-- _includes/layouts/base.njk -->
<!doctype html>
<html>
  <head>
    <style>
    {{page.url | getSvelteCssForPage}}
    </style>
    {{page.url | getSvelteHeadForPage | safe}}
  </head>
  <body>
    {{content | safe}}
  </body>
</html>
```

### Svelte data cascade

Your Svelte components can access all Eleventy data via props. Export the keys you want to access in a script tag.

```svelte
<!-- index.svelte -->
<script>
  export collections;
</script>

<ul>
  {#each collections.blog as post}
    <li>{post.data.title}</li>
  {/each}
</ul>
```

## Client-side components

Currently this plugin does not produce any client-side JS. Your Svelte components are rendered to static HTML & CSS only. Optional client-side hydration will (hopefully) be added in a future version when I can figure out Rollup.
