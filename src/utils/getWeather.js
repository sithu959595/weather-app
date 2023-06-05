

function getWeather(long,lat,callBack){
    fetch(`http://api.weatherstack.com/current?access_key=ca37e8dbbfbfbb0c6932306b332bccbe&query=${long},${lat}&units=f`)
        .then((response)=>{
            // console.log(response)
            return response.json()})
        .then(({error,current,location})=>{
            if(error){
                // console.log(data)
                throw Error(data["error"]["info"])
            }
            let weatherData=current.weather_descriptions[0]+" in "+location.name+", "+location.region+" , "+location.country+".It is currently "+current.temperature+" degree out. There is a "+current.precip+" % chance of rain."
            callBack(undefined,weatherData);}
            ) 
        .catch(err=>{
            callBack(err,undefined);
        })
}

module.exports=getWeather