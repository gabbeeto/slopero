class Fraction {
	numeritor: number;
	denominator: number;

	constructor(numeritor: number, denominator: number) {
		this.numeritor = numeritor;
		this.denominator = denominator;
	}

	getString(): string{

		return `${this.numeritor} / ${this.denominator}`
	}
	// TODO: simplifyFraction and make another output if simplifyCationIsPossible
	// simplify()

}

let currentStageIndex: number = 0;
const stages: string[] = ['divideOrMultiplyTarget']
const returns: any[] = []

export default function EquationMaker(content: string): any[] {
	let currentStage: string = stages[currentStageIndex]
	if (currentStage == 'divideOrMultiplyTarget') {
		returns.push([currentStage, divideOrMultiplyTargetStage(content)])


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
	return yIsDivisible ? `y = ${divideY(yValue, numbers)}` : `y = ${unifyInFractionForm(yValue, numbers)}`;


}

function divideY(yValue: number, numbers: number[]): string {
	return checkIfOneEquality(numbers, `${yValue / numbers[0]}`, (e: number) => e / yValue)
}

function checkIfOneEquality(numbers: number[],simpleOp: string, callableFunc: (e: number) => number | string ): string{
	if (numbers.length == 1) {
		return simpleOp
	}
	else {
		return numbers.map(callableFunc).join(" = ")
	}
}

function unifyInFractionForm(yValue: number, numbers: number[]): string {
	return checkIfOneEquality(numbers, new Fraction(yValue, numbers[0]).getString(),
				(e: number) => {
					return new Fraction(e, yValue).getString()})
}
