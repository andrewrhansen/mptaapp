import React, { Component } from "react";
import Axios from "axios";
import TransitBoard from "./transitBoard";

class App extends Component {
  state = { routes: undefined, schedule: undefined };

  makeApiCalls = () => {
    // var routesData;
    // var scheduleData;

    // let promiseRoutes = Axios.get(
    //   `https://api-v3.mbta.com/routes?filter%5Bstop%5D=place-north`
    // ).then((response) => {
    //   routesData = response;
    // });

    // let promiseSchedule = Axios.get(
    //   `https://api-v3.mbta.com/schedules?filter%5Bmin_time%5D=14%3A00&filter%5Bmax_time%5D=14%3A30&filter%5Bstop%5D=place-north`
    // ).then((response) => {
    //   scheduleData = response;
    // });

    // Promise.all([promiseRoutes, promiseSchedule]).then(
    //   this.setState({ routes: routesData, schedule: scheduleData }),
    //   console.log(this.state.routes),
    //   console.log(this.state.schedule)
    // );

    var routeResponse;
    var scheduleResponse;
    Axios.get(`https://api-v3.mbta.com/routes?filter%5Bstop%5D=place-north`)
      .then((response) => {
        routeResponse = response.data.data;
        console.log(routeResponse);
      })
      .then(
        Axios.get(
          `https://api-v3.mbta.com/schedules?filter%5Bmin_time%5D=14%3A00&filter%5Bmax_time%5D=14%3A30&filter%5Bstop%5D=place-north`
        ).then((response) => {
          scheduleResponse = response.data.data;
          console.log(scheduleResponse);
        })
      )
      .then(
        this.setState({
          routes: routeResponse,
          schedule: scheduleResponse,
        }),
        console.log("state: ", this.state.schedule),
        console.log("state: ", this.state.routes)
      );
  };

  render() {
    return (
      <div>
        <h1>MBTA Status Board</h1>
        <button onClick={() => this.makeApiCalls()}>Get Status</button>
        <TransitBoard
          routes={this.state.routes}
          schedule={this.state.schedule}
        />
      </div>
    );
  }
}

export default App;
