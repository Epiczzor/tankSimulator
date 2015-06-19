#pragma strict

public var flagTime : int = 10;
private var capCheck : boolean = false;
private var captured : int = 0;

function Start () {

}

function Update () {

}

function OnTriggerEnter(col : Collider)
{
	//Debug.Log("Entered Trigger");
	if(!capCheck && col.gameObject.tag == "player")
	{
		//Debug.Log("Found Player in trigger");
		Debug.Log(capCheck);
		capCheck = true;
		flagTimerStart();
	}
}

function OnTriggerExit(col : Collider)
{
	//Debug.Log("Exit Trigger");
	if(capCheck && col.gameObject.tag == "player")
	{
		capCheck = false;
		captured = 0;
	}
}

function flagTimerStart()
{
	while(capCheck)
	{
		Debug.Log(captured);
		captured++;
		if(captured == flagTime)
		{
			objectAchieved();
			capCheck = false;
		}
		yield WaitForSeconds(1);
	}
}

function objectAchieved()
{
	Debug.Log("Flag Captured | You Win");
	Destroy(gameObject);
}