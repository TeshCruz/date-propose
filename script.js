const yesButton = document.querySelector("#yesButton");
const noButton = document.querySelector("#noButton");
const proposalCard = document.querySelector(".proposal-card");

let noAttempts = 0;

const noMessages = [
  "NO 😭",
  "Are you sure?? 🥺",
  "Reallyy?! 😭",
  "Think about it! 👀",
  "Pleaseeeee 😭",
  "You're breaking my heart 💔",
  "I'll pretend you didn't click that 😭",
  "Nice try 😂",
  "You can't escape this question 👀",
  "BRO JUST SAY YES 😭💀"
];

console.log(yesButton)
console.log(noButton);

noButton.addEventListener("pointerenter", function () {
  noAttempts++;

  if (noAttempts >= 10) {
    noButton.style.transform = "scale(0.75)";
  }

  noButton.textContent = noMessages[Math.min(noAttempts, noMessages.length - 1)];

  noButton.style.position = "fixed";

  const maxX = Math.max(
    0,
    window.innerWidth - noButton.offsetWidth
  );

  const maxY = Math.max(
    0,
    window.innerHeight - noButton.offsetHeight
  );

  noButton.style.left = Math.random() * maxX + "px";
  noButton.style.top = Math.random() * maxY + "px";
});

yesButton.addEventListener("click", function () {
    proposalCard.innerHTML = `
        <div class="emoji">🥺</div>

        <h1>Wait... really?!</h1>

        <p>
            You actually said YES? 😭❤️
        </p>

        <button id="confirmYes">ABSOLUTELY ❤️</button>
    `;

    const confirmYes = document.querySelector("#confirmYes");

    confirmYes.addEventListener("click", showCelebration);
});

let chosenPlace = "";

const surprisePlaces = [
    "Cozy date at home 🏠",
    "Park date 🌳",
    "Coffee date ☕",
    "Dinner date 🍝",
    "Hotel / staycation 🏨"
];

function setupDatePlanner() {
    const placeButtons = document.querySelectorAll(".place-option");
    const selectedPlace = document.querySelector("#selectedPlace");
    const lockDateButton = document.querySelector("#lockDateButton");
    const dateInput = document.querySelector("#dateInput");
    const randomDateButton = document.querySelector("#randomDateButton");

    // Prevent past dates
    const today = new Date();

    const todayYear = today.getFullYear();

    const todayMonth = String(
        today.getMonth() + 1
    ).padStart(2, "0");

    const todayDay = String(
        today.getDate()
    ).padStart(2, "0");

    dateInput.min = `${todayYear}-${todayMonth}-${todayDay}`;

    // Place buttons
    placeButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            placeButtons.forEach(function (option) {
                option.classList.remove("selected");
            });

            button.classList.add("selected");

            if (button.dataset.place === "Surprise date 🎲") {

                const randomIndex = Math.floor(
                    Math.random() * surprisePlaces.length
                );

                chosenPlace = surprisePlaces[randomIndex];

            } else {

                chosenPlace = button.dataset.place;

            }

            selectedPlace.textContent =
                "You chose: " + chosenPlace;
        });
    });

    // Random date button
    randomDateButton.addEventListener("click", function () {

        const randomDays =
            Math.floor(Math.random() * 14) + 1;

        const randomDate = new Date(today);

        randomDate.setDate(
            today.getDate() + randomDays
        );

        const year = randomDate.getFullYear();

        const month = String(
            randomDate.getMonth() + 1
        ).padStart(2, "0");

        const day = String(
            randomDate.getDate()
        ).padStart(2, "0");

        dateInput.value =
            `${year}-${month}-${day}`;
    });

    // Lock date button
    lockDateButton.addEventListener("click", confirmDate);
}

function showCelebration() {
    proposalCard.innerHTML = `
        <div class="emoji celebration-emoji">🥳</div>

        <h1>YAAAAAY! ❤️</h1>

        <p>You actually said yes 😭💕</p>

        <h2>It's officially a date! 🎉</h2>

        <p class="date-message">
            Okayyy... now we need to decide when and where 👀
        </p>

        <button id="planDateButton">
            PLAN OUR DATE 💌
        </button>
    `;

    startHearts();

    const planDateButton = document.querySelector("#planDateButton");

    planDateButton.addEventListener("click", showDatePlanner);
}

function showDatePlanner() {
    proposalCard.innerHTML = `
        <div class="emoji">💌</div>

        <h1>Let's plan this thing 👀</h1>

        <p>First question...</p>

        <label for="dateInput">
            📅 When should we go?
        </label>

        <input
            type="date"
            id="dateInput"
        >

        <button id="randomDateButton">
          🎲 CHOOSE A DATE FOR ME
        </button>

        <h2>Where should we go? ❤️</h2>

        <div class="date-options">

            <button class="place-option" data-place="Cozy date at home 🏠">
                🏠 At home
            </button>

            <button class="place-option" data-place="Park date 🌳">
                🌳 Park
            </button>

            <button class="place-option" data-place="Coffee date ☕">
                ☕ Café
            </button>

            <button class="place-option" data-place="Dinner date 🍝">
                🍝 Restaurant
            </button>

            <button class="place-option" data-place="Hotel / staycation 🏨">
                🏨 Hotel
            </button>

            <button class="place-option" data-place="Surprise date 🎲">
                🎲 Surprise me
            </button>

        </div>

        <p id="selectedPlace">
            No place selected yet 👀
        </p>

        <button id="lockDateButton">
            LOCK IT IN ❤️
        </button>
    `;

    setupDatePlanner();
}

function confirmDate() {
    const dateInput = document.querySelector("#dateInput");

    const chosenDate = dateInput.value;

    if (chosenDate === "" || chosenPlace === "") {
        alert("Heyyy 😭 choose both a date and a place first!");
        return;
    }

    showFinalDate(chosenDate);
}

function showFinalDate(chosenDate) {
    const formattedDate = new Date(
        chosenDate + "T00:00:00"
    ).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric"
    });

    proposalCard.innerHTML = `
        <div class="emoji celebration-emoji">💖</div>

        <h1>IT'S A DATE! 😭❤️</h1>

        <div class="date-summary">
            <p>
                📅 <strong>${formattedDate}</strong>
            </p>

            <p>
                📍 <strong>${chosenPlace}</strong>
            </p>
        </div>

        <p>
            Okay... now I'm actually excited 😂❤️
        </p>

        <p class="final-message">
          Jokes aside... I'm really looking forward to this ❤️
          <br><br>
          Now you can't say I never asked properly 😂
        </p>

        <button id="replayButton">
            START AGAIN 🔄
        </button>
    `;

    startHearts();

    const replayButton = document.querySelector("#replayButton");

    replayButton.addEventListener("click", function () {
        location.reload();
    });
}

function createHeart() {
  const heart = document.createElement("div");

  heart.textContent = "❤️";

  heart.classList.add("floating-heart");

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = Math.random() * 25 + 20 + "px";

  document.body.appendChild(heart);

  setTimeout(function () {
    heart.remove();
  }, 3000);
}

function startHearts() {
    for (let i = 0; i < 20; i++) {
        setTimeout(createHeart, i * 150);
    }
}