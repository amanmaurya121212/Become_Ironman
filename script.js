let video, dista;
let po;
let nosex, nosey, eyex, eyey;
let spose, skeleton;
let ironman;
let lshoulderx, lshouldery, rshoulderx, rshouldery;
let lelbowx, lelbowy, relbowx, relbowy, lhipx, lhipy, rhipx, rhipy, lkneex, lkneey, rkneex, rkneey, rwristx, rwristy, lwristx, lwristy, lanklex, lankley, ranklex, rankley;
let distaleft, distaluphand, distaruphand, distallowhand, distarlowhand, distalupleg, distarupleg, distallowleg, distarlowleg;
function setup() {
  createCanvas(750, 700);
  video = createCapture(VIDEO);
  video.hide();

  po = ml5.poseNet(video, modelLoaded);
  po.on("pose", recivedposes)
  iron = loadImage('ironmanhead.png')
  suit = loadImage('suit.png')
  luphand = loadImage("luphand.png")
  ruphand = loadImage('ruphand.png')
  llowhand = loadImage('llowhand.png')
  rlowhand = loadImage('rlowhand.png')
  lupleg = loadImage('lupleg.png')
  rupleg = loadImage('rupleg.png')
  llowleg = loadImage('llowleg.png')
  rlowleg = loadImage('rlowleg.png')
}
function recivedposes(poses) {
  console.log(poses);

  if (poses.length > 0) {
    spose = poses[0].pose;
    skeleton = poses[0].skeleton;
    nosex = spose.rightEye.x;
    nosey = spose.rightEye.y;
    eyex = spose.leftEye.x;
    eyey = spose.leftEye.y;
    rshoulderx = spose.rightShoulder.x;
    rshouldery = spose.rightShoulder.y;
    lshoulderx = spose.leftShoulder.x;
    lshouldery = spose.leftShoulder.y;
    relbowx = spose.rightElbow.x;
    relbowy = spose.rightElbow.y;
    lelbowx = spose.leftElbow.x;
    lelbowy = spose.leftElbow.y;
    lhipx = spose.leftHip.x;
    lhipy = spose.leftHip.y;
    rhipx = spose.rightHip.x;
    rhipy = spose.rightHip.y;
    lkneex = spose.leftKnee.x;
    lkneey = spose.leftKnee.y;
    rkneex = spose.rightKnee.x;
    rkneey = spose.rightKnee.y;
    rwristx = spose.rightWrist.x;
    rwristy = spose.rightWrist.y;
    lwristx = spose.leftWrist.x;
    lwristy = spose.leftWrist.y;
    lanklex = spose.leftAnkle.x;
    lankley = spose.leftAnkle.y;
    ranklex = spose.rightAnkle.x;
    rankley = spose.rightAnkle.y;
  }



  dista = (dist(lshoulderx, lshouldery, rshoulderx, rshouldery));
  distaluphand = (dist(lshoulderx, lshouldery, lelbowx, lelbowy));
  distaruphand = (dist(rshoulderx, rshouldery, relbowx, relbowy));
  distaleft = (dist(lshoulderx, lshouldery, lhipx, lhipy));
  distallowhand = (dist(lelbowx, lelbowy, lwristx, lwristy));
  distarlowhand = (dist(relbowx, relbowy, rwristx, rwristy));
  distalupleg = (dist(lhipx, lhipy, lkneex, lkneey));
  distarupleg = (dist(rhipx, rhipy, rkneex, rkneey));
  distallowleg = (dist(lkneex, lkneey, lanklex, lankley));
  distarlowleg = (dist(rkneex, rkneey, ranklex, rankley));


}
function Angle(x1, y2, x2, y2) {
  return Math.atan2(y2 - y1, x2 - x1); /* Convert from radians to degrees*/
}

function rotateImage(angle) {
  const image = document.getElementById('image');
  image.style.transform = `rotate(${angle}deg)`;
}

/* Example usage:
const x1 = 100, y1 = 150;
const x2 = 200, y2 = 250;
const angle = calculateAngle(x1, y1, x2, y2);

rotateImage(-angle);*/





function modelLoaded() {
  console.log("model is loaded")
}
function draw() {

  image(video, 0, 0, 600, 500);

  /*image(iron, nosex-40, nosey-40, 70, 90)*/

  /*stroke(255, 0,0)
  strokeWeight(5) 
  ellipse(nosex, nosey, 135,185)
df(spose){
  for(let i=0;i<spose.keypoints.length;i++){
  
  /* stroke(255, 0,0) 
   
   ellipse( spose.keypoints[i].position.x
,spose.keypoints[i].position.y,9) }
  for(let j=0;j<skeleton.length;j++){
    stroke(255, 255,255);
    strokeWeight(11);
    line(skeleton[j][0].position.x, skeleton[j][0].position.y, skeleton[j][1].position.x, skeleton[j][1].position.y)}
  }*/
  /*fill(255,0,0);
  ellipse(nosex, nosey, 15,15);
  ellipse(250, 450,15,15);*/









  
  // ruphand
  image(ruphand, lshoulderx - (.02 * distaluphand), lshouldery - (.45 * distaluphand), .8 * distaluphand, (1.8 * distaluphand))

  // luphand
  image(luphand, rshoulderx - (1.25 * distaruphand), rshouldery - (.48 * distaruphand), .80 * distaruphand, 1.8 * distaruphand);

  // suit
  image(suit, (rshoulderx - (.47 * dista)), rshouldery - (.4 * dista), 1.45 * dista, 1.3 * distaleft)

  // head image
  push();
  translate(nosex + (.025 * dista), nosey + (.01 * dista));
  rotate(((nosey - eyey) - 2.45
  ) / (nosex - eyex));          // Rotate by angle
  imageMode(CENTER);      // Draw image centered at the hand position
  image(iron, 0, 0, 1.2 * dista, 1.2 * dista);
  pop();

  // lupleg
  image(lupleg, lhipx - (.66 * dista), (lhipy - (.1 * dista)), (.55 * distalupleg), 1.3 * distalupleg);
  // rupleg
  image(rupleg, rhipx - (.79 * dista), (rhipy - (.1 * dista)), (.55 * distarupleg), 1.3 * distarupleg);
  // llowleg
  image(llowleg, lkneex - (.69 * dista), lkneey - (.25 * dista), .8 * distallowleg, 1.3 * distallowleg);
  // rlowleg
  image(rlowleg, rkneex - (1.5 * dista), rkneey - (.25 * dista), .8 * distarlowleg, 1.3 * distarlowleg)
  // rlowhand
  image(rlowhand, lelbowx - (.25 * dista), lelbowy + (.25 * dista), .79 * distallowhand, 1.45 * distallowhand)
  // llowhand
  image(llowhand, relbowx - (.65 * dista), relbowy + (.25 * dista), .79 * distarlowhand, 1.45 * distarlowhand)


  // // main suit

  // function liner(x1,y1,x2,y2){
     
  // }
  





















    

/*  push();
    translate(lshoulderx-(.28*dista) ,lshouldery-(1.85*dista)) 
    rotate((lshouldery-rshouldery)/(lshoulderx- rshoulderx));          // Rotate by angle
    imageMode(CENTER);      // Draw image centered at the hand position
    image(suit,0,0, dista, distaleft)

    pop();  */
  /*
  push();
    translate(rshoulderx-(.59*dista) ,rshouldery-(.25*dista))  
    rotate((rshoulderx-relbow(rshouldery-relbowy));          // Rotate by angle
    imageMode();      // Draw image centered at the hand position
  image(luphand,0 ,0 ,.70*distaluphand,distaluphand);
    pop();   

  // ruphand
  
   push();
    translate(500,600); 
    rotate((lshouldery-rshouldery)/(lshoulderx- rshoulderx));          // Rotate by angle
    imageMode(CENTER);      // Draw image centered at the hand position
  image(ruphand,lshoulderx+(.26*dista) ,lshouldery-(.27*dista),distaruphand,distaluphand)
    pop();   

  // rlowhand  
  
  push();
    translate(500,600); 
    rotate((lshouldery-rshouldery)/(lshoulderx- rshoulderx));          // Rotate by angle
    imageMode(CENTER);      // Draw image centered at the hand position
  image(rlowhand, lelbowx-(.15*dista), lelbowy+(.25*dista), distarlowhand, distarlowhand)
   pop();
  
  // llowhand

  push();
    translate(500,600); 
    rotate((lshouldery-rshouldery)/(lshoulderx- rshoulderx));          // Rotate by angle
    imageMode(CENTER);      // Draw image centered at the hand position
  image(llowhand, relbowx-(.65*dista), relbowy+(.25*dista),distallowhand,distallowhand)
   pop();

  // lupleg

  push();
    translate(500,600); 
    rotate((lshouldery-rshouldery)/(lshoulderx- rshoulderx));          // Rotate by angle
    imageMode(CENTER);      // Draw image centered at the hand position
  image(lupleg,lhipx-(.5*dista) , lhipy, distalupleg,distalupleg);
   pop();
    
  // rupleg

  push();
    translate(500,600); 
    rotate((lshouldery-rshouldery)/(lshoulderx- rshoulderx));          // Rotate by angle
    imageMode(CENTER);      // Draw image centered at the hand position
  image(rupleg, rhipx-(.5*dista), rhipy, distarupleg,distarupleg);

   pop();
  
  // llowleg

  push();
    translate(500,600); 
    rotate((lshouldery-rshouldery)/(lshoulderx- rshoulderx));          // Rotate by angle
    imageMode(CENTER);      // Draw image centered at the hand position
  image(llowleg, lkneex-(.5*dista), lkneey-(.5*dista), distallowleg,distallowleg);
   pop();

  // rlowleg
  
  push();
    translate(500,600); 
    rotate((lshouldery-rshouldery)/(lshoulderx- rshoulderx));          // Rotate by angle
    imageMode(CENTER);      // Draw image centered at the hand position
  image(rlowleg, rkneex-(.75*dista), rkneey-(.65*dista), distarlowleg, distarlowleg) 
  }
   pop();*/}





























