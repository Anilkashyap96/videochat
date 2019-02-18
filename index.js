

navigator.getUserMedia({video: true, audio: false}, function(stream){
	var Peer = require('simple-peer');
	var peer = new Peer({
		initiator: location.hash === "#init",
		stream: stream
	});
	peer.on('signal', function(data){
		console.log(data);
	
		
		var a = JSON.stringify(data);
		document.getElementById('yourId').value = a;
		console.log(a);
		
	})
	
	document.getElementById('connect').addEventListener('click', function(){
		var otherId = JSON.parse(document.getElementById('otherId').value);
		peer.signal(otherId);
	 }) 
	//
	document.getElementById('send').addEventListener('click', function(){
		var yourMessage = document.getElementById('yourMessage').value;
		console.log(yourMessage);
		peer.send(yourMessage);
	})
	//
	peer.on('data', function(data){
		console.log(data);
		document.getElementById('messages').textContent += data+'\n'
	})
	
	peer.on('stream', function(stream){
		var video = document.createElement('video');
		document.body.appendChild(video);
		
		
		//var URL = window.URL || window.webkitURL;
		
		video.srcObject = stream;
		video.play();
		
	})
	
}, function(err){
	console.log(err);
});