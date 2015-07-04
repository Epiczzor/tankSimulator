class enemyScript extends tankMovement
{
	private var searchEnemy : boolean = false;
	private var foundEnemy : boolean = false;
	private var enemyGO : GameObject;
	private var disabled : boolean = false;
	public var searchClicks : int = 100;
	
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
}