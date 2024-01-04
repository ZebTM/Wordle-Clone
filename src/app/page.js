
import WordleContainer from '@/components/WordleContainer';
import Header from '@/components/Header';

export default function Home() {
	const height = {
		height: 'calc(100% - 210px)',
	}
	function getNewSecretWord() {

	}

	return (
		<main style={height}>
			<Header />
			<WordleContainer />
		</main>
	)
}

function newGame() {
	// clearRows()
};