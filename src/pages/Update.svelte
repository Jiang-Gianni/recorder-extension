<script lang="ts">
    import {
        getTabs,
        activateListenerOnTab,
        listenToNewChannel,
        xPathList,
    } from "../functions/chrome";
    import { readFile, createXpathUrl } from "../functions/crud";

    var promiseTabs = getTabs();
    function reload() {
        promiseTabs = getTabs();
    }
    listenToNewChannel();
    $: url = createXpathUrl($xPathList);
</script>

<main on:keydown>
    {#await readFile("./text.txt")}
        <div>Fetching Text</div>
    {:then text}
        <div>Text {text}</div>
    {/await}
    <div>XPATH {$xPathList}</div>
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
                    }}>ID {tab["id"]}</button
                >
                <div>URL {tab["url"]}</div>
            </div>
        {/each}
    {/await}
    <a href={url} download="asrt.json">
        <button> DOWNLOAD </button>
    </a>
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
