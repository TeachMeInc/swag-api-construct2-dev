"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

var deb = "true";
var tmr = 0;
var high_score = 0;
var check_log = "false";

cr.plugins_.AddictingGames = function(runtime)
{
	this.runtime = runtime;
};

(function ()
{

	var pluginProto = cr.plugins_.AddictingGames.prototype;
	

	pluginProto.Type = function(plugin)
	{
		this.plugin = plugin;
		this.runtime = plugin.runtime;
	};

	var typeProto = pluginProto.Type.prototype;

	typeProto.onCreate = function()
	{
	};

	pluginProto.Instance = function(type)
	{
		this.type = type;
		this.runtime = type.runtime;
	};

	var instanceProto = pluginProto.Instance.prototype;

	instanceProto.onCreate = function()
	{
		
		
		if(this.properties[1] == 1){
		deb = "false";
		}
		else{
		deb = "true";
		}
		
		//console.log(deb);
		
		this.apiInstance = null;
		var jvs = document.createElement("script");

		jvs.type = "text/javascript";
		jvs.src = "https://swagapi.shockwave.com/dist/swag-api.js";

		jvs.onload = function(){
		};

		document.getElementsByTagName("head")[0].appendChild(jvs);

		var css = $("<link>", {
		"rel" : "stylesheet",
		"type" :  "text/css",
		"href" : "https://swagapi.shockwave.com/dist/swag-api.css"
		})[0];

		css.onload = function(){
		console.log(jvs);
		console.log(css);
		};

		document.getElementsByTagName("head")[0].appendChild(css);
		
	};

	instanceProto.onDestroy = function ()
	{
	};

	instanceProto.saveToJSON = function ()
	{

		return {

		};
	};

	instanceProto.loadFromJSON = function (o)
	{

	};

	instanceProto.draw = function(ctx)
	{
	};

	instanceProto.drawGL = function (glw)
	{
	};

	instanceProto.getDebuggerValues = function (propsections)
	{

		propsections.push({
			"title": "My debugger section",
			"properties": [

			]
		});
	};

	instanceProto.onDebugValueEdited = function (header, name, value)
	{
		if (name === "My property")
			this.myProperty = value;
	};

	function Cnds() {};

	Cnds.prototype.Logged = function ()
	{
		if (check_log == "false") {
			return false;
		}
		else{
			return true;
		}
	};
	
	Cnds.prototype.Debugged = function ()
	{
		if (deb == "true") {
			return false;
		}
		else{
			return true;
		}
	};

	pluginProto.cnds = new Cnds();

	function Acts() {};

	Acts.prototype.Leaderboard = function (myparam)
	{
	if (deb == "true") {
    this.apiInstance.showDialog ("scores", { title: "Best Score", period: 'alltime', });
	}
	};

	Acts.prototype.Score = function (myparam)
	{
		if(deb == "true"){
			this.apiInstance.postScore ("best_score", myparam);
		}
	};

	Acts.prototype.startSession = function (myparam, callback)
	{
		 if (deb == "true") {
		 this.apiInstance = SWAGAPI.getInstance({
				wrapper: document.getElementById('c2canvasdiv'),
				api_key: this.properties[0],
				theme: 'shockwave',
				debug: true
		 });

		 this.apiInstance.startSession()
		 	.then(function() {
				if(callback) callback();
			});
			
		console.log(this.apiInstance.startSession.name);
		}
	};

	Acts.prototype.startGame = function (myparam, callback)
	{
		if(deb == "true"){
		this.apiInstance.startGame()
			.then(function() {
				if(callback) callback();
			});
			
		console.log(this.apiInstance.startGame.name);
		}
	};
	Acts.prototype.endGame = function (myparam, callback)
	{
		if(deb == "true"){
		this.apiInstance.endGame()
			.then(function() {
				if(callback) callback();
			});
			
		console.log(this.apiInstance.endGame.name);
		}
	};
	
	Acts.prototype.getBestUserScore = function (myparam, callback)
	{
		if(deb == "true"){
		this.apiInstance.getScores({
		period: 'alltime',
		level_key: myparam,
		current_user: true
    })
      .then(function(scores) {
		if(callback) callback();
			
			//console.log((scores && scores.length) ? scores[0].value : 0);
			
		if((scores && scores.length) ? scores[0].value : 0){
			//console.log("login");
			check_log = "true";
			high_score = ((scores && scores.length) ? scores[0].value : 0);
		}
		else {
			//console.log("logout");
			check_log = "false";
		}
      });
	  }
	};

	Acts.prototype.Link = function (myparam)
	{
		if(deb == "true"){
		window.open("https://www.addictinggames.com","_blank");
		console.log("More Games");
		}
	};

	Acts.prototype.Preloader = function (myparam)
	{
		if (tmr == 0) {
		$("#c2canvas").fadeOut(0)
		console.log("showBrandingAnimation");
		tmr = 1;
		}
		
		SWAGAPI.showBrandingAnimation("c2canvasdiv", function() {
		
		});
		
		setTimeout(function(){
		$("#c2canvas").fadeIn();
		//console.log("showBrandingAnimation");
		}, 5000);
		
	};

	pluginProto.acts = new Acts();

	function Exps() {};

	Exps.prototype.HighScore = function (ret)
	{
		ret.set_any(high_score);
  };

	pluginProto.exps = new Exps();

}());
