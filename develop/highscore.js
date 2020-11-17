var highscores;

(function() {

    var key = "quizHighscores";
    var recordedScores = JSON.parse( localStorage.getItem( key ) || "[]" );

    function get() {

        return recordedScores

    }

    function compareScores( scoreA, scoreB ) {

        if( scoreA.score > scoreB.score ) return -1;

        if( scoreA.score < scoreB.score ) return 1;

        return 0;

    }

    function submit( score, name ) {

        recordedScores.push( {
            score: score,
            name: name
        } );

        recordedScores.sort( compareScores );

        localStorage.setItem( key, JSON.stringify( recordedScores.slice(0,10) ) );

    }

    function renderIn( containerEl ) {

        if( !recordedScores.length ) {
            containerEl.innerHTML = "<h2>No Highscores</h2>";
            return;
        }

        var highscoreTable = "<table><tbody>";

        highscoreTable += `
                <tr>
                    <th>Initials</th>
                    <th>Score</th>
                </tr>`;

        for( var i = 0; i < recordedScores.length; i++ ) {

            highscoreTable += `
                <tr>
                    <td>${recordedScores[i].name}</td>
                    <td>${recordedScores[i].score}</td>
                </tr>`;

        }

        highscoreTable += "<table><tbody>";

        containerEl.innerHTML = highscoreTable;

    }

    highscores = {
        get: get,
        submit: submit,
        renderIn: renderIn
    }

})();