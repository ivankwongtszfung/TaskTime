/**
 * Created by user on 6/20/2017.
 */
var Obj = {};
var conObj={};
var counter=0;

function setWarningMessage(DOMObject,message){
    DOMObject.innerHTML = unescape("<strong>Warning!</strong> ") + message;
}

function myTimer(){
    var now=new Date().getTime();
    var t = document.querySelectorAll('h3[class^="time"]');
    $(t).each(function(){
        var i = parseInt(this.id);
        if(conObj[i]) {
            var diff=now-Obj[i]["s"]+Obj[i]["base"];
            var days = Math.floor(diff / (1000 * 60 * 60 * 24));
            var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            var sec=Math.floor((diff % (1000 * 60)) / 1000);
            if(sec<10) {
                sec = "0" + sec;
            }
            if(days!=0){
                this.innerHTML= days + " day " + hours + " hr " + minutes + " min " + sec + " s";
            }
            else if(hours!=0){
                this.innerHTML= hours + " hr " + minutes + " min " + sec + " s";
            }
        else if(minutes!=0){
            this.innerHTML= minutes + " min " + sec + " s";
        }
        else{
            this.innerHTML=  sec + " s";
        }
    }
    });
}

function addTile(count){
    
    $(".timer").append("<div class='col-sm-4 tile' id='task'><h3 class='description'>"+Obj[count]["title"]+"</h3> <h3 class='time' id='"+(count)+"'>start!!!!</h3> </div>");

}

function saveData(){
    localStorage.setItem("Obj",JSON.stringify(Obj));
    localStorage.setItem("conObj",JSON.stringify(conObj));
    localStorage.setItem("counter",counter);
}



$(document).ready(function(){

    if (Storage !== "Undefinded") {
        if (localStorage.getItem("Obj") !== null ) Obj = JSON.parse(localStorage.getItem("Obj"))
        if (localStorage.getItem("conObj") !== null ) conObj = JSON.parse(localStorage.getItem("conObj"))
        if (localStorage.getItem("counter") !== null ) counter = JSON.parse(localStorage.getItem("counter"))

        for (const key in Obj) {
            if (Obj.hasOwnProperty(key)) {
                addTile(Obj[key].id);
            }
        }

    }
    else{
        setWarningMessage(document.getElementById("error"),"We currently don't support data storing in this browser");
        document.getElementById("error").style.display="block";
    }

    $("#usr").keyup(function(event){
        if(event.keyCode == 13){
            $("#add").click();
        }
    });
    $("#add").click(function(){
        if($("input").val()==""){
            setWarningMessage(document.getElementById("error"),"Please give some description about the task.");
            document.getElementById("error").style.display="block";
        }
        else{
            document.getElementById("error").style.display="none";
            var start=new Date().getTime();
            Obj[counter]={title:$("input").val(),id:counter,interval:0,s:start,base:0};
            conObj[counter]= true;
            addTile(counter);
            counter++;

            saveData()
            $("input").val("");
            
            $('.tile').arrangeable();
        }
    });
    $('div.timer').on('click',"#task,#stoppedTask",function(){
        $(this).mousedown(function(e){
            if( e.button == 2 ) {
                delete Obj[$(':nth-child(2)',this).attr('id')];
                this.remove();
                console.log("task is removed");
            }
            saveData()
        });
        var stop=$(':nth-child(2)',this).attr('id');
        stop=parseInt(stop);
        var n = new Date().getTime();
        if(conObj[stop]){
            conObj[stop]=false;
            Obj[stop]["base"]=n-Obj[stop]["s"]+Obj[stop]["base"];
            this.setAttribute("id","stoppedTask");
        }
        else{
            Obj[stop]["s"]=n;
            conObj[stop]=true;
            this.setAttribute("id","task");
        }
        saveData()
        return true;
    });
    $(".tile").mousedown(function(e){
        
        if( e.button == 2 ) {
            delete Obj[$(':nth-child(2)',this).attr('id')];
            this.remove();
            console.log("task is removed");
        }
        saveData()
    });
    setInterval(myTimer,500)
    document.oncontextmenu = function() {return false;};


});

