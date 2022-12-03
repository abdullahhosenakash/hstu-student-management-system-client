import React from "react";
import { useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import useToken from "../../hooks/useToken";
import useVerifyRole from "../../hooks/useVerifyRole";

const Result = () => {
  useVerifyRole("student");
  const [result, setResult] = useState({});
  const { loggedInUser } = useToken();
  const [levelSemester, setLevelSemester] = useState({});
  const isProfileUpdated = localStorage.getItem("profileUpdated");
  const [errorMessage, setErrorMessage] = useState("");

  const handleGetResult = (event) => {
    event.preventDefault();
    const level = event.target.level.value;
    const semester = event.target.semester.value;
    setLevelSemester({ level, semester });
    const studentId = loggedInUser.studentId;
    const url = `https://hstu-student-panel-server.onrender.com/results/${studentId}&${level}&${semester}`;

    fetch(url, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setErrorMessage(data.message);
        } else {
          setResult(data);
        }
      });
  };
  return (
    <div className="result mx-auto mb-5">
      {isProfileUpdated === "true" ? (
        <div className="d-flex flex-lg-row flex-column">
          <div className="level-semester-subsection">
            <Form onSubmit={handleGetResult}>
              <Form.Group controlId="level" className="mb-3">
                <Form.Label>Level</Form.Label>
                <Form.Select
                  aria-label="Floating label select example"
                  name="level"
                  onClick={() => setErrorMessage("")}
                  required
                >
                  <option value="">- - Select Level - -</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </Form.Select>
              </Form.Group>

              <Form.Group controlId="semester" className="mb-3">
                <Form.Label>Semester</Form.Label>
                <Form.Select
                  aria-label="Floating label select example"
                  name="semester"
                  required
                >
                  <option value="">- - Select Semester - -</option>
                  <option value="I">I</option>
                  <option value="II">II</option>
                </Form.Select>
              </Form.Group>

              <Button
                variant="secondary"
                type="submit"
                className="w-50 mx-auto d-block"
              >
                Submit
              </Button>
            </Form>
          </div>

          <div className="result-subsection">
            {errorMessage ? (
              <h2 className="mt-5 text-danger text-center">{errorMessage}</h2>
            ) : (
              <h2
                className={`result-text ${
                  result.result ? "d-none" : "d-block"
                }`}
              >
                Please Select level and semester to see your result
              </h2>
            )}
            <div className={result.result ? "d-block" : "d-none"}>
              <h6 className="text-center text-muted d-flex flex-lg-row flex-column justify-content-center">
                <span>
                  Name of the Examination:{" "}
                  <span className="me-4">{result.nameOfTheExam}</span>
                </span>
                <span>
                  <span className="me-2">Level-{levelSemester.level}</span>
                  <span className="me-3">
                    Semester-{levelSemester.semester}
                  </span>
                  <span className="me-3">Exam-{result.examYear}</span>
                </span>
                <span>Obtained GPA: {result.GPA}</span>
              </h6>
              {/* <h6 className='text-center text-muted'>Obtained GPA: {result.GPA}</h6> */}
              <Table
                responsive
                striped
                bordered
                hover
                variant=""
                className="table-width"
              >
                <thead className="text-center">
                  {
                    <tr>
                      <th>SL</th>
                      <th>Course Title</th>
                      <th className="">Course Code</th>
                      <th>Letter Grade</th>
                      <th>Grade Point</th>
                    </tr>
                  }
                </thead>
                <tbody>
                  {result.result?.map((singleCourseResult, index) => (
                    <tr key={index}>
                      <td className="text-center">{index + 1}</td>
                      <td className="course-title">
                        {singleCourseResult.courseTitle}
                      </td>
                      <td className="text-center">
                        {singleCourseResult.courseCode}
                      </td>
                      <td className="text-center">
                        {singleCourseResult.letterGrade}
                      </td>
                      <td className="text-center">
                        {singleCourseResult.gradePoint}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      ) : (
        <h2 className="update-profile-text">
          <Link to="/studentPanel/userProfile" className="text-decoration-none">
            Click here
          </Link>{" "}
          to update your profile first
        </h2>
      )}
    </div>
  );
};

export default Result;
