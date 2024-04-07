import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
} from 'react-native';

import Header from './components/Header';
import IndividualStockView from './components/IndividualStock';

const data = [
  {
    id: '1',
    symbol: 'AAPL',
    quantity: 10,
    lastTradedPrice: 150,
    profitLoss: 500,
  },
  {
    id: '2',
    symbol: 'GOOGL',
    quantity: 5,
    lastTradedPrice: 2800,
    profitLoss: -200,
  },
  // Add more data as needed
];

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const renderStockItem = ({item}) => (
    <IndividualStockView
      symbol={item.symbol}
      quantity={item.quantity}
      lastTradedPrice={item.lastTradedPrice}
      profitLoss={item.profitLoss}
    />
  );

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Header title="Upstox Holdings" />
        <FlatList
          data={data}
          renderItem={renderStockItem}
          keyExtractor={item => item.id}
        />
      </ScrollView>
    </>
  );
}

export default App;
