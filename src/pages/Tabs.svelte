<script lang="ts">
    import { status } from "../main";
    import {
        getTabs,
        activateListenerOnTab,
        listenToNewChannel,
    } from "../functions/chrome";

    var promiseTabs = getTabs();
    function reload() {
        promiseTabs = getTabs();
    }
    listenToNewChannel();
</script>

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
                        status.set(2);
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
