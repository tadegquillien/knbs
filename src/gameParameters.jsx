import { shuffle } from './convenienceFunctions';

//the validation code to be entered in prolific. It should range from 4000 to 8000
//export const validationCode = Math.round(Math.random() * 4000 + 4000);
//a list of IDs for all balls within an urn
//export const circle_ids = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

// the color palette
const nonwhites = ["red", "blue"];
export const color_palette = [nonwhites[0], nonwhites[1], "white"];


// name of the chemical
export const chemical = "enzyme";

// the experimental condition (belief vs knowledge attribution)
export const condition = shuffle(["knowledge", "belief"])[0];
console.log(condition);

// generate the content of the sampled berries, for the trials
// where the tree is sick. We do this by taking all possible 15 combinations
// of 4 berries. This code first loops over possible values of alpha, beta, and white
// in [0,4].
// Then it keeps only the combinations where n = 4
const preBallsList = shuffle(Array.from(Array(5).keys()).map((i) => {
    return (
        Array.from(Array(5).keys()).map((ii) => {
            return (
                Array.from(Array(5).keys()).map((iii) => {
                    return ({
                        white: i,
                        alpha: ii,
                        beta: iii,
                        containsAlpha: 1
                    })
                })
            )
        })
    )
}).flat().flat().filter((i) => i.alpha + i.beta + i.white === 4));

const foils = [{ white: 4, alpha: 0, beta: 0, containsAlpha: 0 },
{ white: 4, alpha: 0, beta: 0, containsAlpha: 0 },
{ white: 4, alpha: 0, beta: 0, containsAlpha: 0 },
{ white: 4, alpha: 0, beta: 0, containsAlpha: 0 },
{ white: 3, alpha: 0, beta: 1, containsAlpha: 0 },
{ white: 3, alpha: 0, beta: 1, containsAlpha: 0 },
{ white: 2, alpha: 0, beta: 2, containsAlpha: 0 }


];

export const ballsList = preBallsList;
//export const ballsList = shuffle([preBallsList.slice(0, 8), foils].flat());

export const famBallsList = shuffle([
    { white: 4, alpha: 0, beta: 0, containsAlpha: 0 },
    { white: 3, alpha: 0, beta: 1, containsAlpha: 0 },
    { white: 2, alpha: 1, beta: 1, containsAlpha: 1 },
    { white: 1, alpha: 2, beta: 1, containsAlpha: 1 }
]);

console.log(ballsList);

