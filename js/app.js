let calculate = document.querySelector(".cal-repay");
let limpiarCampos = document.querySelector(".clear");
    
function cortarDecimales(num, decimales) {
    let strNum = num.toString();
    let punto = strNum.indexOf('.');
    
    if (punto === -1) return strNum; // Si no tiene decimales, devolver igual
    return strNum.slice(0, punto + decimales + 1);
}

limpiarCampos.addEventListener("click", () => {
    // Obtener los campos de entrada
    let precio = document.getElementById("precio");
    let tiempo = document.getElementById("tiempo");
    let tasaAnual = document.getElementById("tasa");

    let emptyRes = document.querySelector('.empty');
    let completeRes = document.querySelector('.complete');


    // Limpiar los campos estableciendo el valor a 0
    precio.value = 0;  // Usar 'value' para modificar el valor de los inputs
    tiempo.value = 0;
    tasaAnual.value = 0;  // Cambiar 'tasaAnual' correctamente

    emptyRes.classList.remove('hide');
    completeRes.classList.add('hide');

})


calculate.addEventListener("click", function() {
    
    let precio = parseFloat(document.getElementById("precio").value);
    let tiempo = parseInt(document.getElementById("tiempo").value);
    let tasaAnual = parseFloat(document.getElementById("tasa").value);
    let tipoHipoteca = document.querySelector('input[name="mortgageType"]:checked').value;
    let resPagoMensual = document.querySelector('.monthly-data');
    let resPagoTotal = document.querySelector('.total-data');

    let emptyRes = document.querySelector('.empty');
    let completeRes = document.querySelector('.complete');
   
    if (isNaN(precio) || isNaN(tiempo) || isNaN(tasaAnual) || precio <= 0 || tiempo <= 0 || tasaAnual <= 0) {
        alert("⚠️ Ingresa valores válidos.");
        return;
    }
    

    let r = (tasaAnual / 100) / 12; // Convertimos la tasa anual a mensual
    let n = tiempo * 12; // Convertimos los años a meses
    let pagoMensual;

    if (tipoHipoteca === "repayment") {
        // Cálculo de cuota con amortización (capital + intereses)
        pagoMensual = (precio * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        resPagoMensual.innerHTML = `£${cortarDecimales(pagoMensual, 2)}`;
        resPagoTotal.innerHTML = `£${(cortarDecimales(pagoMensual, 2) * 12) * tiempo}`
        emptyRes.classList.add('hide');
        completeRes.classList.remove('hide');
    } else {
        // Cálculo de cuota solo intereses
        pagoMensual = precio * r;        
        resPagoMensual.innerHTML = `£${cortarDecimales(pagoMensual, 2)}`;
        resPagoTotal.innerHTML = `£${(cortarDecimales(pagoMensual, 2) * 12) * tiempo}`;
        emptyRes.classList.add('hide');
        completeRes.classList.remove('hide');
    }    
});

