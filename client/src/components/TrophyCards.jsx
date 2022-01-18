import React from "react";
import { Card, Image, Grid } from "semantic-ui-react";
import TrophyConfetti from "../utils/TrophyConfetti";
import { motion } from "framer-motion";
import { trophies } from "../utils/trophyArray";

function TrophyCards({
  buyTrophy,
  curStudent,
  errors,
  setErrors,
  setTrophyAnim,
  trophyAnim,
  isTeacher,
}) {
  return (
    <Grid className="trophy-card-grid" columns={3} stackable>
      <Grid.Row>
        {trophies.map((trophy) => (
          <Grid.Column key={trophy.id}>
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
              <Card raised className={trophy.className} centered>
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
                    isTeacher={isTeacher}
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
