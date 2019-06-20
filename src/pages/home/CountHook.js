import React, { useState, useEffect, useMemo } from "react";
import { Button } from "antd";

const names = ["aaa", "bbb", "ccc"];

function CountHook() {
    
    const [count, setCount] = useState(0);
    const [name, setName] = useState(["lili", "lucy"]);
    const [num, setNum] = useState(0);

    console.log("CountHook before");

    // useEffect(() => {
    //   console.log('effect 1 ');
    //   const id = setInterval(() => {
    //     setNum((prevNum) => prevNum + 1);
    //   }, 1000);
    //   return () => {
    //     clearInterval(id);
    //   }
    // }, [])

   useEffect(() => {
    console.log('effect 2 ');
     document.title = names.pop();

     return () => {
       console.log('clean up');
     }
   }, [])

   const count100 =  useMemo(() => {
     console.log('memo 1 ');

     return count + 100
   }, [count])

   console.log("CountHook after");

    return (
        <div>
            <h2 style={{ background: '#27d'}}>{count100}</h2>
            <h2 style={{ background: '#fda'}}>{num}</h2>
            <h2>{count}</h2>
            <Button
                onClick={() => {
                    setCount(prevCount =>
                        prevCount === 3 ? prevCount : prevCount + 1
                    );
                }}
            >
                + 1
            </Button>
            <h2>{name}</h2>
            <Button
                onClick={() => {
                    setName(prevName => {
                        prevName[prevName.length] = names.pop();
                        return prevName;
                    });
                }}
            >
                name
            </Button>
        </div>
    );
}

export default CountHook;
