var myGamePiece;

var resetCount = 0;

//make the graphical object and start it's calculations
function startGame() {
    myGameArea.start();
    myGamePiece = new component(30, 30, "green", 230, 0);
}
//only recreate a new block, using a random color
function newBlockStart() {
    myGamePiece = new component(30, 30, "#" + ((1 << 24) * Math.random() | 0).toString(16), 230, 0);
}
//define the canvas, and add action listeners, when focus is aquired
    //a property of the canvas is the 1 framerate per second refresh rate, it acts like a clock speed,
    //so if it's changed, the game runs faster and smoother or slower and more jumpy
var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function() {
        this.canvas.width = 500;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 60);
        window.addEventListener('keydown', function(e) {
            myGameArea.key = e.keyCode;
        });
        window.addEventListener('keyup', function(e) {
            myGameArea.key = false;
        });
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
};

//define movements and revoke the ability to move when necessary
function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.hitBottom();
    }
    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            resetCount++;
            document.getElementById("pText").innerHTML = "Reset Count: " + resetCount;
            newBlockStart();
        }
    };

}

//apply keys, and movements/run the movement functions with inputs
function updateGameArea() {
    myGameArea.clear();
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
    if (myGameArea.key && myGameArea.key == 37) { myGamePiece.speedX = -20; }
    if (myGameArea.key && myGameArea.key == 39) { myGamePiece.speedX = 20; }
    if (myGameArea.key && myGameArea.key == 40) { myGamePiece.speedY += 10; }
    myGamePiece.speedY += 5 + resetCount;
    myGamePiece.newPos();
    myGamePiece.update();
}