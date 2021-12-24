import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Icon, Button } from "semantic-ui-react";
import { purchaseTrophy, updateStudentPoints } from "../actions/users";

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
          <Card>
            <Card.Content>
              <Icon name="thumbs down outline" size="huge" />
              <Card.Header>Trophy A</Card.Header>
              <Card.Description>
                Trophy A allows you to chew gum in class for one week.
              </Card.Description>
              <Card.Meta>
                <span className="date">Value: 10 points</span>
              </Card.Meta>
              <Button color="grey">Purple</Button>
            </Card.Content>
          </Card>
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
              <p>Put the avatar here</p>
              <Card.Group itemsPerRow={3}>
                <Card color="red" header="Test" meta={student.totalPoints} />
                <Card
                  color="green"
                  header="Test"
                  meta={student.allTimePoints}
                />
                <Card color="blue" header="Test" />
              </Card.Group>
              <Card.Group itemsPerRow={3}>
                <Card color="red" header="Test" meta={student.trophyA} />
                <Card color="green" header="Test" meta={student.trophyB} />
                <Card color="blue" header="Test" meta={student.trophyC} />
              </Card.Group>
            </div>
          ))}
        </>
      )}
    </>
  );
}

export default MyAccount;
