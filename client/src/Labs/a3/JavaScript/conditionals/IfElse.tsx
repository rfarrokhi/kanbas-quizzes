function IfElse() {
    let true1 = true,
        false1 = false;
    return (
        <div>
            <h2>If Else</h2>
            {true1 && <p>true1 !!!!</p>}
            {!false1 ? <p>!false1</p> : <p>false1</p>}
        </div>
    );
}

export default IfElse;


// line 2, change true1 = false and see the output.
// line 3, change false1 = true and see the output.