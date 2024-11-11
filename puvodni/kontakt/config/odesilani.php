<?php
/* ODESÍLÁNÍ EMAILU */
if(isset($_POST["obsah"]))
{ // pokud existuje zaslaný obsah od uživatele

$adresat="raus.michal@email.cz"; // emailova adresa, kam se má obsah zaslat

$text_formulare=$_POST["obsah"]; // obsah emailu
$predmet_formulare=$_POST["predmet"]; // předmět emailu
$odeslano_z="Boar-cz.info"; // z které webové domény byl formulář odeslán
$odesilatel_jmeno=$_POST["jmeno"]; // jméno odesílatele
$odesilatel_email=$_POST["email"]; // email odesílatele 

$celkovy_email=<<<OBSAH_EMAIL
<html>
<head>
<title>{$predmet_formulare}</title>
<style>
body{font-family: Arial,sans-serif;}
.header{background-color:#f2f2f2;padding:20px;text-align:center;}
.content{padding: 20px;}
.footer{background-color: #f2f2f2; padding: 10px; text-align: center; }
</style>
</head>
<body>
<div class="header">
<h1>{$predmet_formulare}</h1>
</div>
<div class="content">
<p><strong>Kontaktní formulař z {$odeslano_z}</strong></p>
<p>Sdělení odesílatele:</p>
<p>{$text_formulare}</p>
<h2>Kontakt na odesílatele</h2>
<p>Jméno odesílatele: $odesilatel_jmeno </p>
<p>Email odesílatele: $odesilatel_email </p>
</div>
<div class="footer">
<p>&copy;2024 Boar-cz</p>
</div>
</body>
</html>
OBSAH_EMAIL; // celkové zaslaný email v HTML za pomocí here documenty= <<<OBSAH_EMAIL ... obsah ... OBSAH_EMAIL;


// Nastavení hlaviček pro HTML email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

// Další hlavičky (volitelné)
$headers .= "From: $odesilatel_jmeno < $odesilatel_email >" . "\r\n";

$zasli_email=mail($adresat,$predmet_formulare,$celkovy_email,$headers); // odešle email (email adresata, předmět emailu , obsah emailu , hlavička emailu)

if($zasli_email)
{
// pokud byl email odeslán

// vestavena funkce headers_sent() zajistí, ze budeme vedet, ze presmerovani stranky pomoci funkce header je mozna, pokud ano - provede presmerovani, pokud ne - vypise ECHO, Návratová hodnota headers_sent() vrátí true, pokud není možné přesměrování anebo false pokud je možné přesměrování
if(headers_sent())
{
echo "Vaše sdělení bylo úspěšně odesláno provozovateli webu! Děkujeme!";
exit; // příkaz EXIT php program ukončí právě v tomto místě
}
else
{
header("Location:ok/ok.html"); // stránka se pomocí vestavene funkce header() presměruje a script níze uz se neprovede
exit; // příkaz EXIT php program ukončí právě v tomto místě
}

}
else
{
// pokud nebyl email odeslán
// vestavena funkce headers_sent() zajistí, ze budeme vedet, ze presmerovani stranky pomoci funkce header je mozna, pokud ano - provede presmerovani, pokud ne - vypise ECHO, Návratová hodnota headers_sent() vrátí true, pokud není možné přesměrování anebo false pokud je možné přesměrování
if(headers_sent())
{
echo "Je nám líto. Vaše sdělení nebylo odesláno provozovateli webu! Omlouváme se! Zkuste to prosím později.";
}
else
{
header("Location:ok/faul.html"); // stránka se pomocí vestavene funkce header() presměruje a script níze uz se neprovede
exit; // příkaz EXIT php program ukončí právě v tomto místě
}
}


}
/* konec ODESÍLÁNÍ EMAILU*/

?>
