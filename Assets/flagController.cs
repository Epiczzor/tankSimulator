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
			if(time != 0) startTimer();
			else fs.flagCounter(gameObject);
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
		parentOb = go;
		fs = (flagScript) parentOb.GetComponent(typeof(flagScript));
	}
}
