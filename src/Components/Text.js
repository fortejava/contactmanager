import React, { Component } from 'react'

export class Text extends Component 
{
    constructor(props) {
        super(props)
    
        this.state = {
            value:this.props.value         
        }
    }

    updateValue = (evt) => {
        this.setState({value: evt.target.value});
        this.props.updateValue(this.props.name,evt.target.value)
    }

    
    render() {
        console.log(this.props.actualErrors)
        return (
            <div>
                <input type="text" id={this.props.name} name={this.props.name} value={this.state.value} class={this.props.classList.join(" ")} onChange={(evt) => this.updateValue(evt)} />
                {
                    this.props.actualErrors.map((data) => { return <p>{data}</p> })
                }
            </div>
        )
    }
}

export default Text

