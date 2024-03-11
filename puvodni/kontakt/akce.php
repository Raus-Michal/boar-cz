<?php
/* ODESÍLÁNÍ EMAILU */
if (isset($_POST["obsah"]))
{

$tester = '746cb7f16f653ff31e777638549b40a4';
$adresat = $_POST["adresa"];

if($tester == md5($adresat));
{

$text_formulare = $_POST["obsah"];

$predmet_formulare = $_POST["predmet"];


$odesilatel_jmeno = $_POST["jmeno"];
$odesilatel_email = $_POST["email"];
$celkovy_email = "Odesilatel: $odesilatel_jmeno / Kontakt: $odesilatel_email / Předmět: $predmet_formulare / Jeho sdělení: $text_formulare ";

$zasli_email = mail($adresat, 'Kontaktní formulař z Boar-cz.info', $celkovy_email);

if ($zasli_email)
{
// vestavena funkce headers_sent() zajistí, ze budeme vedet, ze presmerovani stranky pomoci funkce header je mozna, pokud ano - provede presmerovani, pokud ne - vypise ECHO
if (headers_sent())
{
header("Location:ok/faul.php"); // stránka se pomocí vestavene funkce header() presměruje a script níze uz se neprovede
/* místo hlášky DEJ ODKAZ na html stránku - s vysvětlením a ať napíší přes svoji poštovní schránku manuálně na email, to co chtěli uvést do formuláře. */

exit; // příkaz EXIT php program ukončí právě v tomto místě
}
else
{
header("Location:ok/"); // stránka se pomocí vestavene funkce header() presměruje na www.novinky.cz a script níze uz se neprovede

exit; // příkaz EXIT php program ukončí právě v tomto místě
}

}
else
{
header("Location:ok/faul.php"); // stránka se pomocí vestavene funkce header() presměruje a script níze uz se neprovede
/* místo hlášky DEJ ODKAZ na html stránku - s vysvětlením a ať napíší přes svoji poštovní schránku manuálně na email, to co chtěli uvést do formuláře. */
}

unset($adresat);
unset($text_formulare); /* funkce unset() vymaže proměnnou $text_formulare, jako by neexistovala */
exit; // příkaz EXIT php program ukončí právě v tomto místě
}}
/* konec ODESÍLÁNÍ EMAILU*/

?>
