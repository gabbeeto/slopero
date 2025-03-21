// "(55 / 4)x + 5"

// let slope = 1

//TODO: work on this later on
//function detectParenthesis(content: string){
//	const parenthesisRegexString = "\\([0-9 \\+-\\/]+?\\)";
//	//todo if it ends with parenthesis you should definitely include the last item becuse this excludes the last item
//	const parenthesisRegex = new RegExp(`${parenthesisRegexString}[^x]`, 'g');
//	const slopeRegex = new RegExp(`${parenthesisRegexString}x`, 'g');
//	console.log([...content.matchAll(parenthesisRegex)]);
//	console.log(content.match(slopeRegex));
//}

// detectParenthesis(content)
let currentStageIndex: number = 0;
const stages: string[] = ['divideOrMultiplyTarget']
const returns: any[]= []

export default function EquationMaker(content: string): any[] {
	let currentStage: string = stages[currentStageIndex]
	if (currentStage == 'divideOrMultiplyTarget') {
		returns.push([currentStage,  divideOrMultiplyTargetStage(content)])


	}
	return returns
}

function divideOrMultiplyTargetStage(content: string): string {
	let stringNumbers: string[] = content.split("=");
	const yIsPresent = (element: string) => element.search("y") != -1
	let indexForY: number = stringNumbers.findIndex(yIsPresent);
	// turn strings into number
	let numbers: number[] = stringNumbers.map((e) => {
		return Number(e.match(/[0-9\.-]+/g)![0])
	})

	// seperate y value so we can compare in the array:
	// save the y value elsewhere
	let yValue = numbers[indexForY]
	// remove y value in array
	numbers.splice(indexForY, 1)


	// because different we gotta see if we get fractions
	let yIsDivisible: boolean = true
	for (let number of numbers) {
		let numberIsNotDivisibleByY: boolean = number % yValue != 0
		if (numberIsNotDivisibleByY) {
			yIsDivisible = false
		}
	}
	return yIsDivisible ? `y = ${divideY(yValue, numbers)}` : `y = ${unifyInFractionForm()}`;


}

function divideY(yValue: number, numbers: number[]): string {
	if (numbers.length == 1) {
		return `${yValue / numbers[0]}`
	}
	else {
		return numbers.map((e: number) => e / yValue).join(" = ")
	}

}


function unifyInFractionForm(): string {
	return "y not  is divisible"
}
