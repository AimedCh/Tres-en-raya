let turno = "X";
const celdas = document.querySelectorAll("td");
const tableroTurno = document.getElementById("turno");
const botonReiniciar = document.getElementById("reiniciar");
let tablero = Array(3)
  .fill(null)
  .map(() => Array(3).fill(""));

function reiniciarTablero() {
  tablero = Array(3)
    .fill(null)
    .map(() => Array(3).fill(""));
  celdas.forEach((celda) => {
    celda.textContent = "";
    celda.className = "";
  });
  turno = "X";
  tableroTurno.textContent = turno;
}

function comprobarGanador() {
  const combinaciones = [
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ],
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    [
      [0, 2],
      [1, 1],
      [2, 0],
    ],
  ];

  for (const combinacion of combinaciones) {
    const [a, b, c] = combinacion;
    if (
      tablero[a[0]][a[1]] &&
      tablero[a[0]][a[1]] === tablero[b[0]][b[1]] &&
      tablero[a[0]][a[1]] === tablero[c[0]][c[1]]
    ) {
      return tablero[a[0]][a[1]];
    }
  }

  if (tablero.flat().every((celda) => celda)) {
    return "Empate";
  }

  return null;
}

function manejarClick(event) {
  const celda = event.target;
  const fila = Array.from(celda.parentNode.parentNode.children).indexOf(
    celda.parentNode
  );
  const columna = Array.from(celda.parentNode.children).indexOf(celda);

  if (tablero[fila][columna]) {
    alert("¡Esta casilla ya está ocupada!");
    return;
  }

  tablero[fila][columna] = turno;
  celda.textContent = turno;
  celda.classList.add(turno.toLowerCase());
  const resultado = comprobarGanador();
  if (resultado) {
    if (resultado === "Empate") {
      alert("¡Empate! Reiniciando el juego...");
    } else {
      alert(`¡${resultado} ha ganado! Reiniciando el juego...`);
    }
    reiniciarTablero();
    return;
  }

  turno = turno === "X" ? "O" : "X";
  tableroTurno.textContent = turno;
}

celdas.forEach((celda) => celda.addEventListener("click", manejarClick));
botonReiniciar.addEventListener("click", reiniciarTablero);
