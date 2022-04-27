loginButton.addEventListener("click", login);
logoutButton.addEventListener("click", logout);
createButton.addEventListener("click", create);
updateButton.addEventListener("click", update);
deleteButton.addEventListener("click", deleteAcct);
username.addEventListener("keyup", userValid);
passWord.addEventListener("keyup", passValid);
var isAdmin = false;
var currentUser = "";


function login(e)
{
	var ajax = new XMLHttpRequest();
	if (validateInput(username) & validateInput(passWord))
	{
		var parameters = "Name=" + username.value + "&Password=" + passWord.value;
		ajax.responseType = "json";
		ajax.addEventListener("load", function()
		{
			console.log(this.response);
			
			if(this.response[0].status)
			{
				statusMessage.innerHTML = this.response[0].message;
				document.getElementById("in_out").style.float="right";
				loginButton.setAttribute("hidden", null);
				createButton.setAttribute("hidden", null);
				logoutButton.removeAttribute("hidden");
				updateButton.removeAttribute("hidden");
				stockJazz.removeAttribute("hidden");
				currentUser = username.value;
				if (username.value === "admin")
				{
					isAdmin = true;
					deleteButton.removeAttribute("hidden");
					formLegend.innerHTML = "Update/Delete";
				}
			}
			else
			{
				statusMessage.innerHTML = "Either your username or your password (or possibly both) is incorrect"; //Message specifically chosen for its vagueness (Heather's idea)
				window.alert("Invalid credentials");
			}
		});
		ajax.open("POST", "//cse.taylor.edu/~cos143/sessions.php");
		ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		ajax.send(parameters);
	}
	else
	{
		submitB.backgroundColor = "Salmon";
		if (!validateInput(username))
		{
			username.style.color = "red";
		}
		if (!validateInput(passWord))
		{
			passWord.style.color = "red";
		}
	}
}

function logout(e)
{
	var ajax = new XMLHttpRequest();
	var parameters = "Name=" + username.value;
	ajax.responseType = "json";
	ajax.addEventListener("load", function()
	{
		console.log(this.response);
		statusMessage.innerHTML = this.response[0].message;
		if(this.response[0].status)
		{
			document.getElementById("in_out").style.float=null;
			logoutButton.setAttribute("hidden", null);
			loginButton.removeAttribute("hidden");
			createButton.removeAttribute("hidden");
			updateButton.setAttribute("hidden", null);
			stockJazz.setAttribute("hidden", null);
			if (isAdmin)
			{
				isAdmin = false;
				formLegend.innerHTML = "Login/Create";
				deleteButton.setAttribute("hidden", null);
			}
		}
	});
	ajax.open("DELETE", "//cse.taylor.edu/~cos143/sessions.php");
	ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	ajax.send(parameters);
}

function create(e)
{
	console.log("Fingers crossed...");
	//window.alert("Function not yet functional");
	
	var ajax = new XMLHttpRequest();
	if (validateInput(username) & validateInput(passWord))
	{
		var parameters = "Name=" + username.value + "&Password=" + passWord.value;
		ajax.responseType = "json";
		ajax.addEventListener("load", function()
		{
			console.log(this.response);
			if(this.response[0].status)
			{
				statusMessage.innerHTML = this.response[0].message;
				//loginButton.setAttribute("hidden", null)
				createButton.setAttribute("hidden", null)
				//logoutButton.removeAttribute("hidden");
			}
			else
				statusMessage.innerHTML = this.response[0].message;

		});
		ajax.open("POST", "//cse.taylor.edu/~cos143/users.php");
		ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		ajax.send(parameters);
	}
	else
	{
		statusMessage.innerHTML = "Invalid username or password. Account not created.";
	}
}

function validateInput(inputGiven) 
{
	/*var uc = /[A-Z]/.test(inputGiven);
	var lc = /[a-z]/.test(inputGiven);
	var dig = /[0-9]/.test(inputGiven);*/
	var badLetters=/[^A-Za-z0-9]/.test(inputGiven.value)
	
	if (inputGiven.value.length > 5 || inputGiven.value.length < 3)
	{
		inputGiven.style.backgroundColor = "lightPink";
		return false;
	}
	else if (badLetters)
	{
		inputGiven.style.backgroundColor = "lightPink";
		return false;
	}
	else
	{
		inputGiven.style.backgroundColor = "lightGreen";
		return true;
	}
}

function update(e)
{
	var ajax = new XMLHttpRequest;
	if(username.value === "admin")
	{
		statusMessage.innerHTML = "Admin account cannot be modified.";
		window.alert("Cannot modify admin password!");
	}
	else if (validateInput(username) & validateInput(passWord))
	{
		ajax.responseType = "json";
		var parameters = "Name=" + username.value + "&Password=" + passWord.value;
		if (isAdmin || username.value === currentUser)
		{
			ajax.open("PUT", "//cse.taylor.edu/~cos143/users.php");
			ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			ajax.addEventListener("load", function(){
				console.log(this.response);
				console.log(this.response[0].status);
				if(this.response[0].status)
				{
					statusMessage.innerHTML = this.response[0].message;
					window.alert("Password updated.");
				}
				else
					statusMessage.innerHTML = this.response[0].message;
			});
			ajax.send(parameters);
		}
	}
	else
	{
		statusMessage.innerHTML = "Invalid password. Account not updated.";
	}
}

function deleteAcct(e)
{
	if(username.value === "admin")
	{
		statusMessage.innerHTML = "Admin account cannot be deleted.";
		window.alert("Cannot delete admin acount!");
	}
	else
	{
		var ajax = new XMLHttpRequest;
		ajax.responseType = "json";
		var parameters = "Name=" + username.value;
		ajax.open("DELETE", "//cse.taylor.edu/~cos143/users.php");
		ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		ajax.addEventListener("load", function(){
			console.log(this.response);
			if (this.response[0].status)
			{
				statusMessage.innerHTML = this.response[0].message;
			}
		});
		ajax.send(parameters);
	}
}

function userValid(e)
{
	if(validateInput(username))
		loginInfo.innerHTML = "Username Valid";
	else
		loginInfo.innerHTML = "Username NOT Valid";
}

function passValid(e)
{
	validateInput(passWord);
}

//Stock stuff
var fakeResult=
[
	{date:new Date("2020-01-01 01:01:01"), high:10,   low:9,    close:9.2,  volume:1000},
	{date:new Date("2020-01-02 01:01:01"), high:11,   low:10.3, close:10.3, volume:1200},
	{date:new Date("2020-01-03 01:01:01"), high:10.5, low:9,    close:9.2,  volume:200},
];


function buildStockTable(ticker)
{
	stockTable.innerHTML="";
	var row= stockTable.insertRow();
	row.innerHTML="<th>Symbol</th><th>Open</th><th>Close</th><th>High</th><th>Low</th>"+
			"<th>Volume</th><th>Print Chart</th><th>Add to Portfolio</th><th>Remove</th>"
}

buildStockTable();


function addStockToTable(ticker)
{
	var ajax = new XMLHttpRequest();
	ajax.responseType = "json";
	ajax.ticker= ticker;
	var apiURL = "https://www.alphavantage.co/query";
	var parameters = "?function=TIME_SERIES_INTRADAY&" +
					 "symbol=" + ticker + "&interval=5min&apikey=Z3NMXCFQ9H66D691";
	
	
				 		
	ajax.addEventListener("load", function(){
		
		console.log(ajax.response);
		if (!ajax.response["Error Message"])
		{
			var row=stockTable.insertRow();
			var sym= row.insertCell();
			var open1= row.insertCell();
			var close1= row.insertCell();
			var high= row.insertCell();
			var low= row.insertCell();
			var volume= row.insertCell();
			var c4= row.insertCell();
			var c5= row.insertCell();
			var c6= row.insertCell();
			
			sym.innerHTML = ajax.response["Meta Data"]["2. Symbol"];
			for(entry in ajax.response["Time Series (5min)"])
			{
				var openPrice = ajax.response["Time Series (5min)"][entry]["1. open"];
				var closePrice = ajax.response["Time Series (5min)"][entry]["4. close"];
				
				open1.innerHTML = openPrice;
				close1.innerHTML = closePrice;
				high.innerHTML = ajax.response["Time Series (5min)"][entry]["2. high"];
				low.innerHTML = ajax.response["Time Series (5min)"][entry]["3. low"];
				volume.innerHTML = ajax.response["Time Series (5min)"][entry]["5. volume"];
				
				c4.innerHTML = "<input type='button' value='Chart this' id='chart'>"
					c4.addEventListener("click", function(){
						var ts= this.parentNode.children[0].innerHTML;
						alert("CHARTED "+ts+"?");
					});
				c5.innerHTML = "<input type='button' value='Add to Portfolio' id='port'>"
					c5.addEventListener("click", function(){alert("ADDED");});
				c6.innerHTML = "<input type='button' value='X' id='remove'>"
					c6.addEventListener("click", function(){
						row.parentNode.removeChild(row);
					});	
					
				if(openPrice<closePrice){
					sym.style.backgroundColor = "lightgreen";
				} else if(openPrice>closePrice){
					sym.style.backgroundColor = "pink";
				}else if(openPrice===closePrice){
					sym.style.backgroundColor = "white";
				}
				break;
			}
		}else{ alert("Not a Stock Name")}
	});
	
	ajax.open("GET", apiURL + parameters);
	ajax.send();
}

lookupButton.addEventListener("click", function(){
	if(tickerInput.value===""){
		alert("Need ticker symbol");
	} else {
		addStockToTable(tickerInput.value);
	}
});

/*google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart(ticker){
	console.log("drawChart() ran")
	chart = new google.visualization.LineChart(document.getElementById('chartdiv'));
	
	dataTable = new google.visualization.DataTable();
	dataTable.addColumn('date', 'Date');
	dataTable.addColumn('number', 'High');
	dataTable.addColumn('number', 'Low');
	dataTable.addColumn('number', 'Close');
	dataTable.addColumn('number', 'Volume');

	var dataRows = [];
	if(ticker)
	{
		for( var i=0; i<fakeResult.length; i++) {
			var record=fakeResult[i]
			var dataRow = [record.date, record.high, record.low, 
							record.close, record.volume];
			dataRows.push(dataRow);
		}
	}
	dataTable.addRows( dataRows );

	var options = 
	{
		title: "Your chart title",
		vAxes: {
			0: { title: "Price" },
			1: { title: "Volume" }
		},
		hAxis: {
			// Ex: display dates as '12-31-2017' for December 31, 2017
			format: 'MM-dd-yyyy',          
			title: 'Date'
		},
		series: {
			0: { targetAxisIndex: 0 },   // First price - high
			1: { targetAxisIndex: 0 },   // Second price - low
			2: { targetAxisIndex: 0 },	 // Third price - close
			3: { targetAxisIndex: 1 }    // Total volume
		},
		width:800,
		height:500
	};
		
		chart.draw( dataTable, options );
}*/