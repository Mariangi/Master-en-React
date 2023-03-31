class Coche{

    constructor(modelo, velocidad, antiguedad){
        this.modelo  = modelo;
        this.velocidad = velocidad;
        this.antiguedad = antiguedad;
    }

    getVelocidad(){
        let velocidad = this.velocidad;
        return velocidad;
    }

    aumentarVelocidad(){
        this.velocidad ++;
    }

    reducirVelocidad(){
        this.velocidad --;
    }

}

var coche1 = new Coche(1,3,7);
var coche2 = new Coche(2,3,7);
var coche3 = new Coche(3,3,7);
var coche4 = new Coche(4,3,7);


// console.log(coche1.getVelocidad());



class Autobus extends Coche{

    constructor(modelo, velocidad, antiguedad, altura){
        super(modelo,velocidad,antiguedad);
        this.altura = altura;
    }
    
    getAltura(){
        let altura = this.altura;
        return altura;
    }
}

var autobus1 = new Autobus("A1",3,7,5);

console.log(autobus1.getAltura());