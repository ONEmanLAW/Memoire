let rn_div = document.querySelector("#random_number");
let stepTitle = document.querySelector("#step_title");
let currentStep = 1;
let clickedButton;

// Générer le chiffre aléatoire initial
regenerateRandom();
updateDisplay();
updateStepImages();

document.querySelectorAll('.button').forEach(item => {
    item.addEventListener('click', () => conditions_buttons(item.id));
});

function ledOnClickSound() {
    const ledSound = new Audio('audios/ledOn.wav');
    ledSound.play();
}

function mistakeSound() {
    const mistakeAudio = new Audio('audios/error.wav');
    mistakeAudio.play();
}

function conditions_buttons(idButtonCurrent) {
    const button = document.querySelector(`#${idButtonCurrent}`);

    // Vérification de l'action en fonction de l'étape et du chiffre aléatoire
    switch (currentStep) {
        case 1:
            if (checkStep1(button)) {
                clickedButton = button;
                nextStep();
                ledOnClickSound();
            } else {
                resetSteps();
            }
            break;
        case 2:
            if (checkStep2(button)) {
                clickedButton = button;
                nextStep();
                ledOnClickSound();
            } else {
                resetSteps();
            }
            break;
        case 3:
            if (checkStep3(button)) {
                clickedButton = button;
                nextStep();
                ledOnClickSound();
            } else {
                resetSteps();
            }
            break;
        case 4:
            if (checkStep4(button)) {
                clickedButton = button;
                ledOnClickSound();
                nextStep();
            } else {
                resetSteps();
            }
            break;
        case 5:
            if (checkStep5(button)) {
                clickedButton = button;
                document.querySelector("#led_fin").setAttribute("src", "assets/led_fin_vert.png");
                ledOnClickSound();
                resetSteps();
            } else {
                resetSteps();
            }
            break;
        default:
            resetSteps();
            break;
    }
}

function nextStep() {
    currentStep++;
    regenerateRandom();
    updateDisplay();
    updateStepImages();
}

function resetSteps() {
    mistakeSound();
    currentStep = 1;
    regenerateRandom();
    updateDisplay();
    updateStepImages();
}

function regenerateRandom() {
    random_number = Math.floor(Math.random() * 4) + 1;
    rn_div.innerHTML = `<h1>${random_number}</h1>`;
}

function updateDisplay() {
    stepTitle.innerHTML = `Etape ${currentStep}`;
}

function updateStepImages() {
    const stepImages = document.querySelectorAll('.steps');

    for (let i = stepImages.length - 1; i >= 0; i--) {
        const stepNumber = stepImages.length - i;
        if (stepNumber < currentStep) {
            stepImages[i].setAttribute("src", "assets/boutonEtapeVert.png");
        } else {
            stepImages[i].setAttribute("src", "assets/boutonEtapeNeutre.png");
        }
    }
}

function checkStep1(button) {
    switch (random_number) {
        case 1:
            return button.id === 'button2';
        case 2:
            return button.id === 'button2';
        case 3:
            return button.id === 'button3';
        case 4:
            return button.id === 'button4';
        default:
            return false;
    }
}

function checkStep2(button) {
    switch (random_number) {
        case 1:
            return button.id === 'button4';
        case 2:
            return button === clickedButton;
        case 3:
            return button.id === 'button1';
        case 4:
            return button === clickedButton;
        default:
            return false;
    }
}

function checkStep3(button) {
    switch (random_number) {
        case 1:
            return button === clickedButton;
        case 2:
            return button === clickedButton;
        case 3:
            return button.id === 'button3';
        case 4:
            return button.id === 'button4';
        default:
            return false;
    }
}

function checkStep4(button) {
    switch (random_number) {
        case 1:
            return button === clickedButton;
        case 2:
            return button.id === 'button1';
        case 3:
            return button === clickedButton;
        case 4:
            return button === clickedButton;
        default:
            return false;
    }
}

function checkStep5(button) {
    switch (random_number) {
        case 1:
            return button === clickedButton;
        case 2:
            return button === clickedButton;
        case 3:
            return button.id === 'button4';
        case 4:
            return button.id === 'button3';
        default:
            return false;
    }
}
