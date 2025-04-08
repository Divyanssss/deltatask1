
const middle = document.getElementById("middle");
const X = window.innerWidth / 2;
const Y = window.innerHeight / 2;
for (let i=0;i<6;i++) {
    const r = 100;
    const angle=(Math.PI/3)*i;
    const x=X+r*Math.cos(angle);
    const y=Y+r*Math.sin(angle);
    const btn=document.getElementById(`i${i + 1}`);
    btn.style.left=`${x-125}px`;
    btn.style.top=`${y-100}px`;
    
}
for (let i=0;i<6;i++) {
    const r = 200;
    const angle=(Math.PI/3)*i;
    const x=X+r*Math.cos(angle);
    const y=Y+r*Math.sin(angle);
    const btn=document.getElementById(`m${i + 1}`);
    btn.style.left=`${x-125}px`;
    btn.style.top=`${y-100}px`;
    
}
for (let i=0;i<6;i++) {
    const r = 300;
    const angle=(Math.PI/3)*i;
    const x=X+r*Math.cos(angle);
    const y=Y+r*Math.sin(angle);
    const btn=document.getElementById(`o${i + 1}`);
    btn.style.left=`${x-125}px`;
    btn.style.top=`${y-100}px`;
    
}
let turn=0;
let secondturn=0;
let id1=0;
document.getElementById("currentplayer").style.backgroundColor="blue";


function gamelogic(id){
    if(turn<8){
        startphase(id);
    }
else{gamephase(id);}
check();}
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
    }
    else{
        document.getElementById("currentplayer").style.backgroundColor="blue";
        document.getElementById(`${id}`).style.backgroundColor="red";
    }
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



function movetitan(id,id1,col){
    
    if(rightmove(id,id1)){if(col=="blue"){ document.getElementById(`${id}`).style.backgroundColor="blue";
            document.getElementById(`${id1}`).style.backgroundColor="rgb(68,68,68)";
            document.getElementById("currentplayer").style.backgroundColor="red";

            turn++;
        secondturn=0;}
        if(col=="red"){ document.getElementById(`${id}`).style.backgroundColor="red";
            document.getElementById(`${id1}`).style.backgroundColor="rgb(68,68,68)";
            document.getElementById("currentplayer").style.backgroundColor="blue";
            turn++;
        secondturn=0;}}

    
    

}
function rightmove(id,id1){
    const pos1 = parseInt(id1[1]);
    const pos2 = parseInt(id[1]);
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
function check(){
    

}



