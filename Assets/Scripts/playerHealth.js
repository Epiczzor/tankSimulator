#pragma strict

public var objectHealth : float = 100;
public var bulletDamage : float = 25;
public var scripts : GameObject;

function Start () {

}

function Update () {

}

function OnTriggerEnter(col : Collider)
{
	if(col.gameObject.tag == "bullet" && objectHealth != 0)
	{
		objectHealth -= bulletDamage;
		if(objectHealth == 0) killObject();
	}
}

function killObject()
{
	Debug.Log("Object Destroyed");
	Debug.Log(gameObject.name);
	transform.parent = null;
	Destroy(scripts);
}