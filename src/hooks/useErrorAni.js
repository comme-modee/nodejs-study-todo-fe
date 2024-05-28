import { useState } from "react";

export default function useErrorAni () {
    const [ errorAni, setErrorAni ] = useState('');

	const handleErrorAni = () => {
		setErrorAni('');
		setTimeout(() => {
			setErrorAni('error error-ani');
		}, 0);
	}

    return { errorAni, handleErrorAni }
}