import React from "react";
import { Card, Icon, Button, Grid } from "semantic-ui-react";
import TrophyConfetti from "../utils/TrophyConfetti";

function TrophyCards({
  buyTrophy,
  curStudent,
  pointAnim,
  setPointAnim,
  errors,
  setErrors,
  setTrophyAnim,
  trophyAnim,
}) {
  const trophies = [
    {
      id: 1,
      icon: "thumbs down outline",
      name: "Marvin Moneybags",
      symbol: "a",
      description:
        "Marvin Moneybags allows you to chew gum in class for one week.",
      pointValue: "10",
      btnColor: "purple",
    },
    {
      id: 2,
      icon: "thumbs down outline",
      name: "Stanley Swordington",
      symbol: "b",
      description:
        "Stanley Swordington allows you to pick from the class treasure chest.",
      pointValue: "20",
      btnColor: "blue",
    },
    {
      id: 3,
      icon: "thumbs down outline",
      name: "Bradley Bomberman",
      symbol: "c",
      description:
        "Bradley Bomberman allows you to get rid of your lowest test score.",
      pointValue: "30",
      btnColor: "green",
    },
  ];

  return (
    <Grid columns={3}>
      <Grid.Row>
        {trophies.map((trophy) => (
          <Grid.Column>
            <Card key={trophy.id}>
              <Card.Content>
                <Icon name={trophy.icon} size="huge" />
                <Card.Header>{trophy.name}</Card.Header>
                <Card.Description>{trophy.description}</Card.Description>
                <Card.Meta>
                  <span className="date">
                    Value: {trophy.pointValue} points
                  </span>
                </Card.Meta>
                {/* <Button
                  name={trophy.symbol}
                  value={trophy.pointValue}
                  color={trophy.btnColor}
                  onClick={buyTrophy}
                >
                  Purple
                </Button> */}
                <TrophyConfetti
                  name={trophy.symbol}
                  value={trophy.pointValue}
                  buyTrophy={buyTrophy}
                  curStudent={curStudent}
                  icon="thumbs up outline"
                  message="Helping Others"
                  setErrors={setErrors}
                  setTrophyAnim={setTrophyAnim}
                  trophyAnim={trophyAnim}
                />
                {errors.length > 0 && errors[0].trophyName === trophy.symbol && (
                  <div className="ui error message">
                    <ul className="list">
                      {errors.map((error) => {
                        return <li key={error.trophyName}>{error.message}</li>;
                      })}
                    </ul>
                  </div>
                )}
              </Card.Content>
            </Card>
          </Grid.Column>
        ))}
      </Grid.Row>
    </Grid>
  );
}

export default TrophyCards;
