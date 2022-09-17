//selectores
const palabras = ["REACTJS","NODEJS","SCSS","RUBY","HTML","CSS","JAVA","MYSQL","MONGODB","PYTHON","PHP","LINUX","WINDOWS","MACOS","APPLE","PSEINT","HASKELL"];
let palabraaleatoria = "";   

function startGame(){
    document.getElementById('boton-iniciar').style.display = "none";
    document.getElementById('boton-agregar').style.display = "none";
    document.getElementById('canvas').style.display = 'block';
    document.getElementById('boton-nuevo').style.display = "block";
    document.getElementById('boton-rendirse').style.display = "block";
    crearPalabraSecreta();
}

function surrender(){
    EndGame();
    crearTablero();
    crearCabeza();
    crearCuerpo();
    crearBrazos(300,250);
    crearBrazos(400,250);
    crearPiernas(300,350);
    crearPiernas(400,350);

    document.getElementById('boton-iniciar').style.display = "block";
    document.getElementById('boton-agregar').style.display = "block";
    document.getElementById('canvas').style.display = 'none';
    document.getElementById('boton-nuevo').style.display = "none";
    document.getElementById('boton-rendirse').style.display = "none";
}

//verificar tecla presionada
document.addEventListener('keydown',verificacion);

function verificacion(event){
    const teclaPresionada = event.key.toUpperCase()

    if (teclaPresionada.match(/^[A-ZÑ]$/i)){
        dibujarLetra(teclaPresionada)
    }
    else{
        if(teclaPresionada.match(/^[0-9]$/i) || teclaPresionada.match(/^[a-zñ]$/)){
            alert("SOLO SE ACEPTAN LETRAS MAYUSCULAS");
        }
    }
}

//crear palabra aleatoria del juego
function crearPalabraSecreta(){
    palabraaleatoria = palabras[Math.floor(Math.random() * palabras.length)];
    console.log(palabraaleatoria);
    canvas.reset();
    dibujarGuiones();
    intentos = 0;
    aciertos = 0;
    movimiento = 50;
    letrascorrectas = [];
    letraserradas = [];
    return palabraaleatoria;
}

//funcion verificar si gano
let aciertos = 0;
function verificarGanador(palabra){
    palabraSecreta = palabra.length;
    aciertos++;
    if (aciertos == palabraSecreta){
        Ganaste();
    }
}

//CANVAS JS --------------------------------------------------------------------
//inicializar canvas
var canvas = document.getElementById('canvas').getContext('2d');

function settingsPincel(){
    canvas.lineWidth = 8;
    canvas.lineCap = 'round';
    canvas.lineJoin = "round";
    canvas.fillStyle = '#12edb6';
    canvas.strokeStyle = '#000000';
}

function crearTablero(){
    settingsPincel();
    //base de la horca
    canvas.fillRect(0,0,1200,600);
    canvas.beginPath();
    canvas.moveTo(100,500);
    canvas.lineTo(300,500);
    canvas.stroke();
    canvas.closePath();

    //soporte de la horca
    canvas.beginPath();
    canvas.moveTo(200,500);
    canvas.lineTo(200,100);
    canvas.stroke();
    canvas.closePath();

    //soporte superior de la horca
    canvas.beginPath();
    canvas.moveTo(200,100);
    canvas.lineTo(350,100);
    canvas.stroke();
    canvas.closePath();

    //gancho de la horca
    canvas.beginPath();
    canvas.moveTo(350,100);
    canvas.lineTo(350,150);
    canvas.stroke();
    canvas.closePath();
}

//funcion para dibujar la orca segun los fallos
let intentos = 0;
function dibujar(){
    let palabra = palabraaleatoria;
    if (intentos == 0){
        crearTablero();
        intentos++;
    }   else if (intentos == 1){
        crearCabeza();
        intentos++
    }   else if (intentos == 2){
        crearCuerpo();
        intentos++
    }   else if (intentos == 3){
        crearBrazos(300,250);
        intentos++
    }   else if (intentos == 4){
        crearBrazos(400,250);
        intentos++
    }   else if (intentos == 5){
        crearPiernas(300,350);
        intentos++
    }   else{
        crearPiernas(400,350);
        EndGame();
        canvas.fillStyle="#FAC501";
        canvas.font = "48px 8BIT WONDER";
        canvas.fillText("Su palabra era: " + palabra, 600,500);
    }
}

//partes del cuerpo
function crearCabeza(){
    settingsPincel();
    canvas.beginPath();
    canvas.moveTo(350,150);
    canvas.arc(350,175,25,-40,2 * Math.PI);
    canvas.stroke();
    canvas.closePath();
}

function crearCuerpo(){
    settingsPincel();
    canvas.beginPath();
    canvas.moveTo(350,200);
    canvas.lineTo(350,300);
    canvas.stroke();
    canvas.closePath();
}

function crearBrazos(x,y){
    settingsPincel();
    canvas.beginPath();
    canvas.moveTo(350,225);
    canvas.lineTo(x,y);
    canvas.stroke();
    canvas.closePath();
}

function crearPiernas(x,y){
    settingsPincel();
    canvas.beginPath();
    canvas.moveTo(350,300);
    canvas.lineTo(x,y);
    canvas.stroke();
    canvas.closePath();
}

//guiones del canvas

function dibujarGuiones(){
    canvas.save();
    settingsPincel();
    canvas.lineWidth = 6;

    let ancho = 600/(palabraaleatoria.length);
    for (let i = 0; i < palabraaleatoria.length; i++){
        canvas.moveTo(450 + (ancho * i), 500);
        canvas.lineTo(500 + (ancho * i), 500);
    }
    canvas.stroke();
    canvas.closePath();
}

//dibujar letra en el juego
function dibujarLetra(teclaPresionada){
    let palabra = palabraaleatoria;
    let tecla = teclaPresionada;

    for (let i = 0; palabra.length; i++){
        if(tecla == palabra[i]){
            if(letrascorrectas.includes(tecla) == true){
                console.log("Esa letra ya fue ingresada");
                console.log(letrascorrectas);
            }
            else{
                dibujarLetraCorrecta(tecla,i,palabraaleatoria.length);
                letrascorrectas.push(tecla);
                console.log("adentro");
                for(let j = 0; j < palabra.length; j++){
                    if( tecla == palabra[j]){
                        console.log("entre al if j")
                        dibujarLetraCorrecta(tecla,j,palabraaleatoria.length);
                        verificarGanador(palabra);
                    }
                }
            }
            return
        }
    }
    dibujarLetraIncorrecta(tecla);
    letraserradas.push(tecla);
}

//letras correctas
function dibujarLetraCorrecta(letra, index, posicion) {
    canvas.font = '48px 8BIT WONDER';
    canvas.textAlign = 'center';
    canvas.fillStyle = "#FAC501";
    var ejeX = index * 32 + (canvas.width - posicion * 40) / 2 + 50;
    console.log("ENTRE A  LETRA CORRECTA")
    console.log(canvas.width)
    canvas.fillText(letra,ejeX,480)
}

//canvas para letras erradas
let canvas2 = document.getElementById('canvas').getContext('2d');

//letras incorrectas
function dibujarLetraIncorrecta(teclaPresionada) {
    canvas2.save();

    if(letraserradas.includes(teclaPresionada)){
        console.log("ya ingreso esa letra erronea");
    }
    else{
        canvas2.fillStyle = "#FAC501";
        canvas2.font = "48px 8BIT WONDER";
        canvas2.fillText(teclaPresionada, movimiento, 80);
        movimiento += 30;
        dibujar();
    }
}

//funcion dibujar ganaste
function Ganaste(){
    canvas.fillStyle = "#FAC501";
    canvas.font = "48px 8BIT WONDER";
    canvas.fillText("Felicidades, Ganaste!",600,400);
}

//funcion terminar juego
function EndGame(){

    canvas.fillStyle = "#FAC501";
    canvas.font = "48px 8BIT WONDER";
    canvas.fillText("FIN DEL JUEGO, PERDISTE...",600,400);
}
