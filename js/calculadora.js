$(document).ready(function(){
    $('#input-display').hide();
    document.onkeydown = teclado;
});

x = "0"; //número en pantalla
xi= true; //iniciar número en pantalla: 1=si; 0=no;
coma = false; //estado coma decimal 0=no, 1=si;
ni = 0; //número oculto o en espera.
op = false; //operación en curso; "no" =  sin operación
aux = 0;
function numero(xx) { //recoge el número pulsado en el argumento.
        
         if (x == "0" || xi == true ) { // inicializar un número, 
            $("#input-display").text(xx).css("color",""); //mostrar en pantalla
            aux = x = xx; //guardar número
            if (xx == ".") { //si escribimos una coma al principio del número
               $("#input-display").text("0.").css("color",""); //escribimos 0.
               x = xx; //guardar número
               aux = "0" + x;
                coma = true; //cambiar estado de la coma
               }
           }
           else { //continuar escribiendo un número
               if (xx == "." && coma == false) { //si escribimos una coma decimal pòr primera vez
                   aux+=xx;
                   $("#input-display").text(aux).css("color","");
                   x+=xx;
                   coma = true; //cambiar el estado de la coma  
               }
              //si intentamos escribir una segunda coma decimal no realiza ninguna acción.
               else if (xx == "." && coma == true) {} 
               //Resto de casos: escribir un número del 0 al 9: 	 
               else {
                   
                    aux+=xx;
                   $("#input-display").text(aux).css("color","");
                   x+=xx;
               }
            }
            xi=0 //el número está iniciado y podemos ampliarlo.
         }

function operar(s) {
    igualar(s);
         ni = x //ponemos el 1º número en "numero en espera" para poder escribir el segundo.
         op = s; //guardamos tipo de operación (+,-,*,/).
         xi = true; //inicializar pantalla.
         }

function igualar(s) {
         if (op == false) { //no hay ninguna operación pendiente.
             if(s != undefined){
                $('#input-display').text(s).css("color","blue");
             } else {
                $('#input-display').text(x).css("color","");	//mostramos el mismo número	

             }
         }
         else { //con operación pendiente resolvemos
            sl = ni+op+x; // escribimos la operación en una cadena
            sol = eval(sl) //convertimos la cadena a código y resolvemos
            $('#input-display').text("= "+sol).css("color","red"); //mostramos la solución
            x = sol; //guardamos la solución
            op = false; //ya no hay operaciones pendientes
            xi = true; //se puede reiniciar la pantalla.

            }
        }

function retro(){ //Borrar sólo el último número escrito.
         cifras = x.length; //hallar número de caracteres en pantalla
         br = x.substr(cifras-1, cifras) //info del último caracter
         x = x.substr(0, cifras-1) //quitar el ultimo caracter
         if (x == "") {x="0";} //si ya no quedan caracteres, pondremos el 0
         if (br==".") {coma=false;} //Si hemos quitado la coma, se permite escribirla de nuevo.
         $('#input-display').text(x).css("color",""); //mostrar resultado en pantalla	 
         }

function borradoParcial() {
        ('#input-display').text("0").css("color",""); //Borrado de pantalla;
        x=0; //Borrado indicador número pantalla.
        coma=false; //reiniciamos también la coma					
        }
function borradoTotal() {
         $('#input-display').text("0").css("color",""); //poner pantalla a 0
         x = "0"; //reiniciar número en pantalla
         coma = false; //reiniciar estado coma decimal 
         ni = 0; //indicador de número oculto a 0;
         op = false; //borrar operación en curso.
         }

$('#power').click(function(){
    $('#input-display').toggle();
    borradoTotal();
    
})

function teclado (elEvento) { 
         evento = elEvento || window.event;
         k = evento.keyCode; //número de código de la tecla.
         //teclas númericas del teclado alfamunérico
         if (k>47 && k<58) { 
                p = k-48; //buscar número a mostrar.
                p = String(p) //convertir a cadena para poder añádir en pantalla.
                numero(p); //enviar para mostrar en pantalla
            }	
         //Teclas del teclado númerico. Seguimos el mismo procedimiento que en el anterior.
         if (k>95 && k<106) {
            p=k-96;
            p=String(p);
            numero(p);
            }
         if (k==110 || k==190) {numero(".")} //teclas de coma decimal
         if (k==106) {operar('*')} //tecla multiplicación
         if (k==107) {operar('+')} //tecla suma
         if (k==109) {operar('-')} //tecla resta
         if (k==111) {operar('/')} //tecla división
         if (k==32 || k==13) {igualar()} //Tecla igual: intro o barra espaciadora
         if (k==46) {borradoTotal()} //Tecla borrado total: "supr"
         if (k==8) {retro()} //Retroceso en escritura : tecla retroceso.
         if (k==36) {borradoParcial()} //Tecla borrado parcial: tecla de inicio.
         }