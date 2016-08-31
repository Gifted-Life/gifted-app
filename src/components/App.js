import styles from './App.css';
import React, { Component } from 'react';
import EventContainer from '../containers/EventContainer/EventContainer';

const dummyData = {
  matchInfo: {
    matchName: 'jerrymao',
    matchId: '123abc',
    matchPicture: '',
  },
  eventInfo: {
    eventName: 'it will be ok',
    location: {
      name: 'my crib',
      address: '6345 n muscatel ave',
      city: 'san gabriel',
      state: 'CA',
      zip: '91775',
    },
    timeAndDate: {
      startTime: '530',
      endTime: '640',
    },
    peopleGoing: [
      'just me',
      'and no one else',
    ],
    price: {
      low: 20,
      high: 30,
    },
    comments: 'bring ur party pants',
  },
}

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        Hello World!!
        <EventContainer
          matchInfo={dummyData.matchInfo}
          eventInfo={dummyData.eventInfo}
        />
      </div>
    );
  }
}

export default App;
