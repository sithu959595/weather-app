

async function geoCode(location, callBack){
    try{
let response=await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1Ijoic2l0aHVsaW4iLCJhIjoiY2xoeTd4YzVnMHZ0bzNlbzRxanZyMjVzbCJ9.i7cr5oJ8j9zEsIGDGlAp8Q&limit=1`);
let {features,message}=await response.json();
if(!features){
    throw Error(message);
}
else{
    let lat=features[0].center[0];
    let long=features[0].center[1];
    let objGeo={
        lat,
        long
    }
    callBack(undefined,objGeo);
}
    
}
catch(err){
    console.log("++++++=")
    callBack(err,undefined);
}


}

module.exports=geoCode;