document.addEventListener("DOMContentLoaded", function () {
    console.log('DoingFine app is running!');

    const moodInput = document.getElementById("moodInput");
    const lastMoodDisplay = document.getElementById("lastMood");
    const averageMoodDisplay = document.getElementById("averageMood");

    const categoryInput = document.getElementById("categoryInput");
    const categorySelect = document.getElementById("category");
    const categoryScoresList = document.getElementById("categoryScores");

    let moodHistory = JSON.parse(localStorage.getItem("moodHistory")) || [];
    let categoryScores = JSON.parse(localStorage.getItem("categoryScores")) || {};

    // Näytetään viimeisin fiilis
    if (moodHistory.length > 0) {
        lastMoodDisplay.textContent = moodHistory[moodHistory.length - 1];
        updateAverageMood();
    }

    // Näytetään viimeisimmät kategoriapisteet
    updateCategoryScores();

    window.saveMood = function() {
        const moodValue = parseInt(moodInput.value);

        if (moodValue >= 1 && moodValue <= 10) {
            moodHistory.push(moodValue);

            if (moodHistory.length > 7) {
                moodHistory.shift();
            }

            localStorage.setItem("moodHistory", JSON.stringify(moodHistory));

            lastMoodDisplay.textContent = moodValue;
            updateAverageMood();
        } else {
            alert("Please enter a value between 1 and 10.");
        }
    };

    function updateAverageMood() {
        if (moodHistory.length > 0) {
            const average = moodHistory.reduce((a, b) => a + b, 0) / moodHistory.length;
            averageMoodDisplay.textContent = average.toFixed(1);
        }
    }

    window.saveCategory = function() {
        const category = categorySelect.value;
        const score = parseInt(categoryInput.value);

        if (score >= 0 && score <= 10) {
            if (!categoryScores[category]) {
                categoryScores[category] = [];
            }

            categoryScores[category].push(score);

            if (categoryScores[category].length > 7) {
                categoryScores[category].shift();
            }

            localStorage.setItem("categoryScores", JSON.stringify(categoryScores));

            updateCategoryScores();
        } else {
            alert("Please enter a value between 0 and 10.");
        }
    };

    function updateCategoryScores() {
        categoryScoresList.innerHTML = "";
        for (let category in categoryScores) {
            const scores = categoryScores[category];
            const average = scores.reduce((a, b) => a + b, 0) / scores.length;
            const listItem = document.createElement("li");
            listItem.textContent = `${category.charAt(0).toUpperCase() + category.slice(1)}: Last ${scores[scores.length - 1]}, 7-day avg: ${average.toFixed(1)}`;
            categoryScoresList.appendChild(listItem);
        }
    }
});
