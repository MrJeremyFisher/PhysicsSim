var velo
var alti
var long
var lati


async function checkAnswer(math) {
    if (math != '') {
        try {
            var velo = document.getElementById("velocitySpan").innerHTML
            var alti = document.getElementById("altitudeSpan").innerHTML
            var dist = document.getElementById("distFromYouSpan").innerHTML
            var mass = 419725
            
            
            
            
            
            fn = evaluatex(math);
            result = fn(variables = { v: velo/3.6, y: alti * 1000, m: mass, d: dist * 1000, r: 6378000 });
            outputSpan.textContent = result;
        } catch (err) { }
    } else {
    }
}

function input(str) {
    inputMathField.cmd(str);
    inputMathField.focus();
}

function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
}

function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            position => resolve(position),
            error => reject(error)
        )
    })
}

async function distFromYou(d1) {
    // const position = await getCurrentPosition();
    var lat1 = d1.latitude
    var lon1 = d1.longitude
    var alt = d1.altitude

    var lat2 = await toRadians(document.getElementById('latitudeInput').value)
    var lon2 = await toRadians(document.getElementById('longitudeInput').value)
    var distance = ((Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1)) * 6371)) + alt
    return distance;
}

async function toDegrees(radians) {
    return angle * (180 / Math.PI);
}

async function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}


var intervalId = window.setInterval(async function () {

    let d2 = await getData()

    document.getElementById("velocitySpan").innerHTML = await roundToTwo(d2.velocity/3.6);
    document.getElementById("altitudeSpan").innerHTML = await roundToTwo(d2.altitude);
    document.getElementById("longitudeSpan").innerHTML = await roundToTwo(d2.longitude);
    document.getElementById("latitudeSpan").innerHTML = await roundToTwo(d2.latitude);
    document.getElementById("distFromYouSpan").innerHTML = await roundToTwo(await distFromYou(d2));
}, 5000);

async function getData() {
    const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544')
    const data = await response.json()

    // var velo = data.velocity
    // var alti = data.altitude
    // var long = data.longitude
    // var lati = data.latitude
    // var mass = 419725

    return (data)

}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function dropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn') && !event.target.matches('.longitudeInput') && !event.target.matches('.latitudeInput')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        distFromYou()
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function dropdown2() {
    document.getElementById("myDropdown2").classList.toggle("show2");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn2')) {
        var dropdowns = document.getElementsByClassName("dropdown-content2");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show2')) {
                openDropdown.classList.remove('show2');
            }
        }
    }
} 