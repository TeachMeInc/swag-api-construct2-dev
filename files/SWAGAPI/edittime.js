function GetPluginSettings()
{
	return {
		"name":			"Addicting Games",
		"id":			"AddictingGames",
		"version":		"1.0",
		"description":	"Addicting Games Plugin Created by Kyriakos Farris (OdiusFly Studio) and modified by Rhys Jones.",
		"author":		"Kyriakos Farris",
		"help url":		"https://odiusfly.com/contact",
		"contact":		"mailto:odiusfly@hotmail.com",
		"category":		"API",
		"type":			"object",
		"rotatable":	false,
		"flags":		pf_singleglobal
	};
};

AddCondition(0, cf_none, "Is Logged In", "Addicting Games", "Is Logged In", "Select this action to get user status.", "Logged");
AddCondition(1, cf_fake_trigger, "On Debug", "Addicting Games", "On Debug", "Do something...", "Debugged");

AddAction(0, af_none, "Start Session", "B) Use 'Start' and 'End' actions each time you start and lose the game. Use 'Session' action once on start of layout.", "Start Session", "Start a game api session. Use this action once. Best way to call this is 'preloader' layout.", "startSession");
AddAction(1, af_none, "Start Game", "B) Use 'Start' and 'End' actions each time you start and lose the game. Use 'Session' action once on start of layout.", "Start Game", "Call this method before the player starts a game 'session'.", "startGame");
AddAction(2, af_none, "End Game", "B) Use 'Start' and 'End' actions each time you start and lose the game. Use 'Session' action once on start of layout.", "End Game", "Call this method at the end of a player game 'session'.", "endGame");
AddAction(3, af_none, "Show Leaderboard", "C) Call this actions when needs.", "Show Leaderboard", "Open addicting games leaderboard.", "Leaderboard");
AddNumberParam( 'Score', 'User Score' );
AddAction(4, af_none, "Save Score", "C) Call this actions when needs.", "Save {0}", "Save score to leaderboard.", "Score");
AddAction(5, af_none, "More Games", "D) Add a button (ex. sprite) and call this action.", "More Games", "Open addicting games link.", "Link");
AddAction(6, af_none, "Preloader", "A) Create a 'preloader' layout first to use this action.", "Preloader", "API will run preloader automatically.", "Preloader");
AddStringParam("Name is ", "Get HighScore", "\"best_score\"");
AddAction(7, af_none, "Get HighScore", "E) Add a name for highscore first to call it.", "Name is  {0}", "This action is for leaderboard.", "getBestUserScore");

AddExpression(0, ef_return_number, "HighScore", "Addicting Games", "HighScore", "Get best user score from leaderboard.");

ACESDone();

var property_list = [
    new cr.Property( ept_text,"Game ID", "", "Unique Game ID obtained from Addicting Games." ),
	new cr.Property(ept_combo, "Debug",	"false", "Choose true to run on debug mode. Choose false when export the game.", "false|true")
	];

function CreateIDEObjectType()
{
	return new IDEObjectType();
}

function IDEObjectType()
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
}

IDEObjectType.prototype.CreateInstance = function(instance)
{
	return new IDEInstance(instance);
}

function IDEInstance(instance, type)
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");

	this.instance = instance;
	this.type = type;

	this.properties = {};
	
	for (var i = 0; i < property_list.length; i++)
		this.properties[property_list[i].name] = property_list[i].initial_value;

}

IDEInstance.prototype.OnInserted = function()
{
}

IDEInstance.prototype.OnDoubleClicked = function()
{
}

IDEInstance.prototype.OnPropertyChanged = function(property_name)
{
}

IDEInstance.prototype.OnRendererInit = function(renderer)
{
}

IDEInstance.prototype.Draw = function(renderer)
{
}

IDEInstance.prototype.OnRendererReleased = function(renderer)
{
}