let canvas = document.getElementById('board');
let ctx = canvas.getContext('2d');
let zhen = document.getElementById('zhen');
let qiang = document.getElementById('qiang');
let zhenLocation = {x:0,y:0};
let qiangEyeCenters = {left:{x:145,y:160},right:{x:196,y:165}};
let qiangEyeLocation ={
    left:{x:qiangEyeCenters.left.x,y:qiangEyeCenters.left.y,a:0,r:8},  
    right:{x:qiangEyeCenters.left.x,y:qiangEyeCenters.left.y,a:0,r:11}
};

function clearBoard(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function paintZhen(){
    ctx.drawImage(zhen,zhenLocation.x,zhenLocation.y, 80,80);
    ctx.beginPath();
    ctx.moveTo(250,0);
    ctx.lineTo(zhenLocation.x+35,zhenLocation.y+40);
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'white';
    ctx.stroke();
}

function paintQiang(){
    ctx.drawImage(qiang,0,0, canvas.width, canvas.height);
}

function paintQiangEyes(){
    paintQiangEye(qiangEyeLocation.left);
    paintQiangEye(qiangEyeLocation.right);
}

function paintQiangEye(eyeLocation){
    let eye = new Path2D();
    eye.arc(eyeLocation.x, eyeLocation.y, 5, 0, 2 * Math.PI, false); 
    eye.closePath(); 
    ctx.fillStyle='gray';
    ctx.fill(eye);
    let eyeLight = new Path2D();
    eyeLight.arc(eyeLocation.x, eyeLocation.y, 1, 0, 2 * Math.PI, false);   
    eyeLight.closePath(); 
    ctx.fillStyle='white';
    ctx.fill(eyeLight);
}


function draw(){
    clearBoard();
    paintQiang();
    paintQiangEyes();
    paintZhen();
}

function mousemove(e){
    let x = e.pageX;
    let y = e.pageY;
    zhenLocation.x = x-40;
    zhenLocation.y = y-60;
    //更新夾角a1、a2
    qiangEyeLocation.left.a = Math.atan2(x-qiangEyeCenters.left.x,y-qiangEyeCenters.left.y);
    qiangEyeLocation.right.a = Math.atan2(x-qiangEyeCenters.right.x,y-qiangEyeCenters.right.y);
    //更新左眼、右眼的left、top值
    qiangEyeLocation.left.x = qiangEyeLocation.left.r*Math.sin(qiangEyeLocation.left.a)+qiangEyeCenters.left.x -10;
    qiangEyeLocation.left.y = qiangEyeLocation.left.r*Math.cos(qiangEyeLocation.left.a)+qiangEyeCenters.left.y -10;
    qiangEyeLocation.right.x = qiangEyeLocation.right.r*Math.sin(qiangEyeLocation.right.a)+qiangEyeCenters.right.x-10;
    qiangEyeLocation.right.y = qiangEyeLocation.right.r*Math.cos(qiangEyeLocation.right.a)+qiangEyeCenters.right.y-10;
}


setInterval(draw,1000/60);


canvas.addEventListener('mousemove',mousemove,true);
canvas.addEventListener('click',mousemove,true);