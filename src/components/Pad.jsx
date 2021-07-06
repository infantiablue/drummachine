import React, { useEffect } from "react";

const Pad = ({ keypad, power, keyCode, chordId, volume, chordUrl, activePad }) => {
	const playSound = (evt) => {
		if (power) {
			activePad(chordId);
			let audioElm = document.getElementById(keypad);
			audioElm.volume = volume / 100;
			audioElm.play();
		}
	};

	useEffect(() => {
		const handleKeyPress = (evt) => {
			if (power) {
				if (evt.keyCode === keyCode) {
					let padElm = document.getElementById(chordId);
					padElm.classList.add("bg-yellow-500");
					setTimeout(() => padElm.classList.remove("bg-yellow-500"), 150);
					playSound();
				}
			}
		};
		document.addEventListener("keydown", handleKeyPress);
		return () => {
			document.removeEventListener("keydown", handleKeyPress);
		};
	});

	return (
		<div id={chordId} className='drum-pad w-2/3' onClick={playSound}>
			{keypad}
			<audio className='clip' id={keypad} src={chordUrl} type='audio/mpeg'></audio>
		</div>
	);
};

export default Pad;
