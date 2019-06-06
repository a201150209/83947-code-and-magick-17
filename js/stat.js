window.renderStatistics = function (ctx, names, times) {

    var cloudCoordinates = {
        x: 100,
        y: 10,
    };
    var cloudShadowCoodinates = {
        x: cloudCoordinates.x + 10,
        y: cloudCoordinates.y + 10
    };
    var cloudColor = 'rgba(255, 255, 255, 1)';
    var cloudShadowColor = 'rgba(0, 0, 0, 0.7)';
    var mainColor = 'rgba(0, 0, 0, 1)';
    
    var histogramHeight = 150;
    var histogramColumnWidth = 40;
    var histogramColumnPadding = 50;
    var histogramUserColor = 'rgba(255, 0, 0, 1)';
    var histogramUserName = 'Вы';
    var histogramColumCoordinates = {
        x: cloudCoordinates.x + 50,
        y: cloudCoordinates.y + 230
    };   

    function createHorizontalSide(direction, object) {
        var width = 420;
        var xPixelsInStep = 15;
        var yPixelsInStep = -5;
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
        var xPixelsInStep = -5;
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

    paintObject(cloudShadowCoodinates,);
    paintObject(cloudCoordinates, cloudColor);

    ctx.fillStyle = mainColor;
    ctx.font = '16px PT Mono';
    ctx.fillText('Ура вы победили!', cloudCoordinates.x + 40, cloudCoordinates.y + 20);
    ctx.fillText('Список результатов:', cloudCoordinates.x + 40, cloudCoordinates.y + 40);
    
    
    var maxTime = times[0];
    for (var i = 0; i < times.length; i++) {
        times[i] = Math.round(times[i]);
        if (times[i] > maxTime) {
            maxTime = times[i];
            var maxTimeElementIndex = i;
        };
    };
    
    for (var i = 0; i < names.length; i++) {
        if (names[i] === histogramUserName) {
            ctx.fillStyle = histogramUserColor;
        } else {
            var histogramOtherUsersColor = 'rgba(0, 0, 255, ' + Math.random(0, 1) + ')';
            ctx.fillStyle = histogramOtherUsersColor;
        };
        
        var histogramUserHeight = histogramHeight / maxTime * times[i];
        ctx.fillRect(histogramColumCoordinates.x, histogramColumCoordinates.y, histogramColumnWidth, -histogramUserHeight);
        
        ctx.fillStyle = mainColor;
        ctx.fillText(times[i], histogramColumCoordinates.x, histogramColumCoordinates.y - 160);
        ctx.fillText(names[i], histogramColumCoordinates.x, histogramColumCoordinates.y + 30);
        histogramColumCoordinates.x += histogramColumnPadding + histogramColumnWidth;
    };
};