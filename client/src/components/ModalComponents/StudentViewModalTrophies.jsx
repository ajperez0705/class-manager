import React from "react";
import { Card, Feed } from "semantic-ui-react";
import { trophies } from "../../utils/trophyArray";

function StudentViewModalTrophies({ student }) {
  return (
    <>
      <Card>
        <Feed size="large">
          <Feed.Event>
            <Feed.Label className="trophy-label" image={trophies[0].image} />
            <Feed.Content>
              <Feed.Date content={`x${student.marvinMoneybags}`} />
              <Feed.Summary>{trophies[0].name}</Feed.Summary>
            </Feed.Content>
          </Feed.Event>
        </Feed>
      </Card>
      <Card>
        <Feed size="large">
          <Feed.Event>
            <Feed.Label className="trophy-label" image={trophies[1].image} />
            <Feed.Content>
              <Feed.Date content={`x${student.stanleySwordington}`} />
              <Feed.Summary>{trophies[1].name}</Feed.Summary>
            </Feed.Content>
          </Feed.Event>
        </Feed>
      </Card>
      <Card>
        <Feed size="large">
          <Feed.Event>
            <Feed.Label className="trophy-label" image={trophies[2].image} />
            <Feed.Content>
              <Feed.Date content={`x${student.bradleyBomberman}`} />
              <Feed.Summary>{trophies[2].name}</Feed.Summary>
            </Feed.Content>
          </Feed.Event>
        </Feed>
      </Card>
    </>
  );
}

export default StudentViewModalTrophies;
