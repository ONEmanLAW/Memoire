// Pour johnny
// let params = new URLSearchParams(document.location.search);
// let idPartie = params.get('idPartie');
// let idModule = params.get('idModule');

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

// function resolve() {
//     console.log(idPartie);
//     console.log(idModule);
//         $.ajax({
//             url: `../functions/functionsDatabase.php?action=resolve&idPartie=${idPartie}&idModule=${idModule}`,
//             success: function(data) {
//                 $('#result').html(data);
//             }
//         });
//     }


// function incrementError() {
//     $.ajax({
//             url: `../functions/functionsDatabase.php?action=incrementError&idPartie=${idPartie}&idModule=${idModule}`,
//             success: function(data) {
//                 $('#result').html(data);
//             }
//         });
//     }

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
                document.querySelector("#led_fin").setAttribute("src", "assets/led_fin_vert.png");
                ledOnClickSound();
                //Pour johnny
                //resolve();
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
    //Pour Johnny
    //incrementError();
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

// Étape 1
// Si l’écran affiche 1, appuyez sur le bouton en deuxième position.
// Si l’écran affiche 2, appuyez sur le bouton en deuxième position.
// Si l’écran affiche 3, appuyez sur le bouton en troisième position.
// Si l’écran affiche 4, appuyez sur le bouton en quatrième position.
function checkStep1(button) {
    switch (random_number) {
        case 1:
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

// Étape 2
// Si l’écran affiche 1, appuyez sur le bouton portant le chiffre « 4 ».
// Si l’écran affiche 2, appuyez sur le bouton à la même position qu’à l’étape 1.
// Si l’écran affiche 3, appuyez sur le bouton en première position.
// Si l’écran affiche 4, appuyez sur le bouton à la même position qu’à l’étape 1.
function checkStep2(button) {
    switch (random_number) {
        case 1:
            return button.id === 'button4';
        case 2:
        case 4:
            return button === clickedButton;
        case 3:
            return button.id === 'button1';
        default:
            return false;
    }
}

// Étape 3
// Si l’écran affiche 1, appuyez sur le bouton ayant le même chiffre qu’à l’étape 2.
// Si l’écran affiche 2, appuyez sur le bouton ayant le même chiffre qu’à l’étape 1.
// Si l’écran affiche 3, appuyez sur le bouton en troisième position.
// Si l’écran affiche 4, appuyez sur le bouton portant le chiffre « 4 ».
function checkStep3(button) {
    switch (random_number) {
        case 1:
            return button.id === 'button' + random_number;
        case 2:
            return button.id === 'button' + random_number;
        case 3:
            return button.id === 'button3';
        case 4:
            return button.id === 'button4';
        default:
            return false;
    }
}
