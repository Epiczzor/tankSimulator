using UnityEngine;
using System.Collections;

public class flagController : MonoBehaviour {
	
	public int time;
	private bool timer;
	void Start () {
		timer = false;
	}

	void Update () {
	}

	void OnTriggerEnter(Collider other)
	{
		if (other.gameObject.tag == "player") {
			if(time != 0) startTimer();
			//else call flagCounter(this gameobject);
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
		//call flagCounter(this gameobject);
	}
}
