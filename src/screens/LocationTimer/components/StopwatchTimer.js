import React, {useEffect, useState} from 'react';

import {duration as momentDuration, now as momentNow} from 'moment';
import {View} from 'react-native';
import {Text} from 'react-native-paper';

export default function StopwatchTimer({start = 0}) {
  const [now, setNow] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(momentNow());
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <View>
      <Timer interval={now - start} />
    </View>
  );
}

function Timer({interval}) {
  const pad = (n) => (n < 10 ? '0' + n : n);
  const duration = momentDuration(interval);
  return (
    <View style={styles.timerContainer}>
      <Text style={styles.timerText}>{pad(duration.hours())}:</Text>
      <Text style={styles.timerText}>{pad(duration.minutes())}:</Text>
      <Text style={styles.timerText}>{pad(duration.seconds())}</Text>
    </View>
  );
}

const styles = {
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  timerText: {
    fontSize: 42,
    fontWeight: '600',
  },
};
