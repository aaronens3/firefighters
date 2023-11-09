// Importa el array de datos de los jumpers
import JUMPERS_DATA from './lib/jumpers_data';
import { start, stop } from './lib/loop';
import { randomJumper } from './lib/jumpers_randomizer';

//variables globales
let gameRunning = false;
const firefightersPositions = [0, 33.3, 66.6];
const LEFT_KEY = 'ArrowLeft';
const RIGHT_KEY = 'ArrowRight';
let tickCount = 0;


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

// Llama a la función para crear y mostrar los elementos jumpers
createJumpers();

////////////////////////////////////////////////////

// Obtén referencias a los botones
const leftButton = document.getElementById('left');
const rightButton = document.getElementById('right');
const startButton = document.getElementById('start');

// Agrega event listeners para los botones
leftButton.addEventListener('mousedown', () => {
  leftButton.classList.add('down');
});

leftButton.addEventListener('mouseup', () => {
  leftButton.classList.remove('down');
});

rightButton.addEventListener('mousedown', () => {
  rightButton.classList.add('down');
});

rightButton.addEventListener('mouseup', () => {
  rightButton.classList.remove('down');
});

startButton.addEventListener('mousedown', () => {
  startButton.classList.add('down');
});

startButton.addEventListener('mouseup', () => {
  startButton.classList.remove('down');
});

////////////////////////////////////////////////////
//Funcion para iniciar el juego
const startGame = () => {
  gameRunning = true;
  startButton.classList.add('hidden');
  leftButton.classList.remove('hidden');
  rightButton.classList.remove('hidden');
};

//Agregar un event listener para el botón de start
  startButton.addEventListener('click', () => {
    if (!gameRunning) {
      startGame();
    } else {
      gameRunning = false;
      leftButton.classList.add('hidden');
      rightButton.classList.add('hidden');
      startButton.classList.remove('hidden');
      console.log('El juego se ha detenido');
    }
  });

  //Agregar event listeners para la tecla "1"
  document.addEventListener('keydown', (event) => {
    if (event.key === '1') {
      if (!gameRunning) {
        startGame();
        gameRunning = true;
      }
    }
  }
  );

  /////////////////////////////////////////////////
  //Event listener para la tecla izquierda
  document.addEventListener('keydown', (event) => {
    if (gameRunning && (event.key === LEFT_KEY)) {
      moveFirefighterLeft();
    }
  });

  // Event listener para la tecla derecha
document.addEventListener('keydown', (event) => {
  if (gameRunning && (event.key === RIGHT_KEY)) {
    moveFirefightersRight();
  }
});

// Función para mover los firefighters a la izquierda
function moveFirefighterLeft() {
  const firefighter = document.getElementById('firefighter');
  const currentLeft = parseFloat(firefighter.style.left);
  const newLeft = currentLeft - 33.3;

  if (firefightersPositions.includes(newLeft)) {
    firefighter.style.left = `${newLeft}%`;
  }
}

// Función para mover los firefighters a la derecha
function moveFirefightersRight() {
  const firefighter = document.getElementById('firefighter');
  const currentLeft = parseFloat(firefighter.style.left);
  const newLeft = currentLeft + 33.3;

  if (firefightersPositions.includes(newLeft)) {
    firefighter.style.left = `${newLeft}%`;
  }
}

////////////////////////////////////////////////////
// Event listener para el botón izquierdo
document.getElementById('left').addEventListener('mousedown', () => {
  if (gameRunning) {
    moveFirefighterLeft();
  }
});

// Event listener para el botón derecho
document.getElementById('right').addEventListener('mousedown', () => {
  if (gameRunning) {
    moveFirefightersRight();
  }
});

////////////////////////////////////////////////////
// Función para realizar acciones en cada tick
function tick () {
    // Comprobar si un hombrecito se ha caído al suelo y terminar la partida si es necesario
    checkFallingJumper();
    // Verificar si hay que añadir un nuevo hombrecito y añadirlo si es necesario
    if (needsNewJumper()) {
      const newJumperType = randomJumper(tickCount);
      if (newJumperType !== 'NO_JUMPER') {
        addNewJumper(newJumperType);
      }
    }
  
    // 3. Avanzar los jumpers
    moveJumpers();
  
    // 4. Incrementar la puntuación si es necesario
    aumentarScore();
  }

  function checkFallingJumper() {
    const jumpers = document.querySelectorAll('.jumper');
    jumpers.forEach((jumper) => {
      const jumperTop = parseFloat(jumper.style.top);
      if (jumperTop >= 100) {
        stopGame();
      }
    });
  }

  function moveJumpers() {
    const jumpers = document.querySelectorAll('.jumper');
    jumpers.forEach((jumper) => {
      const jumperTop = parseFloat(jumper.style.top);
      jumper.style.top = `${jumperTop + 0.5}%`;
    });
  }

  function aumentarScore() {
    tickCount++;
    document.getElementById('score').innerText = tickCount;
  }

  



  // Función para detener el juego
function stopGame() {
    
    gameRunning = false;
    stop();
    leftButton.classList.add('hidden');
    rightButton.classList.add('hidden');
    startButton.classList.remove('hidden');
  }

  // Event listener para el botón de inicio, y con el mismo boton detener el juego
  
  document.getElementById('start').addEventListener('click', () => {
    if (!gameRunning) {
      startGame();
      start();
    } else {
      stopGame();
    }
  });


////////////////////////////////////////////////////
// Funcion addNewJumper
function addNewJumper(jumperType) {
  // Obtener las posiciones y demás información según el tipo de Jumper
  const jumperData = jumpersData[jumperType];

  // Crear el elemento HTML del nuevo Jumper
  const newJumper = document.createElement('div');
  newJumper.classList.add('jumper');
  newJumper.style.top = `${jumperData.top}%`;
  newJumper.style.left = `${jumperData.left}%`;
  newJumper.style.backgroundImage = `url('sprites/rescued_man-${jumperData.order}.png')`;

  // Agregar el nuevo Jumper al contenedor
  document.getElementById('jumpers-container').appendChild(newJumper);
}





