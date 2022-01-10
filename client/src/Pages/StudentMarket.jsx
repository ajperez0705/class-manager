import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { purchaseTrophy, updateStudentPoints } from "../actions/users";
import TrophyCards from "../components/TrophyCards";
import { Container, Grid, Card } from "semantic-ui-react";
import { motion } from "framer-motion";

function StudentMarket() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const curStudent = useSelector((state) => {
    const students = state.users;
    return students.filter((student) => student._id === user.result._id);
  });

  const [currentStudent, setCurrentStudent] = useState(curStudent);
  const [isTeacher, setIsTeacher] = useState(null);
  const [anim, setAnim] = useState(false);
  const [trophyAnim, setTrophyAnim] = useState(null);
  const [errors, setErrors] = useState([]);

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

    setAnim(true);

    const trophyName = e.target.name;
    const trophyValue = e.target.value;
    console.log(trophyName);
    console.log(trophyValue);

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

    setTimeout(() => {
      setAnim(false);
      setTrophyAnim(null);
    }, 2000);
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
        </>
      ) : (
        <>
          {currentStudent.map((student) => (
            <div key={student._id}>
              <h1>
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
              </h1>
              <Grid columns="equal">
                <Grid.Row>
                  <Grid.Column>
                    <Card>
                      <Card.Content header="Total Trophies" />
                      <Card.Content description={student.totalTrophies} />
                    </Card>
                  </Grid.Column>
                  <Grid.Column>
                    <Card>
                      <Card.Content header="Trophy A" />
                      <Card.Content>
                        {anim && trophyAnim === "a" ? (
                          <motion.h5
                            animate={{
                              fontSize: "50px",
                              color: "green",
                            }}
                          >
                            {student.trophyA}
                          </motion.h5>
                        ) : (
                          student.trophyA
                        )}
                      </Card.Content>
                      {/* <Card.Content description={`x${student.trophyA}`} /> */}
                    </Card>
                  </Grid.Column>
                  <Grid.Column>
                    <Card>
                      <Card.Content header="Trophy B" />
                      <Card.Content>
                        {anim && trophyAnim === "b" ? (
                          <motion.h5
                            animate={{
                              fontSize: "50px",
                              color: "green",
                            }}
                          >
                            {student.trophyB}
                          </motion.h5>
                        ) : (
                          student.trophyB
                        )}
                      </Card.Content>
                      {/* <Card.Content description={`x${student.trophyB}`} /> */}
                    </Card>
                  </Grid.Column>
                  <Grid.Column>
                    <Card>
                      <Card.Content header="Trophy C" />
                      <Card.Content description={`x${student.trophyC}`} />
                    </Card>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <p>
                Here is the student marketplace. You may use the points you
                earned to purchase trophies. Each trophy has a different value
                and allows different perks if you have them. Read each
                description to learn more about them!
              </p>
            </div>
          ))}
          {!isTeacher && (
            <TrophyCards
              curStudent={curStudent}
              buyTrophy={buyTrophy}
              errors={errors}
              setErrors={setErrors}
              setTrophyAnim={setTrophyAnim}
              trophyAnim={trophyAnim}
            />
          )}
        </>
      )}
    </>
  );
}

export default StudentMarket;
