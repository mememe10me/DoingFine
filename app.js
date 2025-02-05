document.addEventListener("DOMContentLoaded", function () {
    const categoryInput = document.getElementById("categoryInput");
    const categorySelect = document.getElementById("category");
    const categoryScoresList = document.getElementById("categoryScores");

    let categoryScores = JSON.parse(localStorage.getItem("categoryScores")) || {};

    // Näytetään viimeisimmät kategoriapisteet
    updateCategoryScores();

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
            listItem.textContent = `${capitalize(category)}: Last ${scores[scores.length - 1]}, 7-day avg: ${average.toFixed(1)}`;
            categoryScoresList.appendChild(listItem);
        }
    }

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
});
