username.addEventListener("keyup",userValid);

pass.addEventListener("keyup",passValid);

document.getElementById("myForm").addEventListener("submit", submitForm);

function submitForm(event){
	if(userValid() && passValid()){
		username.style.backgroundColor="white";
		pass.style.backgroundColor="white";
		
		
	}
	else{
		if(!userValid()){
			username.style.borderColor="red";
			username.style.backgroundColor="white";
			event.preventDefault();
		}
		if(!passValid()){
			pass.style.borderColor="red";
			pass.style.backgroundColor="white";
			event.preventDefault();

		}
	}
}

function userValid(event){
	username.style.borderColor="white";
	var uc = /[A-Z]/.test(username.value);
	var lc = /[a-z]/.test(username.value);
	var dig = /[0-9]/.test(username.value);
	var badLetters=/[^A-Za-z0-9]/.test(username.value)
	var lenGood=username.value.length>=3 && username.value.length<=5;
	
	if(badLetters==false && lenGood==true){
		username.style.backgroundColor="lightGreen";
		return true;
	}else{
		username.style.backgroundColor="lightPink";
		return false;
	}
}

function passValid(event){
	pass.style.borderColor="white";
	var uc = /[A-Z]/.test(pass.value);
	var lc = /[a-z]/.test(pass.value);
	var lenGood=pass.value.length>=3 && pass.value.length<=5;
	
	if(uc && lc && lenGood){
		pass.style.backgroundColor="lightGreen";
		return true;
	}else{
		pass.style.backgroundColor="lightPink";
		return false;
	}
}

addButton.addEventListener("click",function(){
	var p = document.createElement("p");
	p.innerHTML= "This just got added when you clicked the button.";
	document.querySelector("body").appendChild(p);
});

duplicateButton1.addEventListener("click",function(){
	var dup=duplicateButton1.cloneNode(false);
	dup.setAttribute("id","duplicateButton2")
	buttonDiv.appendChild(dup);
});

buttonH.addEventListener("click",function(){
	document.getElementById("buttonH").style.display = "none";
});

button3.addEventListener("click", function(){
	document.getElementById("buttonH").style.display = "inline";
});

button4.addEventListener("click", function(){
	document.getElementsByTagName("h1")[0].style.color = "Indigo";
});

