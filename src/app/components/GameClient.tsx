/* eslint-disable @next/next/no-img-element */
'use client';
import { useState } from 'react';

const CoinFlip = () => {
	const [flipping, setFlipping] = useState(false);
	const [selectedBet, setSelectedBet] = useState(10);
	const [selectedChoice, setSelectedChoice] = useState('heads'); // État pour le choix de l'utilisateur
	const [result, setResult] = useState(null);
	const [message, setMessage] = useState('');
	const [messageType, setMessageType] = useState('');
	const [isFirstPlay, setIsFirstPlay] = useState(true);

	const playGame = async () => {
		if (!selectedBet || !selectedChoice) return;

		setFlipping(true);

		const res = await fetch('/api/play', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ bet: selectedBet, choice: selectedChoice }),
		});

		const data = await res.json();

		setTimeout(() => {
			setFlipping(false);
			if (data.error) {
				setMessage(data.error);
				setMessageType('error');
			} else {
				setResult(data.result);
				setMessage(data.message);
				setMessageType(data.messageType);
			}
			setIsFirstPlay(false);
		}, 2000); // Simule le temps de lancer de la pièce
	};

	const resetGame = () => {
		setMessage('');
		setMessageType('');
		setResult(null);
	};

	return (
		<>
			<div className='card mt-1'>
				<div className='card-body'>
					<div
						className={`alert small alert-dismissible fade show ${
							messageType === 'win'
								? 'alert-success'
								: messageType === 'lose'
								? 'alert-danger'
								: 'alert-danger'
						}`}
						id='alertMessageHeadsOrTails'
						role='alert'
						style={{ display: message ? 'block' : 'none' }}
					>
						<span id='alertTextHeadsOrTails'>{message}</span>
					</div>
					<h5 className='card-title fw-light text-info'>Coin Flip Game</h5>
					<form>
						<div className='mb-1 mt-3 small'>
							<div className='form-check form-check-inline'>
								<input
									className='form-check-input '
									value={10}
									type='radio'
									name='bet'
									id='betTen'
									checked={selectedBet === 10}
									onChange={() => setSelectedBet(10)}
								/>
								<label
									className='form-check-label small'
									htmlFor='betTen'
								>
									10
								</label>
							</div>
							<div className='form-check form-check-inline'>
								<input
									className='form-check-input'
									value={20}
									type='radio'
									name='bet'
									id='betTwenty'
									checked={selectedBet === 20}
									onChange={() => setSelectedBet(20)}
								/>
								<label
									className='form-check-label small'
									htmlFor='betTwenty'
								>
									20
								</label>
							</div>
							<div className='form-check form-check-inline'>
								<input
									className='form-check-input'
									value={50}
									type='radio'
									name='bet'
									id='betFifty'
									checked={selectedBet === 50}
									onChange={() => setSelectedBet(50)}
								/>
								<label
									className='form-check-label small'
									htmlFor='betFifty'
								>
									50
								</label>
							</div>
						</div>
						<div className='mb-4 ms-0'>
							<input
								className='btn-check'
								value='heads'
								type='radio'
								name='choice'
								id='choiceHeads'
								checked={selectedChoice === 'heads'}
								onChange={() => setSelectedChoice('heads')}
							/>
							<label
								className='btn btn-sm btn-primary me-1 mb-1'
								htmlFor='choiceHeads'
							>
								Heads
							</label>
							<input
								className='btn-check'
								value='tails'
								type='radio'
								name='choice'
								id='choiceTails'
								checked={selectedChoice === 'tails'}
								onChange={() => setSelectedChoice('tails')}
							/>
							<label
								className='btn btn-sm btn-primary me-1 mb-1'
								htmlFor='choiceTails'
							>
								Tails
							</label>
						</div>
					</form>
					<button
						className='btn btn-sm btn-outline-info '
						onClick={() => {
							if (!isFirstPlay) {
								resetGame();
							}
							playGame();
						}}
						disabled={flipping}
					>
						{isFirstPlay ? 'Play' : 'Play Again'}
					</button>
				</div>
			</div>
		</>
	);
};

export default CoinFlip;
