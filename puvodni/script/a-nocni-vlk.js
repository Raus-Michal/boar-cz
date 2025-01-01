"use strict";
class Statistika
{
id_but=["vyzkouset-1","vyzkouset-2"]; // id buttonů, které podléhají statistice
data=["klik_vlk","nocni_vlk","nocni_vlk_vyz"]; // data, která jsou odesílána
pocet=0; // proměnná hlídá počet scrool na stránce
odeslano_scroll=[false,false]; // proměnná hlídá, zda už byly statistiky scroll [návštěvník,významní]
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

};
handleEvent(e)
{
const k=e.target.id; // zjistí id prvku buttonu, pokud na něj bylo kliknuto

if(k===this.id_but[0]||k===this.id_but[1])
{
// pokud bylo kliknuto na button
this.odesli_data(this.data[0]); // pošle data funkci, že byla vyzkoušena aplikace Noční VLK
}
else
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
}}
};
aktivace(){

if(window&&window.visualViewport) // test - zda je visualViewport podporováno
{
window.visualViewport.addEventListener("scroll",this,{passive:true}); // aktivuje posluchač pro pohyb na webu - prostřednictvím Visual View port API; { passive: true } jako třetí parametr ve addEventListener, což prohlížeči řekne, že event handler nebude volat preventDefault(), což umožňuje lepší optimalizaci výkonu.
}
addEventListener("scroll",this,{passive:true}); // aktivuje sekundární posluchač pro pohyb na webu; { passive: true } jako třetí parametr ve addEventListener, což prohlížeči řekne, že event handler nebude volat preventDefault(), což umožňuje lepší optimalizaci výkonu.

const d=this.id_but.length; // délka pole
for(let i=0;i<d;i++)
{
document.getElementById(this.id_but[i]).addEventListener("click",this); // přidá posluchač click buttonům s id uvedeným v poli
}
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


class Zmen_odkaz_home
{
// objekt slouží ke změně odkazů na homepage, pokud bude návštěvník přicházet z homepage, bude mít odkaz locatin.search: ?z-webu a odkazy se změní tak, aby při kliku na ně byl uživatel nasměrován na kotvu z které přišel
search="?z-webu"; // location.seatch, který bude očekáván, pokud návštěvník příjde z homepage
new_href="../#nocni-vlk"; // nový, href odkazů na homepage s kotvou
id_transcript=["a_home1","a_home2"]; // id A HTML ELEMENTŮ u kterých se bude měnit href na homepage
akce()
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
}}}};

const sdilet=new Sdilet(); // založí z class Sdilet objekt sdilet
const zmen_odkaz_home=new Zmen_odkaz_home(); // vytvoří objekt
const statistika=new Statistika(); // vytvoří objekt
statistika.aktivace(); // aktivuje script pro odesílání statistiky

window.addEventListener("load",()=>{
// posluchač se spustí, když je celá stránka načtena, včetně všech souborů CSS a obrázků.
sdilet.prepis(); // zajistí přepis HREF tlačítek pro sdílení na Facebooku a Twittru
zmen_odkaz_home.akce(); // změně odkazů na homepage, pokud bude návštěvník přicházet z homepage, bude mít odkaz locatin.search: ?z-webu a odkazy na stránce se změní tak, aby při kliku na ně byl uživatel nasměrován na kotvu z které přišel
});