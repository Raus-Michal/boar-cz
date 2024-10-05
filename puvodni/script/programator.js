const statistika={
id_but:"zivotopis", // id buttonů, které podléhají statistice
data:["pdf-zivotopis","navsteva-programator","vyznamni-programator"], // data, která jsou odesílána
pocet:0, // proměnná hlídá počet scrool na stránce
odeslano_scroll:[false,false], // proměnná hlídá, zda už byly statistiky scroll [návštěvník,významní]
async odesli_data(data){
// funkce odesílá data
try{
  // Vytvoření AJAX požadavku
const xhr=new XMLHttpRequest();

xhr.open("POST","../statistika/zapis.php",true); // otevření souboru který zajistí odeslání
xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
/*
// Reakce na dokončení požadavku
xhr.onload=()=>{
if(xhr.status===200){
// console.log('Data byla úspěšně odeslána.'); 
}else{
// console.log('Došlo k chybě při odesílání dat.');
}
}; */

xhr.send(`data=${encodeURIComponent(data)}`);  // Odeslání dat
}
catch(err){
console.log(`Statistická data neodeslána. Chyba:${err}`);
}
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

statistika.aktivace(); // aktivuje script pro odesílání statistiky