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

	void Start () {

		status = false;
		num = flags.Length;
		fc = (flagController) flag.GetComponent(typeof(flagController));
		fc.setTimer(flagTime);
		sendIdentity(gameObject);
		gc = (gameController) GetComponentInParent(typeof(gameController));
	}

	void Update () {
	
	}
	void sendIdentity(GameObject go)
	{
		fc.storeParent(go);
	}
	public void startObjective()
	{
		Debug.Log ("Starting Objective");
		Debug.Log (gameObject.name);
		status = true;
		switch (type) {
		case 1:
			spawnType1();
			break;
		case 2:
			break;
		}
	}

	void terminateObjective()
	{
		status = false;
		gc.triggerObjective();
	}

	void spawnType1()
	{
		for (int i = 0; i<num; i++) {
			Instantiate(flag,flags[i].position,flags[i].rotation);
		}
		Debug.Log ("Collect ALL the Flags in any order");
	}

	void spawnType2()
	{

	}

	public void flagCounter(GameObject flg)
	{
		num--;
		Destroy (flg);
		if (num == 0) terminateObjective();
	}
}
