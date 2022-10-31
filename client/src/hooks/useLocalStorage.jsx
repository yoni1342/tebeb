// This custom hook is use for storing data in local storage

// importing react hooks
import { useEffect, useState } from 'react';

const ISSERVER = typeof window === "undefined";



function getSavedValue(key, initialValue) {
	if(!ISSERVER){
		const savedValue = JSON.parse(localStorage.getItem(key));
		if (savedValue) return savedValue;
	
		if (initialValue instanceof Function) return initialValue();
		return initialValue;
	}
}

export default function useLocalStorage(key, initialValue) {
	const [value, setValue] = useState(() => {
		return getSavedValue(key, initialValue);
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [value]); // eslint-disable-line react-hooks/exhaustive-deps

	return [value, setValue];
}
