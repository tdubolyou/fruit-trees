<script>
  import { createEventDispatcher } from 'svelte';

  export let months;
  export let selectedMonth;
  export let filteredTrees;

  const dispatch = createEventDispatcher();

  let showSidebar = true;

  const treeGroups = [
    { label: 'Apple', trees: ['APPLE'], color: '#e41a1c' },
    { label: 'Cherry', trees: ['CHERRY', 'CHOKE CHERRY', 'PURPLELEAF CHERRY', 'SARGENT CHERRY'], color: '#e78ac3' },
    { label: 'Apricot', trees: ['APRICOT'], color: '#e5c494' },
    { label: 'Pear', trees: ['BRADFORD PEAR', 'PEAR'], color: '#a6d854' },
    { label: 'Plum', trees: ['PLUM'], color: '#7570b3' },
    { label: 'Peach', trees: ['PEACH'], color: '#ff7f00' },
    { label: 'Mulberry', trees: ['BLACK (RED) MULBERRY', 'MULBERRY', 'HACK-BERRY'], color: '#6699ff' },
    { label: 'Nut Trees', trees: ['AMERICAN CHESTNUT', 'AMERICAN HAZEL', 'HAZEL', 'WALNUT', 'BLACK WALNUT'], color: '#663300' }
  ];

  function toggleFilter(group) {
    const allIncluded = group.trees.every(tree => filteredTrees.includes(tree));
    if (allIncluded) {
      filteredTrees = filteredTrees.filter(tree => !group.trees.includes(tree));
    } else {
      filteredTrees = [...new Set([...filteredTrees, ...group.trees])];
    }
    dispatch('filterUpdate', { filteredTrees });
  }

  function updateMonth() {
    dispatch('monthUpdate', { selectedMonth });
  }

  function clearMonthFilter() {
    selectedMonth = 4;
    dispatch('monthUpdate', { selectedMonth });
  }
</script>

<div class="sidebar-toggle" on:click={() => showSidebar = !showSidebar}>
  {showSidebar ? '←' : '→'}
</div>

{#if showSidebar}
  <div class="sidebar">
    <h1>The Fruit Trees of Toronto</h1>
    <h2>By Type, Size and Ripening Month</h2>
    <p>
      <a href="https://www.toronto.ca/city-government/data-research-maps/open-data/open-data-catalogue/#0e785adb-d130-8957-a572-5d6fdb5cc275" 
         target="_blank" 
         rel="noopener noreferrer">
        Source: City of Toronto, 2017
      </a>
    </p>
    
    <div class="tree-groups">
      {#each treeGroups as group}
        <div 
          class="tree-group"
          on:click={() => toggleFilter(group)}
        >
          <span 
            class="color-dot"
            style="background-color: {group.color};"
          ></span>
          <span class={group.trees.every(tree => filteredTrees.includes(tree)) ? 'active' : ''}>
            {group.label}
          </span>
        </div>
      {/each}
    </div>
    
    <div class="month-slider">
      <label for="month-slider">Slide to filter by ripening month</label>
      <input 
        id="month-slider"
        type="range" 
        min="4" 
        max="11" 
        bind:value={selectedMonth}
        on:change={updateMonth}
      />
      <span>{months[selectedMonth]}</span>
    </div>
    
    <button on:click={clearMonthFilter}>
      Clear Month Filter
    </button>
  </div>
{/if}

<style>
  .sidebar-toggle {
    position: fixed;
    left: 10px;
    top: 10px;
    z-index: 10;
    background-color: white;
    padding: 5px 10px;
    cursor: pointer;
  }

  .sidebar {
    position: fixed;
    left: 10px;
    top: 50px;
    width: 250px;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 20px;
    border-radius: 5px;
    max-height: calc(100vh - 70px);
    overflow-y: auto;
  }

  h1 {
    font-size: 1.5em;
    margin-bottom: 5px;
  }

  h2 {
    font-size: 1em;
    color: #ccc;
    margin-bottom: 10px;
  }

  a {
    color: #ccc;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  .tree-groups {
    margin-top: 20px;
  }

  .tree-group {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    cursor: pointer;
  }

  .color-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .active {
    opacity: 1;
  }

  .tree-group span:not(.color-dot) {
    opacity: 0.7;
  }

  .month-slider {
    margin-top: 20px;
  }

  input[type="range"] {
    width: 100%;
    margin-top: 10px;
  }

  button {
    margin-top: 10px;
    background-color: white;
    color: black;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
  }

  button:hover {
    background-color: #eee;
  }
</style>