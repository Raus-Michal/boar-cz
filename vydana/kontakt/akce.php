<?php
if(isset($_POST["obsah"]))
{
$tester='746cb7f16f653ff31e777638549b40a4';
$adresat=$_POST["adresa"];
if($tester==md5($adresat));
{
$text_formulare = $_POST["obsah"];
$predmet_formulare = $_POST["predmet"];
$odesilatel_jmeno = $_POST["jmeno"];
$odesilatel_email = $_POST["email"];
$celkovy_email = "Odesilatel: $odesilatel_jmeno / Kontakt: $odesilatel_email / Předmět: $predmet_formulare / Jeho sdělení: $text_formulare ";
$zasli_email = mail($adresat, 'Kontaktní formulař z Boar-cz.info', $celkovy_email);
if($zasli_email)
{
if(headers_sent())
{
header("Location:ok/faul.php");
exit;
}
else
{
header("Location:ok/");
exit;
}}
else
{
header("Location:ok/faul.php");
}
unset($adresat);
unset($text_formulare);
exit;
}}
?>