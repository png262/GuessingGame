// Guessing Game


// Define variable to store the target number
var target = Math.floor(Math.random()*100+1);

// Define variable to store number of guesses left
var guessleft = 5;
var attempts=0;
var input, status, difference, trend;
var tableStatus=[];
var going=true;

function newGame() {
	target = Math.floor(Math.random()*100+1);
	guessleft=5;
	attempts=0;
	going=true;
	tableStatus=[];
	$('#status-message').removeClass('crazy');
	$('#status-message').text('Input a Number 1-100');
	$('body').css('background-color','white');



	$('#inputNum').val('');
	$('tbody tr').remove();
	$('#attempts-left').text('Attempts Left: '+guessleft);
}


$(document).ready(function() {




	//Check if user submits number via Button
	$('#submit-num').on('click',checkNum);

	//Check if user submits number via Return key
	$('#inputNum').keyup(function(e) {
		var code = e.which;
		if(code===13)
			checkNum();
	});

	//If user clicks "Play game" button, reset everything
	$('.btn-primary').on('click',newGame);

	$('.btn-info').on('click',function() {
		$('#status-message').text("It might be "+target);
	});

})
function returnStatus() {
	difference = Math.abs(target-input);

	if(difference>60) {
		status="cold"; color='info'; }
	else if(difference>30) {
		status="warm"; color='warning'; }
	else {
		status="hot"; color='danger'; }

	if(target>input)
		direction="higher"
	else
		direction="lower"

	if(tableStatus.length>=1) {
		if (difference<tableStatus[attempts-1][1])
			trend="hotter"
		else
			trend="colder"
	}
	tableStatus.push([input,difference,status,trend,direction]);

	if(attempts===0)
		$('#status-message').text("You are "+status+". Guess "+direction);
	else
		$('#status-message').text("You are "+status+". You are getting "+trend+" compared to your previous guess. Guess "+direction);
	$('#inputNum').val('');
	$('tbody').append('<tr><td>'+(attempts+1)+'</td><td>'+input+'</td></tr>');
	$('tbody tr:last').addClass(color);

	guessleft--;
	$('#attempts-left').text('Attempts Left: '+guessleft);

}

function checkNum() {
	input = +$('#inputNum').val();
	if(going===true && guessleft>0) {
		if(!isNaN(input) && input>0 && input<=100) {
			if(sameNum())
				alert("Same number as previous guess");
			else if(input===target) {
				$('#status-message').text("Correct!!");
				$('#status-message').addClass('crazy');
				$('body').css('background-color','green');
				going=false;
			}
			else {
				returnStatus();
				attempts++;
			}
		}
		else
			alert("Not a valid number between 1-100")
	}
}


function sameNum() {
	if (tableStatus.length===0)
		return false;
	for(var i=0;i<tableStatus.length;i++) {
		if(input===tableStatus[i][0])
			return true;
	}
	return false;
}