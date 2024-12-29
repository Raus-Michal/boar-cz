<?php
// Přijetí dat
if($_SERVER["REQUEST_METHOD"]==="POST"){
$zapocti=$_POST["zapocti"]; // informace o tom, kam má statistiku připsat


if($zapocti)
{
// pokud byla zaslaná informace o tom, kam má statistiku připsat
$file_data = "config/pocet-kliku.json"; // soubor JSON se statistickými daty

if (file_exists($file_data)){
// pokud existuje JSON soubor s daty
$jsonData = file_get_contents($file_data); // načte soubor JSON
$data = json_decode($jsonData, true); // dekóduje data JSON

if($data[$zapocti])
{
// pokud jsou data k započtení
$new_data=(int)$data[$zapocti]+1; // pokud budou data k započtení, převede je na Integer a připíše jim + 1
}
else
{
$new_data=1; // pokud nebudou data k započtení připíše se jim hodnota 1 - jeden uživatel
}

$data[$zapocti]=$new_data; // přičte stávající počet uživatelů
}
else
{
// pokud soubor $JSON s daty neexistuje
$aktualniDatum=date('Y-m-d'); // Formát pro rok-měsíc-den
$data=array($zapocti=>1,"aktualniDatum"=>$aktualniDatum); // budou data prozatím pole s jedním uživatelem pro konkrétní webovou stránku a datumem, kdy byla statistika založena
}
$newJsonData = json_encode($data, JSON_PRETTY_PRINT); // aktualizovaná data zakóduje na JSON formát
file_put_contents($file_data, $newJsonData); // přepíše stávající JSON s aktualizovanými daty
}

}else{
http_response_code(405); // Method Not Allowed
}
?>