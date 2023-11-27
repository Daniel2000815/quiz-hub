import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Chip,
  Image,
  Progress,
  CircularProgress,
} from "@nextui-org/react";
import NavBar from "./Navbar";
import Project from "./Project";
import { projects } from "./projects";
import QuestionCard from "./QuestionCard";
import { Question } from "./global";

const shuffledArrayFrom = (n) => {
  // Crear un array del 0 al numero-1
  const arrayOriginal = Array.from({ length: n }, (_, index) => index);

  // Desordenar el array usando el algoritmo de Fisher-Yates
  for (let i = arrayOriginal.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrayOriginal[i], arrayOriginal[j]] = [arrayOriginal[j], arrayOriginal[i]];
  }

  return arrayOriginal;
};

const removeHTML = (htmlString) => {
  return htmlString.replace(/<\/?[^>]+(>|$)/g, "");
};

export default function App() {
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [searchText, setSearchText] = React.useState("");
  const [totalQuestions, setTotalQuestions] = React.useState(0);
  const [currentQuestionId, setCurrentQuestionId] = React.useState(0);
  const [questionsIdOrder, setQuestionsIdOrder] = React.useState([]);
  const [question, setQuestion] = React.useState<Question>({
    sentence: "",
    answers: [-1],
    options: [""],
    explanation: "",
    feedback: [""],
  });

  const [testFinished, setTestFinished] = React.useState(false);

  const [points, setPoints] = React.useState(0);

  const [explanationKey, setExplanationKey] = React.useState("explanation");
  const [arrayKey, setArrayKey] = React.useState("results");
  const [answersKey, setAnswersKey] = React.useState("correct_response");
  const [optionsKey, setOptionsKey] = React.useState("answers");
  const [feedbackKey, setFeedbackKey] = React.useState("feedbacks");
  const [questionKey, setQuestionKey] = React.useState("question");
  const [currQuizKey, setCurrQuizKey] = React.useState("");

  const handleContinue = (wasCorrect) => {
    if (wasCorrect) {
      setPoints(points + 1);
    }

    if (currentQuestionId < totalQuestions - 1) {
      setQuestion(questions[questionsIdOrder[currentQuestionId + 1]]);
    } else {
      setTestFinished(true);
    }

    setCurrentQuestionId(currentQuestionId + 1);
  };

  const handleFinish = (beforeTime = false) => {
    if (beforeTime) {
      setTotalQuestions(currentQuestionId);
    }
    setTestFinished(true);
  };

  const handleNewQuestionSet = (quizKey: string, review: bool = false) => {
    console.log("GETTING QUIZ ", quizKey);
    let questions = JSON.parse(localStorage.getItem(quizKey));
    if (review) {
      console.log("ASAS");
      questions = questions.filter((q: Question) => q.review === true);
    }
    setQuestions(questions);
    setTotalQuestions(questions.length);
    const shuffled = shuffledArrayFrom(questions.length);
    setCurrQuizKey(quizKey);
    setQuestionsIdOrder(shuffled);
    setCurrentQuestionId(0);
    setTestFinished(false);
    setPoints(0);

    setQuestion(questions[shuffled[0]]);
  };

  const handlePressReview = () => {
    let savedQuestions = JSON.parse(localStorage.getItem(currQuizKey));

    for (let i = 0; i < savedQuestions.length; i++) {
      if (savedQuestions[i].id === question.id) {
        savedQuestions[i].review = !savedQuestions[i].review;
        //setQuestions(questions);
        localStorage.setItem(currQuizKey, JSON.stringify(savedQuestions));
        setQuestions(
          questions.map((q) => (q.id === question.id ? savedQuestions[i] : q)),
        );
        break;
      }
    }

    let currQuestion = question;
    currQuestion.review = !currQuestion.review;
    //setQuestion(currQuestion);
  };

  const handleSubmit = () => {
    // increment view count
    let savedQuestions = JSON.parse(localStorage.getItem(currQuizKey));

    for (let i = 0; i < savedQuestions.length; i++) {
      if (savedQuestions[i].id === question.id) {
        savedQuestions[i].viewCount = savedQuestions[i].viewCount + 1;
        //setQuestions(questions);
        localStorage.setItem(currQuizKey, JSON.stringify(savedQuestions));
        setQuestions(
          questions.map((q) => (q.id === question.id ? savedQuestions[i] : q)),
        );
        break;
      }
    }

    let currQuestion = question;
    currQuestion.viewCount = currQuestion.viewCount + 1;
  };
  return (
    <>
      <NavBar
        onChangeSearchText={setSearchText}
        onClickImport={handleNewQuestionSet}
        onSelectQuiz={handleNewQuestionSet}
      />
      <div className="space-y-5 w-screen h-screen p-8 gap-4  flex-col items-start justify-center">
        <Progress
          size="sm"
          radius="sm"
          classNames={{
            track: "drop-shadow-md border border-default",
            indicator: "bg-gradient-to-r from-yellow-500 to-blue-500",
            label: "tracking-wider font-medium text-default-600",
            value: "text-foreground/60",
          }}
          label={`Progress: ${currentQuestionId}/${totalQuestions}`}
          value={(currentQuestionId / totalQuestions) * 100}
          showValueLabel={true}
        />
        <Progress
          size="sm"
          radius="sm"
          classNames={{
            track: "drop-shadow-md border border-default",
            indicator: "bg-gradient-to-r from-emerald-300 to-emerald-700",
            label: "tracking-wider font-medium text-default-600",
            value: "text-foreground/60",
          }}
          label={`Success: ${points}/${totalQuestions}`}
          value={(points / totalQuestions) * 100}
          showValueLabel={true}
        />

        {!testFinished && questions !== null ? (
          <QuestionCard
            question={question}
            onContinue={handleContinue}
            onPressReview={handlePressReview}
            onClickFinish={() => handleFinish(true)}
            onSubmit={() => handleSubmit()}
          />
        ) : (
          questions !== null && (
            <Card className=" flex items-center justify-centerw-[240px] h-[240px] border-none bg-gradient-to-br from-violet-500 to-fuchsia-500 ">
              <CardBody className="justify-center items-center pb-0">
                <CircularProgress
                  classNames={{
                    svg: "w-36 h-36 drop-shadow-md",
                    indicator: "stroke-white",
                    track: "stroke-white/10",
                    value: "text-3xl font-semibold text-white",
                  }}
                  value={(points / totalQuestions) * 100}
                  strokeWidth={4}
                  showValueLabel={true}
                />
              </CardBody>
              <CardFooter className="justify-center items-center pt-0">
                <Chip
                  classNames={{
                    base: "border-1 border-white/30",
                    content: "text-white/90 text-small font-semibold",
                  }}
                  variant="bordered"
                >
                  Your score
                </Chip>
              </CardFooter>
            </Card>
          )
        )}
      </div>
    </>
  );
}
