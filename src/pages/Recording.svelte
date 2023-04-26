<script lang="ts">
  import {
    commandList,
    testClickChan,
    currentCommand,
    tabId,
    activateListenerOnTab,
  } from "../functions/chrome";
  import { status } from "../main";
  import { createXpathUrl } from "../functions/crud";
  import type { Command } from "../types/command";
  $: url = createXpathUrl($commandList);
  function testXpath(cmd: Command) {
    if (cmd.target == "" || cmd.target == null || cmd.target == undefined) {
      return;
    }
    //@ts-ignore
    $testClickChan.postMessage(cmd.target.trim());
  }
  function setStatus(n: number) {
    status.set(n);
  }
  function deleteCommandAtIndex(index: number) {
    commandList.update((prev) => {
      return prev.filter((cmd, i) => {
        return i != index;
      });
    });
  }
  function updateCommandAtIndex(index: number, cmd: Command) {
    commandList.update((prev) => {
      prev[index] = cmd;
      return prev;
    });
  }
</script>

<div>{JSON.stringify($commandList)}</div>

<div class="recording">
  <button
    on:click={() => {
      activateListenerOnTab($tabId);
    }}>TAB ID {$tabId}</button
  >

  <!-- <div
    on:mouseenter={() => {
      testXpath($currentCommand);
    }}
  >
    CURRENT COMMAND {JSON.stringify($currentCommand)}
  </div> -->
  {#each $commandList as command, index}
    <div
      class="command"
      on:mouseenter={() => {
        testXpath(command);
      }}
    >
      <textarea
        class="json"
        value={JSON.stringify(command)}
        on:change={(e) => {
          updateCommandAtIndex(index, JSON.parse(e.target["value"]));
        }}
      />
      <button
        style="background-color: red;"
        on:click={() => {
          deleteCommandAtIndex(index);
        }}
      >
        DELETE
      </button>
    </div>
  {/each}

  <a href={url} download="asrt.json">
    <button> DOWNLOAD </button>
  </a>
  <button
    on:click={() => {
      setStatus(1);
    }}>BACK TO MAIN MENU</button
  >
</div>

<style>
  .recording {
    display: flex;
    flex-direction: column;
  }
  .command {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 10px;
    padding: 10px;
  }
  .json {
    margin: 10px;
    width: 100%;
  }
</style>
