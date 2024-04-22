import React, {useState, useEffect} from "react";
import axios from "axios";
import {BASE_API_URL} from "./client";

function EncodingParametersInURLs() {
    const [a, setA] = useState(34);
    const [b, setB] = useState(23);

    const [welcome, setWelcome] = useState("");
    const [result, setResult] = useState(0);

    const fetchWelcome = async () => {
        const response = await axios.get(`${BASE_API_URL}/welcome`);
        setWelcome(response.data);
    };

    const fetchSum = async (a: number, b: number) => {
        const response = await axios.get(
            `${BASE_API_URL}/add/${a}/${b}`);
        setResult(response.data);
    };

    const fetchSubtraction = async (a: number, b: number) => {
        const response = await axios.get(
            `${BASE_API_URL}/subtract/${a}/${b}`);
        setResult(response.data);
    };

    // const fetchMultiplication = async (a: number, b: number) => {
    //     const response = await axios.get(
    //         `${BASE_API_URL}/myltiply/${a}/${b}`);
    //     setResult(response.data);
    // };


    useEffect(() => {
        fetchWelcome();
    }, []);

    return (
        <div>
            <h3>Encoding Parameters In URLs </h3>
            <h4> Integrating React with APIs </h4>
            <h5> Fetching Welcome </h5>
            <h6> {welcome} </h6>

            <h4> Calculator </h4>
            <input className="form-control" type="number" value={a}
                   onChange={(e) => setA(Number(e.target.value))}
            />
            <input className="form-control" type="number"
                   onChange={(e) => setB(Number(e.target.value))} value={b}
            />

            <input value={result} type="number" readOnly/>
            <h3>Fetch Result </h3>
            <button onClick={() => fetchSum(a, b)}>
                Fetch Sum of {a} + {b}
            </button>
            <button onClick={() => fetchSubtraction(a, b)}>
                Fetch Substraction of {a} - {b}
            </button>
            {/* <button onClick={() => fetchMultiplication(a, b)}>
                Fetch Multiplication of {a} * {b}
            </button> */}
            <h3> Path Parameters </h3>
            <a className="btn btn-primary"
               href={`${BASE_API_URL}/add/${a}/${b}`}>
                Add {a} + {b}
            </a>
            <a className="btn btn-danger"
               href={`${BASE_API_URL}/subtract/${a}/${b}`}>
                Substract {a} - {b}
            </a>
            <a className="btn btn-warning"
               href={`${BASE_API_URL}/multiply/${a}/${b}`}>
                Multiply {a} * {b}
            </a>
            <a className="btn btn-success"
               href={`${BASE_API_URL}/divide/${a}/${b}`}>
                Divide {a} / {b}
            </a>
            <h3> Query Parameters </h3>
            <a className="btn btn-primary"
               href={`${BASE_API_URL}/calculator?operation=add&a=${a}&b=${b}`}>
                Add {a} + {b}
            </a>
            <a className="btn btn-danger"
               href={`${BASE_API_URL}/calculator?operation=subtract&a=${a}&b=${b}`}>
                Substract {a} - {b}
            </a>
            <a className="btn btn-primary"
               href={`${BASE_API_URL}/calculator?operation=multiply&a=${a}&b=${b}`}>
                Multiply {a} * {b}
            </a>
            <a className="btn btn-danger"
               href={`${BASE_API_URL}/calculator?operation=divide&a=${a}&b=${b}`}>
               Divide {a} / {b}
            </a>
        </div>
    );
}

export default EncodingParametersInURLs;