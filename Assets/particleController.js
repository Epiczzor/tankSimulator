#pragma strict

public var destroyTime : float = 3;


function Start () {
selfDestruct();
}

function Update () {

}

function selfDestruct()
{
	yield WaitForSeconds(destroyTime);
	Destroy(gameObject);
}