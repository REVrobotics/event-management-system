import * as React from "react";
import Event from "../../shared/models/Event";
import SponsorScreen from "./sponsor/SponsorScreen";

import "./EnergyImpact.css";
import MatchPreviewScreen from "./match-preview/MatchPreviewScreen";
import MatchResultsScreen from "./match-results/MatchResultsScreen";
import MatchPlayScreen from "./match-play/MatchPlayScreen";
import Team from "../../shared/models/Team";
import Match from "../../shared/models/Match";

interface IProps {
  event: Event,
  teams: Team[],
  videoID: number,
  match: Match
}

class EnergyImpact extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    const {videoID, match} = this.props;

    let view;
    switch (videoID) {
      case 0:
        view = <SponsorScreen/>;
        break;
      case 1:
        view = <MatchPreviewScreen match={match}/>;
        break;
      case 2:
        view = <MatchPlayScreen match={match}/>;
        break;
      case 3:
        view = <MatchResultsScreen/>;
        break;
      case 4:
        view = <span/>; // Blank screen
        break;
      default:
        view = <SponsorScreen/>;
    }

    return (view);
  }
}

export default EnergyImpact;