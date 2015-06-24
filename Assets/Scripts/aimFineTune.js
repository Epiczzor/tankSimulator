#pragma strict

public var autoTune: boolean = true;
private var foundEnemy: boolean = false;
private var enemy: GameObject;

function Start () {

}

function Update () {

if(foundEnemy && Input.GetMouseButton(1))
{
	transform.LookAt(enemy.transform);
}


}

function OnTriggerEnter(col : Collider)
{
	if(autoTune && col.gameObject.tag == "enemy")
	{
		//Debug.Log("Auto Tuned Shot");
		transform.LookAt(col.gameObject.transform);
		enemy = col.gameObject;
		foundEnemy = true;
	}
}

function OnTriggerExit(col : Collider)
{
	if(autoTune && foundEnemy && col.gameObject.tag == "enemy")
	{
		foundEnemy = false;
		
	}
}