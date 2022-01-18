import React, { Component } from "react";
import Reward from "react-rewards";
import { Button } from "semantic-ui-react";

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

export default class TrophyConfetti extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...defaults.confetti,
      purchaseTrophy: "purchaseTrophy",
    };
  }

  fakeRequest = (e) => {
    if (this.props.curStudent[0].totalPoints < this.props.value) {
      this.props.setErrors([
        {
          trophyName: e.target.name,
          message: "You do not have enough points to purchase this trophy",
        },
      ]);
      return;
    }

    this.props.setTrophyAnim(e.target.name);

    const { purchaseTrophy } = this.state;
    this.setState({
      fakingRequest: true,
    });
    setTimeout(() => {
      this.setState({ fakingRequest: false, success: true });
      purchaseTrophy === "purchaseTrophy"
        ? this.reward.rewardMe()
        : this.reward.punishMe();
    }, 1000);

    this.props.buyTrophy(e);
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
      // rewardPunish,
    } = this.state;
    // const disabled = rewardPunish === "punish";
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
        {this.props.trophyAnim === true || this.props.isTeacher === true ? (
          <Button className="trophy-card-button" disabled>
            Purchase
          </Button>
        ) : (
          <Button
            className="trophy-card-button"
            name={this.props.name}
            value={this.props.value}
            onClick={this.fakeRequest}
            loading={fakingRequest}
            icon={type ? "like" : "trophy"}
            size="large"
            color="standard"
          >
            Purchase
          </Button>
        )}
      </Reward>
    );
  }
}
