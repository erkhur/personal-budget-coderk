// ------------------------------------------------------------
// BIENVENIDA INICIAL (NUEVO)
// ------------------------------------------------------------
alert("¡Bienvenido al sistema de control de presupuesto!");

const usuario = prompt("¿Cuál es tu nombre?");
alert("Bienvenido, " + usuario + "!");

// Preguntar operación general (ingreso o egreso)
// *** Esto es independiente del registro de movimientos. ***
const operacionGeneral = prompt("¿Cuál es la operación que vas a realizar?\n1.- Ingreso\n2.- Egreso");

console.log("Operación seleccionada por el usuario:", operacionGeneral);
// Esto solo muestra la elección, la HU sigue funcionando igual.


// ------------------------------------------------------------
// Array principal donde se guardan todos los movimientos
// ------------------------------------------------------------
const movimientos = [];


// ------------------------------------------------------------
// FUNCION 1: registrarMovimiento()
// Solicita datos al usuario, valida y guarda el movimiento.
// ------------------------------------------------------------
function registrarMovimiento() {
  let nombre = prompt("Ingrese el nombre del movimiento:");
  if (!nombre || nombre.trim() === "") {
    console.log("❌ Error: el nombre no puede estar vacío.");
    return;
  }

  let tipo = prompt("Ingrese el tipo (ingreso / egreso):").toLowerCase();
  if (tipo !== "ingreso" && tipo !== "egreso") {
    console.log("❌ Error: el tipo debe ser 'ingreso' o 'egreso'.");
    return;
  }

  let monto = Number(prompt("Ingrese el monto:"));
  if (isNaN(monto) || monto <= 0) {
    console.log("❌ Error: el monto debe ser un número mayor a cero.");
    return;
  }

  if (tipo === "egreso") {
    monto = monto * -1;
  }

  movimientos.push({
    nombre: nombre,
    tipo: tipo,
    monto: monto
  });

  console.log("✔ Movimiento registrado exitosamente.");
}


// ------------------------------------------------------------
// FUNCION 2: calcularTotalSaldo()
// ------------------------------------------------------------
function calcularTotalSaldo() {
  let total = 0;

  for (let i = 0; i < movimientos.length; i++) {
    total += movimientos[i].monto;
  }

  return total;
}


// ------------------------------------------------------------
// FUNCION 3: mostrarResumen()
// ------------------------------------------------------------
function mostrarResumen() {
  console.log("📊 --- RESUMEN GENERAL ---");

  console.log("Cantidad de movimientos registrados:", movimientos.length);

  let totalIngresos = 0;
  let totalEgresos = 0;

  for (let i = 0; i < movimientos.length; i++) {
    if (movimientos[i].monto > 0) {
      totalIngresos += movimientos[i].monto;
    } else {
      totalEgresos += movimientos[i].monto;
    }
  }

  console.log("Total de ingresos:", totalIngresos);
  console.log("Total de egresos:", totalEgresos);
  console.log("Saldo total:", totalIngresos + totalEgresos);
}


// ------------------------------------------------------------
// HU3: Mostrar resumen por tipo
// ------------------------------------------------------------
function mostrarResumenPorTipo() {
  console.log("📌 --- RESUMEN POR TIPO ---");

  let ingresos = 0;
  let egresos = 0;

  for (let i = 0; i < movimientos.length; i++) {
    if (movimientos[i].tipo === "ingreso") {
      ingresos += movimientos[i].monto;
    } else {
      egresos += movimientos[i].monto;
    }
  }

  if (ingresos !== 0) console.log("Total ingresos:", ingresos);
  if (egresos !== 0) console.log("Total egresos:", egresos);
}


// ------------------------------------------------------------
// LOGRO 1: Eliminar un movimiento por nombre
// ------------------------------------------------------------
function eliminarMovimiento() {
  let nombre = prompt("Ingrese el nombre del movimiento que desea eliminar:");
  let index = movimientos.findIndex(mov => mov.nombre === nombre);

 	if (index === -1) {
    console.log("❌ No existe un movimiento con ese nombre.");
    return;
  }

  movimientos.splice(index, 1);
  console.log("✔ Movimiento eliminado correctamente.");
}


// ------------------------------------------------------------
// LOGRO 2: Mayor ingreso y mayor egreso
// ------------------------------------------------------------
function mostrarMayoresMovimientos() {
  let mayorIngreso = null;
  let mayorEgreso = null;

  for (let i = 0; i < movimientos.length; i++) {
    let mov = movimientos[i];

    if (mov.monto > 0) {
      if (mayorIngreso === null || mov.monto > mayorIngreso.monto) {
        mayorIngreso = mov;
      }
    } else {
      if (mayorEgreso === null || mov.monto < mayorEgreso.monto) {
        mayorEgreso = mov;
      }
    }
  }

  console.log("💰 Mayor ingreso:", mayorIngreso);
  console.log("💸 Mayor egreso:", mayorEgreso);
}


// ------------------------------------------------------------
// BUCLE PRINCIPAL
// ------------------------------------------------------------
let continuar = true;

while (continuar) {
  let opcion = prompt(
    "Seleccione una opción:\n" +
    "1. Registrar movimiento\n" +
    "2. Mostrar resumen general\n" +
    "3. Mostrar resumen por tipo\n" +
    "4. Eliminar movimiento\n" +
    "5. Mostrar mayor ingreso/egreso\n" +
    "6. Salir"
  );

  if (opcion === "1") registrarMovimiento();
  else if (opcion === "2") mostrarResumen();
  else if (opcion === "3") mostrarResumenPorTipo();
  else if (opcion === "4") eliminarMovimiento();
  else if (opcion === "5") mostrarMayoresMovimientos();
  else if (opcion === "6") continuar = false;
  else console.log("❌ Opción inválida.");
}

console.log("👋 Programa finalizado.");
