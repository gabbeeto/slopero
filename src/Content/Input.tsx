import EquationMaker from './EquationMaker'

function EquationDisplayer(text: string): void {
	for (let container of EquationMaker(text)) {
		document.querySelector(`#${container[0]}`)!.innerHTML = container[1]
	}
}

export default function InputSection() {
	return (<><section className="flex flex-col gap-2">
		<h2>write your equation</h2>
		<input type="text" className="border-white border-2 p-2 rounded-3xl" />
		<button onClick={() => {EquationDisplayer(document.querySelector('input')!.value)}} className="border-white border-2 rounded-2xl hover:border-black hover:bg-white hover:text-black">apply</button>
		<output id='divideOrMultiplyTarget'></output>
	</section>
	</>)
}
