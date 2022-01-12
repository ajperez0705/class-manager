import React, { Component } from "react";
import Reward from "react-rewards";
import {
  Button,
  Header,
  Image,
  Modal,
  Card,
  Icon,
  Form,
} from "semantic-ui-react";

const defaults = {
  confetti: {
    type: "confetti",
    fakingRequest: false,
    angle: 90,
    decay: 0.91,
    spread: 45,
    startVelocity: 35,
    elementCount: 40,
    elementSize: 8,
    lifetime: 200,
    zIndex: 10,
    springAnimation: true,
  },
  emoji: {
    type: "emoji",
    fakingRequest: false,
    angle: 90,
    decay: 0.91,
    spread: 100,
    startVelocity: 20,
    elementCount: 15,
    elementSize: 20,
    lifetime: 200,
    zIndex: 10,
    springAnimation: true,
  },
  memphis: {
    type: "memphis",
    fakingRequest: false,
    lifetime: 200,
    zIndex: 10,
    springAnimation: true,
  },
};

export default class PointsConfetti extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...defaults.confetti,
      rewardPunish: "reward",
    };
  }

  fakeRequest = () => {
    if (this.props.numPoints === 0) {
      if (this.props.feedBack === "positive") {
        this.props.setErrors(
          "Please select how many points you would like this student to receive."
        );
        return;
      }
    } else {
      this.props.setErrors(null);

      const { rewardPunish } = this.state;
      this.setState({
        fakingRequest: true,
      });
      //setTimeout(() => {
      this.setState({ fakingRequest: false, success: true });
      rewardPunish === "reward"
        ? this.reward.rewardMe()
        : this.reward.punishMe();
      //}, 1500);

      this.props.updatePoints(
        this.props.positive,
        this.props.student,
        this.props.numPoints
      );
    }
  };

  render() {
    const {
      type,
      fakingRequest,
      lifetime,
      angle,
      decay,
      spread,
      startVelocity,
      elementCount,
      elementSize,
      zIndex,
      springAnimation,
      rewardPunish,
    } = this.state;
    const disabled = rewardPunish === "punish";
    return (
      <Reward
        ref={(ref) => {
          this.reward = ref;
        }}
        type={type}
        config={{
          lifetime,
          angle,
          decay,
          spread,
          startVelocity,
          elementCount,
          elementSize,
          zIndex,
          springAnimation,
        }}
      >
        <Card.Group className="modal_feedback-cards">
          {this.props.positiveCards.map((pointCard) => (
            <Card
              key={pointCard.id}
              onClick={this.fakeRequest}
              loading={fakingRequest}
            >
              <Card.Content textAlign={"center"}>
                <Image src={pointCard.image} size="small" />
              </Card.Content>
              <Card.Content>
                <Card.Header textAlign="center">{pointCard.name}</Card.Header>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </Reward>
    );
  }
}
