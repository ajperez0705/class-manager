import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Card, Grid, Header, Image } from "semantic-ui-react";
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
      setUser(JSON.parse(localStorage.getItem("profile")));
    }

    setCurrentStudent(curStudent);
    console.log(currentStudent);
  }, []);

  return (
    <>
      {isTeacher ? (
        <>
          <Header className="my-account-title" as="h1">
            Hello {user.result?.username} 👋
          </Header>
          <p>
            This is the My Account page. As the teacher, you are only allowed to
            see your account information. Students are able to view the amount
            of points and trophies they have accumulated.
          </p>

          <Grid className="my-account-info" stackable divided>
            <Grid.Column width={6}>
              <div className="my-account-avatar">
                <UserAvatar studentAvatar={user.result?.avatar} />
              </div>
            </Grid.Column>
            <Grid.Column width={10} verticalAlign="middle">
              <Header as="h2">At A Glance</Header>
              <div className="my-account-info-brief">
                <Header as="h3">
                  <span> Username: </span>
                  {user.result?.username}
                </Header>
                <Header as="h3">
                  <span> Email: </span>
                  {user.result?.email}
                </Header>
                <Header as="h3">
                  <span> Role: </span>
                  Teacher
                </Header>
              </div>
              <p>{user.result?.bio}</p>
            </Grid.Column>
          </Grid>
        </>
      ) : (
        <>
          {currentStudent.map((student) => (
            <div key={student._id}>
              <Header className="my-account-title" as="h1">
                Hello {student.username} 👋
              </Header>
              <p>
                This is the My Account page. Here, you can view your account
                information, as well as the amount of points and trophies you
                have accumulated.
              </p>

              <Grid className="my-account-info" stackable divided>
                <Grid.Column width={6}>
                  <div className="my-account-avatar">
                    <UserAvatar studentAvatar={student.avatar} />
                  </div>
                </Grid.Column>
                <Grid.Column width={10} verticalAlign="middle">
                  <Header as="h2">At A Glance</Header>
                  <div className="my-account-info-brief">
                    <Header as="h3">
                      <span> Username: </span>
                      {student.username}
                    </Header>
                    <Header as="h3">
                      <span> Email: </span>
                      {student.email}
                    </Header>
                    <Header as="h3">
                      <span> Role: </span>
                      Student
                    </Header>
                  </div>
                  <p>{student.bio}</p>
                </Grid.Column>
              </Grid>

              <Grid
                className="my-account-grid"
                columns={2}
                divided
                inverted
                stackable
              >
                <Grid.Row textAlign="center">
                  <Grid.Column textAlign="center" verticalAlign="middle">
                    <Header
                      className="my-account-card-title"
                      content="Current Total Points"
                      as="h2"
                    />
                    <Card.Content className="my-account-number">
                      {student.totalPoints}
                    </Card.Content>
                  </Grid.Column>

                  <Grid.Column>
                    <Header
                      className="my-account-card-title"
                      content="All Time Points"
                      as="h2"
                    />
                    <Card.Content className="my-account-number">
                      {student.allTimePoints}
                    </Card.Content>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Grid
                className="my-account-grid"
                columns="equal"
                divided
                inverted
                stackable
              >
                <Grid.Row textAlign="center">
                  <Grid.Column textAlign="center" verticalAlign="middle">
                    <Header
                      className="my-account-card-title"
                      content="Total Trophies"
                      as="h2"
                    />
                    <Card.Content
                      className="my-account-number"
                      content={student.totalTrophies}
                    />
                  </Grid.Column>

                  <Grid.Column textAlign="center" verticalAlign="middle">
                    <Header
                      className="my-account-card-title"
                      content="Marvin Moneybags"
                      as="h2"
                    />
                    <Card.Content
                      className="my-account-number"
                      content={student.marvinMoneybags}
                    />
                  </Grid.Column>

                  <Grid.Column textAlign="center" verticalAlign="middle">
                    <Header
                      className="my-account-card-title"
                      content="Stanley Swordington"
                      as="h2"
                    />
                    <Card.Content
                      className="my-account-number"
                      content={student.stanleySwordington}
                    />
                  </Grid.Column>

                  <Grid.Column textAlign="center" verticalAlign="middle">
                    <Header
                      className="my-account-card-title"
                      content="Bradley Bomberman"
                      as="h2"
                    />
                    <Card.Content
                      className="my-account-number"
                      content={student.bradleyBomberman}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </div>
          ))}
        </>
      )}
    </>
  );
}

export default MyAccount;
