import EXAMPLE_SUBMISSIONS from "ExampleSubmissions";

type SubmissionDataProps = {
  submissionNumber: number;
};

function SubmissionData({ submissionNumber }: SubmissionDataProps) {
  return (
    <>
      <h3>
        Application {submissionNumber + 1}/{EXAMPLE_SUBMISSIONS.length}
      </h3>
      <h1>{EXAMPLE_SUBMISSIONS[submissionNumber].name}</h1>
      <h2>{EXAMPLE_SUBMISSIONS[submissionNumber].userFullname}</h2>
    </>
  );
}

export default SubmissionData;
