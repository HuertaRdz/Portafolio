function leer(){
	//referencia por pseudoclase
	var nombre=document.forms["formulario"].elements[0].value;
	//referencia por Id
	var clave=document.getElementById("pass").value;

	//referencia por TagName
	var carrera=document.getElementsByTagName("select")[0].value;
	//referencia por Name
	var gen=document.getElementsByName("genero");
	var i;
	for(i=0;i<gen.length;i++)
	{
		if (gen[i].checked) {
			var g=gen[i].value;
		}
	}

	var p=document.getElementById("privacidad").checked;
	document.getElementById("datos").innerHTML="\<br>Nombre: "+nombre+"\<br>Password: "+clave+"\<br>Tu carrera: "+carrera+"\<br>Género: "+g+
		"\<br>Acepto el acuerdo: "+p;
}