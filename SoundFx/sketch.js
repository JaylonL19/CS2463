let sounds = new Tone.Players({
  'cash register': "assets/cashRegister.mp3",
  'bells': "assets/bells.mp3",
  'claps': "assets/claps.mp3",
  'phone': "assets/phone.mp3"
   });
 
 
 let delAmt = new Tone.FeedbackDelay ("8n", 0.5);
 let distAmt = new Tone.Distortion (0.5); 
 
 
 let button1, button2, button3, button4;
 let delaySlider, fbSlider, distSlider;
 
 
 sounds.connect(delAmt);
 delAmt.connect(distAmt);
 distAmt.toDestination();
 
 
 function setup() {
   createCanvas(400, 400);
  
   
   button1 = createButton('Applause');
   button1.position(85, 50);
   button1.mousePressed(() => sounds.player("claps").start()); 
   
   button2 = createButton('Cash register');
   button2.position(250, 50);
   button2.mousePressed(() => sounds.player("cash register").start());

   button3 = createButton('Bells');
   button3.position(205, 50);
   button3.mousePressed(() => sounds.player("bells").start());

   button4 = createButton('Phone');
   button4.position(150, 50);
   button4.mousePressed(() => sounds.player("phone").start());
 
   delaySlider = createSlider (0, 1, 0, 0.05);
   delaySlider.position (120, 200);
   delaySlider.mouseMoved (() => delAmt.delayTime.value = delaySlider.value()); 
 
   fbSlider = createSlider (0, 0.9, 0, 0.05);
   fbSlider.position (120, 250);
   fbSlider.mouseMoved (() => delAmt.feedback.value = fbSlider.value ());
 
   distSlider = createSlider (0, 0.9, 0, 0.05);
   distSlider.position (120, 300);
   distSlider.mouseMoved (() => distAmt.distortion = distSlider.value());
 }
 
 
 function draw() {
   background(140, 20, 130);
   text ("Press buttons for sound", width/3, 120);
   text ("Add delay", width/3, 235);
   text ("Add feedback", width/3, 285);
   text ("Add distortion", width/3, 335);
 }
