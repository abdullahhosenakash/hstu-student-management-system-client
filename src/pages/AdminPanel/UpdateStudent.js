import React from "react";
import { signOut } from "firebase/auth";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import useCourses from "../../hooks/useCourses";
import useDegree from "../../hooks/useDegree";
import useDept from "../../hooks/useDept";
import "./AdminPanel.css";

const UpdateStudent = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [batchInfo, setBatchInfo] = useState({});
  const [degree] = useDegree(batchInfo?.department);
  const [faculty, setFaculty] = useState("");
  const [dept] = useDept(faculty);
  const [courses] = useCourses(
    batchInfo?.department,
    batchInfo?.level,
    batchInfo?.semester
  );
  const [studentIdNo, setStudentIdNo] = useState("");
  const [studentName, setStudentName] = useState("");
  const currentYear = new Date().getFullYear();
  const [sessions, setSessions] = useState([]);
  const [days, setDays] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  console.log(courses);

  useEffect(() => {
    let monthLength;
    switch (selectedMonth) {
      case "april":
      case "june":
      case "september":
      case "november":
        monthLength = 30;
        break;

      case "february":
        const y = parseInt(selectedYear);
        y % 400 === 0 || (y % 4 === 0 && y % 100 !== 0)
          ? (monthLength = 29)
          : (monthLength = 28);
        break;

      default:
        monthLength = 31;
    }

    let days = [];
    for (let i = 1; i <= monthLength; i++) {
      days = [...days, i];
    }
    setDays(days);
  }, [selectedMonth, selectedYear]);

  useEffect(() => {
    let years = [];
    if (batchInfo.session) {
      for (let i = currentYear - 15; i > 1990; i--) {
        years = [...years, i];
      }
      setYears(years);
    } else {
      for (let i = currentYear; i >= 2000; i--) {
        years = [...years, i];
      }
      setSessions(years);
    }
  }, [currentYear, batchInfo.session]);

  useEffect(() => {
    if (studentIdNo.length === 7) {
      fetch(
        `https://hstu-student-panel-server.onrender.com/studentInfo/${studentIdNo}`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
        .then((res) => {
          if (res.status === 401 || res.status === 403) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("profileUpdated");
            localStorage.removeItem("role");
            signOut(auth);
            return;
          } else {
            return res.json();
          }
        })
        .then((data) => {
          if (data.studentName) {
            setErrorMessage(
              `Student already updated with the name ${studentName}`
            );
            setStudentName(data.studentName);
          } else {
            setStudentName("");
            setErrorMessage("");
          }
        });
    } else {
      setStudentName("");
    }
  }, [studentIdNo, studentName]);

  const handleProceedToStudentUpdate = (event) => {
    event.preventDefault();
    const faculty = event.target.faculty.value;
    const department = event.target.department.value;
    const session = event.target.session.value;
    const batchInfo = { faculty, department, session };
    console.log(batchInfo);
    setBatchInfo(batchInfo);
    // event.target.reset();
  };

  const handleUpdateStudent = (event) => {
    event.preventDefault();
    // setLoading(true);
    const studentId = event.target.studentId.value;
    const studentName = event.target.studentName.value;
    const year = event.target.year.value;
    const month = event.target.month.value;
    const day = event.target.day.value;
    const dateOfBirth = `${month} ${day}, ${year}`;
    const studentInfo = {
      studentId,
      studentName,
      department: batchInfo.department,
      degree,
      session: batchInfo.session,
      dateOfBirth,
    };
    console.log(studentInfo);

    fetch("https://hstu-student-panel-server.onrender.com/updateStudent", {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(studentInfo),
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("profileUpdated");
          localStorage.removeItem("role");
          signOut(auth);
          return;
        } else if (res.status === 404) {
          setErrorMessage("Failed to update student");
          return;
        } else {
          return res.json();
        }
      })
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          event.target.reset();
          setStudentName("");
          toast.success("Student updated successfully!");
        } else {
          setErrorMessage(data.message);
        }
      });
  };
  return (
    <div className="mb-5 update-student mx-auto">
      <div className={`${batchInfo.session ? "d-none" : "d-block"}`}>
        <h4 className="text-center pt-3">Batch Information</h4>
        <Form onSubmit={handleProceedToStudentUpdate}>
          <Form.Group className="mb-3" controlId="studentFaculty">
            <Form.Label>Faculty</Form.Label>
            <Form.Select
              aria-label="Faculty"
              name="faculty"
              required
              onChange={(e) => setFaculty(e.target.value)}
            >
              <option value="">- - Select Faculty - -</option>
              <option value="agriculture">Agriculture</option>
              <option value="cse">Computer Science and Engineering</option>
              <option value="bs">Business Studies</option>
              <option value="fisheries">Fisheries</option>
              <option value="dvm">Veterinary and Animal Science</option>
              <option value="engineering">Engineering</option>
              <option value="science">Science</option>
              <option value="ssh">Social Science and Humanities</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="studentDepartment">
            <Form.Label>Department</Form.Label>
            <Form.Select
              aria-label="Department"
              name="department"
              required
              readOnly
            >
              <option value="">- - Select Department - -</option>
              {dept?.map((d, index) => (
                <option key={index} value={d.deptValue}>
                  {d.dept}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="session">
            <Form.Label>Session</Form.Label>
            <Form.Select
              aria-label="Floating label select example"
              name="session"
              required
            >
              <option value="">- - Select Session - -</option>
              {sessions.map((session) => (
                <option value={session} key={session}>
                  {session}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {errorMessage && <p className="mt-2 text-danger">{errorMessage}</p>}

          <Button variant="secondary" type="submit" className="mx-auto d-block">
            Proceed to Student Update
          </Button>
        </Form>
      </div>

      <div className={`${batchInfo.session ? "d-block" : "d-none"}`}>
        <h4 className="text-center pt-3">Update Student</h4>
        <h6 className="text-center text-muted d-flex flex-lg-row flex-column justify-content-center">
          <span>
            <span className="me-4">{degree}</span>
          </span>
          <span className="me-2">Session - {batchInfo.session}</span>
        </h6>

        <Form onSubmit={handleUpdateStudent}>
          <Form.Group className="mb-3" controlId="studentId">
            <Form.Label>Student ID No</Form.Label>
            <Form.Control
              type="number"
              name="studentId"
              placeholder="Enter Student ID No"
              required
              onWheel={(e) => e.target.blur()}
              onClick={() => setErrorMessage("")}
              onChange={(e) => setStudentIdNo(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="studentName">
            <Form.Label>Student Name</Form.Label>
            <Form.Control
              type="text"
              name="studentName"
              placeholder="Enter Student Name"
              defaultValue={studentName ? studentName : ""}
              disabled={studentName}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="obtainedGPA">
            <Form.Label>Date of Birth</Form.Label>
            <div className="d-flex gap-2">
              <Form.Select
                aria-label="year"
                name="year"
                required
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="">Year</option>
                {years.map((year) => (
                  <option value={year} key={year}>
                    {year}
                  </option>
                ))}
              </Form.Select>
              <Form.Select
                aria-label="month"
                name="month"
                required
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                <option value="">Month</option>
                <option value="january">January</option>
                <option value="february">February</option>
                <option value="march">March</option>
                <option value="april">April</option>
                <option value="may">May</option>
                <option value="june">June</option>
                <option value="july">July</option>
                <option value="august">August</option>
                <option value="september">September</option>
                <option value="october">October</option>
                <option value="november">November</option>
                <option value="december">December</option>
              </Form.Select>
              <Form.Select aria-label="day" name="day" required>
                <option value="">Day</option>
                {days.map((day) => (
                  <option value={day} key={day}>
                    {day}
                  </option>
                ))}
              </Form.Select>
            </div>
          </Form.Group>

          {errorMessage && <p className="mt-2 text-danger">{errorMessage}</p>}

          <Button
            variant="secondary"
            type="submit"
            className="mx-auto d-block"
            disabled={studentName}
          >
            Update Result
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default UpdateStudent;
