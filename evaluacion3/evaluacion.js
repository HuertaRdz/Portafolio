function leer(){
	var tiempo=document.getElementById("tiempo").value;
	var carro=document.getElementsByTagName("select")[0].value;

	var hora;
	switch(carro){
		case "chico":
			hora = 20.0;
			break;
		case "camioneta":
			hora = 30.0;
			break;
		case "camion":
			hora = 40.0;
			break;
	}

	var total = tiempo*hora;

	document.getElementById("tot").innerHTML= "Total a Pagar: $"+ total.toFixed(2)+"MXN";
}