// "(55 / 4)x + 5"

let slope = 1

function detectParenthesis(content: string){
	const parenthesisRegexString = "\\([0-9 \\+-\\/]+?\\)";
	//todo if it ends with parenthesis you should definitely include the last item becuse this excludes the last item
	const parenthesisRegex = new RegExp(`${parenthesisRegexString}[^x]`, 'g');
	const slopeRegex = new RegExp(`${parenthesisRegexString}x`, 'g');
	console.log([...content.matchAll(parenthesisRegex)]);
	console.log(content.match(slopeRegex));
}

export default function EquationMaker(content: string): string {
	detectParenthesis(content)

	return content
}
