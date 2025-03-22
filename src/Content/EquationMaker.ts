class Fraction {
	numeritor: number;
	denominator: number;
	HighestNumber: number;
	isFractionSimplified: boolean;

	constructor(numeritor: number, denominator: number) {
		this.numeritor = numeritor;
		this.denominator = denominator;
		this.HighestNumber = this.numeritor > this.denominator ? this.numeritor : this.denominator;
		this.isFractionSimplified = false
	}

	getString(): string {

		return `${this.numeritor} / ${this.denominator}`
	}

	checkIfCanBeSimplefied() {
		let pNumeritor = this.numeritor;
		let pDenominator = this.denominator;
		let pHighestNumber = this.HighestNumber;

		this.simplify(0)

		let NumeratorOrDenominatorHasChanged: boolean = pNumeritor != this.numeritor || pDenominator != this.denominator
		if (NumeratorOrDenominatorHasChanged) {
			this.isFractionSimplified = true
		}

		// reset values to previous values
		this.numeritor = pNumeritor;
		this.denominator = pDenominator;
		this.HighestNumber = pHighestNumber;
	}

	simplify(changingNumber: number = 2) {
		if (changingNumber == this.HighestNumber) {
			return null;
		}
		else {
			let numeritorIsDivisibleByChangingNumber: boolean = this.numeritor % changingNumber == 0
			let denominatorIsDivisibleByChangingNumber: boolean = this.denominator % changingNumber == 0
			if (numeritorIsDivisibleByChangingNumber && denominatorIsDivisibleByChangingNumber) {
				this.numeritor /= changingNumber
				this.denominator /= changingNumber
				this.HighestNumber = this.numeritor > this.denominator ? this.numeritor : this.denominator;
				// this resets divisible number so it can check again if the same divisible number is repeated
				this.simplify(2)
			}
			else {

				this.simplify(changingNumber + 1)
			}

		}

	}

}


let simplifiableStages: string[] = [];
let currentStageIndex: number = 0;
const stages: string[] = ['divideOrMultiplyTarget']
let returns: any[] = []

function reset(){
	simplifiableStages= [];
	currentStageIndex= 0;
	returns = []
}

export default function EquationMaker(content: string): any[] {

	reset()

	let currentStage: string = stages[currentStageIndex]
	if (currentStage == 'divideOrMultiplyTarget') {
		let stageAndContent = [currentStage, divideOrMultiplyTargetStage(content)]

		let FractionCanBeSimplified: boolean = simplifiableStages.includes(currentStage)
		returns.push(stageAndContent)
		console.log(FractionCanBeSimplified)
		if (FractionCanBeSimplified) {
			let stageAndContentForSimplified = [`${currentStage}Simplified`, simplifyFraction(stageAndContent[1])]
			returns.push(stageAndContentForSimplified)
		}

	}
	return returns
}

function simplifyFraction(content: string): string {
	let stringNumbers: string[] = content.split("=");
	let numbers = stringNumbers.map(cFraction => {
		let fractions = cFraction.split('/')
		if (fractions.length > 1) {
			let firstNumber: number = Number(fractions[0].match(/[0-9]+/)![0])
			let secondNumber: number = Number(fractions[1].match(/[0-9]+/)![0])

			return new Fraction(firstNumber, secondNumber)
		}
		else {
			return 'y'
		}
	}).filter(element => element != 'y')

	for (let number of numbers) {
		number.simplify()
	}
	let numbersButString: string[] = numbers.map(e => `(${e.getString()})`)

	return `y = ${numbersButString.join(' = ')}`
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

	if (yIsDivisible) {

		return `y = ${divideY(yValue, numbers)}`
	}
	else {
		let unifiedFractionAndSimplifibility: any[] = unifyInFractionForm(yValue, numbers);

		if (unifiedFractionAndSimplifibility[1]) {
			simplifiableStages.push(stages[currentStageIndex])
		}

		return `y = ${unifiedFractionAndSimplifibility[0]}`

	}


}

function divideY(yValue: number, numbers: number[]): string {
	return checkIfOneEquality(numbers, `${yValue / numbers[0]}`, (e: number) => e / yValue)
}

function checkIfOneEquality(numbers: number[], simpleOp: string, callableFunc: (e: number) => number | string) {
	if (numbers.length == 1) {
		return simpleOp
	}
	else {
		return numbers.map(callableFunc).join(" = ")
	}

}

function unifyInFractionForm(yValue: number, numbers: number[]): any[] {
	var simplefiableFraction = false
	return [checkIfOneEquality(numbers, new Fraction(yValue, numbers[0]).getString(),
		(e: number) => {
			{
				let cFraction: Fraction = new Fraction(e, yValue)
				cFraction.checkIfCanBeSimplefied()
				simplefiableFraction = cFraction.isFractionSimplified
				return `( ${cFraction.getString()} )`
			}
		}), simplifiableStages]
}
