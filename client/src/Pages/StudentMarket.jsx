import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { purchaseTrophy, updateStudentPoints } from "../actions/users";
import TrophyCards from "../components/TrophyCards";

function StudentMarket() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const curStudent = useSelector((state) => {
    const students = state.users;
    return students.filter((student) => student._id === user.result._id);
  });

  const [currentStudent, setCurrentStudent] = useState(curStudent);
  const [isTeacher, setIsTeacher] = useState(null);
  const dispatch = useDispatch();
  //const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (user.result.isTeacher) {
      setIsTeacher(true);
    }

    setCurrentStudent(curStudent);
    console.log(currentStudent);
  }, []);

  const buyTrophy = function (e) {
    e.preventDefault();

    const trophyName = e.target.name;
    const trophyValue = e.target.value;

    if (isTeacher || currentStudent[0].totalPoints < trophyValue) {
      console.log("not enough points");
      return;
    }

    // Handle points logic
    currentStudent[0].totalPoints = currentStudent[0].totalPoints - trophyValue;

    switch (trophyName) {
      case "a":
        currentStudent[0].trophyA++;
        currentStudent[0].totalTrophies++;
        break;

      case "b":
        currentStudent[0].trophyB++;
        currentStudent[0].totalTrophies++;
        break;

      case "c":
        currentStudent[0].trophyC++;
        currentStudent[0].totalTrophies++;
        break;

      default:
        break;
    }

    dispatch(purchaseTrophy(currentStudent[0]._id, currentStudent[0]));
    console.log(currentStudent[0]);
  };

  return (
    <>
      {isTeacher ? (
        <>
          <h1>Hello, {user.result.username}</h1>
          <p>
            As the teacher, you may not purchase any trophies of course, but
            this page will look very similar to how your students will see this
            page from their end.
          </p>
          <TrophyCards />
        </>
      ) : (
        <>
          {currentStudent.map((student) => (
            <div key={student._id}>
              <h1>
                Hello {student.username}, you have{" "}
                <span className="span">{student.totalPoints}</span> points to
                spend!
              </h1>
              <h3>Total Trophies: {student.totalTrophies}</h3>
              <h3>Trophy A: x{student.trophyA}</h3>
              <h3>Trophy B: x{student.trophyB}</h3>
              <h3>Trophy C: x{student.trophyC}</h3>
              <p>
                Here is the student marketplace. You may use the points you
                earned to purchase trophies. Each trophy has a different value
                and allows different perks if you have them. Read each
                description to learn more about them!
              </p>
            </div>
          ))}
          <TrophyCards buyTrophy={buyTrophy} />
        </>
      )}
    </>
  );
}

export default StudentMarket;
