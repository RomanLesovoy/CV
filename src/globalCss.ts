export const globalCss = `
<style>
  .skill-row {
      display: grid;
      grid-template-columns: 0.3fr 1fr;
      grid-template-rows: 1fr;
      margin-bottom: 10px;
      width: 100%;
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
    display: none;
    background: var(--tab-item-bg-color, #252525);
    z-index: 100;
    border-radius: 4px;
    text-align: left;
    min-width: 250px;
    padding: 15px 20px;
    font-size: 15px;
    
    position: fixed;
    top: calc(100% - 110px);
    left: 50%;
    transform: translate(-50%, -100%);
  }
  .skill-item {
    min-width: 100px;
    position: relative;
    padding: 10px;
    border-radius: 20px;
    background-color: transparent;
    margin: 5px;
    font-size: 13px;
    text-align: center;
    cursor: help;
  }
  .skill-item:hover .skill-item-tooltip,
  .skill-item:active .skill-item-tooltip,
  .skill-item-tooltip:hover,
  .skill-item-tooltip:active {
    display: block;
  }
  .skill-item.high {
    background-color: var(--skill-high, #49b749);
  }
  .skill-item.middle {
    background-color: var(--skill-middle, #efa828);
  }
    .skill-item.low {
    background-color: var(--skill-low, #ef7e28);
  }
</style>`;
