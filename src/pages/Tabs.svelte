<script lang="ts">
    import { status } from "../main";
    import {
        getTabs,
        activateListenerOnTab,
        listenToNewChannel,
        tabId,
        commandList,
    } from "../functions/chrome";
    import { Command } from "../types/command";

    var promiseTabs = getTabs();

    listenToNewChannel();

    function reload() {
        promiseTabs = getTabs();
    }

    function insertFirstCommand(url: string) {
        var cmd = new Command("open", "", url);
        commandList.set([cmd]);
    }
</script>

<button>
    <a href="/text.txt" target="_blank">HELLO</a>
</button>
<button>
    <a href="https://www.google.com" target="_blank">HELLO</a>
</button>

<main on:keydown>
    <button on:click={reload}>RELOAD TABS</button>
    {#await promiseTabs}
        <div>Fetching tabs</div>
    {:then tabs}
        {#each tabs as tab}
            <div class="tab">
                <button
                    on:keydown
                    on:click={() => {
                        activateListenerOnTab(tab["id"]);
                        insertFirstCommand(tab["url"]);
                        status.set(2);
                        tabId.set(tab["id"]);
                    }}>ID {tab["id"]}</button
                >
                <div>URL {tab["url"]}</div>
            </div>
        {/each}
    {/await}
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
    }
    .tab {
        display: flex;
        flex-direction: row;
    }
</style>
