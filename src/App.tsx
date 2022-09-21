import "css/global/Global.css";
import { useState, useEffect } from "react";
import {
  Route,
  Routes as RoutesImport,
  BrowserRouter,
  Link,
} from "react-router-dom";
import EXAMPLE_SUBMISSIONS from "ExampleSubmissions";
import getObject from "./utils/local-storage/getObject";
import setObject from "./utils/local-storage/setObject";
import { Vote } from "./utils/local-storage/types";
import Admin from "./Admin";
import Layout from "Layout";
import ImageGallery from "components/ImageGallery";
import SubmissionData from "components/SubmissionData";
import styles from "./css/App.module.css";

const currentUser = "user1";

function VotePage(): JSX.Element {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);
  const [submissionNumber, setSubmissionNumber] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const checkVoted = (index: number) => {
    const votesArray = getObject("votes");

    const alreadyVoted = votesArray?.vArray.find(
      (value: Vote) =>
        value.submissionId === EXAMPLE_SUBMISSIONS[index].id &&
        value.userId === currentUser
    );

    if (alreadyVoted) {
      // console.log("already voted");
      if (index < EXAMPLE_SUBMISSIONS.length - 1) {
        setSubmissionNumber(index + 1);
      } else {
        setCompleted(true);
        setLoading(false);
      }
    } else {
      // console.log("not voted");
      setLoading(false);
    }
  };

  useEffect(() => {
    // check db - have i already voted on this
    checkVoted(submissionNumber);
  }, [submissionNumber]);

  const saveVoteResult = (event: any, result: boolean) => {
    event?.preventDefault();
    // Look at what user voted - down or up
    // Add to local storage based on this vote

    const currentVote = {
      userId: currentUser,
      submissionId: EXAMPLE_SUBMISSIONS[submissionNumber].id,
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

    setLoading(true);
    if (EXAMPLE_SUBMISSIONS.length > submissionNumber + 1) {
      setSubmissionNumber(submissionNumber + 1);
    } else {
      setCompleted(true);
      // console.log("no more submissions");
    }
    setLoading(false);
    setSubmitted(false);
  };

  return (
    <Layout>
      {loading ? (
        <h2>Loading...</h2>
      ) : completed ? (
        <h2>Thank you for voting! There are no more submissions</h2>
      ) : (
        <>
          <SubmissionData submissionNumber={submissionNumber} />

          <ImageGallery
            imageArray={EXAMPLE_SUBMISSIONS[submissionNumber].assets}
          />
          <hr />
          {!submitted && (
            <>
              <button
                className={styles.button}
                type="button"
                onClick={(e) => saveVoteResult(e, false)}
              >
                Downvote
              </button>
              <button
                className={styles.button}
                type="button"
                onClick={(e) => saveVoteResult(e, true)}
              >
                Upvote
              </button>
            </>
          )}
          {submitted && <p>Thank you for voting!</p>}
        </>
      )}

      <div className={styles.adminLinkContainer}>
        <Link to="/admin">Go to Admin Page</Link>
      </div>
    </Layout>
  );
}

function App() {
  return (
    <BrowserRouter>
      <RoutesImport>
        <Route path="/" element={<VotePage />} />
        <Route path="/admin" element={<Admin />} />
      </RoutesImport>
    </BrowserRouter>
  );
}

export default App;
