var quizScore;

(function() {

    var score = 0;
    var afterUpdate;
    var interval;

    function setAfterUpdate( afterUpdateCallback ) {

        afterUpdate = afterUpdateCallback;

    }

    function set( newScore ) {

        score = newScore;

        afterUpdate && afterUpdate();

    }

    function get() {

        return score;

    }

    function subtract( amount ) {

        set( Math.max( score - amount, 0 ) );

    }

    function startCountdown( endCallback ) {

        interval = setInterval(function() {

            if( score === 0 ) endCountdown( endCallback );

            subtract( 1 );
            
        }, 1000);

    }

    function endCountdown( callback ) {
        
        clearInterval(interval);

        callback && callback();

    }

    // Assign the interface methods with the variable we declared in the global scope.
    quizScore = {
        setAfterUpdate: setAfterUpdate,
        get: get,
        set: set,
        subtract: subtract,
        startCountdown: startCountdown,
        endCountdown: endCountdown
    };

})();
