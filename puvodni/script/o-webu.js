const odkazy={t1:500,
async uprav(){
let ob=document.querySelectorAll("a"); /* najde včechny tagy A na stránce a udělá z nich pole */
let ob_s=ob.length;
for(let i=0;i<ob_s;i++)
{
let hr=ob[i].href; /* načte href objektu */
let hr_p=hr.indexOf("#"); /* pozice # v řetězci */
let title=ob[i].title; // title objektu - nám poslouží k vyřazení href k návratu na homepage, které taktéž používají #
if(hr_p!==-1&&title!=="Home page") // pokud se pozice v řetězci === -1 , tak nebyl znak v řetězci nalezen, title!=="Home page" - vynechá odkazy, které mají toto TITLE, protože se jedná o odkazy které směřují na homepage a obsahují taky znak #
{
let poz_rez=hr_p+1; /* posune polohu řezu pro odkaz o jedno místo od # */
let odkaz=ob[i].href.slice(poz_rez); /* vytvoří konečný odkaz ořezáním původního */
if(odkaz!=="") /* pokud nebude odkaz prázdným řetězcem */
{
ob[i].href=`javascript:odkazy.roluj('${odkaz}');`; /* upravý href každého odkazu na javascriptovou funkci */
}}}},

roluj(id){
document.getElementById(id).scrollIntoView({behavior:"smooth",block:"start"}); /* provede scrool na objekt */
setTimeout(`document.getElementById('${id}').scrollIntoView({behavior:'smooth',block:'start'});`,this.t1); /* za 500ms provede opět scrool na objekt */
}};

odkazy.uprav(); // opraví odkazi na stránce na SCROOL