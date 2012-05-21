var nodo, papel, pizza;
$(document).on("ready", iniciar);
function iniciar()
{
	//delete localStorage.nombre;
	transicion();
	$("#formulario").on("submit", guardar);
	//geolocalizar();
}
function aleatorio(min, max)
{
	return Math.floor(Math.random() *(1+max-min))+min;
}
function dibujar()
{
	papel = Raphael("canvas", 200, 200);
	pizza = papel.set();
	pizza.push(
		papel.image("base.png", 0, 0, 200, 200)
	);
}
function geolocalizar()
{
	navigator.geolocation.getCurrentPosition(
		mostrarOMapa,
		errorMapa,
		{
			maximumAge: 100,
			timeout: 10000
		}
	);
}
function mostrarOMapa(datos)
{
	var lat = datos.coords.latitude;
	var lon = datos.coords.longitude;
	$("#status").text("Ajá! Estás en: " + lat + "," + lon);
	var map, layer;
	map = new OpenLayers.Map( 'mapa_canvas');
    layer = new OpenLayers.Layer.OSM( "Simple OSM Map");
    map.addLayer(layer);
    map.setCenter(
        new OpenLayers.LonLat(lon, lat).transform(
            new OpenLayers.Projection("EPSG:4326"),
            map.getProjectionObject()
        ), 18
    );   
    var markers = new OpenLayers.Layer.Markers( "Markers" );
    map.addLayer(markers);
 	var lonLat = new OpenLayers.LonLat( lon , lat );
    markers.addMarker(new OpenLayers.Marker(lonLat));
}
function mostrarMapa(datos)
{
	var lat = datos.coords.latitude;
	var lon = datos.coords.longitude;
	$("#status").text("Ajá! Estás en: " + lat + "," + lon);
	var coordenada = new google.maps.LatLng(lat, lon);
	var opciones = {
		center: coordenada,
		zoom: 18,
		mapTypeId: google.maps.MapTypeId.HYBRID
	};
	var mapa = new google.maps.Map(
		$("#mapa_canvas")[0]
		, opciones);
	var opcionesChinche = {
		position: coordenada,
		map: mapa,
		title: "Coordenadas de bombardeo"
	};
	var chinche = new google.maps.Marker(opcionesChinche);
}
function errorMapa(errorsh)
{
	$("#status").text("Tarde o temprano ¬_¬");
	console.debug(errorsh);
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
		$("#historia").slideUp(1000);
		$("#pizzamaker").slideDown(1000);
		$("#formulario label").text("Pura vida " + localStorage.nombre);
		//conectar(localStorage.nombre);
		$("#ingredientes article").on("click", agregarIngrediente);
		dibujar();
	}
}
function agregarIngrediente(ev)
{
	var porcion = ev.currentTarget.id;
	var rotacion = aleatorio(0,360);
	var tx = aleatorio(-30, 90);
	var ty = aleatorio(-60, 60);
	var proporcion = aleatorio(2, 7);
	var trocito = papel.image(porcion + ".png", tx, ty, 150, 150);
	trocito.scale(proporcion * 0.1, proporcion * 0.1);
	trocito.rotate(rotacion);
	pizza.push(trocito);
	$("#pizza ul").append("<li>" + porcion + "</li>");
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
