import React from 'react';
import { getBalance } from './Action';
import { use } from 'react';
import GameClient from './GameClient';

export default async function Dashboard() {
	const data: any = await getBalance();
	console.log('thedata', data);
	return (
		<div className='row'>
			<div className='col-12'>
				<div className='text-center'>
					<h3 className='text-info'>
						Balance : <span className='text-white'>{data.balance}</span>
					</h3>

					<GameClient />
				</div>
			</div>
		</div>
	);
}
