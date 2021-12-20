import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Icon, Button } from "semantic-ui-react";
import { purchaseTrophy, updateStudentPoints } from "../actions/users";

function StudentMarket({ students }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  //const students = useSelector((state) => state.users);
  //const [currentUser, setCurrentUser] = useState(null);
  const [currentPoints, setCurrentPoints] = useState(null);
  const [totalTrophies, setTotalTrophies] = useState(null);
  const [trophies, setTrophies] = useState({});
  const [isTeacher, setIsTeacher] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("called");

    console.log(students);
    if (user.result.isTeacher) {
      setIsTeacher(true);
    } else return;
  }, [isTeacher]);

  const buyTrophy = function (e) {
    e.preventDefault();

    const trophyName = e.target.name;
    const trophyValue = e.target.value;

    if (isTeacher || user.result.totalPoints < trophyValue) {
      console.log("not enough points");
      return;
    }

    // Handle points logic
    user.result.totalPoints = user.result.totalPoints - trophyValue;

    switch (trophyName) {
      case "a":
        user.result.trophyA++;
        user.result.totalTrophies++;
        break;

      default:
        break;
    }

    dispatch(purchaseTrophy(user.result._id, user.result));
    console.log(user.result);
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
              <Button color="grey" onClick={buyTrophy}>
                Purple
              </Button>
            </Card.Content>
          </Card>
        </>
      ) : (
        <>
          <h1>
            Hello {user.result.username}, you have{" "}
            <span className="span">{currentPoints}</span> points to spend!
          </h1>
          <h6>Total Trophies{totalTrophies}</h6>
          <h6>Total A:{trophies.trophyA}</h6>
          <p>
            Here is the student marketplace. You may use the points you earned
            to purchase trophies. Each trophy has a different value and allows
            different perks if you have them. Read each description to learn
            more about them!
          </p>
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
              <Button name="a" value="10" color="purple" onClick={buyTrophy}>
                Purple
              </Button>
            </Card.Content>
          </Card>
        </>
      )}
    </>
  );
}

export default StudentMarket;
