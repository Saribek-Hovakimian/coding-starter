import "css/global/Global.css";
import { useState } from "react";
import { Route, Routes as RoutesImport, BrowserRouter } from "react-router-dom";
import EXAMPLE_SUBMISSIONS, { Submission } from "ExampleSubmissions";
import styles from "css/App.module.css";
import getObject from "./utils/local-storage/getObject";
import setObject from "./utils/local-storage/setObject";

const currentUser = "user1";

const randomExample: Submission =
  EXAMPLE_SUBMISSIONS[Math.floor(Math.random() * EXAMPLE_SUBMISSIONS.length)];

function VotePage(): JSX.Element {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [submissionNumber, setSubmissionNumber] = useState<number>(0);

  // useEffect(() => {
  // check db have i already voted on this

  // alreadyVoted = false;

  // const votesArray = getObject("votes");
  // votesArray.vArray.forEach((element) => {
  //   if (element === submissionNumber) {
  //     element.id === EXAMPLE_SUBMISSIONS[submissionNumber].id;
  //     alreadyVoted = true;
  //     break;
  //   }
  // });

  // loop through all votes and check id = submissionNumber.id
  // if not show regularlty
  // if yes show next submission
  // }, []);

  const saveVoteResult = (event: any, result: boolean) => {
    event?.preventDefault();
    // Look at what user voted- down or up
    // Add to local storage based on this vote

    const currentVote = {
      userId: currentUser,
      submissionId: randomExample.id,
      upVote: result,
    };

    let votesArray = getObject("votes");

    if (votesArray) {
      votesArray.vArray.push(currentVote);
    } else {
      votesArray = {
        vArray: [currentVote],
      };
    }

    setObject("votes", votesArray);
    setSubmitted(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.example}>
        <h3>Application 1/200</h3>
        <h1>The Adventure</h1>
        <h2>Sherlock</h2>
        {randomExample.assets.map((image) => (
          <img className={styles.asset} src={image.src} key={image.src} />
        ))}
        <hr />
        {!submitted && (
          <>
            <button type="button" onClick={(e) => saveVoteResult(e, true)}>
              Downvote
            </button>
            <button type="button" onClick={(e) => saveVoteResult(e, false)}>
              Upvote
            </button>
          </>
        )}
        {submitted && <p>Thank you for voting!</p>}
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <RoutesImport>
        <Route path="/" element={<VotePage />} />
      </RoutesImport>
    </BrowserRouter>
  );
}

export default App;
