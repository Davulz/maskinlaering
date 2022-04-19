function clicked(index){
    
    
    if(model.game.squareValue[index] == ''){
    model.game.xNext ? clickedX(index):clickedO(index)
    }

    if(model.game.squareValue.indexOf('')==-1){
       resetGame();
    }

    else {
        return
    }
}

function clickedX(index){
    model.game.xNext = false;
    let sqr = model.game.squareValue;
    sqr.splice(index, 1, 'X');
    model.game.moves++
    model.game.moveMatrix.push(index);
    model.game.movesX.push(index)
    let won = checkWin();
    updateView();
    if (!won) {clickedAuto()}
    else return;
}

function clickedO(index){
    model.game.xNext = true;
    let sqr = model.game.squareValue;
    sqr.splice(index, 1, 'O');
    model.game.moveMatrix.push(index);
    model.game.movesO.push(index)
    model.game.moves++
    checkWin();
    updateView();
}

function clickedAuto(){
    for (let i = 0; i < model.learned.wonGames.length; i++) {
        if (model.learned.wonGames[i].slice(0, model.game.moves) == model.game.moveMatrix){
            clickedO(model.learned.wongames[i][i]);
            return;
        }     
    }
    for (let i = 0; i < model.learned.drawnGames.length; i++) {
        if (model.learned.drawnGames[i].slice(0, model.game.moves) == model.game.moveMatrix){
            clickedO(model.learned.drawnGames[i][i]);
            return;
        }     
    }
    let pick = randomNumber()
    clicked(pick)

        
}


function randomNumber(){
    let pick = Math.floor(Math.random()*8);
        while (model.game.moveMatrix.indexOf(pick) != -1){
            pick = Math.floor(Math.random()*8);
        }
        return pick
}

function checkWin(){
    for (let i = 0; i < model.game.winningLines.length; i++) {
        if (model.game.movesO.sort().toString().includes(model.game.winningLines[i].toString())){
            model.learned.wonGames.push(model.game.moveMatrix);
            resetGame();
            return true
        }
        if (model.game.movesX.sort().toString().includes(model.game.winningLines[i].toString())){
            resetGame();
            return true
        }
        if(model.game.squareValue.indexOf('')==-1){
            model.learned.drawnGames.push(model.game.moveMatrix);
            resetGame();
            return true
        }
        
    }
    return false;
}

function resetGame(){
model.learned.gamesplayed++
model.game.squareValue.splice(0, 9, '', '','','','','','','','');
model.game.moveMatrix = [];
model.game.moves = 0;
model.game.movesO = []; 
model.game.movesX = [];
model.game.xNext = true;
updateView()
}