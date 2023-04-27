<script lang="ts">
  import {
    commandList,
    tabId,
    activateListenerOnTab,
    testXpath,
    findTextXpath,
    foundTextXpath,
    findParentXpath,
  } from "../functions/chrome";
  import { status } from "../main";
  import { createXpathUrl } from "../functions/crud";
  import type { Command } from "../types/command";
  $: url = createXpathUrl($commandList);
  function setStatus(n: number) {
    status.set(n);
  }
  function deleteCommandAtIndex(index: number) {
    commandList.update((prev) => {
      return prev.filter((_, i) => {
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
  function updateCommandFileName(index: number, e) {
    var fileName: string = e.target.value.split("\\").slice(-1)[0];
    commandList.update((prev) => {
      prev[index].value = fileName;
      return prev;
    });
  }
  var findText: string = "";
</script>

<div class="recording">
  <button
    on:click={() => {
      activateListenerOnTab($tabId);
    }}>TAB ID {$tabId}</button
  >

  <div>{JSON.stringify($commandList)}</div>
  {#each $commandList as command, index}
    <div
      class="command"
      on:mouseenter={() => {
        testXpath(command);
      }}
    >
      <div>{command.command}</div>

      <textarea
        style="width: 40%;"
        value={command.target}
        on:change={(e) => {
          command.target = e.target["value"];
          updateCommandAtIndex(index, command);
        }}
      />

      <textarea
        style="width: 40%;"
        value={command.value}
        on:change={(e) => {
          command.value = e.target["value"];
          updateCommandAtIndex(index, command);
        }}
      />

      <input
        type="file"
        id="upload"
        style="display: {command.command == 'upload' ? '' : 'none'};"
        on:change={(e) => {
          updateCommandFileName(index, e);
        }}
      />

      <button
        style="background-color: red;"
        title="DELETE"
        on:click={() => {
          deleteCommandAtIndex(index);
        }}
      >
        X
      </button>

      <button
        hidden={command.target == "" || command.target == null}
        style="background-color: aquamarine;"
        title="PARENT XPATH"
        on:click={() => {
          findParentXpath(index, command.target);
        }}
      >
        ^
      </button>

      <button
        hidden={command.parentPath == "" || command.parentPath == null}
        style="background-color: green;"
        title="COPY {command.parentPath}"
        on:click={() => {
          navigator.clipboard.writeText(command.parentPath);
        }}
      >
        //
      </button>
    </div>
  {/each}

  <div class="find-text">
    <textarea
      style="width: 70%;"
      placeholder="Type the inner text of the element and press FIND"
      value={findText}
      on:change={(e) => {
        findText = e.target["value"];
      }}
    />

    <button
      on:click={() => {
        findTextXpath(findText);
      }}>FIND</button
    >

    <div hidden={$foundTextXpath == undefined}>
      {$foundTextXpath}
    </div>
  </div>

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
  .find-text {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 10px;
    padding: 10px;
  }
  .json {
    margin: 10px;
    width: 100%;
  }
</style>
