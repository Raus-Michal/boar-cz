const statistika={
id_but:"zivotopis", // id buttonů, které podléhají statistice
data:["klik_programator","programator","programator_vyz"], // data, která jsou odesílána
pocet:0, // proměnná hlídá počet scrool na stránce
odeslano_scroll:[false,false], // proměnná hlídá, zda už byly statistiky scroll [návštěvník,významní]
async odesli_data(co_poslat){
// funkce odesílá data
const token=document.querySelector("meta[name='csrf-token']").getAttribute("content"); // načte token z meta tagu HTML
const data=`csrf_token=${encodeURIComponent(token)}&zapocti=${encodeURIComponent(co_poslat)}`; // nachystá data na odeslání pro fetch API metodou post

// Vytvoření AJAX požadavku
fetch("../statistika/zapis.php",{
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
},
handleEvent()
{

// došlo ke scrool
this.pocet++; // přičte + 1 počet
if(this.pocet>20&&this.odeslano_scroll[0]===false)
{
this.odesli_data(this.data[1]); // pošle data funkci, že byl návštěvník
this.odeslano_scroll[0]=true;
}
else if(this.pocet>150&&this.odeslano_scroll[1]===false)
{
this.odesli_data(this.data[2]); // pošle data funkci, že byl návštěvník významný
this.odeslano_scroll[1]=true;
}
},
aktivace(){

if(window&&window.visualViewport) // test - zda je visualViewport podporováno
{
window.visualViewport.addEventListener("scroll",this); // aktivuje posluchač pro pohyb na webu - prostřednictvím Visual View port API
}
addEventListener("scroll",this); // aktivuje sekundární posluchač pro pohyb na webu
document.getElementById(this.id_but).addEventListener("click",()=>{
this.odesli_data(this.data[0]); // přidá posluchač click buttonům s id uvedeným v poli
});

}};

const sdilet={_idFB:"sdil-fb",_idTW:"sdil-tw",SIRKA:600,VYSKA:600,min_VYSKA:800,min_SIRKA:800,
async prepis(){
let vyska=parseInt(window.screen.height); // výška obrazovky
let sirka=parseInt(window.screen.width); // šířka obrazovky
let z_leva=sirka/2-this.SIRKA/2;
let z_hora=vyska/2-this.VYSKA/2;

// funkce přepíše HREF na tlačítkách sdílet Facebook a sdílet Twitter
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
document.getElementById(this._idTW).target=""; // target musí být prázdý jinak nové okno neotevře
let textTW=`window.open('${hrefTW}','Sdílet na Twittru','width=${this.SIRKA},height=${this.VYSKA},left=${z_leva},top=${z_hora}');`;
document.getElementById(this._idTW).href=`javascript:${textTW}`;
}}};

const odkazy={
id:["a-programator"], // id odkazů, které se budou měnit
t1:500,
t2:1000,
async uprav(){
let ob_s=this.id.length; // načte délku řetězce
for(let i=0;i<ob_s;i++)
{
let hr=document.getElementById(this.id[i]).href; /* načte href objektu */
let hr_p=hr.indexOf("#"); /* pozice # v řetězci */
if(hr_p!==-1) /* pokud se pozice v řetězci === -1 , tak nebyl znak v řetězci nalezen */
{
let poz_rez=hr_p+1; /* posune polohu řezu pro odkaz o jedno místo od # */
let odkaz=hr.slice(poz_rez); /* vytvoří konečný odkaz ořezáním původního */
if(odkaz!=="") /* pokud nebude odkaz prázdným řetězcem */
{
document.getElementById(this.id[i]).href=`javascript:odkazy.roluj('${odkaz}');`; /* upravý href každého odkazu na javascriptovou funkci */
}}}},

roluj(id){
document.getElementById(id).scrollIntoView({behavior:"smooth",block:"start"}); /* provede scrool na objekt */
setTimeout(`document.getElementById('${id}').scrollIntoView({behavior:'smooth',block:'start'});`,this.t1); /* za 500ms provede opět scrool na objekt */
}};

odkazy.uprav(); // upraví odkazy na stránce na SCROOL
statistika.aktivace(); // aktivuje script pro odesílání statistiky
sdilet.prepis(); // zajistí přepis HREF tlačítek pro sdílení na Facebooku a Twittru