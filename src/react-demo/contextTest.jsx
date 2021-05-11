import React, { Component, createContext, useState, useContext } from 'react'
const GlobalContext = createContext(1);
const { Provider, Consumer } = GlobalContext

export default function ContextTest() {
    const [theme,setTheme] = useState('yellow')
    const toggleTheme = () => {
        setTheme(theme === 'yellow' ? 'red' : 'yellow')
    }
    return (
        <>
            <Provider value={{ theme, toggleTheme }}>
                <ContextConsumer1 />
                <ContextConsumer2 />
                <ContextConsumer3 />
            </Provider>
        </>
    )
}

function ContextConsumer1() {
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

class ContextConsumer2 extends Component {
    static contextType = GlobalContext;

    render() {
        return (
            <>
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
                <div style={{background:this.context.theme}}>{this.context.theme}</div>
            </>
            
        );
    }
}

function ContextConsumer3() {
    const { theme, toggleTheme } = useContext(GlobalContext)
    return (
        <>
            <button onClick={toggleTheme}>change</button>
            <div style={{background:theme}}>{theme}</div>
        </>
    )
}

