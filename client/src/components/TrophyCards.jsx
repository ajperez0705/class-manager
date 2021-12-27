import React from "react";
import { Card, Icon, Button } from "semantic-ui-react";

function TrophyCards({ buyTrophy }) {
  const trophies = [
    {
      id: 1,
      icon: "thumbs down outline",
      name: "Trophy A",
      symbol: "a",
      description: "Trophy A allows you to chew gum in class for one week.",
      pointValue: "10",
      btnColor: "purple",
    },
    {
      id: 2,
      icon: "thumbs down outline",
      name: "Trophy B",
      symbol: "b",
      description: "Trophy B allows you to pick from the class treasure chest.",
      pointValue: "20",
      btnColor: "blue",
    },
    {
      id: 3,
      icon: "thumbs down outline",
      name: "Trophy C",
      symbol: "c",
      description: "Trophy C allows you to get rid of your lowest test score.",
      pointValue: "30",
      btnColor: "green",
    },
  ];

  return (
    <div>
      {trophies.map((trophy) => (
        <Card key={trophy.id}>
          <Card.Content>
            <Icon name={trophy.icon} size="huge" />
            <Card.Header>{trophy.name}</Card.Header>
            <Card.Description>{trophy.description}</Card.Description>
            <Card.Meta>
              <span className="date">Value: {trophy.pointValue} points</span>
            </Card.Meta>
            <Button
              name={trophy.symbol}
              value={trophy.pointValue}
              color={trophy.btnColor}
              onClick={buyTrophy}
            >
              Purple
            </Button>
          </Card.Content>
        </Card>
      ))}
    </div>
  );
}

export default TrophyCards;
