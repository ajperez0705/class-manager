import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents, purchaseTrophy } from "../actions/users";
import TrophyCards from "../components/TrophyCards";
import { Container, Header } from "semantic-ui-react";
import { motion } from "framer-motion";

function StudentMarket() {
  const [user] = useState(JSON.parse(localStorage.getItem("profile")));

  const curStudent = useSelector((state) => {
    const students = state.users;
    return students.filter((student) => student._id === user.result._id);
  });

  const [currentStudent, setCurrentStudent] = useState([]);
  const [isTeacher, setIsTeacher] = useState(null);
  const [anim, setAnim] = useState(false);
  const [trophyAnim, setTrophyAnim] = useState(null);
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.result.isTeacher) {
      setIsTeacher(true);
    }

    dispatch(fetchStudents());
  }, []);

  useEffect(() => {
    if (curStudent.length === 1) {
      setCurrentStudent(curStudent);
    }
  }, [curStudent.length, curStudent]);

  const buyTrophy = function (e) {
    e.preventDefault();

    setAnim(true);

    const trophyName = e.target.name;
    const trophyValue = e.target.value;

    // Handle points logic
    currentStudent[0].totalPoints = currentStudent[0].totalPoints - trophyValue;

    switch (trophyName) {
      case "a":
        currentStudent[0].marvinMoneybags++;
        currentStudent[0].totalTrophies++;
        break;

      case "b":
        currentStudent[0].stanleySwordington++;
        currentStudent[0].totalTrophies++;
        break;

      case "c":
        currentStudent[0].bradleyBomberman++;
        currentStudent[0].totalTrophies++;
        break;

      default:
        break;
    }

    dispatch(purchaseTrophy(currentStudent[0]._id, currentStudent[0]));

    setTimeout(() => {
      setAnim(false);
      setTrophyAnim(null);
    }, 2000);
  };

  return (
    <Container>
      {isTeacher ? (
        <>
          <h1>Hello, {user.result.username}</h1>
          <p>
            As the teacher, you may not purchase any trophies of course, but
            this page will look very similar to how your students will see this
            page from their end.
          </p>
          <TrophyCards
            curStudent={curStudent}
            buyTrophy={buyTrophy}
            errors={errors}
            setErrors={setErrors}
            setTrophyAnim={setTrophyAnim}
            trophyAnim={trophyAnim}
            isTeacher={isTeacher}
          />
        </>
      ) : (
        <>
          {currentStudent.map((student) => (
            <>
              <Container key={student._id} className="market-hero">
                <Header className="market-title" as="h1" textAlign="center">
                  Hello {student.username}, you have{" "}
                  <motion.span className="span">
                    {anim && trophyAnim ? (
                      <motion.span
                        animate={{
                          fontSize: "50px",
                          color: "red",
                        }}
                      >
                        {student.totalPoints}
                      </motion.span>
                    ) : (
                      student.totalPoints
                    )}
                  </motion.span>{" "}
                  points to spend!
                </Header>
                <p className="market-hero-p">
                  Here is the student marketplace. You may use the points you
                  earned to purchase trophies. Each trophy has a different value
                  and allows different perks if you have them. Read each
                  description to learn more about them!
                </p>
              </Container>
            </>
          ))}
          {!isTeacher && (
            <TrophyCards
              curStudent={curStudent}
              buyTrophy={buyTrophy}
              errors={errors}
              setErrors={setErrors}
              setTrophyAnim={setTrophyAnim}
              trophyAnim={trophyAnim}
              isTeacher={isTeacher}
            />
          )}
        </>
      )}
    </Container>
  );
}

export default StudentMarket;
