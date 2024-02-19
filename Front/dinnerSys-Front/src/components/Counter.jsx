export function Counter() {
    let number = 0;

    const increment = ()=>{
        number=number+1;
    }

  return (
    <div>
        <h2>{number}</h2>
        <button onClick={increment}>Incrementar</button>
    </div>
  )
}

export default Counter;