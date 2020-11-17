var quizQuestions = {
    position: 0,
    list: [
        {
            question: "Question 1",
            choices: [
                "Correct Choice",
                "Wrong Choice",
                "Wrong Choice",
                "Wrong Choice"
            ],
            answer: 0
        },
        {
            question: "Question 2",
            choices: [
                "Wrong Choice",
                "Correct Choice",
                "Wrong Choice",
                "Wrong Choice"
            ],
            answer: 1
        },
        {
            question: "Question 3",
            choices: [
                "Wrong Choice",
                "Wrong Choice",
                "Correct Choice",
                "Wrong Choice"
            ],
            answer: 2
        },
        {
            question: "Question 4",
            choices: [
                "Wrong Choice",
                "Wrong Choice",
                "Wrong Choice",
                "Correct Choice"
            ],
            answer: 3
        },
        {
            question: "Question 5",
            choices: [
                "Correct Choice",
                "Wrong Choice",
                "Wrong Choice",
                "Wrong Choice"
            ],
            answer: 0
        },
        {
            question: "Question 6",
            choices: [
                "Wrong Choice",
                "Correct Choice",
                "Wrong Choice",
                "Wrong Choice"
            ],
            answer: 1
        },
        {
            question: "Question 7",
            choices: [
                "Wrong Choice",
                "Wrong Choice",
                "Correct Choice",
                "Wrong Choice"
            ],
            answer: 2
        },
        {
            question: "Question 8",
            choices: [
                "Wrong Choice",
                "Wrong Choice",
                "Wrong Choice",
                "Correct Choice"
            ],
            answer: 3
        },
        {
            question: "Question 9",
            choices: [
                "Correct Choice",
                "Wrong Choice",
                "Wrong Choice",
                "Wrong Choice"
            ],
            answer: 0
        },
        {
            question: "Question 10",
            choices: [
                "Wrong Choice",
                "Correct Choice",
                "Wrong Choice",
                "Wrong Choice"
            ],
            answer: 1
        },
        {
            question: "Question 11",
            choices: [
                "Wrong Choice",
                "Wrong Choice",
                "Correct Choice",
                "Wrong Choice"
            ],
            answer: 2
        },
        {
            question: "Question 12",
            choices: [
                "Wrong Choice",
                "Wrong Choice",
                "Wrong Choice",
                "Correct Choice"
            ],
            answer: 3
        }
    ],
    reset: function() {

        this.setPosition(0);

    },
    isComplete: function() {

        return this.position === this.list.length;

    },
    setPosition: function( position ) {

        this.position = position;

    },
    getCurrent: function() {

        if( this.isComplete() ) return false;

        return this.list[this.position];

    },
    getNext: function() {

        if( this.isComplete() ) return false;

        this.position++;

        return this.getCurrent();

    }
}