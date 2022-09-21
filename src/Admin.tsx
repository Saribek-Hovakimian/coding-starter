import { useCallback, useEffect, useState } from "react";
import Layout from "Layout";
import getObject from "utils/local-storage/getObject";
import EXAMPLE_SUBMISSIONS from "ExampleSubmissions";
import ImageGallery from "components/ImageGallery";
import { Vote } from "utils/local-storage/types";
import setNumber from "utils/local-storage/setNumber";
import getNumber from "utils/local-storage/getNumber";
import SubmissionData from "components/SubmissionData";
import { Link } from "react-router-dom";
import styles from "./css/App.module.css";
import setObject from "utils/local-storage/setObject";

function Admin() {
  const [submissionNumber, setSubmissionNumber] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [upVotes, setUpVotes] = useState<number>(0);
  const [downVotes, setDownVotes] = useState<number>(0);
  const [allVotes, setAllVotes] = useState<Vote[]>([]);

  useEffect(() => {
    const votesArray = getObject("votes");
    const savedIndex = getNumber("lastSubmissionNumber");

    if (votesArray) {
      setAllVotes(votesArray.vArray);
    }

    setSubmissionNumber(savedIndex);
  }, []);

  const saveLastSubmission = (index: number) => {
    setNumber("lastSubmissionNumber", index);
  };

  const fetchVotes = useCallback(
    (index: number) => {
      let submissionUpVotes = 0;
      let submissionDownVotes = 0;

      allVotes.forEach((value) => {
        if (value.submissionId === EXAMPLE_SUBMISSIONS[index].id) {
          if (value.upVote) {
            submissionUpVotes += 1;
          } else {
            submissionDownVotes += 1;
          }
        }
      });

      setUpVotes(submissionUpVotes);
      setDownVotes(submissionDownVotes);

      setLoading(false);
    },
    [allVotes]
  );

  useEffect(() => {
    saveLastSubmission(submissionNumber);
  }, [submissionNumber]);

  useEffect(() => {
    fetchVotes(submissionNumber);
  }, [submissionNumber, fetchVotes]);

  return (
    <Layout>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <h1>Admin</h1>

          <SubmissionData submissionNumber={submissionNumber} />

          <h3>UpVotes: {upVotes}</h3>
          <h3>DownVotes: {downVotes}</h3>
          <ImageGallery
            imageArray={EXAMPLE_SUBMISSIONS[submissionNumber].assets}
          />
          <hr />
          <button
            className={styles.button}
            type="button"
            onClick={() => {
              setSubmissionNumber(submissionNumber - 1);
            }}
            disabled={submissionNumber <= 1}
          >
            Back
          </button>
          <button
            className={styles.button}
            type="button"
            onClick={() => {
              setSubmissionNumber(submissionNumber + 1);
            }}
            disabled={submissionNumber >= EXAMPLE_SUBMISSIONS.length - 1}
          >
            Next
          </button>

          <button
            className={styles.button}
            type="button"
            onClick={() => {
              setAllVotes([]);
              setObject("votes", { vArray: [] });
            }}
          >
            Reset all votes
          </button>

          <div className={styles.adminLinkContainer}>
            <Link to="/">Go to User Page</Link>
          </div>
        </>
      )}
    </Layout>
  );
}

export default Admin;
