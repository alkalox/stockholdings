import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {indianCurrencySymbol} from '../consts/consts';

type IndividualStockViewProps = {
  symbol: string;
  quantity: number;
  lastTradedPrice: number;
  profitLoss: number;
};

const IndividualStockView = ({
  symbol,
  quantity,
  lastTradedPrice,
  profitLoss,
}: IndividualStockViewProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        <Text style={styles.symbol}>{symbol}</Text>
        <Text style={styles.text}>{quantity}</Text>
      </View>
      <View style={styles.rightContent}>
        <Text style={styles.text}>
          LTP:{' '}
          <Text style={styles.ltpTextStyle}>
            {indianCurrencySymbol} {lastTradedPrice}
          </Text>
        </Text>
        <Text style={styles.text}>
          P/L: {indianCurrencySymbol} {profitLoss}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: 'white',
  },
  leftContent: {
    flex: 1,
  },
  rightContent: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 16,
  },
  symbol: {
    fontSize: 16,
    marginBottom: 2,
    fontWeight: 'bold',
    color: '#000',
  },
  text: {
    fontSize: 16,
    marginBottom: 2,
    color: '#1c1c1c',
    fontWeight: 'normal',
  },
  ltpTextStyle: {fontWeight: 'bold', color: '#000'},
});

export default IndividualStockView;
