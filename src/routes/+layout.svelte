<script lang="ts">
  import Footer from "$lib/components/footer/Footer.svelte";
  import Header from "$lib/components/Header.svelte";

  import "../app.css";
  let { children } = $props();
</script>

<Header />
{@render children()}
<Footer />
