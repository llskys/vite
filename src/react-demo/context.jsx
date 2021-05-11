import React, { createContext, useState } from 'react'
const ThemeContext = createContext();
const { Provider, Consumer } = ThemeContext

function ContextTest() {
    const [theme,setTheme] = useState('yellow')
    const toggleTheme = () => {
        setTheme(theme === 'yellow' ? 'red' : 'yellow')
    }
    return (
      <>
        <Provider value={{ theme, toggleTheme }}>
          <ContextConsumer />
          <ContextConsumerAnother />
        </Provider>
      </>
    )
}

function ContextConsumer() {
    return (
        <Consumer>
        {
            ({theme, toggleTheme}) => (
                <>
                    <button onClick={toggleTheme}>change</button>
                    <div style={{background:theme}}>{theme}</div>
                </>
            )
        }
        </Consumer>
    );
}

function ContextConsumerAnother() {
    return (
        <Consumer>
        {
            ({theme, toggleTheme}) => (
                <>
                    <button onClick={toggleTheme}>change</button>
                    <div style={{background:theme}}>{theme}</div>
                </>
            )
        }
        </Consumer>
    );
}

export default ContextTest
