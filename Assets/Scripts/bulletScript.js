#pragma strict

public var shotSmoke : GameObject;
var explosionSound : AudioSource;
var meshComp : MeshRenderer;
var line : TrailRenderer;
var checkPlayed : boolean = false; 


function Start () {

selfDestruct();
meshComp = gameObject.GetComponent(MeshRenderer);
explosionSound = gameObject.GetComponent(AudioSource);
line = gameObject.GetComponent(TrailRenderer);

}

function Update () {
}

function selfDestruct()
{
	yield WaitForSeconds(4);
	Destroy(gameObject);
}

function OnCollisionEnter(collision : Collision)
{
	if(!checkPlayed)
	{
		checkPlayed = true;
		var contact : ContactPoint = collision.contacts[0];
		Instantiate(shotSmoke,contact.point,Quaternion.LookRotation(Vector3.forward));
		explosionSound.Play();
		meshComp.enabled = false;
		line.enabled = false;
		yield WaitForSeconds(2);
		Destroy(gameObject);
	}	
}