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
public var trackSound : AudioSource;
public var rotateSound : AudioSource;

public var tireSmokePos : Transform;
public var tireSmokeFx : GameObject;

private var reload : boolean = false;
private var isPlayingSound : boolean = false;
private var isPlayRSound : boolean = false;
private var tireSmokeFxE : boolean = false;
function Start () {
}

function Update () {
var soundCheck : boolean = false;

var x : float = Input.GetAxis("Vertical");
if(x > 0) { moveForward(x); soundCheck = true;}
else if(x < 0) { moveBackward(x); soundCheck = true;}

var y : float = Input.GetAxis("Horizontal");
if(y > 0) { rotateRight(y); soundCheck = true; }
else if (y < 0){ rotateLeft(y); soundCheck = true; }

var h : float = Input.GetAxis ("Mouse X");
if(h > 0) cannonRotateRight();
else if(h<0) cannonRotateLeft();
else stopRotateSound();


var v : float = Input.GetAxis ("Mouse Y");
if(v > 0) cannonRotateUp();
else if(v < 0) cannonRotateDown();
//else if(!v) normalizeCannon();


if(Input.GetMouseButtonDown(0) && !reload)
{
	shootCannon();
	reload = true;
}

if(!soundCheck) stopSounds();
		
}

function shootCannon()
{
	gunSound.Play();
	enableShootFx();
	var fwd = shootPoint.TransformDirection(Vector3.forward);
	var clone : GameObject;
	clone = Instantiate(bulletObject,shootPoint.position,shootPoint.rotation);
	clone.GetComponent.<Rigidbody>().AddForce(clone.transform.forward * shootSpeed);
	yield WaitForSeconds(3);
	reload = false;
}

function enableShootFx()
{
	var clone : GameObject;
	clone = Instantiate(smokeFx,shootPoint.position,Quaternion.LookRotation(Vector3.up));
	clone.transform.parent = shootPoint;
	yield WaitForSeconds(3);
	Destroy(clone);
}

function moveForward(val : float)
{
	//Debug.Log(val);
	playSounds();
	enableTireSmokeFx();
	transform.Translate(Vector3.forward * val * forwardSpeed / 10);
}

function moveBackward(val : float)
{
	//Debug.Log(val);
	playSounds();
	enableTireSmokeFx();
	transform.Translate(Vector3.forward * val * forwardSpeed / 10);
}

function rotateLeft(val : float)
{
	playSounds();
	enableTireSmokeFx();
	transform.Rotate(Vector3.up,val * turnSpeed / 10);
}

function rotateRight(val :float)
{
	playSounds();
	enableTireSmokeFx();
	transform.Rotate(Vector3.up,val * turnSpeed / 10);
}

function cannonRotateRight()
{
	base.Rotate(Vector3.up,cannonTurnSpeed/10);
	playRotateSound();
}
function cannonRotateLeft()
{
	base.Rotate(Vector3.up,-cannonTurnSpeed/10);
	playRotateSound();
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

function normalizeCannon()
{
	//Debug.Log("normalizing");
	var currAngle : float = cannon.rotation.eulerAngles.x;
	if(currAngle-15 > 0) cannon.rotation.eulerAngles.x = 15.0;
	else if(330 - currAngle > 0) cannon.rotation.eulerAngles.x = 330.0;
}

function playSounds()
{
	if(!isPlayingSound)
	{
		isPlayingSound = true;
		trackSound.Play();
	}
}

function stopSounds()
{
	if(isPlayingSound)
	{
		trackSound.Stop();
		isPlayingSound = false;
	}
}

function playRotateSound()
{
	if(!isPlayRSound)
	{
		isPlayRSound = true;
		rotateSound.Play();
	}
}
function stopRotateSound()
{
	if(isPlayRSound)
	{
		rotateSound.Stop();
		isPlayRSound = false;
	}
}

function enableTireSmokeFx()
{
	if(!tireSmokeFxE)
	{
		tireSmokeFxE = true;
		Instantiate(tireSmokeFx,tireSmokePos.position,Quaternion.LookRotation(Vector3.up));
		yield WaitForSeconds(3);
		tireSmokeFxE = false;
	}
}