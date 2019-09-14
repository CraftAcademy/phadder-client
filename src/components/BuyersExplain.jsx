import React, { useContext } from "react";
import { Container, Grid } from "semantic-ui-react";
import "../css/style.css";
import { I18nContext } from "../i18n/index";

const BuyersExplain = () => {
  const { translate } = useContext(I18nContext);
  return (
    <Container>
      <div id="selected-option">
        <div id="active-stroke"></div>
        <div id="inactive-stroke"></div>
      </div>
      <div id="buyers-bar">
        <h1>{translate("buyer-banner")}</h1>
      </div>

      <Grid>
        <Grid.Row>
          <Grid.Column width={8}>
            <div id="buyer1-logo" />
          </Grid.Column>
          <Grid.Column width={8} id="buyer-explain-div">
            <h1 id="buyer-explain-title">{translate("get_started")}</h1>
            <p>{translate("buyers_p1")}</p>
            <p>{translate("buyers_p2")}</p>
            <p>{translate("buyers_p3")}</p>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={8}>
            <div id="buyer2-logo" />
          </Grid.Column>
          <Grid.Column width={8} id="buyer-explain-div">
            <h1 id="buyer-explain-title">{translate("get_connected")}</h1>
            <p>{translate("buyers_p4")}</p>
            <p>{translate("buyers_p5")}</p>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={8}>
            <div id="buyer3-logo" />
          </Grid.Column>
          <Grid.Column width={8} id="buyer-explain-div">
            <h1 id="buyer-explain-title">{translate("job_done")}</h1>
            <p>{translate("buyers_p6")}</p>
            <p>{translate("buyers_p7")}</p>
            <p>{translate("buyers_p8")}</p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default BuyersExplain;
