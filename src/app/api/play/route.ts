export const dynamic = 'force-dynamic';

import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { saveDataHeadsOrTail } from '../../components/Action';

const allowedBets = [10, 20, 50];

// Fonction de traitement séparée
async function handlePostRequest(req: NextRequest) {
	const body = await req.json();
	const { bet, choice } = body;

	// Vérifier si la mise est autorisée
	if (!allowedBets.includes(bet)) {
		return NextResponse.json({ error: 'Invalid bet' }, { status: 400 });
	}

	// Vérifier si le choix est valide
	if (!['heads', 'tails', 'edge'].includes(choice)) {
		return NextResponse.json({ error: 'Invalid choice' }, { status: 400 });
	}

	// Générer un résultat aléatoire sécurisé
	const random = crypto.randomInt(0, 10000) / 100; // Générer un nombre entre 0 et 99.99
	let result;
	let winnings = 0;
	let message = '';
	let messageType = ''; // Nouveau champ pour le type de message

	if (random < 50) {
		result = 'heads';
		if (choice === 'heads') {
			winnings = bet * 1.95;
			message = `You win! The result was ${result}. You have won ${winnings} $berry.`;
			messageType = 'win';
		} else {
			message = `You lose! The result was ${result}. Better luck next time.`;
			messageType = 'lose';
		}
	} else if (random < 100) {
		result = 'tails';
		if (choice === 'tails') {
			winnings = bet * 1.95;
			message = `You win! The result was ${result}. You have won ${winnings} $berry.`;
			messageType = 'win';
		} else {
			message = `You lose! The result was ${result}. Better luck next time.`;
			messageType = 'lose';
		}
	}

	const data = await saveDataHeadsOrTail({ bet, choice, result, messageType });

	if (data.mess === 'success') {
		return NextResponse.json({ result, message, messageType }, { status: 200 });
	} else if (data.error) {
		return NextResponse.json({ error: data.error }, { status: data.status });
	}
}

// Export unique de la méthode POST
export async function POST(req: NextRequest) {
	return handlePostRequest(req);
}
