import React, { Component } from 'react'
import formSet from '../config/form-engine.json'
import errors from '../config/errors.json'
import Text from './Text'
import Select from './Select'
import Validator from '../Validator/Validator'

export class Agents extends Component 
{
    constructor(props) 
    {
        super(props)
        const newForm = formSet.map((data) => {return data});

        this.state = {
            formValidator: newForm,
            objValidator: new Validator(),
            validationErrors: new Array()
        }
    }

    updateFormValidator = (name, newValue) =>
    {
        //TODO: aggiornare
        let newFormValidator = JSON.parse(JSON.stringify(this.state.formValidator));

        //let newFormValidator = {...this.state.formValidator}
        //Lo commento perchè così il dato clonato è un oggetto e non un array

        for (let i=0;i<newFormValidator.length;i++)
        {
            if (newFormValidator[i].name === name)
            {
                newFormValidator[i].value = newValue;
                break;
            }
        }

        this.setState({formValidator: newFormValidator});
        
        //console.log(JSON.stringify(newFormValidator));
    }

    formRender = (fv) =>
    {
       
        return fv.map((data) => {
            let fieldErrors = this.searchErrors(data.name);
            //console.log(fieldErrors);
            switch(data.controlType)
            {
                case "text":
                {
                    
                    return <Text name={data.name} classList = {data.controlClasses} value={data.value} updateValue={this.updateFormValidator} actualErrors={fieldErrors} />
                    
                }break;

                case "select":
                {
                    return <Select name={data.name} classList = {data.controlClasses} value={data.value} options={data.options} updateValue={this.updateFormValidator} actualErrors={fieldErrors}></Select>
                }break;

            }
        })
    }

    validateForm = (evt) =>
    {
        evt.preventDefault();
        const errors = this.state.objValidator.validate(this.state.formValidator);
        let actualErrors = Array();
        //console.log(errors);

        if (errors.length > 0)
        {
            //Si sono verificati degli errori: mostrare i messaggi
            //TODO: preparare struttura messaggi e mostrarli

            for (let i=0;i<errors.length;i++)
            {
                actualErrors.push({"fieldName":errors[i].fieldName,"errorMessage":this.getErrorMessage(errors[i])});
            }
            
        }
        else
        {
            //Validazione lato client: ok, spedire i dati al server
            //TODO: spedire i dati al server
        }

        this.setState({validationErrors: actualErrors});

    }

    getErrorMessage = (actualError) => //Funzione che a partire da un validatore ed un codice di errore, restituisce il messaggio corrispondente
    {
        let retvalue = null;
        for (let i=0;i<errors.length;i++)
        {
            if (errors[i].validatorName == actualError.errorName && errors[i].validatorErrorCode == actualError.code)
            {
                retvalue = errors[i].validatorErrorMessage;
                break;
            }
        }
        return retvalue;
    }

    searchErrors = (fieldName) => //Funzione che restituisce un Array di messaggi di errore, facenti capo al campo passato in ingresso
    {
        
        return this.state.validationErrors.map((data) => {
            console.log(fieldName + " - " + data.fieldName); 
             return (data.fieldName === fieldName) ? data.errorMessage : false
            /*
            if (data.fieldName === fieldName)
            {
                return data.errorMessage;
            }
            */
        })
    }
    
    render() 
    {
        //console.log(JSON.stringify(this.state.formValidator))
        return (
            <div>
                <h1>Vista Agenti</h1>
                <form onSubmit={this.validateForm}>
                {this.formRender(this.state.formValidator)}
                <button type="submit">Invia Dati</button>
                </form>
            </div>
        )
    }
}

export default Agents
