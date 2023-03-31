
// var nombre = "maria";
// var altura = 159;

var datos = document.getElementById("datos");

// datos.innerHTML = nombre;
// datos.innerHTML = `
//     <p>Soy otro parrafo</p>
//     <p>Mi nombre es: ${nombre} </p>
//     <p>Mi altura es: ${altura} </p>
//     `;


// if (altura >= 180){
//     datos.innerHTML += `<p>Eres una persona alta </p>`;
// } else if (altura <= 155){
//     datos.innerHTML += `<p>Eres una persona bajita </p>`;
// } else if ((altura > 155) && (altura < 180)){
//     datos.innerHTML += `<p>Eres una persona promedio </p>`;
// }

// datos.innerHTML += `<p>Se contar hasta 10, MIRA!... </p>`;


// for(var i = 0; i<= 10; i++){
//     datos.innerHTML += "<p>" + i +"</p>";
// }


function MuestraMisDatos(nombre, altura){
    datos.innerHTML = `
    <p>Mi nombre es: ${nombre} </p>
    <p>Mi altura es: ${altura} </p>
    `;
    
}


function juzgame(altura){
    if (altura >= 180){
        datos.innerHTML += `<p>Eres una persona alta </p>`;
    } else if (altura <= 155){
        datos.innerHTML += `<p>Eres una persona bajita </p>`;
    } else if ((altura > 155) && (altura < 180)){
        datos.innerHTML += `<p>Eres una persona promedio </p>`;
    }
}

function MuestaTodos(array){
    for(var i = 0; i < array.length; i++){
        datos.innerHTML += `<p>` + array[i] +`</p>`;
    }
}


MuestraMisDatos("Maria", 159);

datos.innerHTML += `<hr/>`;

juzgame(159);

datos.innerHTML += `<hr/>`;

var frutas = ["Manzana", "Mandarina", "Melon", "Mango", "Moras"]

MuestaTodos(frutas);

datos.innerHTML += `<hr/>`;
 

/*OBJETOS */

var gatito ={
    color: "naranja",
    anios: 2,
    personalidad: 7,
    mostrarDatosGatunos(){
        console.log(this.color, this.anios, this.personalidad)
    }
}

gatito.mostrarDatosGatunos(); 

/*PROMESAS */

var saludar = new Promise((resolve, rereject) => {
    setTimeout(() => {
        let saludo = "Holiis!";
            // saludo = false;
        if(saludo){
            resolve(saludo);
        }else{
            rereject("No hay saludos programados");
        }
    }, 2000);

});

saludar.then(resultado => {
    alert(resultado);
}).catch(err => {
    alert(err);
});