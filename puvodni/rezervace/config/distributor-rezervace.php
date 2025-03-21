<?php

// Inicializace proměnných pro odpověď
$status = "success"; // Výchozí hodnota
$message = "Nebyla dodána zpráva"; // Zpráva, která bude odeslána
$httpCode = 200; // Výchozí HTTP kód odpovědi

include "defense/token.php"; // ověření tokenu, pokud nebude token origin, funkce se zastaví
include "defense/duplicity.php"; // ověření jestli se nejedná o duplicitní rezervaci, jestli požadavek o rezervaci nevede k duplicitě
include "defense/rate-limit-1.php"; // maximální počet přístupů 3 za 24 hod.
include "rezervace/zapis-rezervace.php"; // postará se o všechny zápisy pro rezervaci
include "rezervace/rozeslat-emaily.php"; // postará se o rozeslání emailu tomu kdo rezervaci zadal a mně


// Pokud všechny operace byly úspěšné, vrátíme odpověď o úspěchu
$message = "Vše ok"; // Zpráva, která bude odeslána
http_response_code($httpCode);
echo json_encode(["status" => $status, "message" => $message]);

?>