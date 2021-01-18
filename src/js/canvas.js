console.log("innerWidth", innerWidth)
console.log("innerHeight", innerHeight)


const numOfStars = 15000
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
trackTransforms(c)

canvas.width = 13000
canvas.height = 13000

addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
});

// document.getElementById("resetZoom").addEventListener("click", resetZoom)

class Star {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 1;
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = 'white';
        c.fill();
    }
}

function format(num) {
    return Number(parseFloat(num).toFixed(2)).toLocaleString('en', {
        minimumFractionDigits: 2
    })
}


class Planet {
    constructor(x, y, radius, color, velocity, orbitRadius, name, actualAu, scaledAu, actualDiameter, scaledDiameter) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.startX = x;
        this.startY = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.radian = 0;
        this.orbitRadius = orbitRadius;
        this.moon = {
            x: this.x + this.orbitRadius + this.radius,
            y,
            radian: 0,
            velocity: (Math.random() + 0.1) / 30
        };

        this.actualAu = actualAu
        this.scaledAu = scaledAu
        this.actualDiameter = actualDiameter
        this.scaledDiameter = scaledDiameter
    }

    draw() {
        // Planet Path
        c.beginPath();
        c.lineWidth = 2;
        c.arc(
            this.startX,
            this.startY,
            this.orbitRadius,
            0,
            Math.PI * 2,
            false
        );
        c.strokeStyle = 'rgba(255, 255, 255, 0.30)';
        c.stroke();

        // Planet
        c.shadowBlur = 15;
        c.shadowColor = this.color;
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.shadowBlur = 0;


        // label
        if (this.name !== 'Sun'){
        const xOffset = 5
            c.font = "30px Arial";
            c.fillText(this.name, this.x + xOffset , this.y + 5);
            c.font = "8px Arial";
            c.fillText(`Actual AU: ${this.actualAu} | Scaled AU: ${this.scaledAu} pixels from Sun`, this.x + xOffset , this.y + 30);
            c.fillText(`Actual Diameter: ${format(this.actualDiameter)}(km) | Scaled Diameter: ${format(this.scaledDiameter)}pixels`, this.x + xOffset , this.y + 50);
        }
    }

    update() {
        this.draw();
        if (this.velocity > 0) {
//            console.log("update")
            this.radian += this.velocity;
            this.x = this.startX + Math.cos(this.radian) * this.orbitRadius;
            this.y = this.startY + Math.sin(this.radian) * this.orbitRadius;
        }
    }
}

const getPlanetForOptions = (radius, velocity, orbitRadius, color, name, actualAu, scaledAu, actualDiameter, scaledDiameter) =>
    new Planet(
        canvas.width / 2,
        canvas.height / 2,
        radius,
        color,
        velocity / 4000,
        orbitRadius,
        name,
        actualAu,
        scaledAu,
        actualDiameter,
        scaledDiameter
    );

let planets;
let stars;
let drawn = false

function init() {
    let p1 = c.transformedPoint(0,0);
    let p2 = c.transformedPoint(canvas.width,canvas.height);
    c.clearRect(p1.x,p1.y,p2.x-p1.x,p2.y-p1.y);

    if (!drawn) {

        console.log("drawing", innerWidth)
        console.log("drawing", innerHeight)
        console.log("canvas.width: ", canvas.width)
        console.log("canvas.height: ", canvas.height)

        drawn = true

        planets = [];
        stars = [];

        // https://earthsky.org/space/what-is-the-astronomical-unit
        // https://www.exploratorium.edu/ronh/solar_system/scale.pdf
        let mercuryAuMiles = .39
        let venusAuMiles = .72
        let earthAuMiles = 1
        let marsAuMiles = 1.52
        let jupiterAuMiles = 5.20
        let saturnAuMiles = 9.54
        let uranusAuMiles = 19.2
        let neptuneAuMiles = 30.1

        let sunDiameter = 1391980
        let mercuryDiameter = 4880
        let venusDiameter = 12100
        let earthDiameter = 12800
        let marsDiameter = 6800
        let jupiterDiameter = 142000
        let saturnDiameter = 120000
        let uranusDiameter = 51800
        let neptuneDiameter = 49500

        // https://nssdc.gsfc.nasa.gov/planetary/factsheet/
        let mercuryVelocity = 47.4
        let venusVelocity = 35.0
        let earthVelocity = 29.8
        let marsVelocity = 24.1
        let jupiterVelocity = 13.1
        let saturnVelocity = 9.7
        let uranusVelocity = 6.8
        let neptuneVelocity = 5.4

        let sunRadius = 50 // pixels
        // planet_radius_in_pixels = sun_radius_in_pixels * (planet_real_radius_in_km/sun_real_radius_in_km)
        let mercuryRadius = sunRadius * ( (mercuryDiameter/2) / (sunDiameter/2) )
        let venusRadius = sunRadius * ( (venusDiameter/2) / (sunDiameter/2) )
        let earthRadius = sunRadius * ( (earthDiameter/2) / (sunDiameter/2) )
        let marsRadius = sunRadius * ( (marsDiameter/2) / (sunDiameter/2) )
        let jupiterRadius = sunRadius * ( (jupiterDiameter/2) / (sunDiameter/2) )
        let saturnRadius = sunRadius * ( (saturnDiameter/2) / (sunDiameter/2) )
        let uranusRadius = sunRadius * ( (uranusDiameter/2) / (sunDiameter/2) )
        let neptuneRadius = sunRadius * ( (neptuneDiameter/2) / (sunDiameter/2) )

        console.log("mercuryDiameter: ", mercuryRadius * 2)
        console.log("venusDiameter: ", venusRadius * 2)
        console.log("earthDiameter ", earthRadius * 2)
        console.log("marsDiameter ", marsRadius * 2)
        console.log("jupiterDiameter ", jupiterRadius * 2)
        console.log("saturnDiameter ", saturnRadius * 2)
        console.log("uranusDiameter ", uranusRadius * 2)
        console.log("neptuneDiameter ", neptuneRadius * 2)

        let earthAuToPixel = 100 + sunRadius // pixels
        // earthAuToPixel = 100pixels + sunRadiusInPixels
        // planet_au_in_pixels = earthAuToPixel * (planet_real_au)
        let mercuryOrbitRadius = earthAuToPixel * mercuryAuMiles
        let venusOrbitRadius = earthAuToPixel * venusAuMiles
        let earthOrbitRadius = earthAuToPixel * earthAuMiles
        let marsOrbitRadius = earthAuToPixel * marsAuMiles
        let jupiterOrbitRadius = earthAuToPixel * jupiterAuMiles
        let saturnOrbitRadius = earthAuToPixel * saturnAuMiles
        let uranusOrbitRadius = earthAuToPixel * uranusAuMiles
        let neptuneOrbitRadius = earthAuToPixel * neptuneAuMiles

        console.log("earthAuToPixel: ", earthAuToPixel)
        console.log("mercuryOrbitRadius: ", mercuryOrbitRadius)
        console.log("venusOrbitRadius: ", venusOrbitRadius)
        console.log("marsOrbitRadius : ", marsOrbitRadius )
        console.log("jupiterOrbitRadius : ", jupiterOrbitRadius )
        console.log("saturnOrbitRadius : ", saturnOrbitRadius )
        console.log("uranusOrbitRadius : ", uranusOrbitRadius )
        console.log("neptuneOrbitRadius : ", neptuneOrbitRadius )

        let maxVelocity = 50
        let mercuryCanvasVelocity = maxVelocity
        let venusCanvasVelocity = maxVelocity * (venusVelocity/mercuryVelocity)
        let earthCanvasVelocity = maxVelocity * (earthVelocity/mercuryVelocity)
        let marsCanvasVelocity = maxVelocity * (marsVelocity/mercuryVelocity)
        let jupierCanvasVelocity = maxVelocity * (jupiterVelocity/mercuryVelocity)
        let saturnCanvasVelocity = maxVelocity * (saturnVelocity/mercuryVelocity)
        let urnausCanvasVelocity = maxVelocity * (uranusVelocity/mercuryVelocity)
        let neptuneCanvasVelocity = maxVelocity * (neptuneVelocity/mercuryVelocity)

        console.log('mercuryCanvasVelocity: ', mercuryCanvasVelocity)
        console.log('venusCanvasVelocity: ', venusCanvasVelocity)
        console.log('earthCanvasVelocity: ', earthCanvasVelocity)
        console.log('marsCanvasVelocity: ', marsCanvasVelocity)
        console.log('jupierCanvasVelocity: ', jupierCanvasVelocity)
        console.log('saturnCanvasVelocity: ', saturnCanvasVelocity)
        console.log('urnausCanvasVelocity: ', urnausCanvasVelocity)
        console.log('neptuneCanvasVelocity: ', neptuneCanvasVelocity)

        planets.push(getPlanetForOptions(sunRadius, 0, 0, 'yellow', "Sun")); // sun
        planets.push(getPlanetForOptions(mercuryRadius, mercuryCanvasVelocity, mercuryOrbitRadius, 'pink', "Mercury", mercuryAuMiles, mercuryOrbitRadius, mercuryDiameter, mercuryRadius * 2)); // mercury
        planets.push(getPlanetForOptions(venusRadius, venusCanvasVelocity, venusOrbitRadius, 'orange', "Venus", venusAuMiles, venusOrbitRadius, venusDiameter, venusRadius * 2)); // venus
        planets.push(getPlanetForOptions(earthRadius, earthCanvasVelocity, earthOrbitRadius, 'blue', "Earth", earthAuMiles, earthOrbitRadius, earthDiameter, earthRadius * 2)); // earth
        planets.push(getPlanetForOptions(marsRadius, marsCanvasVelocity, marsOrbitRadius, 'red', "Mars", marsAuMiles, marsOrbitRadius,  marsDiameter, marsRadius * 2)); // mars
        planets.push(getPlanetForOptions(jupiterRadius, jupierCanvasVelocity, jupiterOrbitRadius, 'orange', "Jupiter", jupiterAuMiles, jupiterOrbitRadius, jupiterDiameter, jupiterRadius * 2)); // jupiter
        planets.push(getPlanetForOptions(saturnRadius, saturnCanvasVelocity, saturnOrbitRadius, 'yellow', "Saturn", saturnAuMiles, saturnOrbitRadius, saturnDiameter, saturnRadius * 2)); // saturn
        planets.push(getPlanetForOptions(uranusRadius, urnausCanvasVelocity, uranusOrbitRadius, 'lightblue', "Uranus", uranusAuMiles, uranusOrbitRadius, uranusDiameter, uranusRadius * 2)); // uranus
        planets.push(getPlanetForOptions(neptuneRadius, neptuneCanvasVelocity, neptuneOrbitRadius, '#E9DEFF', "Neptune", neptuneAuMiles, neptuneOrbitRadius, neptuneDiameter, neptuneRadius * 2)); // neptune

        for (let i = 0; i < numOfStars; i++) {
            stars.push(new Star());
        }

        let pt = c.transformedPoint(innerWidth/2, innerHeight/2);
        c.translate(pt.x,pt.y);
        let factor = .17 // control the initial load zoom
        c.scale(factor,factor);
        c.translate(-canvas.width/2, -canvas.width/2);
    }
}

function resetZoom() {
    drawn = false
    lastX = canvas.width/2
    lastY = canvas.height/2;
    init()
}

// Animation Loop
function animate() {

    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.fillStyle = 'rgb(0, 0, 0)';
    c.fillRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
        star.draw();
    });

    planets.forEach(planet => {
        planet.update();
    });

}

function trackTransforms(ctx){
    let svg = document.createElementNS("http://www.w3.org/2000/svg",'svg');
    let xform = svg.createSVGMatrix();
    ctx.getTransform = function(){ return xform; };

    let savedTransforms = [];
    let save = ctx.save;
    ctx.save = function(){
        savedTransforms.push(xform.translate(0,0));
        return save.call(ctx);
    };

    let restore = ctx.restore;
    ctx.restore = function(){
        xform = savedTransforms.pop();
        return restore.call(ctx);
    };

    let scale = ctx.scale;
    ctx.scale = function(sx,sy){
        xform = xform.scaleNonUniform(sx,sy);
        return scale.call(ctx,sx,sy);
    };

    let rotate = ctx.rotate;
    ctx.rotate = function(radians){
        xform = xform.rotate(radians*180/Math.PI);
        return rotate.call(ctx,radians);
    };

    let translate = ctx.translate;
    ctx.translate = function(dx,dy){
        xform = xform.translate(dx,dy);
        return translate.call(ctx,dx,dy);
    };

    let transform = ctx.transform;
    ctx.transform = function(a,b,c,d,e,f){
        let m2 = svg.createSVGMatrix();
        m2.a=a; m2.b=b; m2.c=c; m2.d=d; m2.e=e; m2.f=f;
        xform = xform.multiply(m2);
        return transform.call(ctx,a,b,c,d,e,f);
    };

    let setTransform = ctx.setTransform;
    ctx.setTransform = function(a,b,c,d,e,f){
        xform.a = a;
        xform.b = b;
        xform.c = c;
        xform.d = d;
        xform.e = e;
        xform.f = f;
        return setTransform.call(ctx,a,b,c,d,e,f);
    };

    let pt  = svg.createSVGPoint();
    ctx.transformedPoint = function(x,y){
        pt.x=x; pt.y=y;
        return pt.matrixTransform(xform.inverse());
    }
}

let lastX=canvas.width/2
let lastY=canvas.height/2;
let dragStart
let dragged

canvas.addEventListener('mousedown',function(evt){
    document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';
    lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
    lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
    dragStart = c.transformedPoint(lastX,lastY);
    dragged = false;
},false);

canvas.addEventListener('mousemove',function(evt){
    lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
    lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
    dragged = true;
    if (dragStart){
        let pt = c.transformedPoint(lastX,lastY);
        c.translate(pt.x-dragStart.x,pt.y-dragStart.y);
        init();
    }
},false);

canvas.addEventListener('mouseup',function(evt){
    dragStart = null;
    if (!dragged) zoom(evt.shiftKey ? -1 : 1 );
},false);

//let handleScroll = function(evt){
//    let delta = evt.wheelDelta ? evt.wheelDelta/40 : evt.detail ? -evt.detail : 0;
//    if (delta) zoom(delta);
//    return evt.preventDefault() && false;
//};
//canvas.addEventListener('DOMMouseScroll',handleScroll,false);
//canvas.addEventListener('mousewheel',handleScroll,false);

let scaleFactor = 1.1;
let zoom = function(clicks){
    console.log('clicks: ', clicks)
    console.log('lastX: ', lastX)
    console.log('lastY: ', lastY)

    let pt = c.transformedPoint(lastX, lastY);
    c.translate(pt.x,pt.y);
    let factor = Math.pow(scaleFactor,clicks);

    console.log("factor: ", factor)
    console.log("scaleFactor: ", scaleFactor)
    console.log("c.translate(-pt.x,-pt.y): ", -pt.x,-pt.y)

    c.scale(factor,factor);
    c.translate(-pt.x, -pt.y);
    init();
}

init();
animate();