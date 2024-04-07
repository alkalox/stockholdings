import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import Header from './components/Header';
import IndividualStockView from './components/IndividualStock';
import getUsersStockHoldings from './apis/fetchHoldings';
import {IndividualStockHoldingTypes} from './apis/types';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const [loading, setLoading] = useState(true);
  const [userStockHoldings, setUserStockHoldings] = useState<
    IndividualStockHoldingTypes[]
  >([]);

  useEffect(() => {
    // api call
    getAllStockHoldings();
  }, []);

  const getAllStockHoldings = async () => {
    const stockHoldingData = await getUsersStockHoldings();
    if (stockHoldingData !== null && stockHoldingData.length > 0) {
      setLoading(false);
      setUserStockHoldings(stockHoldingData);
    }
  };

  const renderStockItem = ({item}: {item: IndividualStockHoldingTypes}) => (
    <IndividualStockView
      symbol={item.symbol}
      quantity={item.quantity}
      lastTradedPrice={item.ltp}
      profitLoss={item.close}
    />
  );

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Header title="Upstox Holdings" />
        <FlatList
          data={userStockHoldings}
          renderItem={renderStockItem}
          keyExtractor={item => item.symbol}
        />
      </ScrollView>
    </>
  );
}

export default App;
