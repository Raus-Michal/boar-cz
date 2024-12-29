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
window.visualViewport.addEventListener("scroll",this,{passive:true}); // aktivuje posluchač pro pohyb na webu - prostřednictvím Visual View port API; { passive: true } jako třetí parametr ve addEventListener, což prohlížeči řekne, že event handler nebude volat preventDefault(), což umožňuje lepší optimalizaci výkonu.
}
addEventListener("scroll",this,{passive:true}); // aktivuje sekundární posluchač pro pohyb na webu; { passive: true } jako třetí parametr ve addEventListener, což prohlížeči řekne, že event handler nebude volat preventDefault(), což umožňuje lepší optimalizaci výkonu.
document.getElementById(this.id_but).addEventListener("click",()=>{
this.odesli_data(this.data[0]); // přidá posluchač click buttonům s id uvedeným v poli
});

}};

const odkaz={
id:["sdil-fb","sdil-tw","massenger","linked","zivotopis"], // id odkazů, které mají být změněny
SIRKA:600, // šířka nového okna
VYSKA:600, // výška nového okna
min_VYSKA:800, // minimální výška obrazovky
min_SIRKA:800, // minimální šířka obrazovky
async prepis(){
// funkce přepíše HREF, tak aby se odkazy otvíraly v novém pracovním okně

const vyska=parseInt(window.screen.height); // výška obrazovky
const sirka=parseInt(window.screen.width); // šířka obrazovky
const z_leva=sirka/2-this.SIRKA/2; // centrace nového okna zleva
const z_hora=vyska/2-this.VYSKA/2; // centrace nového okna zhora


if(vyska>this.min_VYSKA&&sirka>this.min_SIRKA)
{
// podmínka = pokud je obrazovka zařízení dostatečně velká
const d=this.id.length; // délka pole id odkazů
for(let i=0;i<d;i++)
{
// smyčka změní odkazi všech id prvků v poli this.id
const old_href=document.getElementById(this.id[i]).href; // načte stávající href odkazu
document.getElementById(this.id[i]).target=""; // target musí být prázdý jinak nové okno neotevře
const new_href=`window.open('${old_href}','_blank','width=${this.SIRKA},height=${this.VYSKA},left=${z_leva},top=${z_hora},resizable=yes');`; // příprava nového href
document.getElementById(this.id[i]).href=`javascript:${new_href}`; // dokončení nového href
}
}}};

class Zmen_odkaz_home
{
// objekt slouží ke změně odkazů na homepage, pokud bude návštěvník přicházet z homepage, bude mít odkaz locatin.search: ?z-webu a odkazy na článku Programátor se změní tak, aby při kliku na ně byl uživatel nasměrován na kotvu z které přišel - button Informace o programátorovi
search="?z-webu"; // location.seatch, který bude očekáván, pokud návštěvník příjde z homepage
new_href="../#programator"; // nový, href odkazů na homepage s kotvou na tlačítko Informace o programátorovi
id_transcript=["a_home1","a_home2"]; // id A HTML ELEMENTŮ u kterých se bude měnit href na homepage
async akce()
{
if(location.search===this.search)
{
const d=this.id_transcript.length;
for(let i=0;i<d;i++)
{
// smyčka zajistí přepis HREF všech elementů s ID uvedených v poli this.id_transcript
const a=document.getElementById(this.id_transcript[i]); // A HTML objekt
if(a)
{
// poud HTML objekt existuje
a.href=this.new_href; // změna href u odkazů na homepage
}
}}}}

const zmen_odkaz_home=new Zmen_odkaz_home(); // vytvoří objekt
zmen_odkaz_home.akce(); // změně odkazů na homepage, pokud bude návštěvník přicházet z homepage, bude mít odkaz locatin.search: ?z-webu a odkazy na článku Programátor se změní tak, aby při kliku na ně byl uživatel nasměrován na kotvu z které přišel - button Informace o programátorovi
statistika.aktivace(); // aktivuje script pro odesílání statistiky
odkaz.prepis(); // zajistí přepis HREF tlačítek na JS funkci window.open
