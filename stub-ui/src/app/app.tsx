import React from 'react';

export function App() {
  const [countText, setCountText] = React.useState<string>('Count hasn\'t be fetched yet.');

  const increment = async () => {
    await fetch('/control/increment');
  }
  
  const get = async () => {
    const result = await fetch('/counter/count');
    setCountText(await result.text());
  }

  return <div>
    <h1>Welcome to stub-ui!</h1>
    <p>{countText}</p>
    <button onClick={increment}>Click me to increment</button>
    <button onClick={get}>Click me to get count</button>
  </div>;
}

export default App;
