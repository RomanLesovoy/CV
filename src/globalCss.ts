export const globalCss = `
<style>
  .skill-row {
      display: grid;
      grid-template-columns: 0.3fr 1fr;
      grid-template-rows: 1fr;
      margin-bottom: 10px;
  }
  .skill-row > * {
      height: 100%;
      min-width: 100px;
      padding: 10px;
  }
  .skill-row > *:nth-child(odd) {
      background-color: var(--table-odd-color, #333333);
  }
  .skill-row > *:nth-child(even) {
      background-color: var(--table-even-color, #555555);
  }
  .skills-list {
    display: flex;
    flex-wrap: wrap;
  }
  .skill-item-tooltip {
    position: absolute;
    display: none;
    background: var(--tab-item-bg-color, #252525);
    padding: 5px;
    font-size: 11px;
    z-index: 100;
    border-radius: 4px;
    top: calc(100% + 6px);
    text-align: left;
    min-width: 150px;
    left: 0;
  }
  .skill-item {
    min-width: 100px;
    position: relative;
    padding: 10px;
    border-radius: 20px;
    background-color: transparent;
    margin: 5px;
    text-align: center;
    cursor: help;
  }
  .skill-item:hover .skill-item-tooltip {
    display: block;
  }
  .skill-item.high {
    background-color: var(--skill-high, #49b749);
  }
  .skill-item.middle {
    background-color: var(--skill-middle, #efa828);
  }
</style>`;