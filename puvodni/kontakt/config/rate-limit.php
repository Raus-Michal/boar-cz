<?php
// soubor vyloučí nalimitní počet požadavků z jedné IP adresy

session_start(); // Inicializace session, což umožňuje ukládat data na straně serveru a udržet je mezi požadavky od stejného uživatele.

$limit = 3;  // Maximální počet požadavků
$timeWindow = 86400; // Časové okno v sekundách (86400sekund==24hodin)

$ipAddress = $_SERVER["REMOTE_ADDR"];
$rateLimitFile = "config/rate_limit.json";

// Načtení dat o předchozích požadavcích
if (file_exists($rateLimitFile)){
// pokud soubor $rateLimitFile existuje
    $data = json_decode(file_get_contents($rateLimitFile), true); // dekóduje data o Rate Limitu
} else {
// pokud soubor $rateLimitFile neexistuje
    $data = []; // budou data prozatím prázdne pole
}

$currentTime = time();

// Očistěte staré záznamy
if (isset($data[$ipAddress])) {
    $data[$ipAddress] = array_filter($data[$ipAddress], function ($timestamp) use ($currentTime, $timeWindow) {
        return ($currentTime - $timestamp) < $timeWindow;
    });
}

// Zkontrolujte, zda IP adresa překročila limit
if (isset($data[$ipAddress]) && count($data[$ipAddress]) >= $limit) {
    http_response_code(429);  // 429 Too Many Requests
    echo "Překročili jste limit požadavků. Zkuste to znovu později.";
    header("Location:ok/rate.html"); // stránka se pomocí vestavene funkce header() presměruje a script níze uz se neprovede
    exit;
}

// Přidání nového požadavku
$data[$ipAddress][] = $currentTime;

// Uložení zpět do souboru
file_put_contents($rateLimitFile, json_encode($data));

// Zpracujte další část požadavku

?>