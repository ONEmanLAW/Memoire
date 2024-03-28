<?php

function connectBdd()
{
    $hostname = "localhost";
    $username = "root";
    $password = "root";
    $database = "meteorDatabase";

    $connexion = mysqli_connect($hostname, $username, $password, $database);
    if (!$connexion) {
        die("La connexion à la base de données a échoué:");
    } else {
        return $connexion;
    }
}

function getDataFromBdd($requete)
{
    $tab = [];
    $connexion = connectBdd();
    if (!$connexion) {
        die("La connexion à la base de données a échoué:");
    } else {
        $query = mysqli_query($connexion, $requete);
        mysqli_close($connexion);
        while ($resultat = mysqli_fetch_array($query, MYSQLI_ASSOC)) {
            $tab[] = $resultat;
        };
    }
    return $tab;
}

function insertUpdateBdd($requete)
{
    $connexion = connectBdd();
    if ($connexion) {
        mysqli_query($connexion, $requete);
        mysqli_close($connexion);
    }
}

function createGame()
{
    $previousGame = getDataFromBdd("SELECT id_partie FROM Partie ORDER BY id_partie DESC LIMIT 1");
    $newGame = $previousGame[0]['id_partie'] + 1;
    //echo "previousGame : ".$newGame;
    //echo $newGame;
    $dateWhenGameStarted = date('Y-m-d H:i:s');
    $result = insertUpdateBdd("INSERT INTO Partie (id_partie, tpsDebut , etat) VALUES ('$newGame', '$dateWhenGameStarted', '1')");
    for ($i=0; $i < 4; $i++) {
        $resultModule = insertUpdateBdd("INSERT INTO Etat_Module (id_module, etatModule, id_partie,	compteur_erreur) VALUES ('$i','0', '$newGame', '0')");
    }
    
    $text = "Created new game with id=" . $newGame;
    echo $text;
    return $newGame;
}

function resolve($idPartie, $idModule): string
{
    //$Game = getDataFromBdd("SELECT id_partie FROM Partie ORDER BY id_partie DESC LIMIT 1");
    //$idGame = $Game[0]['id_partie'];
    $idGame = $idPartie;
    insertUpdateBdd("UPDATE Etat_Module SET etatModule='1' WHERE id_partie='$idGame' AND id_module='$idModule'");
    $text = "Updated state of the module " . $idModule . " from game n°" . $idGame . " to true";
    return $text;
};

// Function to increment error count
function incrementError( $idPartie, $idModule) {
    
    $idGame = $idPartie;
    $errors = getDataFromBdd("SELECT compteur_erreur FROM Etat_Module WHERE id_module='$idModule' AND id_partie=$idPartie");
    $error = $errors[0]['compteur_erreur'];
    if ($error<2) {
        $error+=1;
    }
    
    echo "error: $error";
    insertUpdateBdd("UPDATE Etat_Module SET compteur_erreur='$error' WHERE id_module='$idModule'AND id_partie=$idPartie");
}

// Function to end the game
function EndGame() {
    //echo "ok";
    $Game = getDataFromBdd("SELECT id_partie, tpsDebut FROM Partie ORDER BY id_partie DESC LIMIT 1");
    $dateWhenGameEnded = date('Y-m-d H:i:s'); 
    $idGame = $Game[0]['id_partie'];
    insertUpdateBdd("UPDATE Partie SET tpsFin='$dateWhenGameEnded', etat='0' WHERE id_partie='$idGame'");
}

// Main script
$nbrErrors = 0; // Initialize error count

if (isset($_GET['action'])) {
    $action = $_GET['action'];
    switch ($action) {
        case 'resolve':
            echo resolve($_GET['idPartie'], $_GET['idModule']);
            break;
        case 'incrementError':
            echo incrementError($_GET['idPartie'], $_GET['idModule']);
            break;
        default:
            # code...
            break;
    }
}
