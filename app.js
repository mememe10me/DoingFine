// Oletetaan, että moodData on jo määritelty

// Erota päivämäärät ja mielialapisteet omiin taulukoihinsa
const labels = moodData.map(entry => entry.date);
const data = moodData.map(entry => entry.mood);

// Hae canvas-elementin konteksti
const ctx = document.getElementById('moodChart').getContext('2d');

// Luo viivakaavio
const moodChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Mood Over Time',
            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: true,
            tension: 0.1
        }]
    },
    options: {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date'
                }
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Mood Rating'
                },
                ticks: {
                    stepSize: 1
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    }
});

