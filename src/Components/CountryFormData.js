export class CountryFormData
{
    constructor(name,areaId)
    {
        this.countryName="";
        this.areaId = "europe";
    }

    setCountryName(newName)
    {
        this.countryName = newName;
    }

    setCountryAreaId(newAreaId)
    {
        this.areaId = newAreaId;
    }
}

export default CountryFormData