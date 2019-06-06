window.renderStatistics = function (ctx, names, times) {

    var cloudCoordinates = {
        x: 100,
        y: 10,
    };

    var cloudShadowCoodinates = {
        x: cloudCoordinates.x + 10,
        y: cloudCoordinates.y + 10
    };

    function createHorizontalSide(direction, object) {
        var width = 420;
        var xPixelsInStep = 15;
        var yPixelsInStep = -10;
        var shiftX = xPixelsInStep
        var shiftY = yPixelsInStep
        var x = object.x;
        var y = object.y;

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

    function createVerticalSide(direction, object) {
        var height = 270;
        var xPixelsInStep = -10;
        var yPixelsInStep = 15;
        var shiftX = xPixelsInStep;
        var shiftY = yPixelsInStep;
        var x = object.x;
        var y = object.y;

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


        createHorizontalSide('right', object);
        createVerticalSide('bottom', object);
        createHorizontalSide('left', object);
        createVerticalSide('top', object);

        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
    };

    paintObject(cloudShadowCoodinates, 'rgba(0, 0, 0, 0.7)')
    paintObject(cloudCoordinates, 'rgba(255, 255, 255, 1)')

    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.font = '16px PT Mono';
    ctx.fillText('Ура вы победили!', cloudCoordinates.x + 40, cloudCoordinates.y + 40);
     ctx.fillText('Список результатов:', cloudCoordinates.x + 40, cloudCoordinates.y + 60);
    
    
    
};