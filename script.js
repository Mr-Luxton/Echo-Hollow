document.addEventListener("DOMContentLoaded", () => {
  let shards = 0;
  let shardsPerClick = 1;
  let autoMiners = 0;

  let clickUpgradeCost = 10;
  let autoUpgradeCost = 50;

  const shardDisplay = document.getElementById("shard-count");
  const rock = document.getElementById("rock");
  const upgradeClickBtn = document.getElementById("upgrade-click-btn");
  const upgradeAutoBtn = document.getElementById("upgrade-auto-btn");
  const loreList = document.getElementById("lore-list");

  const loreThresholds = [10, 50, 100];
  const loreTexts = [
    "You hear a faint voice: 'The stone remembers...'",
    "A whisper echoes: 'We dug too deep... something answered.'",
    "An inscription: 'The Hollow was never empty.'"
  ];

  rock.addEventListener("click", () => {
    shards += shardsPerClick;
    updateUI();
    checkLoreUnlocks();
    saveGame();
  });

  upgradeClickBtn.addEventListener("click", () => {
    if (shards >= clickUpgradeCost) {
      shards -= clickUpgradeCost;
      shardsPerClick++;
      clickUpgradeCost = Math.floor(clickUpgradeCost * 1.5);
      updateUI();
      saveGame();
    }
  });

  upgradeAutoBtn.addEventListener("click", () => {
    if (shards >= autoUpgradeCost) {
      shards -= autoUpgradeCost;
      autoMiners++;
      autoUpgradeCost = Math.floor(autoUpgradeCost * 1.8);
      updateUI();
      saveGame();
    }
  });

  function updateUI() {
    shardDisplay.textContent = shards;
    upgradeClickBtn.textContent = `🔧 Upgrade Pickaxe (${clickUpgradeCost} shards)`;
    upgradeClickBtn.disabled = shards < clickUpgradeCost;

    upgradeAutoBtn.textContent = `⚙️ Hire Auto-Miner (${autoUpgradeCost} shards)`;
    upgradeAutoBtn.disabled = shards < autoUpgradeCost;
  }

  function checkLoreUnlocks() {
    for (let i = 0; i < loreThresholds.length; i++) {
      if (shards >= loreThresholds[i]) {
        const item = loreList.children[i];
        if (item.textContent.startsWith("🔒")) {
          item.textContent = `📖 ${loreTexts[i]}`;
        }
      }
    }
  }

  function autoMine() {
    shards += autoMiners;
    updateUI();
    checkLoreUnlocks();
    saveGame();
  }

  function saveGame() {
    const saveData = {
      shards,
      shardsPerClick,
      autoMiners,
      clickUpgradeCost,
      autoUpgradeCost
    };
    localStorage.setItem("echoHollowSave", JSON.stringify(saveData));
  }

  function loadGame() {
    const saved = localStorage.getItem("echoHollowSave");
    if (saved) {
      const data = JSON.parse(saved);
      shards = data.shards || 0;
      shardsPerClick = data.shardsPerClick || 1;
      autoMiners = data.autoMiners || 0;
      clickUpgradeCost = data.clickUpgradeCost || 10;
      autoUpgradeCost = data.autoUpgradeCost || 50;
    }
    updateUI();
    checkLoreUnlocks();
  }

  setInterval(autoMine, 1000);
  loadGame();
});
