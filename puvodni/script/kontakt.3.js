const v_port={id:"hc",h_scale:null,vyska:null,
handleEvent(){

let vyska=window.visualViewport.height;

const o=document.getElementById(this.id);
const o1=document.body;

o.style.minHeight=vyska+"px";
o.style.height=vyska+"px";
o.style.maxHeight=vyska+"px";

o1.style.minHeight=vyska+"px";
o1.style.height=vyska+"px";
o1.style.maxHeight=vyska+"px";

let dorovnat="";
if(visualViewport.scale<1&&visualViewport.scale!=this.h_scale)
{
this.h_scale=visualViewport.scale;
dorovnat=(visualViewport.scale-1)+1;
o.style["-webkit-transform"]="scale("+dorovnat+")"; /* prefix css */
o.style["-ms-transform"]="scale("+dorovnat+")"; /* prefix css */
o.style.transform="scale("+dorovnat+")";

o1.style["-webkit-transform"]="scale("+dorovnat+")"; /* prefix css */
o1.style["-ms-transform"]="scale("+dorovnat+")"; /* prefix css */
o1.style.transform="scale("+dorovnat+")";
}
else if(visualViewport.scale>=1&&visualViewport.scale!=this.h_scale)
{
this.h_scale=visualViewport.scale;
dorovnat=visualViewport.scale;
o.style["-webkit-transform"]="scale("+dorovnat+")"; /* prefix css */
o.style["-ms-transform"]="scale("+dorovnat+")"; /* prefix css */
o.style.transform="scale("+dorovnat+")";

o1.style["-webkit-transform"]="scale("+dorovnat+")"; /* prefix css */
o1.style["-ms-transform"]="scale("+dorovnat+")"; /* prefix css */
o1.style.transform="scale("+dorovnat+")";
}},

aktivace(){
/* Posluchače */
window.visualViewport.addEventListener("resize", this);
window.visualViewport.addEventListener("scroll",this);
addEventListener("scroll",this);
},

zahajit(){
if(window&&window.visualViewport) /* test - zda je visualViewport podporováno */
{
this.aktivace();
this.handleEvent();
}}};
v_port.zahajit(); /* aktivuje VisualViewport API */

/* VYKRESLENÍ ČÍSEL NA PLÁTNĚ */
const p={_id:["c1","c2","c3"],_width:250,_height:300,_cara_styl:"rgb(0,0,0)",_vypln_styl:"rgb(110,87,168)",_pismo:"bold 350px sans-serif",_x:[],vyk:false,
vymaz(i){
let obj=window.document.getElementById(this._id[i]);
obj.width=obj.width; /* vyresetuje plátno */
},
cislo(){return Math.floor(Math.random()*10); /* nahodné číslo 0 až 9 */ },
kresly(i){
this.vymaz(i);
let obj=document.getElementById(this._id[i]);
let pl=obj.getContext("2d");
pl.font=this._pismo;
pl.textAlign="center";
pl.lineWidth=5;
pl.fillStyle=this._vypln_styl;
pl.strokeStyle=this._cara_styl;
let c=this.cislo();
pl.fillText(c,this._width/2,this._height-25);
pl.strokeText(c,this._width/2,this._height-25);
this._x.push(c); /* zapíše náhodné číslo do pole */
this.vyk=true; /* proměnná informuje, že náhodná čísla již byla vykreslena */
},
zahaj(){
this._x=[]; /* vymaže pole náhodných čísel */
let d=this._id.length;
for(let i=0;i<d;i++)
{
this.kresly(i); /* vykreslí čísla na plátno canvas */
}},
sum(){
/* sečte dohromady náhodně vygenerovaná čísla */
let kom=0;
let l=this._x.length;
for(let i=0;i<l;i++)
{
kom=kom+parseInt(this._x[i]);
}
return kom; /* vrátí součet čísel */
}};


const dia={id:[["d-v","d-vb","d-h-v"],["d-u","d-ub","d-h-u"],["d-c","d-cb","d-h-c"],["d-o","cir_1","d-h-o"]],

ak(id,nad,but){ /* id=id dialogového okna; nad=id nadpisu dialogového okna; but=id button dialogového okna */
/* provede samotnou akci otevření dialogového okna : otevření dialogového okna + aktivuje posluchač */
let t=100; /* prodleva pro zaměření buttonu */
document.getElementById(id).showModal(); /* otevře dialogové okno */
document.getElementById(id).style.display="grid"; /* musí být u dialog okna vytvořen grid! */
document.getElementById(nad).scrollIntoView({behavior:'smooth'}); /* bude scrool na nadpis, pokud by uživatel opět otevřel DIALOG a byl v něm posunut dole */
setTimeout("document.getElementById('"+but+"').focus();",t); /* zaměří button dialogového okna */
document.getElementById(but).addEventListener("click",this); /* přiřadí posuchače k buttonu dialogového okna */
},

zav(id,but){ /* id=id dialogového okna; but=id button dialogového okna */
/* funkce zavírá dialogové okno */
document.getElementById(id).close(); /* zavře dialog okno */
document.getElementById(id).style.display="none"; /* musí být display NONE, protože byl otevřen a zapnut display GRID */
document.getElementById(but).removeEventListener("click",this); /*  odebere posuchače k buttonu dialogového okna  */
},

ot(id){
/* zadost o otevrení dialogového okna */
if(id==this.id[0][0])
{
/* DIALOG - ŠPATNÝ VÝSLEDEK SEČTENÝCH ČÍSEL */
this.ak(this.id[0][0],this.id[0][2],this.id[0][1]); /* otevření dialogového okna + aktivuje posluchač */
}
else if(id==this.id[1][0])
{
/* DIALOG - PROČ JMÉNO a EMAIL */
this.ak(this.id[1][0],this.id[1][2],this.id[1][1]);
}
else if(id==this.id[2][0])
{
/* DIALOG - Proč kontrolní výpočet? */
this.ak(this.id[2][0],this.id[2][2],this.id[2][1]);
}
else if(id==this.id[3][0])
{
/* DIALOG - SDĚLENÍ SE ODESÍLÁ */
this.ak(this.id[3][0],this.id[3][2],this.id[3][1]);
setTimeout("document.getElementById('"+this.id[3][1]+"').beginElement();",500); /* pustí animaci */
setInterval("document.getElementById('"+this.id[3][1]+"').beginElement();",4500); /* bude pouštět animaci opět znova po jejím dokončení */
}
},

handleEvent(e){
/* ZAVÍRÁNÍ DIALOGOVÝCH OKEN */

let o=e.target.id; /* zjistí id prvku který aktivoval posluchač */

if(o==this.id[0][1])
{
/* DIALOG - ŠPATNÝ VÝSLEDEK SEČTENÝCH ČÍSEL */
this.zav(this.id[0][0],this.id[0][1]); /* zavře dialogové okno : id dialogového okna; id buttonu dialogového okna */
p.zahaj(); /* načte novou sadu čísel */
document.getElementById(sub.id_v).value=""; /* vymaže údaje z formuláře */
setTimeout("document.getElementById('"+sub.id_v+"').focus();",100); /* zaměří formulář - zadejte výsledek */
}
else if(o==this.id[1][1])
{
/* DIALOG - Proč Jméno a Email */
this.zav(this.id[1][0],this.id[1][1]); /* zavře dialogové okno : id dialogového okna; id buttonu dialogového okna */
}
else if(o==this.id[2][1])
{
/* DIALOG - Proč kontrolní výpočet? */
this.zav(this.id[2][0],this.id[2][1]);
}}};


const od={m:["..z.","xm@","@a",".c","ri","iu","mls","z","rt","sqh","ew"],id:"f4",id_a:"ad",

exit(h0,h1,h2){
/* funkce namixuje email na odeslání */
let k="";
k+=this.m[4].slice(h0,h1);
k+=this.m[h2].slice(h1,h2);
k+=this.m[5].slice(h1,h2);
k+=this.m[9].slice(h0,h1);
k+=this.m[h0].slice(h0,h1);
k+=this.m[6].slice(h0,h1);
k+=this.m[4].slice(h1,h2);
k+=this.m[3].slice(h1,h2);
k+=this.m[9].slice(2,3);
k+=this.m[h2].slice(h1,h2);
k+=this.m[6].slice(h1,h2);
k+=this.m[h2].slice(h0,h1);
k+=this.m[10].slice(h0,h1);
k+=this.m[6].slice(h0,h1);
k+=this.m[h2].slice(h1,h2);
k+=this.m[4].slice(h1,h2);
k+=this.m[6].slice(h1,h2);
k+=this.m[h0].slice(h0,h1);
k+=this.m[3].slice(h1,h2);
k+=this.m[0].slice(h2,3);
this.finis(k);
},

finis(hodnota){
document.getElementById(this.id_a).value=hodnota; /* zapíše emailovou adresu do input */
p.zahaj(); /* vykreslí čísla na plátno canvas */
this.rez(); /* uřeže přebytečný text- pokud by někdo byl tak "dobrý", že ho manuálně překoná */
document.getElementById(this.id).submit(); /* odešle formulář */
},
rez(){
/* ořeže text ve formuláři, pokud přesahuje limit */
let l1=30,l2=500, /* limity - počet znaků */ pf=3; /* počet id formulářů v poly s odpovědí do 30 znaků */

for(let i=0;i<pf;i++)
{
/* ořezání jména,emailu a předmětu sdělení */
if(document.getElementById(sub.r_id[i]).value.length>l1)
{
let ob=document.getElementById(sub.r_id[i]).value;
let n_ob=ob.substr(0,l1);
document.getElementById(sub.r_id[i]).value=n_ob;
}}

if(document.getElementById(sub.r_id[3]).value.length>l2)
{
/* ořezání obsahu sdělení */
let o_text=document.getElementById(sub.r_id[3]).value;
let n_t=o_text.substr(0,l2);
document.getElementById(sub.r_id[3]).value=n_t;
}}};

const sub={id:["f1","f2","f3","f4"],id_m:"me",h:[0.2,0.5,0.7,1],krok:0,id_a:"aaa",id_p:"d",id_sb:["o1","o2","o3","o4"],id_z:"z",id_v:"v",b_dia:["pr1","s1","pr2","s2"],z_id:["j","e","p","obs"],r_id:["j-r","e-r","p-r","o-r"],_text:"Opravdu si přejete odeslat uvedené?",
aktive(){
document.getElementById(this.id_v).addEventListener("click",this); /* přiřadí posuchač k INPUT Výsledek - aby došlo v případě malých displejů k správnému scroolu */
let d1=this.z_id.length;
for(var i=0;i<d1;i++)
{
document.getElementById(this.z_id[i]).addEventListener("click",this); /* přiřadí posuchač k INPUT jméno, email, předmět, obsah - aby došlo v případě malých displejů k správnému scroolu */
}


let d2=this.b_dia.length;
for(var i=0;i<d2;i++)
{
document.getElementById(this.b_dia[i]).addEventListener("click",this); /* přiřadí posuchače click k button DIALOGOVÁ okna Informace */
}

let d3=this.id.length;
for(var i=0;i<d3;i++)
{
document.getElementById(this.id[i]).addEventListener("submit",this); /* přiřadí posuchače submit k formulářím */
}

document.getElementById(this.id_p).addEventListener("click",this);  /* přiřadí posuchač k buttonu Pokračovat dolní lišty */
document.getElementById(this.id_z).addEventListener("click",this);  /* přiřadí posuchač k buttonu Krok zpět dolní lišty */


document.getElementById(this.id_v).value=""; /* vymaže PŘÍPADNÉ zadané číslo s výsledkem z input  */
},

predat(){
/* funkce slouží k předání dat z formulářů zadaných do formulářů rekapitulace, které jsou nachystané k odeslání */
const sada1=[];
const sada2=[];
let d1=this.z_id.length; /* délka pole ID formulářů zadaných uživatelem: Jméno, email, Předmět, Obsah */
let d2=this.r_id.length; /* délka pole ID formulářů rekapitulace zadaných dat uživatelem: Jméno, email, Předmět, Obsah */

for(let i=0;i<d1;i++)
{
sada1.push(document.getElementById(this.z_id[i]).value); /* do SADY1 přiřadí value jednotlivých dat z formuláře zadaných uživatelem */
}

for(let i=0;i<d2;i++)
{
sada2.push(document.getElementById(this.r_id[i])); /* do SADY2 přiřadí OBJEKTY formuláře pro rekapitulaci */
}

for(let i=0;i<d2;i++) /* je použito délky pole ID formulářů rekapitulace - má být stejná jako délka pole ID formulářů zadaných uživatelem: */
{
sada2[i].value=sada1[i];  /* dojde k přiřazení VALUE REKAPITULACE z Value zadaných uživatelem */
}
},

sc(time){
setTimeout("window.scrollTo(0, 0);",time); /* posun okna TOP */
},

zmena(kam){

let k=this.krok; /* krok v kterém se přechod nachází */
let f1=document.getElementById(this.id[k]); /* formulář schovat */
let f2;
if(kam=="d")
{
/* krok DÁL */
f2=document.getElementById(this.id[k+1]); /* formulář půjde vidět */
setTimeout("document.getElementById('"+this.id[k+1]+"').style.opacity=1;",100); /* zviditelní druhý formulář - zpoždění musí být jinak se opacity neprojeví */
}
else if(kam=="z")
{
/* krok ZPĚT */
f2=document.getElementById(this.id[k-1]);
setTimeout("document.getElementById('"+this.id[k-1]+"').style.opacity=1;",100);
}
f1.style.display="none";
f1.style.opacity=0;
f2.style.display="flex";
},

handleEvent(e){

let o=e.target.id; /* zjistí id prvku který aktivoval posluchač */
let n="none",b="block",f="flex";
let m=document.getElementById(this.id_m); /* meter */

if(o==this.z_id[0]||o==this.z_id[1]||o==this.z_id[2]||o==this.z_id[3])
{
/* Pokud uživatek klikne INPUT jméno nebo Email nebo předmět anebo obsah - SCROLL TOP  */
this.sc(500); /* posun okna TOP za 500ms */
}


if(o==this.id_v)
{
/* Pokud uživatek klikne na INPUT výsledek - SCROLL TOP */
this.sc(500); /* posun okna TOP za 500ms */
}


if(o==this.b_dia[0]||o==this.b_dia[1])
{
dia.ot(dia.id[1][0]); /* otevře dialogové okno Proč jméno a email */
}
else if(o==this.b_dia[2]||o==this.b_dia[3])
{
dia.ot(dia.id[2][0]); /* otevře dialogové okno Proč kontrolní výpočet */
}

if(o==this.id_p&&this.krok==0)
{
/* Kliknuto na tlačítko Pokračovat 1. */
document.getElementById(this.id_sb[0]).click(); /* provede klik na 1. tlačítko SUBMIT */
this.sc(250); /* posun okna TOP za 250ms */
}
else if(o==this.id_p&&this.krok==1)
{
/* Kliknuto na tlačítko Pokračovat 2. */
document.getElementById(this.id_sb[1]).click(); /* provede klik na 2. tlačítko SUBMIT */
this.sc(250); /* posun okna TOP za 250ms */
if(p.vyk==false) /* pokud ještě nedošlo k vykreslení náhodných čísel - vykreslí je */
{
p.zahaj(); /* vykreslí plátno s číslama */
}
}
else if(o==this.id_p&&this.krok==2)
{
/* Kliknuto na tlačítko Pokračovat 3. */
document.getElementById(this.id_sb[2]).click(); /* provede klik na 3. tlačítko SUBMIT */
this.sc(250); /* posun okna TOP za 250ms */
}
else if(o==this.id_p&&this.krok==3)
{
/* Kliknuto na tlačítko Pokračovat 4. --- již INHERováno na ODESLAT */
document.getElementById(this.id_sb[3]).click(); /* provede klik na 4. tlačítko SUBMIT */
this.sc(250); /* posun okna TOP za 250ms */
}
else if(o==this.id[0])
{
/* požadavek na odeslání 1. formuláře */
this.zmena("d");
m.value=this.h[1]; /* změní hodnotu METRU */
document.getElementById(this.id_a).style.display=n; /* schová odkaz A na Home page */
document.getElementById(this.id_z).style.display=b; /* zabrazí button Zpět */
document.getElementById(this.id_z).style.width=document.getElementById(this.id_p).offsetWidth+"px"; /* šířka tlačítka Krok zpět bude stejná jako tlačítka Pokračovat */
s2.aktive(); /* aktivuje posluchače k druhé straně formuláře */
uloz.n_dA(); /* načte dato z localstorage, zda uživatel neaktivoval tlačítko annonym Jméno anebo Email a podle toho klikne na tyto tlačítka */
++this.krok; /* přičte další krok */
}
else if(o==this.id[1])
{
/* požadavek na odeslání 2. formuláře */
this.zmena("d");
m.value=this.h[2]; /* změní hodnotu METRU */
++this.krok; /* přičte další krok */
}
else if(o==this.id[2])
{
/* požadavek na odeslání 3. formuláře */
let k=p.sum(); /* získá hodnotu součtu vykreslených čísel */
if(k!=parseInt(document.getElementById(this.id_v).value))
{
/* POKUD NEBUDE VÝSLEDEK SPRÁVNÝ */
dia.ot("d-v"); /* zobrazí dialog- součet čísel je chybný */
return;
}

this.predat(); /* funkce předá data z input zhadaných uživatelem do input rekapitulace */
this.zmena("d");
m.value=this.h[3]; /* změní hodnotu METRU */
document.getElementById(this.id_p).title="Odeslat formulář"; /* Změní hodnotu Tlačítka Pokračovat */
document.getElementById(this.id_p).innerText="Odeslat"; /* Změní hodnotu Tlačítka Pokračovat */
document.getElementById(this.id_p).style.width=document.getElementById(this.id_z).offsetWidth+"px"; /* šířka "nového" tlačítka Odeslat bude stejná jako tlačítka Krok zpět */
document.getElementById(this.id_p).focus(); /* focus na tlačítko Odeslat */
++this.krok; /* přičte další krok */
}
else if(o==this.id[3])
{
/* požadavek na odeslání 4. formuláře - ZÁVĚR ODESÍLÁNÍ */
let x=p.sum(); /* získá hodnotu součtu vykreslených čísel */
if(x==parseInt(document.getElementById(this.id_v).value))
{
if(window.confirm(this._text))
{
/* POKUD BUDE VÝSLEDEK SPRÁVNÝ */
dia.ot(dia.id[3][0]); /* otevře dialogové okno Odesílání */
uloz.smaz_data(); /* vymaže případná data z LocalStorage */
document.getElementById(this.id_v).value=""; /* vymaže zadané číslo s výsledkem */
od.exit(0,1,2); /* dokončí proces odesílání dat z formuláře */
}
}
else
{
dia.ot("d-v"); /* zobrazí dialog- součet čísel je chybný */
this.zmena("z"); /* posun zpět */
m.value=this.h[2]; /* změní hodnotu METRU */
document.getElementById(this.id_p).title="Krok dále"; /* vrátí hodnotu tlačítka Pokračovat na původní */
document.getElementById(this.id_p).innerText="Pokračovat"; /* vrátí hodnotu tlačítka Pokračovat na původní */
--this.krok; /* odečte další krok */
return false;
}}
else if(o==this.id_z&&this.krok==1)
{
/* Kliknuto na tlačítko Krok zpět z 2. formuláře */
this.zmena("z");
m.value=this.h[0]; /* změní hodnotu METRU */
document.getElementById(this.id_a).style.display=f; /* zobrazí odkaz A na Home page */
document.getElementById(this.id_z).style.display=n; /* schová button Zpět */
--this.krok; /* odečte další krok */
}
else if(o==this.id_z&&this.krok==2)
{
/* Kliknuto na tlačítko Krok zpět z 3. formuláře */
this.zmena("z");
m.value=this.h[1]; /* změní hodnotu METRU */
--this.krok; /* odečte další krok */
}
else if(o==this.id_z&&this.krok==3)
{
/* Kliknuto na tlačítko Krok zpět z 4. formuláře */
this.zmena("z");
m.value=this.h[2]; /* změní hodnotu METRU */
document.getElementById(this.id_p).title="Krok dále"; /* vrátí hodnotu tlačítka Pokračovat na původní */
document.getElementById(this.id_p).innerText="Pokračovat"; /* vrátí hodnotu tlačítka Pokračovat na původní */
--this.krok; /* odečte další krok */
}}};

/* UKLÁDÁNÍ DAT DO LOCAL STORAGE */
const uloz={ul:null,id:["j","e","p","obs"],id_a:["a_j","a_e"],
test(){
try
{
return this.ul="localStorage" in window && window["localStorage"] !== null; /* pokud funkce localdisk funguje vrátí hodnotu true */
}
catch(e)
{
return  this.ul=false; /* pokud funkce localdisk NEfunguje vrátí hodnotu false */
}},

handleEvent(e){
let o=e.target.id;
if(this.ul==true)
{
setTimeout("localStorage.setItem('"+o+"',document.getElementById('"+o+"').value);",100); /* uloží do localstorage data, kde klíč je ID inputu nebo text arei a obsah je jejich VALUE */
}},

nahraj_data(){
this.test();
if(this.ul==true)
{
let d=this.id.length;
for(let i=0;i<d;i++)
{
document.getElementById(this.id[i]).value=localStorage.getItem(this.id[i]);
}
}},

n_dA(){
/* nahraj data annonym - funkce přečte z localStorage, zda uživatel zaškrkl anoonnym Jméno a nebo Email a podle toho vyklikne buttony */
if(this.ul==true) /* načtení hodoty, zda je localstorage podporován */
{
let anonym_jmeno=localStorage.getItem(this.id_a[0]);
let anonym_email=localStorage.getItem(this.id_a[1]);

if(anonym_jmeno=="true"&&s2.nJ==0) /* s2.nJ 0 znamená že je DEaktivováno Nechci uvést */
{
document.getElementById(s2.but[0]).click(); /* Klikne na tlačítko Nechci uvést jméno */
}
if(anonym_email=="true"&&s2.nE==0) /* s2.nE 0 znamená že je DEaktivováno Nechci uvést */
{
document.getElementById(s2.but[2]).click(); /* Klikne na tlačítko Nechci uvést email */
}}
},

aktive(){
this.test();
if(this.ul==true)
{
let d=this.id.length;
for(let i=0;i<d;i++)
{
document.getElementById(this.id[i]).addEventListener("keyup",this);
document.getElementById(this.id[i]).addEventListener("cut",this);
document.getElementById(this.id[i]).addEventListener("paste",this);
}
}},
anonym(ktery,hodnota){
this.test();
if(this.ul==true)
{
if(ktery=="jmeno")
{
localStorage.setItem(this.id_a[0],hodnota);
}
else if(ktery=="email")
{
localStorage.setItem(this.id_a[1],hodnota);
}
}},
smaz_data(){
this.test();
if(this.ul==true)
{
let d=this.id.length;
for(let i=0;i<d;i++)
{
localStorage.removeItem(this.id[i]); /* smaže data zapsaná do formulářů uživatelem */
}
let d2=this.id_a.length;
for(let i=0;i<d2;i++)
{
localStorage.removeItem(this.id_a[i]); /* smaže data anonym jméno a email */
}}}};

/* objekt druhé strany kontaktního formuláře */
const s2={but:["nj","zav","ne"],inp:["j","e"],pJ:"",pE:"",nJ:0,nE:0,

aktive(){
let d=this.but.length;
for(var i=0;i<d;i++)
{
document.getElementById(this.but[i]).addEventListener("click",this); /* přiřadí posuchač clik k buttonům */
}},

handleEvent(e){

let o=e.target.id; /* zjistí id prvku který aktivoval posluchač */

let i_j=document.getElementById(this.inp[0]); /* input Jméno */
let i_e=document.getElementById(this.inp[1]); /* input Email */
let b_j=document.getElementById(this.but[0]); /* button Nechci uvádět jméno */
let b_e=document.getElementById(this.but[2]); /* button Nechci uvádět email */


if(o==this.but[0]&&this.nJ==0)
{
/* Kliknuto na tlačítko Nechci uvádět jméno */
this.pJ=i_j.value; /* uloží do proměnné dosavadní obsah Input */
i_j.value="ANONYM"; /* do formuláře napíše anonim */
i_j.disabled=true; /* zablokuje vpisování do formuláře Jméno */
b_j.innerText="Chci uvést jméno";
b_j.title="Rozmyslel jsem si to a chci uvést jméno";
this.nJ=1; /* změna na 1 znamená že je aktivováno Nechci uvést */
uloz.anonym("jmeno","true"); /* ulozi do Localstorage, že bylo aktivováno ANONYM jméno */
}
else if(o==this.but[0]&&this.nJ==1)
{
/* Kliknuto na tlačítko Chci uvádět jméno */
i_j.value=this.pJ; /* načte z promněnné předchozí VALUE Jména */
i_j.disabled=false; /* odblokuje vpisování do formuláře Jméno */
b_j.innerText="Nechci uvádět jméno";
b_j.title="Neuvádět jméno";
this.nJ=0; /* změna na 0 znamená že je DEaktivováno Nechci uvést */
uloz.anonym("jmeno","false"); /* ulozi do Localstorage, že bylo DEaktivováno ANONYM jméno */
}
else if(o==this.but[1]&&this.nE==0)
{
/* Kliknuto na tlačítko Napiš @ */
i_e.value=i_e.value+"@"; /* napíše @ do formuláře email */
i_e.focus(); /* zpět zaměří formulář s Emailem */
}
else if(o==this.but[2]&&this.nE==0)
{
/* Kliknuto na tlačítko Nechci uvádět email */
this.pE=i_e.value; /* uloží do proměnné dosavadní obsah Email adresy */
i_e.value="anonym@anonym.cz"; /* do formuláře napíše anonym */
i_e.disabled=true; /* zablokuje vpisování do formuláře Email */
b_e.innerText="Chci uvést email";
b_e.title="Rozmyslel jsem si to a chci uvést email";
this.nE=1; /* změna na 1 znamená že je aktivováno Nechci uvést */
uloz.anonym("email","true"); /* ulozi do Localstorage, že bylo aktivováno ANONYM email */
}
else if(o==this.but[2]&&this.nE==1)
{
/* Kliknuto na tlačítko Chci uvádět email */
i_e.value=this.pE; /* načte z promněnné předchozí VALUE Email */
i_e.disabled=false; /* odblokuje vpisování do formuláře Email */
b_e.innerText="Nechci uvádět email";
b_e.title="Neuvádět email";
this.nE=0; /* změna na 0 znamená že je DEaktivováno Nechci uvést */
uloz.anonym("email","false"); /* ulozi do Localstorage, že bylo DEaktivováno ANONYM email */
}}};


/* CITAČ ZNAKŮ */

const citac={id_area:"obs",id_h:"znaku",
handleEvent(){
setTimeout("document.getElementById('"+this.id_h+"').innerText=document.getElementById('"+this.id_area+"').value.length; /* uvede počet znaků v obsahu */ ",250); /* zpoždění musí být, jinak udělá propočet těsně před tím, než se vloží písmena */
},
aktive(){
document.getElementById(this.id_h).innerText=document.getElementById(this.id_area).value.length; /* uvede počet znaků v obsahu */
document.getElementById(this.id_area).addEventListener("keyup",this);
document.getElementById(this.id_area).addEventListener("cut",this);
document.getElementById(this.id_area).addEventListener("paste",this);
}};







sub.aktive(); /* posun mezi jednotlivími kroky formulářů */
uloz.aktive(); /* aktivuje posluchače k polím */
uloz.nahraj_data(); /* nahraje ulozená data, pokud jsou */
citac.aktive(); /* Zapne počítání znaků na 2. formuláři */