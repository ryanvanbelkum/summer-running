import React from "react";
import { Dimmer, Loader, Segment } from "semantic-ui-react";

const AppLoader = () => {
  return (
    <Segment>
      <Dimmer active inverted page>
        <Loader size="large">Loading</Loader>
      </Dimmer>
    </Segment>
  );
};

export default AppLoader;
