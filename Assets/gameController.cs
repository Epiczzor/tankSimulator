using UnityEngine;
using System.Collections;

//This is the objective selector


public class gameController : MonoBehaviour {

	private bool eventStatus;
	private int objectiveNumber;
	public GameObject[] flagObjects;

	void Start () {
		eventStatus = false;
		objectiveNumber = 0;
		gameFn ();
	}
	void Update () {
	}

	public void triggerObjective(GameObject go)
	{
		eventStatus = false;
		objectiveNumber++;
		if (objectiveNumber < flagObjects.Length) {
			gameFn ();
		}
		else Debug.Log ("Objectives Over");
	}

	void gameFn()
	{
		if (eventStatus)
			Debug.Log ("An Event is already running");
		else
		{
			eventStatus = true;
			flagScript fs = (flagScript) flagObjects[objectiveNumber].GetComponent(typeof(flagScript));
			fs.startObjective();
		}
	}
}
