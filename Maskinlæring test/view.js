const htmlDiv = document.getElementById('app');

updateView()

function updateView(){
let html = ''

    html += `<div class="gamesPlayed">Games played: ${model.learned.gamesplayed}</div>`

    for (let index = 0; index < 9; index++) {
        if (index % 3 == 0){
            html += `<div class='rute først' onclick="clicked(${index})">${model.game.squareValue[index]}</div>`
        }
        else {
            html += `<div class='rute' onclick="clicked(${index})">${model.game.squareValue[index]}</div>`
        }
    }
    htmlDiv.innerHTML = html;
}