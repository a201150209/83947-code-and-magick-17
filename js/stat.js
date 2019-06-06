window.renderStatistics = function (ctx, names, times) {

    var cloudCoordinates = {
        x: 100,
        y: 10,
    };

    var cloudShadowCoodinates = {
        x: cloudCoordinates.x + 10,
        y: cloudCoordinates.y + 10
    };
    

    function createHorizontalSide(x, y, direction, object) {
        var width = 420;
        var xPixelsInStep = 15;
        var yPixelsInStep = -10;
        var shiftX = xPixelsInStep
        var shiftY = yPixelsInStep

        if (direction === 'left') {
            shiftX = -xPixelsInStep;
            shiftY = -yPixelsInStep
        };

        for (var i = 0; i <= (width / xPixelsInStep); i++) {
            if (i !== 0 && i % 2 === 0) {
                x += shiftX;
                y += shiftY;
            } else if (i !== 0) {
                x += shiftX;
                y -= shiftY;
            };

            ctx.lineTo(x, y);
        };

        object.x = x;
        object.y = y;
    };

    function createVerticalSide(x, y, direction, object) {
        var height = 270;
        var xPixelsInStep = -10;
        var yPixelsInStep = 15;
        var shiftY = yPixelsInStep
        var shiftX = xPixelsInStep

        if (direction === 'top') {
            shiftY = -yPixelsInStep;
            shiftX = -xPixelsInStep;
        };

        for (var i = 0; i <= (height / yPixelsInStep); i++) {
            if (i !== 0 && i % 2 === 0) {
                x -= shiftX;
                y += shiftY;
            } else if (i !== 0) {
                x += shiftX;
                y += shiftY;
            };

            ctx.lineTo(x, y);
        };

        object.x = x;
        object.y = y;
    }; 
    
    function paintObject(object, color) {
        ctx.beginPath();
        ctx.moveTo(object.x, object.y);


        createHorizontalSide(object.x, object.y, 'right', object);
        createVerticalSide(object.x, object.y, 'bottom', object);
        createHorizontalSide(object.x, object.y, 'left', object);
        createVerticalSide(object.x, object.y, 'top', object);

        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
    };
    
    paintObject(cloudShadowCoodinates, 'rgba(0, 0, 0, 0.7)')
    paintObject(cloudCoordinates, '#fff')

};