<script lang="ts">
  import {
    commandList,
    testClickChan,
    currentCommand,
  } from "../functions/chrome";
  import { createXpathUrl } from "../functions/crud";
  $: url = createXpathUrl($commandList);
  function testXpath(xpath: string) {
    //@ts-ignore
    $testClickChan.postMessage(xpath);
  }
</script>

<div class="recording">
  <div>CURRENT COMMAND {JSON.stringify($currentCommand)}</div>
  {#each $commandList as command, index}
    <div class="xpath">
      <button
        on:click={() => {
          testXpath(command.target);
        }}
      >
        TEST
      </button>
      <div>{command.command} : {command.target}</div>
    </div>
  {/each}

  <a href={url} download="asrt.json">
    <button> DOWNLOAD </button>
  </a>
</div>

<style>
  .recording {
    display: flex;
    flex-direction: column;
  }
  .xpath {
    display: flex;
    flex-direction: row;
  }
</style>
