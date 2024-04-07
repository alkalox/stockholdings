import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import Header from './components/Header';
import IndividualStockView from './components/IndividualStock';
import BottomSummary from './components/BottomSummary';
import getUsersStockHoldings from './apis/fetchHoldings';
import {IndividualStockHoldingTypes} from './apis/types';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const [loading, setLoading] = useState(true);
  const [userStockHoldingsData, setUserStockHoldingsData] = useState<
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
      setUserStockHoldingsData(stockHoldingData);
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
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{flex: 1, backgroundColor: 'lightgrey'}}>
        <Header title="Upstox Holdings" />
        <FlatList
          data={userStockHoldingsData}
          renderItem={renderStockItem}
          keyExtractor={item => item.symbol}
        />
        <BottomSummary userStockHoldingsData={userStockHoldingsData} />
      </ScrollView>
    </>
  );
}

export default App;
