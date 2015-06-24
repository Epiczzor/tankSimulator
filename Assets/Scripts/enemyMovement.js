#pragma strict

public var forwardSpeed : float = 1.0;
public var turnSpeed : float = 1.0;
public var cannonTurnSpeed : float = 1.0;
public var base : Transform;
public var cannon : Transform;
public var shootPoint : Transform;
public var distanceCannon : float = 10.0;

public var bulletObject : GameObject;
public var shootSpeed : float = 10.0;

public var smokeFx : GameObject;

public var gunSound : AudioSource;
public var rotateSound : AudioSource;

public var gunForce: float = 1.0;

private var reload : boolean = false;
private var isPlayingSound : boolean = false;
public var searchClicks : int = 100;



private var searchEnemy : boolean = false;
private var foundEnemy : boolean = false;
private var enemyGO : GameObject;
private var disabled : boolean = false;


function Start () {
scanForEnemy();
}

function Update () {

	
	if(searchEnemy && !disabled)
	{
		foundEnemy = true;
		transform.LookAt(enemyGO.transform);
	}
	else foundEnemy = false;
}

function scanForEnemy()
{
	var x : int = 0;
	//Debug.Log("Starting Scan");
	while(!foundEnemy && !disabled)
	{
		//Debug.Log("Scan Cycle");
		x = 0;
		while(x<searchClicks && !foundEnemy)
		{
			rotateLeft(3);
			yield WaitForSeconds(0.025);
			x++;
		}
		//Debug.Log("Changing Position R");
		//yield WaitForSeconds(1);
		x = 0;
		while(x<searchClicks && !foundEnemy)
		{
			rotateRight(-3);
			yield WaitForSeconds(0.025);
			x++;
		}
		//Debug.Log("Changing Position L");
		//yield WaitForSeconds(1);
	}
	//Debug.Log("Enemy Found");
}
function OnTriggerEnter(col : Collider)
{
	
	if(col.gameObject.tag == "player" && !disabled)
	{
		searchEnemy = true;
		shootPoint.transform.LookAt(col.gameObject.transform);
		enemyGO = col.gameObject;
		giveDamage(col.gameObject);
		//Debug.Log("Taking Shot");
	}
}

function OnTriggerExit(col : Collider)
{
	if(col.gameObject.tag == "player")
	{
		//Debug.Log("Left Zone");
		searchEnemy = false;
		foundEnemy = false;
		scanForEnemy();
	}
}

function giveDamage(player : GameObject)
{
	while(searchEnemy && !reload)
	{
		var x = Random.value;
		if(x > 0.7) damageFx(player);
		else closeMissFx(player);
		yield WaitForSeconds(3);
	}
}

function damageFx(player : GameObject)
{
	shootPoint.transform.LookAt(player.transform);
	shootCannon();

}
function closeMissFx(player : GameObject)
{
	var rnd = Random.Range(-7.0,7.0);
	var pos : Vector3 = player.transform.position;
	pos.x += rnd;
	pos.z += rnd;
	shootPoint.transform.LookAt(pos);
	shootCannon();
}

function shootCannon()
{
	gunSound.Play();
	var fwd = shootPoint.TransformDirection(Vector3.forward);
	var clone : GameObject;
	clone = Instantiate(bulletObject,shootPoint.position,shootPoint.rotation);
	clone.GetComponent.<Rigidbody>().AddForce(clone.transform.forward * shootSpeed);
	reload = false;
}

/*
function moveForward(val : float)
{
	//Debug.Log(val);
	playSounds();
	transform.Translate(Vector3.forward * val * forwardSpeed / 10);
}

function moveBackward(val : float)
{
	//Debug.Log(val);
	playSounds();
	transform.Translate(Vector3.forward * val * forwardSpeed / 10);
}
*/
function rotateLeft(val : float)
{
	//playSounds();
	transform.Rotate(Vector3.up,val * turnSpeed / 10);
}

function rotateRight(val :float)
{
	//playSounds();
	transform.Rotate(Vector3.up,val * turnSpeed / 10);
}

function cannonRotateRight()
{
	base.Rotate(Vector3.up,cannonTurnSpeed/10);
}
function cannonRotateLeft()
{
	base.Rotate(Vector3.up,-cannonTurnSpeed/10);
}


function cannonRotateUp()
{
	//normalizeCannon();
	var currAngle : float = cannon.rotation.eulerAngles.x;
	if( currAngle >= 330 || currAngle <= 20)
	{
		cannon.Rotate(Vector3.left,cannonTurnSpeed/20);
	}
}

function cannonRotateDown()
{
	//normalizeCannon();
	var currAngle : float = cannon.rotation.eulerAngles.x;
	if( currAngle >= 330 || currAngle <= 15 )
	{
		cannon.Rotate(Vector3.right,cannonTurnSpeed/20);
	}
}

function playSounds()
{
	if(!isPlayingSound)
	{
		isPlayingSound = true;
	}
}

function stopSounds()
{
	if(isPlayingSound)
	{
		isPlayingSound = false;
	}
}

function disableUnit()
{
	disabled = true;
}

