import React, {useState, useEffect} from 'react';
import {View, FlatList, ActivityIndicator, StyleSheet} from 'react-native';

import Header from '../components/Header';
import IndividualStockView from '../components/IndividualStock';
import BottomSummary from '../components/BottomSummary';
import getUsersStockHoldings from '../apis/fetchHoldings';
import {IndividualStockHoldingTypes} from '../apis/types';

function StockHoldings(): React.JSX.Element {
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
      <View style={styles.loadingViewStyles}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.containerStyles}>
      <Header title="Upstox Holding" />
      <FlatList
        data={userStockHoldingsData}
        renderItem={renderStockItem}
        keyExtractor={item => item.symbol}
      />
      <BottomSummary userStockHoldingsData={userStockHoldingsData} />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingViewStyles: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  containerStyles: {flex: 1, backgroundColor: 'lightgrey'},
});

export default StockHoldings;
