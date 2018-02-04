// Create your global variables below:
var tracklist = ["Heat", "Gold", "Boys", "2Pac", "Skit 1", "Fake", "Bank", "Skit 2", "Trip", "Swim"];
var volLevels = [];

function init() {
	var i;
	for (i=0; i<6; i++) {
		volLevels[i] = document.getElementById('vl' + i);
	}

	//fills first three volume bubbles
	for (i=0; i<3; i++) {
		document.getElementById('vl' + i).classList.replace("volume-level", "volume-fill");
	}

	document.getElementById('player-song-name').innerHTML = tracklist[1];
};

function volUp() {
	var i;
	for (i=0; i<6; i++) {
		if (document.getElementById('vl' + i).classList.contains("volume-level")) {
			document.getElementById('vl' + i).classList.replace("volume-level", "volume-fill");
			break;
		}
	}
}

//removes shaded bubbles when you click volume down button
function volDown() {
	var i;
	for (i=5; i>=0; i--) {
		if (document.getElementById('vl' + i).classList.contains("volume-fill")) {
			document.getElementById('vl' + i).classList.replace("volume-fill", "volume-level");
			break;
		}
	}
}

function switchPlay() {	
	//toggles the play button between play and pause
	if (document.getElementById('play').innerHTML == 'play_arrow') {
		document.getElementById('play').innerHTML = 'pause';
	} else {
		document.getElementById('play').innerHTML = 'play_arrow';
	}

	//moves slider and updates time
	var thumb = setInterval(moveSlider, 1000);
	function moveSlider() {
		var val = document.getElementById('slider').value;
		var t = secondsToMs(val);
		if (document.getElementById('play').innerHTML == 'play_arrow') {
			clearInterval(thumb);
		} else {
			document.getElementById('slider').stepUp(1);
			document.getElementById('start').innerHTML = t;
			if (val == 180) {
				nextSong();
			}
		}
	}
}


function nextSong() {
	document.getElementById('start').innerHTML = '0:00';
	document.getElementById('slider').value = 0;
	var track = document.getElementById('player-song-name').innerHTML
	var i = tracklist.indexOf(track);

	//change song name
	if (i == (tracklist.length - 1)) {
		document.getElementById('player-song-name').innerHTML = tracklist[0];
	} else { 
		document.getElementById('player-song-name').innerHTML = tracklist[i + 1];
	}
}

function prevSong() {
	document.getElementById('start').innerHTML = '0:00';
	document.getElementById('slider').value = 0;
	
	var track = document.getElementById('player-song-name').innerHTML
	var i = tracklist.indexOf(track);
	var t = tracklist.length;

	//change song name
	if (i == 0) {
		document.getElementById('player-song-name').innerHTML = tracklist[t-1];
	} else {
		document.getElementById('player-song-name').innerHTML = tracklist[i-1];
	}
}

function secondsToMs(d) {
    d = Number(d);

    var min = Math.floor(d / 60);
    var sec = Math.floor(d % 60);

    return `0${min}`.slice(-1) + ":" + `00${sec}`.slice(-2);
}

init();