<script context="module">
  export const data = { layout: "layouts/base" };
</script>

<script>
  import Title from "./_includes/Title.svelte";
</script>

<svelte:head>
  <title>Test</title>
</svelte:head>

<Title>Hello world</Title>
<p>lorem ipsum</p>

<style>
  p {
    color: rebeccapurple;
  }
</style>
