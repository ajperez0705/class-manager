import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Icon, Button } from "semantic-ui-react";
import { purchaseTrophy, updateStudentPoints } from "../actions/users";
import UserAvatar from "../components/UserAvatar";

function MyAccount() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const curStudent = useSelector((state) => {
    const students = state.users;
    return students.filter((student) => student._id === user.result._id);
  });

  const [currentStudent, setCurrentStudent] = useState(curStudent);
  const [isTeacher, setIsTeacher] = useState(null);

  useEffect(() => {
    if (user.result.isTeacher) {
      setIsTeacher(true);
    }

    setCurrentStudent(curStudent);
    console.log(currentStudent);
  }, []);

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
          <p>Put the avatar here</p>
        </>
      ) : (
        <>
          {currentStudent.map((student) => (
            <div key={student._id}>
              <h1>Hello {student.username} 👋</h1>
              <p>
                Here is the student marketplace. You may use the points you
                earned to purchase trophies. Each trophy has a different value
                and allows different perks if you have them. Read each
                description to learn more about them!
              </p>
              <UserAvatar studentAvatar={student.avatar} />
              <Card.Group itemsPerRow={2}>
                <Card
                  color="red"
                  header="Total Points"
                  meta={student.totalPoints}
                />
                <Card
                  color="green"
                  header="All Time Points"
                  meta={student.allTimePoints}
                />
              </Card.Group>
              <Card.Group itemsPerRow={4}>
                <Card color="red" header="Trophy A" meta={student.trophyA} />
                <Card color="green" header="Trophy B" meta={student.trophyB} />
                <Card color="blue" header="Trophy C" meta={student.trophyC} />
                <Card
                  color="blue"
                  header="Total Trophies"
                  meta={student.totalTrophies}
                />
              </Card.Group>
            </div>
          ))}
        </>
      )}
    </>
  );
}

export default MyAccount;
