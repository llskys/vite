import React, { Component, createContext, useState, useContext } from 'react'
const GlobalContext = createContext();
const { Provider, Consumer } = GlobalContext

function ContextTest1() {
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

class ContextTest2 extends Component {
    constructor(props){
        super(props)
        this.state = {
            value: 1
        }
    }

    changeValue = () =>{
        this.setState({
            value: this.state.value + 1
        })
    }

    render() {
      const { value } = this.state
      return (
        <Provider value={value}>
          <button onClick={this.changeValue}>change context2 value</button>
          <ContextConsumer2 />
        </Provider>
      );
    }
  }

class ContextConsumer2 extends Component {
    static contextType = GlobalContext;

    render() {
        return (
            <>
                <Consumer>
                {
                    context => <div>{context}</div>
                }
                </Consumer>
                <div>{this.context}</div>
            </>
        );
    }
}

function ContextTest3() {
    const data = useContext(GlobalContext)
    const [value, setValue] = useState(data||1)
    return (
        <>
            <button onClick={()=>setValue(c=>c+1)}>change context3 value</button>
            <div>{value}</div>
        </>
    )
}

  
export { ContextTest1, ContextTest2, ContextTest3 }
