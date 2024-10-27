<?php
// čtení statistických dat
$file_data = "../statistika/config/pocet-kliku.json"; // soubor JSON se statistickými daty - cesta je od souboru, u kterého je provedeno include
if (file_exists($file_data)){
// pokud existuje JSON soubor s daty
$jsonData = file_get_contents($file_data); // načte soubor JSON
$data = json_decode($jsonData, true); // dekóduje data JSON

if($data["homepage"])
{
// pokud budou data o statistice homepage
$homepage=$data["homepage"];
}
else
{
// pokud nebudou data o statistice homepage
$homepage=0;
}

if($data["homepage_vyz"])
{
// pokud budou data o statistice homepage Významní
$homepage_vyz=$data["homepage_vyz"];
}
else
{
// pokud nebudou data o statistice homepage Významní
$homepage_vyz=0;
}


if($data["nocni_vlk"])
{
// pokud budou data o statistice článek Noční VLK
$nocni_vlk=$data["nocni_vlk"];
}
else
{
// pokud nebudou data o statistice článek Noční VLK
$nocni_vlk=0;
}

if($data["nocni_vlk_vyz"])
{
// pokud budou data o statistice článek Noční VLK Významní
$nocni_vlk_vyz=$data["nocni_vlk_vyz"];
}
else
{
// pokud nebudou data o statistice článek Noční VLK Významní
$nocni_vlk_vyz=0;
}

if($data["klik_vlk"])
{
// pokud budou data o statistice klik na Vyzkoušet Nočního VLKa
$klik_vlk=$data["klik_vlk"];
}
else
{
// pokud nebudou data o statistice klik na Vyzkoušet Nočního VLKa
$klik_vlk=0;
}



if($data["sifrovac"])
{
// pokud budou data o statistice článek Šifrovač
$sifrovac=$data["sifrovac"];
}
else
{
// pokud nebudou data o statistice článek Šifrovač
$sifrovac=0;
}

if($data["sifrovac_vyz"])
{
// pokud budou data o statistice článek Šifrovač Významní
$sifrovac_vyz=$data["sifrovac_vyz"];
}
else
{
// pokud nebudou data o statistice článek Šifrovač Významní
$sifrovac_vyz=0;
}

if($data["klik_sifrovac"])
{
// pokud budou data o statistice klik na Vyzkoušet Šifrovač
$klik_sifrovac=$data["klik_sifrovac"];
}
else
{
// pokud nebudou data o statistice klik na Vyzkoušet Šifrovač
$klik_sifrovac=0;
}


if($data["programator"])
{
// pokud budou data o statistice článek Programátor
$programator=$data["programator"];
}
else
{
// pokud nebudou data o statistice článek Programátor
$programator=0;
}

if($data["programator_vyz"])
{
// pokud budou data o statistice článek Programátor Významní
$programator_vyz=$data["programator_vyz"];
}
else
{
// pokud nebudou data o statistice článek Programátor Významní
$programator_vyz=0;
}

if($data["klik_programator"])
{
// pokud budou data o statistice klik na Programátor Životopis
$klik_programator=$data["klik_programator"];
}
else
{
// pokud nebudou data o statistice klik na Programátor Životopis
$klik_programator=0;
}


if($data["konopi"])
{
// pokud budou data o statistice článek Pěstování konopí a trest
$konopi=$data["konopi"];
}
else
{
// pokud nebudou data o statistice článek Pěstování konopí a trest
$konopi=0;
}

if($data["konopi_vyz"])
{
// pokud budou data o statistice článek Pěstování konopí a trest Významní
$konopi_vyz=$data["konopi"];
}
else
{
// pokud nebudou data o statistice článek Pěstování konopí a trest Významní
$konopi_vyz=0;
}

if($data["klik_konopi"])
{
// pokud budou data o statistice klik na Přejít na Pěstování konopí a trest
$klik_konopi=$data["klik_konopi"];
}
else
{
// pokud nebudou data o statistice klik na Přejít na Pěstování konopí a trest
$klik_konopi=0;
}

}
else
{
// pokud soubor $JSON s daty neexistuje
$homepage=0;
$homepage_vyz=0;
$nocni_vlk=0;
$nocni_vlk_vyz=0;
$klik_vlk=0;
$sifrovac=0;
$sifrovac_vyz=0;
$klik_sifrovac=0;
$programator=0;
$programator_vyz=0;
$klik_programator=0;
$konopi=0;
$konopi_vyz=0;
$klik_konopi=0;
}
?>