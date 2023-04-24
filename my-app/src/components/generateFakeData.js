//KEY: 
//0-Sunday
//1-Monday
//2-Tuesday
//3-Wednesday
//4-Thursday
//5-Friday
//6-Saturday

let daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

//function to create fake data for 6 days of the week for demo video
export function generateFakeData(){
    var weekData = []
    var dayData = []
    //create fake data for 6 days of the week 
    for(var j = 0; j < 7; j++){
        //insert day you don;t want data for
        if(j !== 1){
            //create fake data for hours in the day
            for(var i = 0; i < 16; i++){
                dayData.push({x: daysOfWeek[j], y: getRandomInt(0, 7)})
            }

        } 
        weekData.push(dayData);
        dayData = []
    }
    //console.log(weekData)
    return weekData
}

//returns a integer between the min and max
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

