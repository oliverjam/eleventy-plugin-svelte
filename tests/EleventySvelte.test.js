const { test } = require("uvu");
const assert = require("uvu/assert");

const EleventySvelte = require("../EleventySvelte");

test("EleventySvelte renders HTML, CSS & head contents", () => {
  const eleventySvelte = new EleventySvelte();
  const renderFn = eleventySvelte.compile(null, "./example/index.svelte");

  const html = renderFn({ page: { url: "/" } });
  assert.snapshot(
    html.trim(),
    `<h1 class="svelte-1qq4xcd">Hello world</h1>
<p class="svelte-i3d9lk">lorem ipsum</p>`,
    "Renders HTML from .svelte file"
  );

  const css = eleventySvelte.getStyles("/");
  assert.snapshot(
    css,
    `p.svelte-i3d9lk{color:rebeccapurple}
h1.svelte-1qq4xcd{color:rebeccapurple}`,
    "Renders scoped CSS from .svelte file <style>"
  );

  const head = eleventySvelte.getHead("/");
  assert.is(
    head,
    `<title>Test</title>`,
    "Renders head contents from <svelte:head>"
  );
});

test("compile() renders string permalinks", () => {
  const eleventySvelte = new EleventySvelte();
  const renderFn = eleventySvelte.compile(
    "/test.html",
    "./example/index.svelte"
  );
  assert.is(
    renderFn(),
    "/test.html",
    "Returns a string if its passed as the first argument"
  );
});

test("compile() renders function permalinks", () => {
  const eleventySvelte = new EleventySvelte();
  const renderFn = eleventySvelte.compile(
    (data) => data.page.url + "/test.html",
    "./example/index.svelte"
  );
  assert.is(
    renderFn({ page: { url: "/testing" } }),
    "/testing/test.html",
    "If first argument is fn calls it with data"
  );
});

test.run();
