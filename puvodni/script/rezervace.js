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


const sdilet=new Sdilet(); // založí z class Sdilet objekt sdilet


window.addEventListener("load",()=>{
// posluchač se spustí, když je celá stránka načtena, včetně všech souborů CSS a obrázků.
sdilet.prepis(); /* zajistí přepis HREF tlačítek pro sdílení na Facebooku a Twittru */
});