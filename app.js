document.addEventListener("DOMContentLoaded", function () {
    console.log('DoingFine app is running!');

    // Lisää uusi otsikko sivulle
    const body = document.body;
    const heading = document.createElement("h2");
    heading.textContent = "Let's start tracking your well-being!";
    body.appendChild(heading);

    // Lisää nappi testikäyttöä varten
    const button = document.createElement("button");
    button.textContent = "Click me!";
    button.onclick = function () {
        alert("DoingFine is working!");
    };
    body.appendChild(button);
});
