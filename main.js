const STORE = [
    {
			question: "Who were the original Avengers in the comic book?",
			answers: [
				"Batman, Spider-Man, Superman and Wonder Woman",
				"Ant-Man, the Hulk, Iron Man, Thor, and the Wasp",
				"The Hulk, Howard The Duck, Thor and Black Widow",
				"Thor, Capitan America, Iron Man’, Black Widow",
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
				"Black Widow, Iron Man, Capitan America"
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
		let questionNum = 0;
		let index = 0;

		// load the intro screen
		function displayIntro() {
		$("#js-intro").show;
		$("#js-question").hide;
		$("#js-feedback").hide;
		$("#js-summary").hide;
		}

		// bind an event to the start button and trigger the function to 
		// display the screen with questions
		$("#js-intro").on("click", ".js-start", event => {
			event.preventDefault();
			displayQuestion();
		})

		// update the score counter
		function updateScore() {
			score ++;
			$(".js-score").text(score);
		};

		// update the question counter
		function updateQuestionNum(){
			if (questionNum!==10) {questionNum ++};
			$(".js-question-num").text(questionNum - 1);
		};

		function increaseIndex() {
			index ++;
		  };

		function showQuestion() {
		$("#js-intro").hide;
		$("#js-question").show;
		$("#js-feedback").hide;
		$("#js-summary").hide;
		}

		// generate and populate dynamically the form with the elements stored in the variable
		function displayQuestion(){
			updateQuestionNum()
			increaseIndex();
			showQuestion();
			$("#js-question").html(`<form role="form" action="/destination_page" accept-charset="UTF-8" class="quiz-box" method="POST"></form>
			<section class="display-result js-counters">
					<ul>
						<li class="counter-q">Question:
							<span class="js-question-num">${questionNum}</span>/10</li>
						<li class="counter-s">Score:
							<span class="js-score">${score}</span>
						</li>
					</ul>
			</section>
			<section class="question-box">
				<fieldset>
						<legend>${STORE[index-1].question}</legend>
						<label for="option-0" name="answer-label">${STORE[index-1].answers[0]}</label>
						<input type="radio" name="answer" value="0" required><br>
						<label for="option-1" name="answer-label">${STORE[index-1].answers[1]}</label>
						<input type="radio" name="answer" value="1" required><br>
						<label for="option-2" name="answer-label">${STORE[index-1].answers[2]}</label>
						<input type="radio" name="answer" value="2" required><br>
						<label for="option-3" name="answer-label">${STORE[index-1].answers[3]}</label>
						<input type="radio" name="answer" value="3" required><br>
						<label for="option-4" name="answer-label">${STORE[index-1].answers[4]}</label>
						<input type="radio" name="answer" value="4" required><br>
						<button type="submit" class="submit-answer">Submit</button>
				</fieldset> </form>
			</section>`)
		}
		// bind an evnt on a click to listen for a submit to get the 'checked' value of the radio button
		// call the function comparing that value against the value of the correct answer
		// call the function for feedback
		// update page counter
		function submitAnswer() {
			let submitResult = $("#js-question").on("click", ".submit-answer", event => {
				event.preventDefault();
				let getValue = $(".question-box").find("input[type=radio][name=answer]:checked").val();
				let correctAnswer = `${STORE[index].correctAnswer}`;
				let updateAnswer = $("#js-feedback");
				if(getValue === correctAnswer){
					updateScore();
					updateAnswer.append(`<section class="feedback-box">
					<img alt="Happy Groot Image"></img>
					<p>You guessed right!</p>
					<button type="submit" class="next-question js-next">Next</button>
				  </section>`);
				} else {
					updateAnswer.append(`<section class="feedback-box">
					<img alt="Happy Thanos Image"></img>
					<p>Sorry, this is not the correct answer</p>
					<p>The correct answer is: ${STORE[index].answers[correctAnswer]}</p>
					<button type="submit" class="next-question js-next">Next</button>
				</section>`)
				};
				return updateAnswer;	
			});
			return submitResult;
		};

		// write a function displaying feedback // displayFeedback();
		// if correct display "you are right" feedback + display counters function
		// if incorrect display "you are wrong" feedback + display updated counters function

		// write event listener on next button and call the next question and update the question counter
		// if question is nr 10 call function for summary if not then display next question

		// write summary function and display final score // displaySummary();
		
		// bind event on a click to restart the quiz 

		// call the function to handle the quiz // restartQuiz();
		// start the quiz
		// render questions
		// handle the selected option
		// restart quiz

		function startQuiz() {
			displayIntro();
			displayQuestion();
			submitAnswer();
		  }
		  
		  $(startQuiz);
		  