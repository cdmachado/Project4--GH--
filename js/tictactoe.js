!function() {
  function showOrHide(element, feature) {
    element.style.display = feature;
  }

  function hoverXorO(event, image) {
    event.target.style.backgroundImage = image;
  }

  function mouseInAndOut(event, elementX, elementO) {
   playerX.className == 'players active' ? hoverXorO(event, elementX) : hoverXorO(event, elementO);
  }

  function changeActive(activePl, inactivePl) {
    activePl.className = 'players';
    inactivePl.className = 'players active';
  }

  function changeFillClass(event, clase) {
      event.target.className = clase;
  }

  function endGame(winningClass, message) {
    showOrHide(board, 'none');
    showOrHide(finishScreen, 'block');
    finishScreen.className = winningClass;
    finishMessage.textContent = message;
  }

  let total = 0;
  function checkForWins(board, player) {
    for (let i in winningOptions) {
      let array = winningOptions[i];
      for (let i = 0; i < array.length; i++) {
        if (board[array[i]].className === player) {
          total++;
          if (total == 3) {
            return true;
            break;
          }
        }
      }
      total = 0;
    }
  }

  const winningOptions = {
    option1: [0, 1, 2],
    option2: [3, 4, 5],
    option3: [6, 7, 8],
    option4: [0, 3, 6],
    option5: [1, 4, 7],
    option6: [2, 5, 8],
    option7: [0, 4, 8],
    option8: [2, 4, 6],
  };



  // Initial Screen
  const header = document.getElementsByTagName('header')[2];
  const userPlayer = header.getElementsByTagName('li')[1];

  const board = document.getElementById('board');
  const finishScreen = document.getElementById('finish');
  showOrHide(board, 'none');
  showOrHide(finishScreen, 'none');

  const startScreen = document.getElementById('start');
  const startButton = startScreen.getElementsByTagName('a')[0];
  startButton.addEventListener('click', () => {
      showOrHide(startScreen, 'none');
      showOrHide(board, 'block');
  });

  // Toogle turn between players
  const playerO = document.getElementById('player1');
  const playerX = document.getElementById('player2');
  playerX.className = 'players active';

  const boxes = document.getElementsByClassName('boxes')[0];
  const displayXorO = (e) => mouseInAndOut(event, "url('img/x.svg')", "url('img/o.svg')");
  const hideXorO = (e) => mouseInAndOut(event, '', '')
  boxes.addEventListener('mouseover', displayXorO);
  boxes.addEventListener('mouseout', hideXorO);

  const finishMessage = finishScreen.getElementsByTagName('p')[0];

  const liListHTML = boxes.getElementsByTagName('li');
  const liList = Array.from(liListHTML);
  const huPlayerX = 'box box-filled-2 disabled';
  const aiPlayerO = 'box box-filled-1 disabled';

  boxes.addEventListener('click', (e) => {
    playerX.className == 'players active'
      ? (changeFillClass(event, huPlayerX), changeActive(playerX, playerO))
        : (changeFillClass(event, aiPlayerO), changeActive(playerO, playerX));
    if (checkForWins(liList, huPlayerX)) {
      endGame('screen screen-win screen-win-two', 'Winner');
    } else if (checkForWins(liList, aiPlayerO)) {
      endGame('screen screen-win screen-win-one', 'Winner')
    }
    let tieGame = liList.filter(li => li.className === 'box');
    if (tieGame.length == 0) {
       endGame('screen screen-win screen-win-tie', "It's a tie!");
    }

    //--Part of the minimax system--
    let secondBoard = origBoard.map(li => {
      if (liList[li].className == huPlayerX) {
        li = 'X';
      } else if (liList[li].className == aiPlayerO) {
        li = 'O';
      } else {
        li = li;
      }
      return li;
    });
    //--until here--


  });

  // Initiate a new game
  const newGameButton = finishScreen.getElementsByTagName('a')[0];
  newGameButton.addEventListener('click', () => {
      showOrHide(finishScreen, 'none');
      showOrHide(board, 'block');
      liList.forEach(li => li.className = 'box');
  });






  // Minimax function (work in progress)

  const origBoard = [
    0, 1, 2,
    3, 4, 5,
    6, 7, 8
  ];


  function emptySpots(board) {
      return board.filter(spot => spot !== 'X' || spot !== 'O');
  }

  function minimax(board, player) {
    let emptyPlaces = emptySpots(board);
    if (checkForWins(board, huPlayerX)) {
      return {score: -10};
    } else if (checkForWins(board, aiPlayerO)) {
      return {score: 10};
    }

    let moves = [];
    for (let i = 0; i < emptyPlaces.length; i++) {
      board[emptyPlaces[i]] = player;
      let result = minimax(board, player);
      moves.push()
    }


  }
}();
