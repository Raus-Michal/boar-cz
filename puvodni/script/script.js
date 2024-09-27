const v_port={id:["hd","c-svg"],
idA:[["k1a","ao"],["k1b","ao"],["k1c","ao"],["k1d","ao"],["k1e","ao"],["k1f","ao"],["k2a","ao"],["k2b","ao"],["k2c","ao"],["k2d","ao"],["k2e","ao"],["k2f","ao"],["k3a","ao"],["k3b","ao"],["k3c","ao"],["k3d","ao"],["k3e","ao"],["k3f","ao"],["u1a","op"],["u1b","op"],["u1c","op"],["por1","ap"],["por2","ap"],["por3","ap"]],
idO:[["kar1",0],["kar2",0],["kar3",0],["u1",0],["por",0]],
pocet_pouziti:0, // určuje kolikrát uživatel použil visualViewport, který se spouští mimojiné scroolem uživatele

a_p(id,t){
// funkce zapne animaci objektu ID po čase T
setTimeout(`document.getElementById("${id}").style.animationPlayState="running";`,t); // spuštění animace za čas t
},

async statistika(){
// funkce odešle připočtení statistiky po interakci stránky s uživatelem
if(this.pocet_pouziti!==-1) // -1 této proměnné bude určovat blokaci v počítání, protože uživatel již byl připočítán
{
++this.pocet_pouziti; // přičte použití visualViewport
if(this.pocet_pouziti>50) // pokud uživatel použil visualViewport více jak 50x
{
this.pocet_pouziti=-1; // nastavením proměnné na -1, určuje ukončení počítání použití visualViewport uživatelem

const dataToSend='boar'; // data, která budou zaslána
try{
  // Vytvoření AJAX požadavku
const xhr=new XMLHttpRequest();

xhr.open('POST','statistika/zapis.php',true);
xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');

// Reakce na dokončení požadavku
xhr.onload=()=>{
if(xhr.status===200){
// console.log('Data byla úspěšně odeslána.'); 
}else{
// console.log('Došlo k chybě při odesílání dat.');
}
};

xhr.send('data='+encodeURIComponent(dataToSend));  // Odeslání dat
}
catch(err){
console.log("Statistická data neodeslána. Chyba:"+err);
}}}},

handleEvent(){

this.statistika(); // vede statistiku o návštěvnosti - odesláním dat

const vyska=parseInt(window.visualViewport.height); // zjistí výšku visualViewport
const page_Top=parseInt(window.visualViewport.pageTop); // zjistí horní polohu visualViewport
const o1=document.getElementById(this.id[0]); // první objekt změny hlavička stránky
const o2=document.getElementById(this.id[1]); // druhý objekt změny SVG obrázek

o1.style.height=`${vyska}px`; // upraví výšku objektu podle visualViewport port API
o2.style.height=`${vyska}px`; // upraví výšku objektu podle visualViewport port API

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
return;
}

if(this.idO[i][0]===this.idO[1][0])
{
let z=6;
let b=12;
let cik=b-z;
for(let i=0;i<cik;i++)
{
let zP=z+i;
this.a_p(this.idA[zP][0],t[i]);
}
return;
}

if(this.idO[i][0]===this.idO[2][0])
{
let z=12;
let b=18;
let cik=b-z;
for(let i=0;i<cik;i++)
{
let zP=z+i;
this.a_p(this.idA[zP][0],t[i]);
}
return;
}

if(this.idO[i][0]===this.idO[3][0])
{
/* Pokud narazí uživatel scroolem na ID hlavního kontajneru spustí postupně 2 animace OPACITY */
this.a_p(this.idA[18][0],t[0]); /* spustí první animaci */
this.a_p(this.idA[19][0],t[1]); /* spustí druhou animaci */
this.a_p(this.idA[20][0],t[2]); /* spustí třetí animaci */
return;
}

if(this.idO[i][0]===this.idO[4][0])
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
return;
}}}},

aktivace(){
/* Posluchače */
window.visualViewport.addEventListener("resize",this);
window.visualViewport.addEventListener("scroll",this);
addEventListener("scroll",this);
},

async animaceAktivace(){
/* přidělení CLASS s animací ID objektům */
let id=this.idA.length; // délka pole animací3
for(let i=0;i<id;i++)
{
let ob=document.getElementById(this.idA[i][0]); // objekt HTML
ob.classList.add(this.idA[i][1]); // přidělení class objektu
}},

DEaktivace(){
window.visualViewport.removeEventListener("resize",this); // posluchač na změnu velkosti okna stránky
window.visualViewport.removeEventListener("scroll",this); // posluchač na scrool stránky
removeEventListener("scroll",this); // posluchač na scrool stránky
},

zahajit(){
if(window&&window.visualViewport) /* test - zda je visualViewport podporováno */
{
this.aktivace(); /* zapne posluchač visualViewport */
this.animaceAktivace(); /* přepíše CLASS objektů na které se vztahuje animace */
this.handleEvent(); /* aktivuje Handle, pokud by bylo najeto zrovna na objekt s animací - aby se spustila */
setTimeout(this.handleEvent.bind(this),500); /* aktivuje Visual View port API + úprava hlavičky na 100vh - pro pomalejší zařízení za 500ms */
setTimeout(this.handleEvent.bind(this),1000); /* aktivuje Visual View port API + úprava hlavičky na 100vh - pro ještě pomalejší zařízení za 1000ms */
}}};

v_port.zahajit(); /* aktivuje Visual View port API + úprava hlavičky na 100vh */


const odkazy={t1:500,t2:1000,
async uprav(){
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
}}}},

roluj(id,ne=0){
if(ne===0) /* pokud není druhý parametr funkce roven nule - neprovede blokaci animací */
{
v_port.DEaktivace(); /* vypne posluchač pro animace */
}
document.getElementById(id).scrollIntoView({behavior:"smooth",block:"start"}); /* provede scrool na objekt */
setTimeout(`document.getElementById('${id}').scrollIntoView({behavior:'smooth',block:'start'});`,this.t1); /* za 500ms provede opět scrool na objekt */
setTimeout(`v_port.aktivace();v_port.handleEvent();`,this.t2); /* za 1s opět zapne posluchač pro animace */
}};

const sdilet={_idFB:"sdil-fb",_idTW:"sdil-tw",SIRKA:600,VYSKA:600,min_VYSKA:800,min_SIRKA:800,
async prepis(){
let vyska=parseInt(window.screen.height); /* výška obrazovky */
let sirka=parseInt(window.screen.width); /* šířka obrazovky */
let z_leva=sirka/2-this.SIRKA/2;
let z_hora=vyska/2-this.VYSKA/2;

/* funkce přepíše HREF na tlačítkách sdílet Facebook a sdílet Twitter */
if(document.getElementById(this._idFB)&&vyska>this.min_VYSKA&&sirka>this.min_SIRKA)
{
const hrefFB=document.getElementById(this._idFB).href; // načte stávající href odkazu
document.getElementById(this._idFB).target=""; // target musí být prázdý jinak nové okno neotevře
let textFB=`window.open('${hrefFB}','Sdílet na FB','width=${this.SIRKA},height=${this.VYSKA},left=${z_leva},top=${z_hora}');`; // příprava nového href
document.getElementById(this._idFB).href=`javascript:${textFB}`; // dokončení nového href
}
if(document.getElementById(this._idTW)&&vyska>this.min_VYSKA&&sirka>this.min_SIRKA)
{
const hrefTW=document.getElementById(this._idTW).href;
document.getElementById(this._idTW).target=""; /* target musí být prázdý jinak nové okno neotevře */
let textTW=`window.open('${hrefTW}','Sdílet na Twittru','width=${this.SIRKA},height=${this.VYSKA},left=${z_leva},top=${z_hora}');`;
document.getElementById(this._idTW).href=`javascript:${textTW}`;
}}};


odkazy.uprav(); /* opraví odkazi na stránce na SCROOL */
sdilet.prepis(); /* zajistí přepis HREF tlačítek pro sdílení na Facebooku a Twittru */