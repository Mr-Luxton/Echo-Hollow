let shards = 0;
let upgradeCost = 10;
let shardPerClick = 1;

// Lore Data
const loreThresholds = [10, 50, 100, 200, 350, 500, 700, 1000, 1500, 2000];
const loreTexts = [
  "You hear a faint voice: 'The stone remembers...'",
  "A whisper echoes: 'We dug too deep... something answered.'",
  "An inscription: 'The Hollow was never empty.'",
  "A page torn from a journal: 'Light doesn’t survive here.'",
  "Scratched into the wall: 'We were warned, but we came anyway.'",
  "They called it a vein of knowledge... but it bled.",
  "Echoes aren’t just sounds. They’re memories.",
  "There was once a gate here. Now, only silence remains.",
  "Each shard carries a whisper. And a warning.",
  "The final page: 'It’s awake.'"
];

let unlockedLore = 0;
let currentLorePage = 0;

// Game Actions
function mineShard() {
  shards += shardPerClick;
  document.getElementById("shard-count").textContent = shards;
  checkLoreUnlocks();
}

function buyUpgrade() {
  if (shards >= upgradeCost) {
    shards -= upgradeCost;
    shardPerClick++;
    upgradeCost = Math.floor(upgradeCost * 1.5);
    document.getElementById("shard-count").textContent = shards;
    document.getElementById("upgrade-btn").textContent = `Upgrade Pickaxe (Cost: ${upgradeCost})`;
  }
}

// Lore Functions
function checkLoreUnlocks() {
  for (let i = 0; i < loreThresholds.length; i++) {
    if (shards >= loreThresholds[i]) {
      unlockedLore = Math.max(unlockedLore, i + 1);
    }
  }
  updateLorePage();
}

function updateLorePage() {
  const page = document.getElementById("lore-page");
  if (unlockedLore === 0) {
    page.textContent = "🔒 Lore will appear here as you collect Echo Shards.";
  } else {
    page.textContent = loreTexts[currentLorePage] || "";
  }
}

function nextLorePage() {
  if (currentLorePage < unlockedLore - 1) {
    currentLorePage++;
    updateLorePage();
  }
}

function prevLorePage() {
  if (currentLorePage > 0) {
    currentLorePage--;
    updateLorePage();
  }
}

// Tab Controls
function switchTab(tab) {
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  document.getElementById(`${tab}-tab`).classList.add("active");
}

// Initialize UI
document.addEventListener("DOMContentLoaded", () => {
  updateLorePage();
});
