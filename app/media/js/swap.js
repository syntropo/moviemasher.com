/*jshint unused:false
'use strict';*/

function xGetElementById(e) {
  if(typeof(e)!=='string') return e;
  if(document.getElementById) e=document.getElementById(e);
  else if(document.all) e=document.all[e];
  else e=null;
  return e;
}

function xVisibility(e_id, b) {
	var e=xGetElementById(e_id);
	var visibility = (b ? 'visible' : 'hidden');
	if(e && e.style && e.style.visibility != visibility) {
	  console.log(e_id, e.style.visibility, visibility);
	  e.style.visibility = visibility;
	}
}

var swapped = 'default';

function swap(id) {
	if (id !== swapped) {
		xVisibility(swapped, false);
		swapped = id;
		xVisibility(swapped, true);
	}
}
