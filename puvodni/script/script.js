﻿"use strict";
class V_port
{
id=["hd","c-svg","svg_obr"]; // id HTML prvků na které bude aplikovaný rozměr Visual View portu
casovac=null; // časovač pro kontrolu faktické změny rozměru objektů podle Visual view portu
idA=[["k1a","ao"],["k1b","ao"],["k1c","ao"],["k1d","ao"],["k1e","ao"],["k1f","ao"],["k2a","ao"],["k2b","ao"],["k2c","ao"],["k2d","ao"],["k2e","ao"],["k2f","ao"],["k3a","ao"],["k3b","ao"],["k3c","ao"],["k3d","ao"],["k3e","ao"],["k3f","ao"],["u1a","op"],["u1b","op"],["u1c","op"],["por1","ap"],["por2","ap"],["por3","ap"]];
idO=[["kar1",0],["kar2",0],["kar3",0],["u1",0],["por",0]];
pocet_pouziti=0; // určuje kolikrát uživatel použil visualViewport, který se spouští mimojiné scroolem uživatele
odeslano=[false,false]; // určuje jestli byla odeslána statistika 0=návětěva 1=významná návštěva, false=neodesláno, true=odesláno
resize_acive=false; // proměnná hlídá, zda jiš došlo jednou k aktivaci posluchče pro resize obrazovky false=nedošlo, true=došlo
dvh_svh=false; // proměná určuje jestli prohlížeč zařízení podporuje CSS jednotky dvh anebo svh - pokud ano=TRUE, pokud ne=FALSE
a_p(id,t){
// funkce zapne animaci objektu ID po čase T
setTimeout(`document.getElementById("${id}").style.animationPlayState="running";`,t); // spuštění animace za čas t
};

async statistika(){
// funkce odešle připočtení statistiky po interakci stránky s uživatelem

if(this.odeslano[0]===false||this.odeslano[1]===false)
{
// pokud nebyla zaslána statistika 1 nebo statistika 2
++this.pocet_pouziti; // přičte použití visualViewport
let dataToSend=""; // data která se budou odesílat
if(this.pocet_pouziti>20&&this.pocet_pouziti<300&&this.odeslano[0]===false) // pokud je na stránce přítomen uživatel
{
dataToSend="homepage"; // data, která budou zaslána
this.odeslano[0]=true; // určuje jestli byla odeslána statistika 0=návětěva 1=významná návštěva, false=neodesláno, true=odesláno
}
else if(this.pocet_pouziti>300&&this.odeslano[1]===false) // pokud je na stránce přítomen významný uživatel
{
dataToSend="homepage_vyz"; // data, která budou zaslána
this.odeslano[1]=true; // určuje jestli byla odeslána statistika 0=návětěva 1=významná návštěva, false=neodesláno, true=odesláno
}
else
{
return; // pokud nebude splněna ani jedna podmínka
}

const token=document.querySelector("meta[name='csrf-token']").getAttribute("content"); // načte token z meta tagu HTML
const data=`csrf_token=${encodeURIComponent(token)}&zapocti=${encodeURIComponent(dataToSend)}`; // nachystá data na odeslání pro fetch API metodou post

// Vytvoření AJAX požadavku
fetch("statistika/zapis.php",{
method:"POST",  // Metoda POST
headers:{
"Content-Type":"application/x-www-form-urlencoded"  // Nastavení typu obsahu
},
body:data  // data ve formátu klíč=hodnota
})
.then(response=>response.text())  // Očekáváme textovou odpověď
.then(result=>{
console.log('Výsledek:',result);
})
.catch(error=>{
console.error('Chyba při odesílání dat:',error);
});
}

};
test_dvh_svh()
{
// funkce otestuje jestli prohlížeč zařízení podporuje CSS jednotky SVH anebo DVH
if(CSS.supports("height","1dvh")||CSS.supports("height","1svh"))
{
// podmínka otestuje, jestli prohlížeč zařízení podporuje jednotky SVH nebo DVH
this.dvh_svh=true; // proměná bude změněna na TRUE - integrované jednotky, který pohlídají výšku jsou implementovány v prohlížeči
}
};
vyska_header(){
 // funkce upraví výšku header na výšku view portu
const o1=document.getElementById(this.id[0]); // první objekt změny hlavička stránky
const o2=document.getElementById(this.id[1]); // druhý objekt změny box pro SVG obrázek
const o3=document.getElementById(this.id[2]); // třetí objekt změny SVG obrázek

const o1_v=parseInt(o1.clientHeight); // výška objektu 1
const o2_v=parseInt(o2.clientHeight); // výška objektu 2
const o3_v=parseInt(o3.clientHeight); // výška objektu 3

let d_v; // proměnná, která bude určovat výšku zařízení

// Kontrola, zda je podporováno API `visualViewport`
if(window.visualViewport){
// Pokud je dostupné, použijeme přesnou výšku viditelné oblasti
d_v=parseInt(window.visualViewport.height);
}else if(window.devicePixelRatio){
// Pokud není dostupné `visualViewport`, ale zařízení podporuje `devicePixelRatio`,
// přepočítáme výšku podle logické velikosti a pixelového poměru.
d_v=parseInt(window.innerHeight/window.devicePixelRatio);
}else if (document.documentElement&&document.documentElement.clientHeight) {
// Fallback: použijeme `document.documentElement.clientHeight`, pokud je dostupný
d_v=parseInt(document.documentElement.clientHeight);
}else{
// Poslední možnost: použijeme základní `window.innerHeight`
d_v=parseInt(window.innerHeight);
}

o3.style.maxHeight=`${d_v}px`; // přepsání hodnoty maximální výšky na aktuální výšku viewportu

if(o1_v!==d_v||o2_v!==d_v)
{
// pokud se výška jednoho ze sledovaných objektů !== výšce View portu

clearTimeout(this.casovac); // vynulování časovače objektu

 o1.style.height=`${d_v}px`; // přepsání hodnoty výšky na aktuální výšku viewportu
 o1.style.minHeight=`${d_v}px`; // přepsání hodnoty minimální výšky na aktuální výšku viewportu
 o2.style.height=`${d_v}px`; // přepsání hodnoty výšky na aktuální výšku viewportu
 o2.style.minHeight=`${d_v}px`; // přepsání hodnoty minimální výšky na aktuální výšku viewportu

this.casovac=setTimeout(()=>{
this.vyska_header(); // rekluze, funkce spustí za určitý čas, sama sebe, aby zkontrolovala, zda došlo k změně výšky sledovaných objektů na výšku viewportu
 },500); // tímto časovačem se za určitý čas provede opět kontrola rozměrů sledovaných objektů
}};
animace(){
// funkce zajišťuje animace HTML objektů na stránce
const vyska=parseInt(window.visualViewport.height); // zjistí výšku visualViewport
const page_Top=parseInt(window.visualViewport.pageTop); // zjistí horní polohu visualViewport

let d=this.idO.length; // délka pole s animacemi

for(let i=0;i<d;i++)
{
let ob=document.getElementById(this.idO[i][0]); // objekt - kterým se spouští animace

if(((page_Top-(vyska/2)-(ob.offsetHeight/2)+200)>(ob.offsetTop))&&((page_Top-(vyska/2)-200-(ob.offsetHeight/2))<(ob.offsetTop)))
{
/* podmínky a změna 3. parametru id objektu zabrání opětovnému spouštění animace */
if(this.idO[i][1]===0)
{
/* pokud nebyla animace na objektu spuštěna - následně změní parametr na 1 - čímž označí, že animace byla na objektu spuštěna */
this.idO[i][1]=1;
}
else if(this.idO[i][1]===1)
{
/* pokud bude mít id objektu parametr na 1 - znamená to, že již byla animace jednou spuštěna a bude return z funkce */
return;
}
/* KONEC  podmínky a změna 3. parametru id objektu zabrání opětovnému spouštění animace */

let t=[0,500,1000,1500,2000,2500]; /* časy postupného pouštění animací */

if(this.idO[i][0]===this.idO[0][0])
{
/* Pokud narazí uživatel scroolem na ID hlavního kontajneru spustí postupně 6 objektů karet daného bloku */
let z=0; /* začátek ID bloku pouštěných animací */
let b=6; /* konce ID bloku pouštěných animací */
let cik=b-z; /* počet ciklů bloku */
for(let i=0;i<cik;i++)
{
let zP=z+i; /* zP určuje počáteční ID bloku animací */
this.a_p(this.idA[zP][0],t[i]); /* spustí první až šestou animaci KARET */
}
}
else if(this.idO[i][0]===this.idO[1][0])
{
let z=6;
let b=12;
let cik=b-z;
for(let i=0;i<cik;i++)
{
let zP=z+i;
this.a_p(this.idA[zP][0],t[i]);
}}
else if(this.idO[i][0]===this.idO[2][0])
{
let z=12;
let b=18;
let cik=b-z;
for(let i=0;i<cik;i++)
{
let zP=z+i;
this.a_p(this.idA[zP][0],t[i]);
}}
else if(this.idO[i][0]===this.idO[3][0])
{
/* Pokud narazí uživatel scroolem na ID hlavního kontajneru spustí postupně 2 animace OPACITY */
this.a_p(this.idA[18][0],t[0]); /* spustí první animaci */
this.a_p(this.idA[19][0],t[1]); /* spustí druhou animaci */
this.a_p(this.idA[20][0],t[2]); /* spustí třetí animaci */
}
else if(this.idO[i][0]===this.idO[4][0])
{
/* Pokud narazí uživatel scroolem na ID hlavního kontajneru spustí postupně 3 animace Nájezdu karty */
let z=21; /* začátek ID bloku pouštěných animací */
let b=24; /* konce ID bloku pouštěných animací */
let cik=b-z;  /* počet ciklů bloku */
for(let i=0;i<cik;i++)
{
let zP=z+i;  /* zP určuje počáteční ID bloku animací */
this.a_p(this.idA[zP][0],t[i]);
}
}}}
};
handleEvent(){
this.statistika(); // vede statistiku o návštěvnosti - odesláním dat
this.animace(); // funkce zajišťuje animace HTML objektů na stránce
};
DEaktivace(){
// Posluchače - ODEBERE pro SCROLL (používá se při posunu na homepage pomocí scrollTo, během toho se to vypíná)
window.visualViewport.removeEventListener("resize",this.vyska_header.bind(this),{passive:true}); // posluchač změny velikosti okna spustí funkci, která upraví výšku header na výšku zařízení uživatele
window.visualViewport.removeEventListener("scroll",this,{passive:true}); // posluchač sleduje scrool uživatele a zapíná statistiku anebo pouští animace
removeEventListener("scroll",this,{passive:true});// posluchač sleduje scrool uživatele a zapíná statistiku anebo pouští animace
};
aktivace(){
// Posluchače - PŘIDÁ
this.test_dvh_svh(); // funkce otestuje jestli prohlížeč zařízení podporuje CSS jednotky SVH anebo DVH

if(!this.resize_acive&&!this.dvh_svh)
{
// proměnná hlídá, aby nedošlo vícekrát k zapnutí zbytečně tohoto posluchače, ten kvůli použití this.bind(this) nelze odebrat, tudíš jeho vícepřidání zatěžuje zařízení uživatele - dále také hlídá jestli prohlížeč zařízení podporuje CSS jednotky dvh nebo svh - v případě podpory těchto jednotej, je aktivace posluchače nadbytečná
this.vyska_header(); // funkce přizpůsobí výšku headeru výšce obrazovky zařízení uživatele
window.visualViewport.addEventListener("resize",this.vyska_header.bind(this),{passive:true}); // posluchač změny velikosti okna spustí funkci, která upraví výšku header na výšku zařízení uživatele
this.resize_acive=true; // změna proměnné určí, že již byl posluchač aktivován; { passive: true } jako třetí parametr ve addEventListener, což prohlížeči řekne, že event handler nebude volat preventDefault(), což umožňuje lepší optimalizaci výkonu.
}
window.visualViewport.addEventListener("scroll",this,{passive:true}); // posluchač sleduje scrool uživatele a zapíná statistiku anebo pouští animace; { passive: true } jako třetí parametr ve addEventListener, což prohlížeči řekne, že event handler nebude volat preventDefault(), což umožňuje lepší optimalizaci výkonu.
addEventListener("scroll",this,{passive:true});// posluchač sleduje scrool uživatele a zapíná statistiku anebo pouští animace; { passive: true } jako třetí parametr ve addEventListener, což prohlížeči řekne, že event handler nebude volat preventDefault(), což umožňuje lepší optimalizaci výkonu.
};

animaceAktivace(){
// přidělení CLASS s animací ID objektům
let id=this.idA.length; // délka pole animací3
for(let i=0;i<id;i++)
{
let ob=document.getElementById(this.idA[i][0]); // objekt HTML
ob.classList.add(this.idA[i][1]); // přidělení class objektu
}};

zahajit(){
// funkce zahájí procesy, které upravý výšku header stránky na výšku obrazovky zařízení uživatele a zapne posluchače Visual View port API - scroll a resize
if(window&&window.visualViewport) /* test - zda je visualViewport podporováno */
{
this.aktivace(); // zapne posluchač visualViewport
this.animaceAktivace(); // přepíše CLASS objektů na které se vztahuje animace
}}};



class Odkazy
{
t1=500;
t2=1000;
uprav(){
let ob=document.querySelectorAll("a"); /* najde včechny tagy A na stránce a udělá z nich pole */
let ob_s=ob.length;
for(let i=0;i<ob_s;i++)
{
let hr=ob[i].href; /* načte href objektu */
let hr_p=hr.indexOf("#"); /* pozice # v řetězci */
if(hr_p!==-1) /* pokud se pozice v řetězci === -1 , tak nebyl znak v řetězci nalezen */
{
let poz_rez=hr_p+1; /* posune polohu řezu pro odkaz o jedno místo od # */
let odkaz=ob[i].href.slice(poz_rez); /* vytvoří konečný odkaz ořezáním původního */
if(odkaz!=="") /* pokud nebude odkaz prázdným řetězcem */
{
ob[i].href=`javascript:odkazy.roluj('${odkaz}');`; /* upravý href každého odkazu na javascriptovou funkci */

if(odkaz==="boar-cz")
{
ob[i].href=`javascript:odkazy.roluj('${odkaz}',1);`; /* výjimka pro tlačíto Boar-cz, které dělá krátký posun z menu do první části Article */
}
}}}};

roluj(id,ne=0){
if(ne===0) /* pokud není druhý parametr funkce roven nule - neprovede blokaci animací */
{
v_port.DEaktivace(); /* vypne posluchač pro animace */
}
document.getElementById(id).scrollIntoView({behavior:"smooth",block:"start"}); /* provede scrool na objekt */
setTimeout(`document.getElementById('${id}').scrollIntoView({behavior:'smooth',block:'start'});`,this.t1); /* za 500ms provede opět scrool na objekt */
setTimeout(`v_port.aktivace();v_port.handleEvent();`,this.t2); /* za 1s opět zapne posluchač pro animace */
}};

class Sdilet{
_idFB="sdil-fb";
_idTW="sdil-tw";
SIRKA=600;
VYSKA=600;
min_VYSKA=800;
min_SIRKA=800;
prepis(){
const vyska=window.screen.height; // výška obrazovky
const sirka=window.screen.width; // šířka obrazovky
const z_leva=sirka/2-this.SIRKA/2;
const z_hora=vyska/2-this.VYSKA/2;
const updateLink=(id,windowName)=>
{
const el=document.getElementById(id);
if(el&&vyska>this.min_VYSKA&&sirka>this.min_SIRKA)
{
const href=el.href; // načte stávající href odkazu
el.removeAttribute("href"); // odstraní stávající href
el.addEventListener("click",(e)=>{
e.preventDefault(); // zabrání standardnímu chování odkazu
window.open(href, windowName, `width=${this.SIRKA},height=${this.VYSKA},left=${z_leva},top=${z_hora},resizable=yes`); // otevře nové okno
});
}
};
// Přepíše HREF na tlačítkách sdílet Facebook a sdílet Twitter
updateLink(this._idFB,'Sdílet na FB');
updateLink(this._idTW,'Sdílet na Twitteru');
}
};


const v_port=new V_port(); // vytvoří objekt
const odkazy=new Odkazy(); // vytvoří objekt
const sdilet=new Sdilet(); // založí z class Sdilet objekt sdilet


window.addEventListener("load",()=>{
// posluchač se spustí, když je celá stránka načtena, včetně všech souborů CSS a obrázků.
odkazy.uprav(); /* opraví odkazi na stránce na SCROOL */
sdilet.prepis(); /* zajistí přepis HREF tlačítek pro sdílení na Facebooku a Twittru */
v_port.zahajit(); // aktivuje Visual View port API + úprava hlavičky na 100vh
});