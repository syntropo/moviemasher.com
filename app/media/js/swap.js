/*jshint unused:false */
'use strict';

function xGetElementById(e) {
  if(typeof(e)!=='string') return e;
  if(document.getElementById) e=document.getElementById(e);
  else if(document.all) e=document.all[e];
  else e=null;
  return e;
}	

function xVisibility(e, b) {
	e=xGetElementById(e);
	if(e && e.style && e.style.visibility) {
		e.style.visibility = (b ? 'visible' : 'hidden');
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
