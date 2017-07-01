/**
 * Created by user on 6/20/2017.
 */
var Obj = [];
var conObj=[];
var counter=0;
$(document).ready(function(){

    $("#usr").keyup(function(event){
        if(event.keyCode == 13){
            $("#add").click();
        }
    });
    $("#add").click(function(){
        if($("input").val()==""){
            document.getElementById("error").style.display="block";
        }
        else{
            document.getElementById("error").style.display="none";
            var start=new Date().getTime();
            Obj.push({interval:0,s:start,base:0});

            conObj.push(true);
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
            $(".timer").append("<div class='col-sm-4 tile' id='task'><h3 class='description'>"+$("input").val()+"</h3> <h3 class='time' id='"+counter+"'>start!!!!</h3> </div>");
            counter++;
            $("input").val("");
            Obj[counter-1]["interval"]=setInterval(myTimer,500);
            $('.tile').arrangeable();
        }
    });
    $('div.timer').on('click',"#task,#stoppedTask",function(){
        $(this).mousedown(function(e){
            if( e.button == 2 ) {
                this.remove();
                console.log("task is removed");
            }
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
        return true;
    });
    $(".tile").mousedown(function(e){
        if( e.button == 2 ) {
            this.remove();
            console.log("task is removed");
        }
    });

    document.oncontextmenu = function() {return false;};


});

