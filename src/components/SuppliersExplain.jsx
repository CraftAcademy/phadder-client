import React, { useContext } from "react";
import { Container, Grid } from "semantic-ui-react";
import "../css/style.css";
import { I18nContext } from "../i18n/index";

const SuppliersExplain = () => {
  const { translate } = useContext(I18nContext);
  return (
    <Container>
      <div id="selected-option">
        <div id="inactive-stroke"></div>
        <div id="active-stroke"></div>
      </div>
      <div id="suppliers-bar">
        <h1>{translate("supplier-banner")}</h1>
      </div>

      <Grid>
        <Grid.Row>
          <Grid.Column id="suppliers-explain-div" width={8}>
            <h1 id="suppliers-pre-title">
              {translate("create_supplier_account")}
            </h1>
            <h1 id="suppliers-title">{translate("join_the_elite")}</h1>
            <p>{translate("suppliers_p1")}</p>
            <p>{translate("suppliers_p2")}</p>
            <p>{translate("suppliers_p3")}</p>
          </Grid.Column>
          <Grid.Column width={8}>
            <div id="supplier1-logo" />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={8}>
            <div id="supplier2-logo" />
          </Grid.Column>
          <Grid.Column width={8} id="suppliers-explain-div">
            <h1 id="suppliers-pre-title">{translate("trust")}</h1>
            <h1 id="suppliers-title">{translate("reputation")}</h1>
            <p>{translate("suppliers_p4")}</p>
            <p>{translate("suppliers_p5")}</p>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={8} id="suppliers-explain-div">
            <h1 id="suppliers-pre-title">{translate("sales_channel")}</h1>
            <h1 id="suppliers-title">{translate("advantage")}</h1>
            <p>{translate("suppliers_p6")}</p>
          </Grid.Column>
          <Grid.Column width={8}>
            <div id="supplier3-logo" />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default SuppliersExplain;
