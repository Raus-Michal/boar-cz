const v_port={id:["hd","c-svg"],
idA:[["k1a","ao"],["k1b","ao"],["k1c","ao"],["k1d","ao"],["k1e","ao"],["k1f","ao"],["k2a","ao"],["k2b","ao"],["k2c","ao"],["k2d","ao"],["k2e","ao"],["k2f","ao"],["k3a","ao"],["k3b","ao"],["k3c","ao"],["k3d","ao"],["k3e","ao"],["k3f","ao"],["u1a","op"],["u1b","op"],["u1c","op"],["por1","ap"],["por2","ap"],["por3","ap"]],
idO:[["kar1",0],["kar2",0],["kar3",0],["u1",0],["por",0]],
a_p(id,t){
/* funkce zapne animaci objektu ID po čase T */
setTimeout(" document.getElementById('"+id+"').style.animationPlayState='running';",t);
},
handleEvent(){
const vyska=window.visualViewport.height;
const o1=document.getElementById(this.id[0]);
const o2=document.getElementById(this.id[1]);

o1.style.height=vyska+"px"; /* upraví výšku objektu podle VW port API */
o2.style.height=vyska+"px";
let d=this.idO.length;
for(let i=0;i<d;i++)
{
let ob=document.getElementById(this.idO[i][0]); /* objekt - kterým se spouští animace */
if(((window.visualViewport.pageTop-(window.visualViewport.height/2)-(ob.offsetHeight/2)+200)>(ob.offsetTop))&&((window.visualViewport.pageTop-(window.visualViewport.height/2)-200-(ob.offsetHeight/2))<(ob.offsetTop)))
{
/* podmínky a změna 3. parametru id objektu zabrání opětovnému spouštění animace */
if(this.idO[i][1]==0)
{
/* pokud nebyla animace na objektu spuštěna - následně změní parametr na 1 - čímž označí, že animace byla na objektu spuštěna */
this.idO[i][1]=1;
}
else if(this.idO[i][1]==1)
{
/* pokud bude mít id objektu parametr na 1 - znamená to, že již byla animace jednou spuštěna a bude return z funkce */
return;
}
/* KONEC  podmínky a změna 3. parametru id objektu zabrání opětovnému spouštění animace */

let t=[0,500,1000,1500,2000,2500]; /* časy postupného pouštění animací */

if(this.idO[i][0]==this.idO[0][0])
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

if(this.idO[i][0]==this.idO[1][0])
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

if(this.idO[i][0]==this.idO[2][0])
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

if(this.idO[i][0]==this.idO[3][0])
{
/* Pokud narazí uživatel scroolem na ID hlavního kontajneru spustí postupně 2 animace OPACITY */
this.a_p(this.idA[18][0],t[0]); /* spustí první animaci */
this.a_p(this.idA[19][0],t[1]); /* spustí druhou animaci */
this.a_p(this.idA[20][0],t[2]); /* spustí třetí animaci */
return;
}

if(this.idO[i][0]==this.idO[4][0])
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

animaceAktivace(){
/* přidělení CLASS s animací ID objektům */
let id=this.idA.length;
for(let i=0;i<id;i++)
{
let ob=document.getElementById(this.idA[i][0]);
ob.className+=" "+this.idA[i][1];
}},

DEaktivace(){
window.visualViewport.removeEventListener("resize",this);
window.visualViewport.removeEventListener("scroll",this);
removeEventListener("scroll",this);
},

zahajit(){
if(window&&window.visualViewport) /* test - zda je visualViewport podporováno */
{
this.aktivace(); /* zapne posluchač visualViewport */
this.animaceAktivace(); /* přepíše CLASS objektů na které se vztahuje animace */
this.handleEvent(); /* aktivuje Handle, pokud by bylo najeto zrovna na objekt s animací - aby se spustila */
}}};

v_port.zahajit(); /* aktivuje Visual View port API + úprava hlavičky na 100vh */


const odkazy={t1:500,t2:1000,
uprav(){
let ob=document.querySelectorAll("a"); /* najde včechny tagy A na stránce a udělá z nich pole */
let ob_s=ob.length;
for(let i=0;i<ob_s;i++)
{
let hr=ob[i].href; /* načte href objektu */
let hr_p=hr.indexOf("#"); /* pozice # v řetězci */
if(hr_p!=-1) /* pokud se pozice v řetězci == -1 , tak nebyl znak v řetězci nalezen */
{
let poz_rez=hr_p + 1; /* posune polohu řezu pro odkaz o jedno místo od # */
let odkaz=ob[i].href.slice(poz_rez); /* vytvoří konečný odkaz ořezáním původního */
if(odkaz!="") /* pokud nebude odkaz prázdným řetězcem */
{
ob[i].href="javascript:odkazy.roluj('"+odkaz+"');"; /* upravý href každého odkazu na javascriptovou funkci */

if(odkaz=="boar-cz")
{
ob[i].href="javascript:odkazy.roluj('"+odkaz+"',1);"; /* výjimka pro tlačíto Boar-cz, které dělá krátký posun z menu do první části Article */
}
}}}},

roluj(id,ne=0){
if(ne==0) /* pokud není druhý parametr funkce roven nule - neprovede blokaci animací */
{
v_port.DEaktivace(); /* vypne posluchač pro animace */
}
document.getElementById(id).scrollIntoView({behavior:"smooth",block:"start"}); /* provede scrool na objekt */
setTimeout("document.getElementById('"+id+"').scrollIntoView({behavior:'smooth',block:'start'});",this.t1); /* za 500ms provede opět scrool na objekt */
setTimeout("v_port.aktivace();v_port.handleEvent();",this.t2); /* za 1s opět zapne posluchač pro animace */
}};

const sdilet={_idFB:"sdil-fb",_idTW:"sdil-tw",_hrefFB:null,_hrefTW:null,SIRKA:600,VYSKA:600,min_VYSKA:800,min_SIRKA:800,
prepis(){
let vyska=parseInt(window.screen.height); /* výška obrazovky */
let sirka=parseInt(window.screen.width); /* šířka obrazovky */
let z_leva=sirka/2-this.SIRKA/2;
let z_hora=vyska/2-this.VYSKA/2;

/* funkce přepíše HREF na tlačítkách sdílet Facebook a sdílet Twitter */
if(document.getElementById(this._idFB)&&vyska>this.min_VYSKA&&sirka>this.min_SIRKA)
{
this._hrefFB=document.getElementById(this._idFB).href;
document.getElementById(this._idFB).target=""; /* target musí být prázdý jinak nové okno neotevře */
let textFB="window.open('"+this._hrefFB+"','Sdílet na FB','width="+this.SIRKA+",height="+this.VYSKA+",left="+z_leva+",top="+z_hora+"');";
document.getElementById(this._idFB).href="javascript:"+textFB;
}
if(document.getElementById(this._idTW)&&vyska>this.min_VYSKA&&sirka>this.min_SIRKA)
{
this._hrefTW=document.getElementById(this._idTW).href;
document.getElementById(this._idTW).target=""; /* target musí být prázdý jinak nové okno neotevře */
let textTW="window.open('"+this._hrefTW+"','Sdílet na Twittru','width="+this.SIRKA+",height="+this.VYSKA+",left="+z_leva+",top="+z_hora+"');";
document.getElementById(this._idTW).href="javascript:"+textTW;
}}};

setTimeout("v_port.zahajit();",500); /* aktivuje Visual View port API + úprava hlavičky na 100vh - pro pomalejší zařízení za 500ms */
setTimeout("v_port.zahajit();",1000); /* aktivuje Visual View port API + úprava hlavičky na 100vh - pro ještě pomalejší zařízení za 1000ms */
odkazy.uprav(); /* opraví odkazi na stránce na SCROOL */
sdilet.prepis(); /* zajistí přepis HREF tlačítek pro sdílení na Facebooku a Twittru */