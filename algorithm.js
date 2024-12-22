// List of Broadway shows
const shows = [
    "Dear Evan Hansen", "Hadestown", "Phantom of the Opera", "Annie",
    "Ain't Too Proud", "Mean Girls", "Secret Garden", "Hairspray", "Six",
    "Jersey Boys", "Heathers", "Les Miserables", "Moulin Rouge", "Tina",
    "Mamma Mia", "MJ: The Musical", "POTUS", "Chicago", "The Book of Mormon",
    "The Notebook", "Sweeney Todd", "Funny Girl", "Come From Away", "Newsies",
    "Wicked", "Company", "Kimberly Akimbo", "Waitress", "Cabaret",
    "Fiddler on the Roof", "The Outsiders", "Back to the Future",
    "La Cage aux Folles", "Waiting for Godot"
];

// Initialize Elo scores
const initializeScores = (showList) => {
    const scores = {};
    showList.forEach(show => scores[show] = 1000);
    return scores;
};

let scores = initializeScores(shows);
const K = 32; // Sensitivity factor for Elo updates
const comparedPairs = new Set();

// Elo update function
const eloUpdate = (winner, loser, scores) => {
    const R_w = scores[winner];
    const R_l = scores[loser];
    const E_w = 1 / (1 + Math.pow(10, (R_l - R_w) / 400));
    const E_l = 1 - E_w;
    scores[winner] += K * (1 - E_w);
    scores[loser] += K * (0 - E_l);
};

// Select optimal pair for comparison
const optimalPairSelection = (scores) => {
    const sortedShows = Object.entries(scores).sort((a, b) => a[1] - b[1]);
    const optimalPairs = [];
    
    for (let i = 0; i < sortedShows.length; i++) {
        for (let j = i + 1; j < sortedShows.length; j++) {
            const pair = [sortedShows[i][0], sortedShows[j][0]].sort();
            const key = pair.join('|');
            if (!comparedPairs.has(key)) {
                const diff = Math.abs(sortedShows[i][1] - sortedShows[j][1]);
                optimalPairs.push({ pair, diff });
            }
        }
    }
    
    optimalPairs.sort((a, b) => a.diff - b.diff);
    return optimalPairs.slice(0, 10);
};

// Pairwise comparison function
const compareShows = () => {
    const pairs = optimalPairSelection(scores);
    if (pairs.length === 0) {
        console.log("No more unique pairs to compare.");
        return false;
    }
    const randomPair = pairs[Math.floor(Math.random() * pairs.length)];
    const [show1, show2] = randomPair.pair;
    const key = randomPair.pair.join('|');
    comparedPairs.add(key);
    
    const choice = prompt(`Which show do you prefer?\n1: ${show1}\n2: ${show2}\nType 'exit' to finish comparisons early.`);
    
    if (choice === '1') {
        eloUpdate(show1, show2, scores);
    } else if (choice === '2') {
        eloUpdate(show2, show1, scores);
    } else if (choice.toLowerCase() === 'exit') {
        return false;
    } else {
        console.log("Invalid choice. Try again.");
    }
    return true;
};

// Normalize scores to a 0–10 scale
const normalizeScores = (scores) => {
    const minRating = Math.min(...Object.values(scores));
    const maxRating = Math.max(...Object.values(scores));
    const normalized = {};
    for (const show in scores) {
        normalized[show] = 10 * (scores[show] - minRating) / (maxRating - minRating);
    }
    return normalized;
};

// Display rankings
const displayRankings = (scores) => {
    const normalized = normalizeScores(scores);
    const ranked = Object.entries(normalized).sort((a, b) => b[1] - a[1]);
    console.log("\nBroadway Show Rankings:");
    ranked.forEach(([show, score], index) => {
        console.log(`${index + 1}. ${show} - Score: ${score.toFixed(2)}`);
    });
};

// Calculate optimal number of comparisons
const calculateOptimalComparisons = (numShows) => {
    const totalPairs = (numShows * (numShows - 1)) / 2;
    const optimalComparisons = Math.ceil(0.25 * totalPairs);
    console.log(`Optimal number of comparisons for ${numShows} shows: ${optimalComparisons}`);
    return optimalComparisons;
};

// Interactive comparison loop
const runComparisonLoop = (numComparisons) => {
    for (let i = 0; i < numComparisons; i++) {
        if (!compareShows()) {
            break;
        }
    }
    displayRankings(scores);
};

// Example usage:
// const numShowsSeen = shows.length;
// const optimalComparisons = calculateOptimalComparisons(numShowsSeen);
// runComparisonLoop(optimalComparisons);
