var num= setInterval(demoAjax,1000);


function demoAjax(){
	var ajaxTime;
	var ajax=new XMLHttpRequest();
	ajax.responseType="text";
	ajax.addEventListener("load",function(){
		var ajaxTime=ajax.response;
		var para=document.getElementById("demo");
		para.innerHTML="Time " + ajaxTime;
		
	});
	ajax.open("GET","https://cse.taylor.edu/~cos143/time.php");
	ajax.send();
}
	
demoAjax();

//console.log(ajaxTime);   //var ajaxTime=
	
var index=1;

//Astrics
var spans=document.querySelectorAll("span");
spans[0].style.color="red";
var star= setInterval(colorChange,1000);

function colorChange(){
	for (var i=0;i<5;i++){
		spans[i].style.color="green";
	}
	spans[index].style.color="red";
	index++;
	if (index==5) index=0;
}

//Button
var clock= document.getElementById("clockB");
clock.addEventListener("click",function(){
	clock.disabled=true;
	clearInterval(num);
	clock.value="Clock Stopped";

});

var winter= document.getElementById("snowB");
winter.addEventListener("click",function(){
	winter.disabled=true;
	winter.value="Snowflake Stopped";
	clearInterval(star);
	for (var i=0;i<5;i++){
		if(spans[i].style.color=="green"){
			spans[i].style.color="gray";
		}
	}
});
