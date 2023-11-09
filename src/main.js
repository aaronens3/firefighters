// Importa el array de datos de los jumpers
import JUMPERS_DATA from './lib/jumpers_data';

//variables globales
let gameRunning = false;
const firefightersPositions = [0, 33.3, 66.6];

// Función para formatear el número con ceros a la izquierda
const formatNumber = (number) => {
  return number.toString().padStart(2, '0');
};

// Función para crear y mostrar los elementos jumpers
const createJumpers = () => {
  // Obtén el contenedor de los jumpers
  const jumpersContainer = document.getElementById('jumpers-container');

  // Limpiar cualquier contenido existente en el contenedor
  jumpersContainer.innerHTML = '';

  // Crear elementos jumpers y agregarlos al contenedor
  JUMPERS_DATA.forEach((jumper, index) => {
    const jumperElement = document.createElement('div');
    jumperElement.className = 'jumper';
    jumperElement.style.top = `${jumper.top}%`;
    jumperElement.style.left = `${jumper.left}%`;
    jumperElement.style.backgroundImage = `url('sprites/rescued_man-${formatNumber(index + 1)}.png')`;

    // Añadir el jumper al contenedor
    jumpersContainer.appendChild(jumperElement);
  });
};

////////////////////////////////////////////////////
// Agrega referencias a tus botones
const leftButton = document.getElementById('left');
const rightButton = document.getElementById('right');
const startButton = document.getElementById('start');

// Agrega clases al hacer clic
leftButton.addEventListener('mousedown', () => {
  leftButton.classList.add('down');
});

rightButton.addEventListener('mousedown', () => {
  rightButton.classList.add('down');
});

startButton.addEventListener('mousedown', () => {
  startButton.classList.add('down');
});

document.addEventListener('keydown', (event) => {
  if (event.key === '1') {
    handleStartButtonClick();
  }
});

// Elimina clases al soltar el botón en cualquier parte de la ventana
window.addEventListener('mouseup', () => {
  leftButton.classList.remove('down');
  rightButton.classList.remove('down');
  startButton.classList.remove('down');
});

document.addEventListener('keydown', (event) => {
  //comprobamos si la partida ha empezado
  if (event.key === '1') {
   // Mover a la izquierda si se presiona la flecha izquierda
    if (event.key === 'ArrowLeft') {
      moveLeft();
    }
    // Mover a la derecha si se presiona la flecha derecha
    if (event.key === 'ArrowRight') {
      moveRight();
    }
  }

});

document.addEventListener('keyup', (event) => {
  // Eliminar la clase "down" cuando se suelte la tecla
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    leftButton.classList.remove('down');
    rightButton.classList.remove('down');
  }
});

////////////////////////////////////////////////////




////////////////////////////////////////////////////

function startGame() {
  // Comprueba si el juego ya está en ejecución
  if (!gameRunning) {
    start(trick);
    gameRunning = true;
  } else {
    stop();
    gameRunning = false;
  }
}

startButton.addEventListener('click', startGame);

//Event listener para la tecla 1
document.addEventListener('keydown', (event) => {
  if (event.key === '1') {
    startGame();
  }
});





// Llama a la función para crear y mostrar los elementos jumpers
createJumpers();
