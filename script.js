let shards = 0;
let shardsPerClick = 1;
const loreThresholds = [10, 50, 100];
const loreTexts = [
  "You hear a faint voice: 'The stone remembers...'",
  "A whisper echoes: 'We dug too deep... something answered.'",
  "An inscription: 'The Hollow was never empty.'"
];

const shardDisplay = document.getElementById("shard-count");
const upgradeBtn = document.getElementById("upgrade-btn");
const rock = document.getElementById("rock");
const loreList = document.getElementById("lore-list");
const clickSound = document.getElementById("click-sound");
const bgMusic = document.getElementById("bg-music");

// Start background music on first interaction
document.body.addEventListener("click", () => {
  if (bgMusic.paused) {
    bgMusic.volume = 0.2;
    bgMusic.play();
  }
}, { once: true });

rock.addEventListener("click", () => {
  shards += shardsPerClick;
  clickSound.currentTime = 0;
  clickSound.play();
  shardDisplay.textContent = shards;
  checkLoreUnlocks();
  updateUI();
});

upgradeBtn.addEventListener("click", () => {
  if (shards >= 10) {
    shards -= 10;
    shardsPerClick++;
    updateUI();
  }
});

function updateUI() {
  shardDisplay.textContent = shards;
  upgradeBtn.disabled = shards < 10;
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
