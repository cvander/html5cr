var nodo;
$(document).on("ready", iniciar);
function iniciar()
{
	delete localStorage.nombre;
	transicion();
	$("#formulario").on("submit", guardar);
}
function guardar(ev)
{
	ev.preventDefault();
	var n = $("#nombre").val();
	localStorage.nombre = n;
	transicion();
	//console.debug(ev);
}
function transicion()
{
	if(localStorage.nombre)
	{
		$("#nombre").hide();
		$("#enviar").css("display", "none");
		$("#historia").slideUp();
		$("#formulario label").text("Pura vida " + localStorage.nombre);
		conectar(localStorage.nombre);
	}
}
function conectar(nom)
{
	nodo = io.connect("http://10.255.0.79:6969");
	nodo.emit("ingresoUsuario", nom);
	nodo.on("notificacionServer", saludo);
}
function saludo(serverNombre)
{
	$("#formulario label").text(serverNombre + " es tuanis!");
	$("#formulario label").fadeOut().fadeIn();
}








// $(document).ready(
// 	function ()
// 	{
// 		alert("Aprendí! (╯°□°）╯︵ ┻━┻");
// 	}
// );
