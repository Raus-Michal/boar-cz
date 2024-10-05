<?php
// Přijetí dat
if($_SERVER['REQUEST_METHOD']==='POST'){
$sifrovani=$_POST['data'];

if($sifrovani=="homepage")
{
// podmínka, aby zaslaná data odpovídali klíči: sifrovani - potom teprve provede přičtení
$test = fopen("homepage.txt" , "a");
fclose($test); // pokud soubor neexistuje - vytvoří ho
$cteni = fopen("homepage.txt" , "r+"); // otevře soubor pro čtení
$pocet = fread($cteni,20);
++$pocet; // přidá +1
rewind($cteni);
fwrite($cteni,$pocet);
fclose($cteni); // zavře soubor
}
else if($sifrovani=="homepageVyz")
{
// podmínka, aby zaslaná data odpovídali klíči: sifrovani - potom teprve provede přičtení
$test = fopen("homepage-v.txt" , "a");
fclose($test); // pokud soubor neexistuje - vytvoří ho
$cteni = fopen("homepage-v.txt" , "r+"); // otevře soubor pro čtení
$pocet = fread($cteni,20);
++$pocet; // přidá +1
rewind($cteni);
fwrite($cteni,$pocet);
fclose($cteni); // zavře soubor
}
else if($sifrovani=="navsteva-vlk")
{
// podmínka, aby zaslaná data odpovídali klíči: sifrovani - potom teprve provede přičtení
$test = fopen("vlk.txt" , "a");
fclose($test); // pokud soubor neexistuje - vytvoří ho
$cteni = fopen("vlk.txt" , "r+"); // otevře soubor pro čtení
$pocet = fread($cteni,20);
++$pocet; // přidá +1
rewind($cteni);
fwrite($cteni,$pocet);
fclose($cteni); // zavře soubor
}
else if($sifrovani=="vyznamni-vlk")
{
// podmínka, aby zaslaná data odpovídali klíči: sifrovani - potom teprve provede přičtení
$test = fopen("vlk-vyznamni.txt" , "a");
fclose($test); // pokud soubor neexistuje - vytvoří ho
$cteni = fopen("vlk-vyznamni.txt" , "r+"); // otevře soubor pro čtení
$pocet = fread($cteni,20);
++$pocet; // přidá +1
rewind($cteni);
fwrite($cteni,$pocet);
fclose($cteni); // zavře soubor
}
else if($sifrovani=="vyzkouset-vlk")
{
// podmínka, aby zaslaná data odpovídali klíči: sifrovani - potom teprve provede přičtení
$test = fopen("vlk-vyzkouset.txt" , "a");
fclose($test); // pokud soubor neexistuje - vytvoří ho
$cteni = fopen("vlk-vyzkouset.txt" , "r+"); // otevře soubor pro čtení
$pocet = fread($cteni,20);
++$pocet; // přidá +1
rewind($cteni);
fwrite($cteni,$pocet);
fclose($cteni); // zavře soubor
}
else if($sifrovani=="vyzkouset-sifrovac")
{
// podmínka, aby zaslaná data odpovídali klíči: sifrovani - potom teprve provede přičtení
$test = fopen("sifrovac-vyzkouset.txt" , "a");
fclose($test); // pokud soubor neexistuje - vytvoří ho
$cteni = fopen("sifrovac-vyzkouset.txt" , "r+"); // otevře soubor pro čtení
$pocet = fread($cteni,20);
++$pocet; // přidá +1
rewind($cteni);
fwrite($cteni,$pocet);
fclose($cteni); // zavře soubor
}
else if($sifrovani=="navsteva-sifrovac")
{
// podmínka, aby zaslaná data odpovídali klíči: sifrovani - potom teprve provede přičtení
$test = fopen("sifrovac.txt" , "a");
fclose($test); // pokud soubor neexistuje - vytvoří ho
$cteni = fopen("sifrovac.txt" , "r+"); // otevře soubor pro čtení
$pocet = fread($cteni,20);
++$pocet; // přidá +1
rewind($cteni);
fwrite($cteni,$pocet);
fclose($cteni); // zavře soubor
}
else if($sifrovani=="vyznamni-sifrovac")
{
// podmínka, aby zaslaná data odpovídali klíči: sifrovani - potom teprve provede přičtení
$test = fopen("sifrovac-vyznamni.txt" , "a");
fclose($test); // pokud soubor neexistuje - vytvoří ho
$cteni = fopen("sifrovac-vyznamni.txt" , "r+"); // otevře soubor pro čtení
$pocet = fread($cteni,20);
++$pocet; // přidá +1
rewind($cteni);
fwrite($cteni,$pocet);
fclose($cteni); // zavře soubor
}
else if($sifrovani=="navsteva-programator")
{
// podmínka, aby zaslaná data odpovídali klíči: sifrovani - potom teprve provede přičtení
$test = fopen("programator.txt" , "a");
fclose($test); // pokud soubor neexistuje - vytvoří ho
$cteni = fopen("programator.txt" , "r+"); // otevře soubor pro čtení
$pocet = fread($cteni,20);
++$pocet; // přidá +1
rewind($cteni);
fwrite($cteni,$pocet);
fclose($cteni); // zavře soubor
}
else if($sifrovani=="vyznamni-programator")
{
// podmínka, aby zaslaná data odpovídali klíči: sifrovani - potom teprve provede přičtení
$test = fopen("programator-vyznamni.txt" , "a");
fclose($test); // pokud soubor neexistuje - vytvoří ho
$cteni = fopen("programator-vyznamni.txt" , "r+"); // otevře soubor pro čtení
$pocet = fread($cteni,20);
++$pocet; // přidá +1
rewind($cteni);
fwrite($cteni,$pocet);
fclose($cteni); // zavře soubor
}
else if($sifrovani=="pdf-zivotopis")
{
// podmínka, aby zaslaná data odpovídali klíči: sifrovani - potom teprve provede přičtení
$test = fopen("zivotopis.txt" , "a");
fclose($test); // pokud soubor neexistuje - vytvoří ho
$cteni = fopen("zivotopis.txt" , "r+"); // otevře soubor pro čtení
$pocet = fread($cteni,20);
++$pocet; // přidá +1
rewind($cteni);
fwrite($cteni,$pocet);
fclose($cteni); // zavře soubor
}
}else{
http_response_code(405); // Method Not Allowed
}
?>