function iniciar(){
var boton=document.getElementById('guardar');
boton.addEventListener('click', nuevoitem, false);
}
function nuevoitem(){
var clave=document.getElementById('clave').value;
var valor=document.getElementById('texto').value;
sessionStorage.setItem(clave,valor);
mostrar(clave);
}
function mostrar(clave){
var cajadatos=document.getElementById('caja');
var valor=sessionStorage.getItem(clave);
cajadatos.innerHTML='<div>'+clave+' - '+valor+'</div>';
}
window.addEventListener('load', iniciar, false);
