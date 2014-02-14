//Modified substantially by Elliot Weil for more use cases and more readablitiy

//grab whatever animation frame I need for the current browser
(function () {
 var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
 window.requestAnimationFrame = requestAnimationFrame;
 }());

 //grab a canvas
 var canvas = document.getElementById('myCanvas');
 var context = canvas.getContext('2d');

 //create some circles do not forget to adjust canvas size to fit all the circles
 createCircle(100, 150, '25', 'in', 'Nice');
 createCircle(300, 150, '50', 'out', 'Purrty');
 createCircle(500, 150, '75', ':D', 'Circle');
 createCircle(700, 150, '100', 'D:', 'yay');
 
 //x and y are location of the circle in the canvas
 //end is the ending Percent you want the circle to load to
 //inText is text inside the circle
 //title is title above the circle
 function createCircle(x, y, end, inText, title, callback) {
    var radius = 75;
    var endPercent = parseInt(end, 10)
    var curPerc = 0;
    var counterClockwise = false;
    var circ = Math.PI * 2;
    var quart = Math.PI / 2;
    //Set your color here
    context.strokeStyle = '#000000';
    context.ImageSmoothingEnabled=true;
    context.lineWidth = 10;
    //set the end cap type here
    context.lineCap = "round";
    //offset is where you want the animation to start on the circle currently at PI/2
    var offset = quart;
     
    //this function sets all the text with the circle
    function doText(context, x, y, inText, title) {
        //set text found here
        context.font = "26px sans-serif";
        context.beginPath();
        context.fillText(inText, x - 20, y + 10);
        context.fillText(title, x - 50, y - 100);
        context.closePath();
    }
    //this function draws the animation
    function animate(current) {
        //Clears a box around each cirle so your not drawing over yourself
        context.clearRect(x - radius - context.lineWidth,
                          y - radius - context.lineWidth,
                          radius * 2 + (context.lineWidth*2),
                          radius * 2 + (context.lineWidth*2));
        
        context.beginPath();
        //draw the arc from your beginning(offset) to the current position
        context.arc(x, y, radius, offset, ((circ) * current) + offset, false);
        context.stroke();
        context.closePath();
        curPerc++;
        if (curPerc < endPercent) {
            //while working toward end percent keep drawing
            requestAnimationFrame(function () {
                animate(curPerc / 100);
            });
        }
        else {
            //after drawing write text and do any callbacks
            doText(context, x, y, inText, title);
            if (callback) callback.call();
        }
    }
    animate();
}

