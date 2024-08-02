'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

/* *** get the cookie *** */
const getCookie = async (name: string) => {
	return cookies().get(name)?.value ?? '';
};

const backendUrl = process.env.BACKEND_URL;

interface HeadOrdTail {
	bet: number;
	choice: string;
	result?: string;
	messageType: string;
}
export async function saveDataHeadsOrTail({
	bet,
	choice,
	result,
	messageType,
}: HeadOrdTail) {
	const name = 'thename';

	const url = `${backendUrl}/api/playgame`;

	const res = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ bet, choice, result, messageType, name }),
	});

	if (res.ok) {
		console.log('resokkkkk');
		revalidateTag(`solde-${name}`); // Revalidez le solde spécifique à cet utilisateur
	}
	const datas = await res.json();

	return datas;
}

export async function getBalance() {
	const name = 'thename';

	const tags = [`solde-${name}`];
	//console.log('[user] Getting user data with tags : ', tags);
	const res = await fetch(`${backendUrl}/api/balance/${name}`, {
		next: { tags: tags },
	});
	console.log('Ajout des tags:', tags);
	console.log('res', res);
	const data = await res.json();
	console.log('Données récupérées:', data);
	return data;
}
