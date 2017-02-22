import React from 'react';

function onChangeMutate(value,event) {
	console.log(event.target.value);
	console.log(value);
	value.value = event.target.value;
}
	