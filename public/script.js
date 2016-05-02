// CLIENT SIDE CODE

$(function() {
var socket = io();

var cell0 = $('#cell0');
var cell1 = $('#cell1');
var cell2 = $('#cell2');
var cell3 = $('#cell3');
var cell4 = $('#cell4');
var cell5 = $('#cell5');
var cell6 = $('#cell6');
var cell7 = $('#cell7');
var cell8 = $('#cell8');
var playerStatus;
var player = 1;


initialize();

function initialize() {
  $('.playerTurn').text("Player 1's Turn");
  for ( var i = 0; i < 9; i++) {
    $('#cell' + i).on('click', xo);
  }
}

function xo(e) {
  if (player === 1 && ($(this).text().length !== 0)) {
      alert("This square has been chosen already. Choose another square!");
      // player = 1;
    } else if (player === 1 && ($(this).text().length === 0)) {
        $(this).text('X');
        socket.emit("x move", e.target.id)
        
          //checking for winner
        if ((cell0.text() === 'X' && cell1.text() === 'X' && cell2.text() === 'X') || 
            (cell3.text() === 'X' && cell4.text() === 'X' && cell5.text() === 'X') ||
            (cell6.text() === 'X' && cell7.text() === 'X' && cell8.text() === 'X') ||
            (cell0.text() === 'X' && cell3.text() === 'X' && cell6.text() === 'X') ||
            (cell1.text() === 'X' && cell4.text() === 'X' && cell7.text() === 'X') ||
            (cell2.text() === 'X' && cell5.text() === 'X' && cell8.text() === 'X') ||
            (cell0.text() === 'X' && cell4.text() === 'X' && cell8.text() === 'X') ||
            (cell2.text() === 'X' && cell4.text() === 'X' && cell6.text() === 'X')) {
              $('.playerTurn').text("Game over, X wins!");
              alert("X has Won!");
              setTimeout(reset, 1000);
              return;
        }

        $('.playerTurn').text("Player 2's Turn");
        } else if (player === 0 && $(this).text().length !== 0) {
          alert("This square has been chosen already. Choose another square!");
          // player = 0;
        } else {
          $(this).text('O');
          socket.emit("o move", e.target.id)
          if ((cell0.text() === 'O' && cell1.text() === 'O' && cell2.text() === 'O') || 
              (cell3.text() === 'O' && cell4.text() === 'O' && cell5.text() === 'O') ||
              (cell6.text() === 'O' && cell7.text() === 'O' && cell8.text() === 'O') ||
              (cell0.text() === 'O' && cell3.text() === 'O' && cell6.text() === 'O') ||
              (cell1.text() === 'O' && cell4.text() === 'O' && cell7.text() === 'O') ||
              (cell2.text() === 'O' && cell5.text() === 'O' && cell8.text() === 'O') ||
              (cell0.text() === 'O' && cell4.text() === 'O' && cell8.text() === 'O') ||
              (cell2.text() === 'O' && cell4.text() === 'O' && cell6.text() === 'O')) {
                $('.playerTurn').text("Game over, O wins!");
                alert("O has Won!");
                setTimeout(reset, 1000);
          }
          $('.playerTurn').text("Player 1's Turn");
  }
}

socket.on('x moved', function(data){
  console.log(data)
  $('#' + data).text('X');
  player = 0
})

socket.on('o moved', function(data){
  console.log(data)
  $('#' + data).text('O');
  player = 1
})

var button = $('<button></button>');
button.text("Reset");
$('#game').append(button);
$('button').on('click', reset);

function reset() {
  for (var a = 0; a < 9; a++) {
    $('#cell' + a).text('');
  }
  player = 1;
  $('.playerTurn').text("Player 1's Turn");
}

var name = prompt("What is your name?");
  socket.emit("join game", name);
  socket.on('join', function(name){
    $('.join').text("Player: " + name);
  });

  socket.on('spec', function(){
    alert("You are currently spectating.");
    for ( var i = 0; i < 9; i++) {
    $('#cell' + i).off('click');
    $('button').off('click');
  }
  });


  socket.on("left game", function(player){
    console.log(player);
    $('.playerTurn').text(player.name + " has left the game.");
  });


});