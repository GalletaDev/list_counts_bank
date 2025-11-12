// script.js

// Variable global que almacena el balance total de las transacciones
let balance = 0;

// Función que actualiza el valor del balance mostrado en el documento
function actualizarBalance() {
  document.getElementById('balance').textContent = balance;
}

// Función principal que agrega una nueva transacción a la lista
function agregarTransaccion() {
  // Obtiene los valores ingresados por el usuario desde los campos del formulario
  const descripcion = document.getElementById('descripcion').value;
  const monto = parseFloat(document.getElementById('monto').value);
  const tipo = document.getElementById('tipo').value;

  // Valida que se haya ingresado una descripción y un monto numérico válido
  if (!descripcion || isNaN(monto)) {
    alert("Por favor, ingresa una descripción y un monto válido.");
    return;
  }

  // Actualiza el balance según el tipo de transacción seleccionado
  if (tipo === 'ingreso') {
    balance += monto; // Suma el monto si es un ingreso
  } else if (tipo === 'gasto') {
    balance -= monto; // Resta el monto si es un gasto
  }

  // Obtiene la lista donde se mostrarán las transacciones
  const transaccionesLista = document.getElementById('transacciones-lista');
  
  // Crea un nuevo elemento <li> para representar la transacción
  const li = document.createElement('li');
  li.classList.add(tipo); // Añade la clase 'ingreso' o 'gasto' para estilos visuales

  // Inserta el contenido del elemento con la descripción, monto y un botón para eliminar
  li.innerHTML = `${descripcion} - $${monto.toFixed(2)} <button onclick="eliminarTransaccion(this, ${monto}, '${tipo}')">Eliminar</button>`;
  
  // Agrega el nuevo elemento a la lista de transacciones
  transaccionesLista.appendChild(li);

  // Limpia los campos del formulario para permitir nuevas entradas
  document.getElementById('descripcion').value = '';
  document.getElementById('monto').value = '';
  document.getElementById('tipo').value = 'ingreso';

  // Llama a la función que actualiza el balance mostrado en pantalla
  actualizarBalance();
}

// Función que elimina una transacción existente de la lista
function eliminarTransaccion(button, monto, tipo) {
  // Ajusta el balance al eliminar una transacción
  if (tipo === 'ingreso') {
    balance -= monto; // Si era un ingreso, se resta del balance
  } else if (tipo === 'gasto') {
    balance += monto; // Si era un gasto, se suma al balance
  }

  // Obtiene el elemento <li> correspondiente y lo elimina de la lista
  const li = button.parentElement;
  li.remove();

  // Actualiza el balance en pantalla después de la eliminación
  actualizarBalance();
}
