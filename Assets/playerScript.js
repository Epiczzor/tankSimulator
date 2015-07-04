class playerScript extends tankMovement
{

	function Start () 
	{
		
	}

	function Update () 
	{
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


		if(Input.GetMouseButtonDown(0) && !reload)
		{
			shootCannon();
			reload = true;
		}

		if(!soundCheck) stopSounds();
				
	}

}