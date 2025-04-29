function leer(){
	//referencia por pseudoclase
	var nombre=document.forms["formulario"].elements[0].value;
	//referencia por Id
	var clave=document.getElementById("pass").value;
	//referencia por TagName
	var carrera=document.getElementsByTagName("select")[0].value;

	document.getElementById("datos").innerHTML="\<br>Nombre: "+nombre+"\<br>Password: "+clave+"\<br>Tu carrera: "+carrera;
}