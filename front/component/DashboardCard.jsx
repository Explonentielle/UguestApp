import * as React from 'react';
import {Card as RNPaperCard, Text} from 'react-native-paper';

const DashboardCard = props => (
  <RNPaperCard style={props.style} onPress={props.onPress}>
    <RNPaperCard.Content>
      <Text style={{fontSize: 16, fontWeight: 'bold'}} variant="titleLarge">
        {props.content}
      </Text>
      {props.children}
    </RNPaperCard.Content>
  </RNPaperCard>
);

export default DashboardCard;
