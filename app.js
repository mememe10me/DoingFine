document.addEventListener("DOMContentLoaded", function () {
    console.log('DoingFine app is running!');

    const moodInput = document.getElementById("moodInput");
    const lastMoodDisplay = document.getElementById("lastMood");
    const averageMoodDisplay = document.getElementById("averageMood");

    // Hae aiemmin tallennettu fiilis paikallisesta tallennuksesta
    let moodHistory = JSON.parse(localStorage.getItem("moodHistory")) || [];

    // Näytä viimeisin fiilis
    if (moodHistory.length > 0) {
        lastMoodDisplay.textContent = moodHistory[moodHistory.length - 1];
        updateAverageMood();
    }

    window.saveMood = function() {
        const moodValue = parseInt(moodInput.value);

        if (moodValue >= 1 && moodValue <= 10) {
            moodHistory.push(moodValue);

            // Säilytä vain viimeiset 7 päivää
            if (moodHistory.length > 7) {
                moodHistory.shift();
            }

            // Tallenna paikallisesti
            localStorage.setItem("moodHistory", JSON.stringify(moodHistory));

            // Päivitä UI
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
});
