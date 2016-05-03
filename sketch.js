var track = null;
var trackPreview = null;
var cover = null;
var link = null;

function setup() {
  var s = new SpotifyWebApi();
  s.searchTracks("Call Me Maybe",{limit:1}).then(function(data){
    track = data.tracks.items[0];
    console.log(track);
    cover = loadImage(track.album.images[0].url);
    link = createA(track.uri,"Open in Spotify!");
    trackPreview = new p5.SoundFile(track.preview_url, function(){
      trackPreview.setVolume(1.0,1000,0);
      trackPreview.play();
    });
    trackPreview.setVolume(0,0,0);
    lowPass = new p5.LowPass();
    lowPass.freq(50);
    lowPass.disconnect();
    trackPreview.connect(lowPass);
    // connect lowpass to a meyda, maybe full signal to another
    // meyda, draw cool stuff.
  });
  createCanvas(1440, 720);
  textSize(32);
  fill(255);
  background(0);
  stroke(0);
}

function draw() {
  background(0);
  if(track){
    text(track.name,40,50);
    text(track.artists[0].name,40,100);
    image(cover,760,40);
  }
}