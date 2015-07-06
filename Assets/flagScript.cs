using UnityEngine;
using System.Collections;

public class flagScript : MonoBehaviour {

	private bool status;
	private int num;
	public int type;
	public int flagTime;
	public GameObject flag;
	public Transform[] flags;
	private flagController fc;
	private gameController gc;
	private int flagNum;

	void Start () {

		status = false;
		num = flags.Length;
		gc = (gameController) GetComponentInParent(typeof(gameController));
	}

	void Update () {
	
	}
	public void startObjective()
	{
		//Debug.Log ("Starting Objective");
		//Debug.Log (gameObject.name);
		status = true;
		switch (type) {
		case 1:
			spawnType1();
			break;
		case 2:
			flagNum = 0;
			spawnNextFlag ();
			break;
		default:
			Debug.Log ("Invalid Objective Type");
			break;
		}
	}

	void terminateObjective()
	{
		status = false;
		gc.triggerObjective(gameObject);
	}

	void spawnType1()
	{
		for (int i = 0; i<num; i++) {
			GameObject go = (GameObject) Instantiate(flag,flags[i].position,flags[i].rotation);
			fc = (flagController) go.GetComponent(typeof(flagController));
			fc.setTimer(flagTime);
			fc.storeParent (gameObject);
		}
		//Debug.Log ("Collect ALL the Flags in any order");
	}

	void spawnNextFlag()
	{
		GameObject go = (GameObject) Instantiate(flag,flags[flagNum].position,flags[flagNum].rotation);
		fc = (flagController) go.GetComponent(typeof(flagController));
		fc.setTimer(flagTime);
		fc.storeParent (gameObject);
	}

	public void flagCounter(GameObject flg)
	{
		Debug.Log ("Entered Counter");
		num--;
		Destroy (flg);
		if (num == 0) terminateObjective();

		if(type == 2){
			flagNum++;
			spawnNextFlag();
		}
	}

	public void DebugFn(GameObject go)
	{
		Debug.Log(go.name);
		Debug.Log ("IN DEBUG FN");
	}
}
