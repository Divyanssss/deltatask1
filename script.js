
const middle = document.getElementById("middle");
const X = window.innerWidth / 2;
const Y = window.innerHeight / 2;
for(let i=0;i<6;i++){
    const r=120;
    const angle=(Math.PI/3)*i;
    const x=X+r*Math.cos(angle);
    const y=Y+r*Math.sin(angle);
    const btn=document.getElementById(`i${i + 1}`);
    btn.style.left=`${x-125}px`;
    btn.style.top=`${y-100}px`;
    
}
for(let i=0;i<6;i++){
    const r=240;
    const angle=(Math.PI/3)*i;
    const x=X+r*Math.cos(angle);
    const y=Y+r*Math.sin(angle);
    const btn=document.getElementById(`m${i + 1}`);
    btn.style.left=`${x-125}px`;
    btn.style.top=`${y-100}px`;   
}
for(let i=0;i<6;i++){
    const r=360;
    const angle=(Math.PI/3)*i;
    const x=X+r*Math.cos(angle);
    const y=Y+r*Math.sin(angle);
    const btn=document.getElementById(`o${i + 1}`);
    btn.style.left=`${x-125}px`;
    btn.style.top=`${y-100}px`;
    
}
const pointstable={
    "o1-o2":1,"o2-o3":1,"o3-o4":1,"o4-o5":1,"o5-o6":7,"o6-o1":1,
    "m1-m2":2,"m2-m3":2,"m3-m4":2,"m4-m5":2,"m5-m6":2,"m6-m1":2,
    "i1-i2":3,"i2-i3":3,"i3-i4":3,"i4-i5":3,"i5-i6":3,"i6-i1":3,
    "o2-m2":2,"o4-m4":2,"o6-m6":2,
    "m1-i1":3,"m3-i3":3,"m5-i5":3

};

    const grid=document.getElementById("places");
    for(let i in pointstable){
        let points=i.split("-");
        let p1=points[0];
        let p2=points[1];
        const btn1=document.getElementById(p1);
        const btn2=document.getElementById(p2);

       
            const x1=parseInt(btn1.style.left)+35; 
            const y1=parseInt(btn1.style.top)+35;  
            const x2=parseInt(btn2.style.left)+35;
            const y2=parseInt(btn2.style.top)+35;
            const l=Math.sqrt((x2-x1)**2+(y2-y1)**2);
            let angle=(Math.atan((y2-y1)/(x2-x1))*180)/Math.PI;
            if(x1>x2){
                angle=angle+180;
            }
            const X=(x1+x2)/2;
            const Y=(y1+y2)/2;
            
            const line=document.createElement("div");
            line.className="line";
            line.id=`${p1}-${p2}`;
            line.style.width=`${l}px`;
            line.style.transform=`rotate(${angle}deg)`;
            line.style.left=`${X-l/2}px`;
            line.style.top=`${Y}px`;

          
            grid.appendChild(line);
         

const linepoints=document.createElement("div");
linepoints.className="linepoints";
linepoints.innerText=pointstable[i];



linepoints.style.left=`${X}px`;
linepoints.style.top=`${Y}px`; 
grid.appendChild(linepoints);



        
    }

let turn=0;
let secondturn=0;
let paused=false;
let id1=0;
let bluepos=[];
let redpos=[];
document.getElementById("currentplayer").style.backgroundColor="blue";


function gamelogic(id){
    if(paused){
        return;
    }
   
   
   
    
    if(turn<8){
        startphase(id);
    }
    else{gamephase(id);}
  

check();
innercheck()}
function startphase(id){
    if(turn<6&&id[0]!="o"){
        alert("Please fill outer layer first");
        return;
    }
    if(turn<8&&document.getElementById(`${id}`).style.backgroundColor=="red"||document.getElementById(`${id}`).style.backgroundColor=="blue"){
        return;}
    if(turn%2==0){
        document.getElementById("currentplayer").style.backgroundColor="red";
        document.getElementById(`${id}`).style.backgroundColor="blue";
        bluepos.push(id);
        if(turn>=2){points("blue");}
        
    }
    else{
        document.getElementById("currentplayer").style.backgroundColor="blue";
        document.getElementById(`${id}`).style.backgroundColor="red";
        redpos.push(id);
        if(turn>=3){points("red");}
    }
    timer();
    turn++;
    

}
function gamephase(id){
    
  
  
    if(turn%2==0){
       
        if(secondturn==0){
            if("blue"!=document.getElementById(`${id}`).style.backgroundColor){
                alert("Please select the titan you want to move");
                return;
            }
            secondturn=1;
            id1=id;
            return;
        }
        

        
        if(document.getElementById(`${id}`).style.backgroundColor=="red"||document.getElementById(`${id}`).style.backgroundColor=="blue"){
            alert("Please select the place where you want your titan to move");
            return;}
        movetitan(id,id1,"blue");}
    
    else{
        if(secondturn==0){
            if("red"!=document.getElementById(`${id}`).style.backgroundColor){
                alert("Please select the titan you want to move");
                return;}
            secondturn=1;
            id1=id;
            return;
        }
        
        if(document.getElementById(`${id}`).style.backgroundColor=="red"||document.getElementById(`${id}`).style.backgroundColor=="blue"){
            alert("Please select the place where you want your titan to move 2");
            return;}
        movetitan(id,id1,"red");}
       
    }



    function movetitan(id,id1,col) {
        if (rightmove(id,id1)) {
            document.getElementById(id).style.backgroundColor = col;
            document.getElementById(id1).style.backgroundColor = "rgba(39, 8, 63, 0.666)";;
            if(col=="blue") {
                document.getElementById("currentplayer").style.backgroundColor = "red";
            }else{
                document.getElementById("currentplayer").style.backgroundColor = "blue";
            }
            
            if(col=="blue"){
                bluepos=bluepos.filter(pos=>pos!=id1);
                bluepos.push(id);
            }else{
                redpos=redpos.filter(pos=>pos!=id1);
                redpos.push(id);
            }
            points(col);
            turn++;
            secondturn = 0;
            timer();
        }
    }
function rightmove(id,id1){
    const pos1=parseInt(id1[1]);
    const pos2=parseInt(id[1]);
    if(id1[0]=="o"){if((id[0]=="o"&&(pos1==(pos2+1)||pos1==(pos2-1)||(pos1==6&&pos2==1)||(pos1==1&&pos2==6)))||(id[0]=="m"&&pos1==pos2&&pos1%2==0)){
        return true;
    }}
    if(id1[0]=="m"){if((id[0]=="m"&&(pos1==(pos2+1)||pos1==(pos2-1)||(pos1==6&&pos2==1)||(pos1==1&&pos2==6)))||(id[0]=="i"&&pos1==pos2&&pos1%2==1)||(id[0]=="o"&&pos1==pos2&&pos1%2==0)){
        return true;}
    }
    if(id1[0]=="i"){if((id[0]=="i"&&(pos1==(pos2+1)||pos1==(pos2-1)||(pos1==6&&pos2==1)||(pos1==1&&pos2==6)))||(id[0]=="m"&&pos1==pos2&&pos1%2==1)){
        return true;}
    }
alert("Invalid move");
    return false;
    }


    


let playertime;
let endtime;

function timer(){
    const time=document.getElementById("playertimer");
   
    if(playertime){
        clearInterval(playertime);
    }
    let pc=0;
    time.innerHTML=`TURN ENDS IN:${60}`;
    playertime=setInterval(() => {
        if(paused){
            
            return;

        }
        if(pc==60){
            pc=0;
            endgame("playertimeout");
            return;
        }
        time.innerHTML=`TURN ENDS IN:${59-pc}`;
        pc++;
    }, 1000);
    const totaltime=document.getElementById("timer");
    let gc=1;
    if(turn==0){
        endtime=setInterval(() => {
            if(paused){return;}
            if(gc==600){
                gc=0;
                endgame("totaltime");
                return;
            }
            const minutes=Math.floor((600-gc-1)/60);
            const seconds=(600-gc)%60;
            totaltime.innerHTML=`TOTAL TIME LEFT:0${minutes}:${seconds}`;
            gc++;
        },1000);
    }
    



}
function points(color){
    let positions;
    if(color=="blue"){
        positions=bluepos;
    }else{
        positions=redpos;
    }
    let totalpoints = 0;
    for(let i=0;i<positions.length;i++){
        for(let j=i+1;j<positions.length;j++){
            const pos1=positions[i];
            const pos2=positions[j];
            if(pointstable[`${pos1}-${pos2}`]||pointstable[`${pos2}-${pos1}`]){
                totalpoints=totalpoints+pointstable[`${pos1}-${pos2}`]||pointstable[`${pos2}-${pos1}`];
                
            }
        }
    }
    if(color=="blue"){
        document.getElementById("bluepoint").innerHTML=`BLUE POINTS: ${totalpoints}`;
    }else{
        document.getElementById("redpoint").innerHTML=`RED POINTS: ${totalpoints}`;
    }}
    function innercheck(){
        let counti=0;
        for(let i=0;i<4;i++){
            if(bluepos[i][0]=="i"){
                counti++;
            }
            if(redpos[i][0]=="i"){
                counti++;
            }
        }
      if(counti==6){
        endgame("innersix");
      }
    }




function endgame(type){

    const gameover=document.getElementById("gameover");
    let endmsg="";

    if(type=="playertimeout") {
        if(document.getElementById("currentplayer").style.backgroundColor=="blue"){
            endmsg="Time's up for the BLUE!RED WINS";}
    
        else{
            endmsg="Time's up for the RED!BLUE WINS";
            } 
        }
   

    else{
        const bluePoints=parseInt(document.getElementById("bluepoint").innerHTML.split(": "));
        const redPoints=parseInt(document.getElementById("redpoint").innerHTML.split(": "));
        if(redPoints[1]>bluePoints[1]){
            endmsg="RED WINS"
        }
        else if(redPoints[1]>bluePoints[1]){
             endmsg="BLUE WINS"

        }
        else{
            endmsg="ITS A TIE"
        }

            }
            gameover.innerHTML=`<h1>${endmsg}</h1>`;
            clearInterval(playertime);
            clearInterval(endtime);
            gameover.style.display="block";


}


function restart(){
    turn = 0;
    secondturn = 0;
    id1 = 0;
    bluepos = [];
    redpos = [];
    paused = false;
    clearInterval(playertime);
    clearInterval(endtime);
    timer();
    document.querySelectorAll("#places button").forEach(button => {
        button.style.backgroundColor = "rgba(39, 8, 63, 0.666)";
    });
    document.getElementById("currentplayer").style.backgroundColor = "blue";
    document.getElementById("bluepoint").innerHTML = "BLUE POINTS: 0";
    document.getElementById("redpoint").innerHTML = "RED POINTS: 0";
    document.getElementById("gameover").style.display = "none";
document.getElementById("pause").disabled = false;
document.getElementById("resume").disabled = true;

  
}
function pause(){
    paused=true;
    
    document.getElementById("pause").disabled = true;
    document.getElementById("resume").disabled = false;
   
 

}
function resume(){
    paused=false;
   
    document.getElementById("pause").disabled=false;
    document.getElementById("resume").disabled=true;
   
}
