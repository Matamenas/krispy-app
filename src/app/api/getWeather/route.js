
export async function GET(req, res){
    // note to say we are in the API
    console.log("in the weather api page");

    const res2 = await fetch('https://api.weatherapi.com/v1/current.json?key=a947ef1dc06241eba04124411242510&q=Dublin&aqi=no')

    const data = await res2.json()
    console.log(data.current.temp_c)

    let currentTemp = data.current.temp_c

    
    // database call goes here
    return Response.json({"temp": currentTemp}) 
}