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
	
	// Update is called once per frame
	void Update () {
	}

	void triggerObjective()
	{
		eventStatus = false;
		if (objectiveNumber < flagObjects.Length) {
			objectiveNumber++;
			gameFn ();
		}
	}

	void gameFn()
	{
		if (eventStatus)
			Debug.Log ("An Event is already running");
		else
		{
			eventStatus = true;
			//flagObjects[objectiveNumber]'s Start Objective Function
	}
}
