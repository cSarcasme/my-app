import '../../public/css/globals.css';
import Script from 'next/script';
export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<head>
				<meta charSet='utf-8' />
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1'
				/>

				<link
					rel='stylesheet'
					href='https://cdnjs.cloudflare.com/ajax/libs/bootswatch/5.2.3/superhero/bootstrap.min.css'
					integrity='sha512-OIkcyk7xM5npH4qAW0dlLVzXsAzumZZnHfOB3IL17cXO6bNIK4BpYSh0d63R1llgUcrWZ709bCJhenNrEsno0w=='
					crossOrigin='anonymous'
					referrerPolicy='no-referrer'
				/>

				<Script
					src='https://kit.fontawesome.com/2bf9d02c7d.js'
					crossOrigin='anonymous'
				></Script>
				<Script
					src='https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js'
					integrity='sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4'
					crossOrigin='anonymous'
				></Script>

				<link
					rel='icon'
					href='/icon?<generated>'
					type='image/<generated>'
					sizes='<generated>'
				/>
			</head>

			<body>{children}</body>
		</html>
	);
}
