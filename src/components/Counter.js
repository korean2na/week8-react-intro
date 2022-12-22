import { useState, useEffect } from "react";

export default function Counter(props) {
    // const [count, setCount] = useState(props.default ? props.default : 0)
    // const [count, setCount] = useState(props.default ?? 0)
    const [count, setCount] = useState(props.default || 0)

    // console.log(props)
    // console.log('Component Running')

    /* 
    * Define a prop of name, and display the counter's "name"
    * in the JSX output, above the count itself. If there is no
    * name prop passed in, set the name to "Default Counter"
    */
    
    const title = useState(props.name || "DEFAULT COUNTER")

    // useEffect(() => {
    //     /* Effect functionality */
    //     setTimeout(() => {
    //         setCount(count + 1)
    //     }, 1000)
    // }, [])

    function increment(inc) {
        setCount(count + inc)
    }

    function decrement(dec) {
        setCount(count - dec)
    }

    function flip() {
        setCount(-count)
    }

    function reset() {
        setCount(props.default || 0)
    }

    return (
        <div className="Counter">
            <h2>{ title }</h2>
            Count: { count }
            <br /><br />
            <button onClick={ () => increment(1) }>Increment</button>
            <button onClick={ () => increment(2) }>Increment By 2</button>
            <br />
            <button onClick={ () => decrement(1) }>Decrement</button>
            <button onClick={ () => decrement(2) }>Decrement By 2</button>
            <br />
            {
                (count != 0) ?
                // Output if condition is met (if)
                (
                <>
                    <button onClick={ flip }>Flip</button>
                </>
                ) :
                // Output if condition is not met (else)
                <></>
            }
            {
                (count != props.default || 0) ?
                // Output if condition is met (if)
                (
                <>
                    <button onClick={ reset }>Reset to Default</button>
                </>
                ) :
                // Output if condition is not met (else)
                <></>
            }
            <br /><br /><hr />
        </div>
    );
}