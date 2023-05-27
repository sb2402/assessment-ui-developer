function App() {
  const [state, setState] = React.useState({ count: "" });

  function one() {
    setState({
      count: "One",
    });
  }
  function two() {
    setState({
      count: "Two",
    });
  }
  function three() {
    setState({
      count: "Three",
    });
  }

  return (
    <div>
      <link rel="stylesheet" href="./App.css" />
      <button onClick={one}>One</button>
      <button onClick={two}>Two</button>
      <button onClick={three}>Three</button>
      <p>{state.count}</p>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("new"));
