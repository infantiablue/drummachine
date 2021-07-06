import "./styles/app.scss";
import React, { useState } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import Pad from "./components/Pad";
import { bankOne, bankTwo } from "./Banks";

const App = () => {
	const [power, setPower] = useState(true);
	const [switchBank, setSwitchBank] = useState(true);
	const [bank, setBank] = useState("Heater Kit");
	const [volume, setVolume] = useState(30);
	const handleVolumeChange = (evt, newValue) => setVolume(newValue);
	const handlePowerChange = () => setPower((power) => !power);
	const handleBankChange = () =>
		setSwitchBank((switchBank) => {
			switchBank ? setBank("Smooth Piano Kit") : setBank("Heater Kit");
			return !switchBank;
		});

	const activePad = (name) => setBank(name);

	return (
		<div id='drum-machine' className='mx-auto h-screen bg-gray-400'>
			<div className='flex flex-wrap mx-auto justify-center p-6 w-2/3 bg-gray-100 border-2 border-yellow-500'>
				<div className='grid grid-cols-3 gap-4'>
					{switchBank
						? bankOne.map((item) => (
								<Pad power={power} keypad={item.keyTrigger} volume={volume} keyCode={item.keyCode} chordId={item.id} chordUrl={item.url} activePad={activePad} key={item.id}></Pad>
						  ))
						: bankTwo.map((item) => (
								<Pad power={power} keypad={item.keyTrigger} volume={volume} keyCode={item.keyCode} chordId={item.id} chordUrl={item.url} activePad={activePad} key={item.id}></Pad>
						  ))}
				</div>
				<div className='w-1/3 text-center text-black pl-8'>
					<div className='settings'>
						<h3>Power</h3>
						<FormControlLabel className='pl-6' control={<Switch checked={power} onChange={handlePowerChange} name='power' />} />
					</div>
					<div className='settings'>
						<div>
							<div id='display' className='font-mono font-bold text-lg bg-gray-500 text-white text-center py-6'>
								{bank}
							</div>
						</div>
					</div>
					<div className='settings'>
						<h3 className='mb-6'>Volume</h3>
						<Grid container spacing={4} className='pl-6'>
							<Grid item xs>
								<Slider value={volume} onChange={handleVolumeChange} aria-labelledby='continuous-slider' />
							</Grid>
						</Grid>
					</div>
					<div className='settings'>
						<h3>Bank</h3>
						<FormControlLabel className='pl-6' control={<Switch checked={switchBank} onChange={handleBankChange} name='bank' />} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default App;
