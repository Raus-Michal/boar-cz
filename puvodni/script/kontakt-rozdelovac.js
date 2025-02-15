class Odkaz
{
id=["sdil-fb","sdil-tw"]; // id odkazů, které mají být změněny
SIRKA=600; // šířka nového okna
VYSKA=600; // výška nového okna
min_VYSKA=800; // minimální výška obrazovky
min_SIRKA=800; // minimální šířka obrazovky
prepis(){
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
const element=document.getElementById(this.id[i]); // načte HTML elemet podle id v poli
if(element)
{
// pokud HTML element existuje
const old_href=element.href; // načte stávající href odkazu
element.removeAttribute("href"); // odstraní stávající href
element.addEventListener("click",(event)=>{
event.preventDefault(); // zabrání standardnímu chování odkazu
window.open(old_href,'_blank',`width=${this.SIRKA},height=${this.VYSKA},left=${z_leva},top=${z_hora},resizable=yes`); // otevře nové okno
});
}}
}}};

const odkaz=new Odkaz(); // vytvoří objekt

window.addEventListener("load",()=>{
// posluchač se spustí, když je celá stránka načtena, včetně všech souborů CSS a obrázků.
odkaz.prepis(); // zajistí přepis HREF tlačítek na JS funkci window.open
});