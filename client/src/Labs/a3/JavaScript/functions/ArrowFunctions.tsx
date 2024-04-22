const subtract = (a: number, b: number) => {
    return a - b;
}
function ArrowFunctions() {
    const threeMinusOne = subtract(3, 1);
    console.log(threeMinusOne);

    return (
        <>
            <h3>New ES6 arrow functions</h3>
            threeMinusOne = {threeMinusOne}
            <br />
            subtract(3, 1) = {subtract(3, 1)}
            <br />
        </>
    );

}

export default ArrowFunctions;

// The following is also correct:
// function ArrowFunctions() {
//     const subtract = (a: number, b: number) => {
//         return a - b;
//     }
//     const threeMinusOne = subtract(3, 1);
//     console.log(threeMinusOne);

//     return (
//         <>
//             <h3>New ES6 arrow functions</h3>
//             threeMinusOne = {threeMinusOne}
//             <br />
//             subtract(3, 1) = {subtract(3, 1)}
//             <br />
//         </>
//     );

// }