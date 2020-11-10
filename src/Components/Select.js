import React, { Component } from 'react'

export class Select extends Component 
{
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }

    selectConstructor(optionsList)
    {
        return optionsList.map((option) =>
        {
            
            if (option !== this.props.value)
            {
                return <option value={option.key}>{option.text}</option>
            }
            else
            {
                return <option value={option.key} selected>{option.text}</option>
            }
        })
    }

    updateValue = (evt) => {
        this.setState({value: evt.target.value});
        this.props.updateValue(this.props.name,evt.target.value)
    }
    
    render() {
        return (
            <div>
            <select id={this.props.name} name={this.props.name} class={this.props.classList.join(" ") } onChange={(evt) => this.updateValue(evt)}>
                {this.selectConstructor(this.props.options)}
            </select>
            {
                this.props.actualErrors.map((data) => { return <p>{data}</p> })
            }
            </div>
        )
    }
}

export default Select

