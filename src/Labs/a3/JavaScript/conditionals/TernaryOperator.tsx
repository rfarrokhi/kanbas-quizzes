function TernaryOperator() {
    let loggedIn = true;
    return (
        <div>
            <h2>Logged In</h2>
            {loggedIn ? <p>Welcome Reza</p> : <p>Please login</p>}
        </div>
    )

}

export default TernaryOperator;


// line 2 of code, change true to flase and see the output.