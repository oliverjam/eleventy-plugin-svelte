<script context="module">
  export const data = { layout: "layouts/base" };
</script>

<script>
  import Title from "./_includes/Title.svelte";

  export let site;
</script>

<svelte:head>
  <title>Test</title>
</svelte:head>

<Title>Hello world</Title>
<p>by {site.author}</p>

<style>
  p {
    color: rebeccapurple;
  }
</style>
