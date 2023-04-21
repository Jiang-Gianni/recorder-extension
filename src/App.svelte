<script lang="ts">
  import { status } from "./main";
  import Recording from "./pages/Recording.svelte";
  import Tabs from "./pages/Tabs.svelte";
</script>

{#if $status == 1}
  <Tabs />
{:else if $status == 2}
  <Recording />
{:else}
  <!-- else content here -->
{/if}
