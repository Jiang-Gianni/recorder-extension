<script lang="ts">
  import {
    commandList,
    tabId,
    activateListenerOnTab,
    testXpath,
    findTextXpath,
    foundTextXpath,
    clearLog,
  } from "../functions/chrome";
  import { status } from "../main";
  import { createXpathUrl, generateCmdJson } from "../functions/crud";
  import { Command } from "../types/command";
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
  function insertNewCommand(newCmd: Command) {
    commandList.update((prev) => [...prev, newCmd]);
  }
  var actionList = ["click", "type", "key", "open"];
  var findText: string = "";
  var findPath: string = "";
  var newCmd: Command = new Command("", "", "");
</script>

<div class="recording">
  <button
    on:click={() => {
      activateListenerOnTab($tabId);
    }}>TAB ID {$tabId}</button
  >

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
        style="background-color: green;"
        title="COPY JSON LIST"
        on:click={() => {
          navigator.clipboard.writeText(generateCmdJson([command]));
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

    <div
      hidden={$foundTextXpath == undefined}
      on:mouseenter={() => {
        testXpath({ target: $foundTextXpath });
      }}
    >
      {$foundTextXpath}
    </div>
  </div>

  <div class="find-text">
    <textarea
      style="width: 70%;"
      placeholder="Type the xpath and mouse over it to test the element presence"
      value={findPath}
      on:mouseenter={() => {
        testXpath({ target: findPath });
      }}
      on:change={(e) => {
        findPath = e.target["value"];
      }}
    />
  </div>

  <!-- NEW COMMAND  -->
  <div class="find-text">
    <!-- ACTION  -->
    {#each actionList as action}
      <label>
        <input
          type="radio"
          bind:group={newCmd.command}
          name={action}
          value={action}
        />{action}</label
      >
    {/each}
    <!-- XPATH  -->
    <textarea
      placeholder="XPath"
      value={newCmd.target}
      on:change={(e) => {
        newCmd.target = e.target["value"];
      }}
    />
    <!-- VALUE  -->
    <textarea
      placeholder="Value"
      value={newCmd.value}
      on:change={(e) => {
        newCmd.value = e.target["value"];
      }}
    />
    <button
      on:click={() => {
        insertNewCommand(newCmd);
      }}>INSERT COMMAND</button
    >
  </div>

  <div class="download">
    <button
      on:click={() => {
        clearLog();
      }}
    >
      CLEAR LOGS
    </button>
  </div>

  <div class="download">
    <a href={url} download="asrt.json">
      <button> DOWNLOAD </button>
    </a>
    <button
      style="background-color: green;"
      title="COPY JSON LIST"
      on:click={() => {
        navigator.clipboard.writeText(generateCmdJson($commandList));
      }}
    >
      //
    </button>
  </div>

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
</style>
