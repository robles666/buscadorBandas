/*funcion de busqueda*/
function buscar() {

    var nombre_banda = document.getElementById("nombrebanda").value;

    if (validar(nombre_banda.length)) {


        const portada = document.getElementById("fotoPortada");
        portada.style.visibility = "visible";

        //cargar API desde AudioDB
        const request = new XMLHttpRequest();
        request.addEventListener('load', cargar_banda);
        request.open('GET', 'https://www.theaudiodb.com/api/v1/json/2/search.php?s=' + nombre_banda);
        request.send();
        //cargar discografia desde AudioDB
        const request2 = new XMLHttpRequest();
        request2.addEventListener('load', cargar_discografia);
        request2.open('GET', 'https://theaudiodb.com/api/v1/json/2/discography.php?s=' + nombre_banda);
        request2.send();
    } else { window.alert("Ingrese Banda, por favor"); }

}

function validar(cant) // funcion para ver si el texto 
{

    if (cant == 0) {
        return false;
    } else { return true; }
}


function cargar_banda() {
    try {
        const artista = JSON.parse(this.responseText);

        //----foto 
        const img = document.createElement("img");
        img.src = artista.artists[0].strArtistThumb;
        img.style.width = "100%";
        const imagen = document.getElementById("bandaimagen");
        imagen.innerHTML = "";
        imagen.appendChild(img);

        //----logo
        const logo = document.createElement("img");
        logo.src = artista.artists[0].strArtistLogo;
        const imagenlogo = document.getElementById("logo");
        logo.style.width = "100%";

        imagenlogo.innerHTML = "";
        imagenlogo.appendChild(logo);

        //---nombre de la banda
        const titulo = document.createElement("h1");
        titulo.textContent = artista.artists[0].strArtist;
        const nom = document.getElementById("titulo");
        nom.innerHTML = "";
        nom.appendChild(titulo);

        //**falto caratula disco */

        //------genero
        const genero = document.createElement("h4");
        genero.textContent = artista.artists[0].strGenre;
        const gen = document.getElementById("genero");
        gen.innerHTML = "";
        gen.appendChild(genero);

        //------estilo
        const estilo = document.createElement("h5");
        estilo.textContent = artista.artists[0].strStyle;
        const esti = document.getElementById("estilo");
        esti.innerHTML = "";
        esti.appendChild(estilo);

        //------link
        const pagina = document.createElement("a");
        pagina.href = "https://" + artista.artists[0].strWebsite;
        pagina.textContent = artista.artists[0].strWebsite;
        const pagi = document.getElementById("pagina");
        pagi.innerHTML = "";
        pagi.appendChild(pagina);


        const bio = document.getElementById("bio");
        bio.innerHTML = "";
        bio.textContent = "Biografia";

        //------Biografia 
        const biografia = document.createElement("p");
        biografia.textContent = artista.artists[0].strBiographyEN;

        if (biografia.textContent.length === 0) { biografia.textContent = "------------Only English, man!------------" }
        const biblio = document.getElementById("biografia");
        biblio.innerHTML = "";
        biblio.appendChild(biografia);





    } catch (e) { error(); }

}

/*CARGA DE DISCOGRAFIA(lo mas complicado realmente)*/

function cargar_discografia() {
    try {

        const artista = JSON.parse(this.responseText);
        let largodisco = artista.album.length;

        const disco = document.getElementById("disco");
        disco.innerHTML = "";
        disco.textContent = "Discografia Seleccionada";

        const discogra = document.getElementById("discografia");
        const etiqueta = document.createElement("div"); /*en donde aparecera*/

        let agregardisco = "";
        discogra.innerHTML = "";

        let agregarCaratula = "";
        discogra.innerHTML = "";

        let agregarCover = "";
        artista.innerHTML = "";

        for (let x = 0; x < largodisco; x++) {


            agregardisco = "<p>" + artista.album[x].intYearReleased + //si
                " - " + artista.album[x].strAlbum + "</p>" + agregardisco;

            agregarCaratula = "<p>" + artista.album[x].strAlbumthumbnail + "</p>" + agregarCaratula;

        }

        etiqueta.innerHTML = agregardisco;
        discogra.appendChild(etiqueta);

    } catch (e) {}

}


function error() {


    window.alert("Caramba! Esa banda no existe!!!!");

}

/* trate muchas funciones y esta funciono si problemas
/* no pude cargar lsa imagenes de los disclosed
/* solo seleccionaba algunos discos, generalmente compilaciones*/