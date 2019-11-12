const STORE = [
    {
			question: "Who were the original Avengers in the comic book?",
			answers: [
				"Batman, Spider-Man, Superman and Wonder Woman",
				"Ant-Man, the Hulk, Iron Man, Thor, and the Wasp",
				"The Hulk, Howard The Duck, Thor and Black Widow",
				"Thor, Capitan America, Iron Man, Black Widow",
				"Fantastic 4"
			],
			correctAnswer: 1
		},
		{
			question: "Who wrote the Avengers?",
			answers: [
				"Bruce Banner",
				"Stan Lee",
				"J.K. Rowling",
				"Gardner Fox",
				"Tim Burton"
			],
			correctAnswer: 1
		},
		{
			question: "Where was the Avengers headquarters?",
			answers: [
				"Paris",
				"Gotham City",
				"Hogwarts",
				"New York",
				"San Francisco"
			],
			correctAnswer: 3
		},
		{
			question: "From which Universe are the Avengers?",
			answers: [
				"DC",
				"Milky Way Galaxy",
				"Marvel",
				"Universal studio",
				"Wizarding World"
			],
			correctAnswer: 2
		},
		{
			question: "Who was never a part of the Avengers?",
			answers: [
				"Spiderman",
				"Jean Grey",
				"Deadpool",
				"Wolverine",
				"Black Widow",
			],
            correctAnswer: 1
		},
		{
			question: "What was the name of Tony Stark’s butler?",
			answers: [
				"Jughead",
				"Bruce",
				"Dobby",
				"Jarvis",
				"Thanos"
			],
			correctAnswer: 3
		},
		{
			question: "Which original Avengers die at the end of the movie adaptation 'Endgame'?",
			answers: [
				"Wasp, Deadpool, Jarvis",
				"Spiderman, Doctor Strange, Hulk",
				"Black Widow, Hawkeye",
				"Iron Man, Starlord, Spiderman",
				"Black Widow, Iron Man, Captain America"
			],
			correctAnswer: 4
		},
		{
			question: "What is Black Widow’s name?",
			answers: [
				"Jessica Jones",
				"Hermione Granger",
				"Natalia Alianovna Romanoff",
				"Scarlett Johansson",
				"Jean Grey"
				],
			correctAnswer: 2
		},
		{
			question: "How many Avengers movies are there?",
			answers: [
				"5",
				"7",
				"3",
				"4",
				"10"
			],
			correctAnswer: 3
		},
		{
			question: "What is the title of the second Avengers Movie?",
			answers: [
				"The Avengers",
				"Avengers: Age of Ultron",
				"Avengers: Infinity War",
				"Avengers: The Chamber of Secrets",
				"Avengers: Hichhiker’s Guide to the Universe"
			],
			correctAnswer: 1
		}
		];
		// set counter variables for score and question numbers to 0 
		let score = 0;
		let questionNum = 1;
		let index = -1;
		let indexCheck = 0;

		// load the intro screen
		function displayIntro() {
			$("#js-intro").show();
			$("#js-question").hide();
			$("#js-feedback").hide();
			$("#js-summary").hide();
		};
		// bind an event to the start button and trigger the function to 
		// display the screen with questions
		$("#js-intro").on("click", ".js-start", event => {
			event.preventDefault();
			displayQuestion();
		});
		// update the score counter
		function updateScore() {
			score ++;
			$(".js-score").text(`${score}`);
		};
		// update the question counter
		function updateQuestionNum() {
			questionNum ++;		
			$(".js-question-num").text(`${questionNum}`);
		};
		// update question index of the element in STORE
		function increaseIndex() {
			index++;
		};
		function increaseIndexCheck() {
			indexCheck++;
		};
		
		// show question box only 
		function showQuestion() {
			$("#js-intro").hide();
			$("#js-question").show();
			$("#js-feedback").hide();
			$("#js-summary").hide();
		};
		// generate and populate dynamically the form with the elements stored in the variable
		function displayQuestion() {
			increaseIndex();
			showQuestion();
			$(".js-question-box").html(`<form role="form" action="/destination_page" accept-charset="UTF-8" class="quiz-box" method="POST">
				<fieldset>
					<legend>${STORE[index].question}</legend>
						<label name="answer-label">${STORE[index].answers[0]}
						<input type="radio" name="answer" value="0"></label>
						<label name="answer-label">${STORE[index].answers[1]}
						<input type="radio" name="answer" value="1"></label>
						<label name="answer-label">${STORE[index].answers[2]}
						<input type="radio" name="answer" value="2"></label>
						<label name="answer-label">${STORE[index].answers[3]}
						<input type="radio" name="answer" value="3"></label>
						<label name="answer-label">${STORE[index].answers[4]}
						<input type="radio" name="answer" value="4"></label>
						<button type="submit" class="submit-answer" id="js-submit">Submit</button>
				</fieldset>
				</form>`);
		};
		// bind an evnt on a click to listen for a submit to get the 'checked' value of the radio button
		// call the function comparing that value against the value of the correct answer
		// call the function for feedback
		// update page counter
			$(".js-question-box").on("click", "#js-submit", event => {
				event.preventDefault();
				let checkedOption = $(".js-question-box").find("input[type=radio][name=answer]:checked");
				let getValue = $(".js-question-box").find("input[type=radio][name=answer]:checked").val();
				let correctAnswer = `${STORE[indexCheck].correctAnswer}`;
				let updateAnswer = $("#js-feedback");
			 	if (getValue === correctAnswer) {
					updateScore();
					updateQuestionNum();
					lastQuestion();
					displayFeedback();
					updateAnswer.html(`
					<section class="feedback-box">
						<p>You guessed right!</p>
						<img class="image" src="Pictures/correct.jpg" alt="Happy Groot Image"></img>
						<button type="submit" class="submit-answer" id="js-next">Next</button>
					</section>`);
				} else if (!checkedOption.is(":checked")) {
					alert("Check the answer before proceeding to the next question.");
					decreaseIndexCheck();
				} else if (getValue !== correctAnswer) {
					updateQuestionNum();
					lastQuestion();
					displayFeedback();
					updateAnswer.html(`
					<section class="feedback-box">
					<p>Sorry, this is not the correct answer</p>
					<p>The correct answer is: ${STORE[indexCheck].answers[correctAnswer]}</p>
						<img class="image" src="Pictures/incorrect.jpeg" alt="Happy Thanos Image"></img>
						<button type="submit" class="submit-answer" id="js-next">Next</button>
					</section>`);
				} 
				increaseIndexCheck(); return updateAnswer;
			});
		// write a function displaying feedback // displayFeedback();
		// if correct display "you are right" feedback + display counters function
		// if incorrect display "you are wrong" feedback + display updated counters function
		function displayFeedback() {
			$("#js-question").hide();
			$("#js-feedback").show();
		};
		// write event listener on next button and call the next question and update the question counter
		// if question is nr 10 call function for summary if not then display next question
		function nextQuestion() {
			$("#js-feedback").on("click", "#js-next", event => {
				event.preventDefault();
				if (questionNum === 11) {
					showSummary();
				} else {
					showQuestion();
				}
			});
		};
		//show Summary
		function showSummary() {
			$("#js-summary").show();
			$("#js-feedback").hide();
			$("#js-question").hide();
		}
		// write a summary function and display final score // displaySummary();
		function displaySummary() {
			$("#js-summary").html(`<section class="summary-box">
			<p>Your final score is: <span class="js-final-score">${score}</span> out of 10</p>
            <img class="image" src="Pictures/summary.jpg" alt="Doctor Strange Image"></img>
            <button type="submit" class="restart-quiz id="js-restart">Restart</button>
        </section>`);
		};
		// If last question
		function lastQuestion() {
			if (questionNum === 11) {
				displaySummary();
			} else {
				displayQuestion();
			}
		};
		// bind event on a click to restart the quiz 
		function restartQuiz() {
			$("#js-summary").on("click", "button", event => {
				event.preventDefault();
				freshStart();
			});
		  };
		//Clear the counters
		function freshStart(){
			score = 0;
			questionNum = 1;
			index = -1;
			indexCheck = 0;
			$(".js-score").text(`${score}`);
			$(".js-question-num").text(`${questionNum}`);
			displayIntro();
		}
		//start quiz
		function startQuiz() {
			displayIntro();
			nextQuestion();
			restartQuiz();
		};

		$(startQuiz);
		  