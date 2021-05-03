import React from "react";

class RankingTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ranking: [] };
  }

  componentDidMount() {
    fetch("http://localhost:8081/ranking/")
      .then(response => {
        response.json();
      })
      .then(ranking => {
        this.setState({ ranking });
      })
      .then(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.ranking.map(rank => (
            <p>
              <li> Username: {rank.username}</li>
              <li> Total Win: {rank.totalWin}</li>
            </p>
          ))}
        </ul>
      </div>
    );
  }
}

export default RankingTable;
