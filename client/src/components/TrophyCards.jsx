import React from "react";
import { Card, Image, Button, Grid } from "semantic-ui-react";
import TrophyConfetti from "../utils/TrophyConfetti";
import { motion } from "framer-motion";

// Trophies
import moneyBag from "../images/trophies/money-bag.png";
import bomb from "../images/trophies/bomb.png";
import sword from "../images/trophies/sword.png";

const buttonVariants = {
  hover: {
    transition: {
      yoyo: Infinity,
    },
  },
};

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
      image: moneyBag,
      name: "Marvin Moneybags",
      className: "trophy-card-money",
      symbol: "a",
      description:
        "Marvin Moneybags allows you to chew gum in class for one week.",
      pointValue: "10",
      btnColor: "purple",
    },
    {
      id: 2,
      image: sword,
      name: "Stanley Swordington",
      className: "trophy-card-sword",
      symbol: "b",
      description:
        "Stanley Swordington allows you to pick from the class treasure chest.",
      pointValue: "20",
      btnColor: "blue",
    },
    {
      id: 3,
      image: bomb,
      name: "Bradley Bomberman",
      className: "trophy-card-bomb",
      symbol: "c",
      description:
        "Bradley Bomberman allows you to get rid of your lowest test score.",
      pointValue: "30",
      btnColor: "green",
    },
  ];

  return (
    <Grid className="trophy-card-grid" columns={3} stackable>
      <Grid.Row>
        {trophies.map((trophy) => (
          <Grid.Column>
            <motion.div
              // animate={{
              //   scale: 1,
              //   transition: {
              //     duration: 0.4,
              //     yoyo: Infinity,
              //   },
              // }}
              whileHover={{
                scale: 0.9,
                transition: {
                  duration: 0.4,
                  yoyo: Infinity,
                },
              }}
            >
              <Card
                raised
                className={trophy.className}
                centered
                key={trophy.id}
              >
                <Card.Content centered>
                  <Card.Header
                    className="trophy-card_header"
                    textAlign="center"
                  >
                    {trophy.name}
                  </Card.Header>
                  <Image
                    className="trophy-card-image"
                    src={trophy.image}
                    size="small"
                    centered
                  />
                  <Card.Meta className="trophy-card_meta" textAlign="center">
                    <span className="date">
                      Value: {trophy.pointValue} points
                    </span>
                  </Card.Meta>
                  <Card.Description
                    className="trophy-card-description"
                    textAlign="center"
                  >
                    {trophy.description}
                  </Card.Description>
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
                          return (
                            <li key={error.trophyName}>{error.message}</li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </Card.Content>
              </Card>
            </motion.div>
          </Grid.Column>
        ))}
      </Grid.Row>
    </Grid>
  );
}

export default TrophyCards;
