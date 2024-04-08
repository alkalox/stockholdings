import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Text,
} from 'react-native';

import Header from '../components/Header';
import IndividualStockView from '../components/IndividualStock';
import BottomSummary from '../components/BottomSummary';
import getUsersStockHoldings from '../apis/fetchHoldings';
import {IndividualStockHoldingTypes} from '../apis/types';

function StockHoldings(): React.JSX.Element {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [userStockHoldingsData, setUserStockHoldingsData] = useState<
    IndividualStockHoldingTypes[]
  >([]);

  const getAllStockHoldings = useCallback(async () => {
    setLoading(true);
    const stockHoldingData = await getUsersStockHoldings();
    if (stockHoldingData !== null && stockHoldingData.length > 0) {
      setLoading(false);
      setUserStockHoldingsData(stockHoldingData);
    } else if (stockHoldingData.length === 0) {
      setApiError(true);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // api call
    getAllStockHoldings();
  }, [getAllStockHoldings]);

  const renderStockItem = ({item}: {item: IndividualStockHoldingTypes}) => (
    <IndividualStockView
      symbol={item.symbol}
      quantity={item.quantity}
      lastTradedPrice={item.ltp}
      profitLoss={item.close}
    />
  );

  const retryApi = () => {
    getAllStockHoldings();
    setApiError(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingViewStyles}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (apiError) {
    return (
      <View style={styles.loadingViewStyles}>
        <Text>Error with the network request.</Text>
        <Text style={styles.blueText} onPress={retryApi}>
          Try again
        </Text>
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
        windowSize={5}
        initialNumToRender={15}
        maxToRenderPerBatch={20}
      />
      <BottomSummary userStockHoldingsData={userStockHoldingsData} />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingViewStyles: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  containerStyles: {flex: 1, backgroundColor: 'lightgrey'},
  blueText: {color: 'blue'},
});

export default StockHoldings;
