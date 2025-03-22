import EquationMaker from './EquationMaker'


const explanation: any = {
divideOrMultiplyTarget: "divide by coefficient to isolate y",
divideOrMultiplyTargetSimplified: "simplify the fractions"
}

function EquationDisplayer(text: string): void {

 let outputs =	document.querySelectorAll('output')
 // resets the outputs
 for(let output of outputs){
	output.innerHTML = ''
	output.innerText = ''
 }

	for (let container of EquationMaker(text)) {
		document.querySelector(`#${container[0]}M`)!.innerHTML = explanation[`${container[0]}`];
		document.querySelector(`#${container[0]}`)!.innerHTML = container[1]
	}
}

export default function InputSection() {
	return (<><section className="flex flex-col gap-2">
		<h2>write your equation</h2>
		<input type="text" className="border-white border-2 p-2 rounded-3xl" />
		<button onClick={() => {EquationDisplayer(document.querySelector('input')!.value)}} className="border-white border-2 rounded-2xl hover:border-black hover:bg-white hover:text-black">apply</button>
		<output id='divideOrMultiplyTargetM'></output>
		<output id='divideOrMultiplyTarget'></output>
		<output id='divideOrMultiplyTargetSimplifiedM'></output>
		<output id='divideOrMultiplyTargetSimplified'></output>
	</section>
	</>)
}
