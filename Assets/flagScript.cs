using UnityEngine;
using System.Collections;

public class flagScript : MonoBehaviour {

	private bool status;
	private int num;
	public int type;
	public GameObject flag;
	public Transform[] flags;

	void Start () {

		status = false;
		num = flags.Length;
	
	}

	void Update () {
	
	}

	void startObjective()
	{
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

	void flagCounter(GameObject flg)
	{
		num--;
		Destroy (flg);
		//if (num == 0) Objective complete notify gameController.cs
	}
}
