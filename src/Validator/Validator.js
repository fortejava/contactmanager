class FormValidator
{
    constructor()
    {
        this.validators = new Array();
        this.validators.push(new Validator("password",this.password));
        this.validators.push(new Validator("min_length_8",this.min_length_8));
        this.validators.push(new Validator("required",this.required));
    }

    min_length_8(candidatePassword)
    {
        let retvalue = 0;
        if (candidatePassword.length < 8)
        {
            retvalue = 1;
        }
        return retvalue;
    }

    password(candidatePassword)
    {
        let retvalue = 0;
        let testReg = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

        if (!testReg.test(candidatePassword))
        {
            retvalue = 1;
        }

        return retvalue;
    }

    required(dataToValidate)
    {
        console.log(dataToValidate + "----");
        let retvalue = 0;

        if (dataToValidate.length < 1)
        {
            return 1;
        }

        return retvalue;
    }

    validate(formdata)
    {
        let errors = new Array();
        for (let i=0;i<formdata.length;i++)
        {
            if (formdata[i].validators.length > 0)
            {
                //console.log(formdata[i].validators.length);
                for (let j=0;j<formdata[i].validators.length;j++)
                {
                    let actualValidator = this.searchValidator(formdata[i].validators[j]);
                    //console.log(typeof(actualValidator));

                    if (actualValidator !== null)
                    {
                        let result = actualValidator.procedure(formdata[i].value);
                        if (result != 0)
                        {
                            //console.log("Errore: " + formdata[i].validators[j] + " - " + actualValidator.name);
                            errors.push(new Error(formdata[i].name,actualValidator.name, result));
                        }
                    }
                }   
            }
        }
        return errors;
    }

    searchValidator(validatorName)
    {
        let retvalue = null;
        for (let i=0;i<this.validators.length;i++)
        {
            if (this.validators[i].name === validatorName)
            {
                retvalue = this.validators[i];
                break;
            }
        }
        return retvalue;
    }
}

class Validator
{
    constructor(name, procedure)
    {
        this.name = name;
        this.procedure = procedure;
    }
}

class Error
{
    constructor(fieldName,errorName, code)
    {
        this.fieldName = fieldName;
        this.errorName = errorName;
        this.code = code;
    }
}

export default FormValidator;