using UnityEngine;
using System.Collections;

public class flagController : MonoBehaviour {
	
	private int time;
	private bool timer;
	private GameObject parentOb;
	private flagScript fs;

	void Start () {
		timer = false;
	}

	void Update () {
	}

	void OnTriggerEnter(Collider other)
	{
		if (other.gameObject.tag == "player") {
			fs.DebugFn(gameObject);
			if(time != 0)
				StartCoroutine(startTimer());
			else
			{
				Debug.Log ("Else");
				Debug.Log (gameObject.name);
				fs.flagCounter(gameObject);
			}
		}
	}

	void OnTriggerExit(Collider other)
	{
		if (other.gameObject.tag == "player" && timer) {
			timer = false;
		}
	}

	IEnumerator startTimer()
	{
		timer = true;
		for (int i = 0; i<time; i++) {
			if(!timer) break;
			Debug.Log (i);
			yield return new WaitForSeconds(1);
		}
		fs.flagCounter(gameObject);
	}

	public void setTimer(int seconds)
	{
		time = seconds;
	}

	public void storeParent(GameObject go)
	{
		//Debug.Log ("Storing Identity");
		parentOb = go;
		Debug.Log (parentOb.name);
		fs = (flagScript) parentOb.GetComponent(typeof(flagScript));
		fs.DebugFn(gameObject);
	}
}
