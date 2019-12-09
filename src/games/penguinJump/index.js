import { Key } from 'terminal-game-io';

const FPS = 8;

const BOARD_WIDTH = 140;
const BOARD_HEIGHT = 15;

let cactusX = BOARD_WIDTH;
let penguinY = 11;

const penguin = `
 __
( o>
///\\
\\V_/_`;

const cloud = `
      _ .
   (  _ )_
 (_  _(_ ,)
`;

const cloud2 = `
     .--
  .+(   )
  (   .  )
 (   (   ))
  \`- __.'`;

const cactus = `
  _  _
 | || | _
 | || || |
  \\_  || |
    |  _/
____|_|`;


const addDrawToBoard = (draw, board, x = 0, y = 0) => {
    const drawLines = draw.split('\n').slice(1);

    board = board.split('');

    let currentY = y;
    for (let i = 0; i < drawLines.length; i++) {
        const line = drawLines[i];
        const position = currentY * BOARD_WIDTH + x;
        for (let j = 0; j < line.length; j++) {
            const currentPosition = position + j;
            if (currentY !== Math.trunc((currentPosition) / BOARD_WIDTH)) continue;
            if (!board[currentPosition]) continue;
            board[position + j] = line[j];
        }
        currentY++;
    }

    return board.join('');
}

const frameHandler = (instance) => {
    let frameData = '';
    for (let y = 0; y < BOARD_HEIGHT; y++) {
        if (y === BOARD_HEIGHT - 1) {
            frameData += '_'.repeat(BOARD_WIDTH);
            continue;
        }

        for (let x = 0; x < BOARD_WIDTH; x++) {
            frameData += x === BOARD_WIDTH - 1 ?  '|' : ' ';
        }
    }


    frameData = addDrawToBoard(cloud, frameData, 40, 2);
    frameData = addDrawToBoard(cloud, frameData, 80, 6);
    frameData = addDrawToBoard(cloud2, frameData, 94, 4);
    frameData = addDrawToBoard(cloud2, frameData, 14, 5);
    frameData = addDrawToBoard(cactus, frameData, cactusX, 9);
    frameData = addDrawToBoard(penguin, frameData, 3, penguinY);

    instance.drawFrame(frameData, BOARD_WIDTH, BOARD_HEIGHT);
    cactusX--;

    if (cactusX + 10 < 0) cactusX = BOARD_WIDTH;
};

const keypressHandler = (instance, keyName) => {
    switch(keyName) {
    case Key.Space:
        penguinY--;
        break;
    case 'q':
        instance.exit();
    };
};

export default {
    title: 'Penguin Jump',
    description: 'Jump over obstacules to make points',
    gameData: {
        fps: FPS,
        frameHandler,
        keypressHandler,
    },
};
