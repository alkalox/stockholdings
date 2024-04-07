import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {IndividualStockHoldingTypes} from '../apis/types';
import {bottomSummaryDataTransformer} from '../utils/dataTransformer';
import {indianCurrencySymbol} from '../consts/consts';

const BottomSummary = ({
  userStockHoldingsData,
}: {
  userStockHoldingsData: IndividualStockHoldingTypes[];
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const summaryOfHoldingsData = bottomSummaryDataTransformer(
    userStockHoldingsData,
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleExpanded} style={styles.arrowButton}>
        {expanded ? (
          <Text style={styles.arrow}>▼</Text>
        ) : (
          <Text style={styles.arrow}>▲</Text>
        )}
      </TouchableOpacity>
      {expanded && (
        <View style={styles.expandedContent}>
          <View style={styles.row}>
            <Text style={styles.textHeading}>Current Value:</Text>
            <Text>
              {indianCurrencySymbol} {summaryOfHoldingsData.currentValue}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.textHeading}>Total Investment:</Text>
            <Text>
              {indianCurrencySymbol} {summaryOfHoldingsData.totalInvestment}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.textHeading}>Today's Profit and Loss:</Text>
            <Text>
              {indianCurrencySymbol} {summaryOfHoldingsData.todaysPNL}
            </Text>
          </View>
        </View>
      )}
      <View style={styles.expandedContent}>
        <View style={styles.row}>
          <Text style={styles.textHeading}>Profit & Loss</Text>
          <Text>
            {indianCurrencySymbol} {summaryOfHoldingsData.totalPNL}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 20,
    paddingVertical: 2,
  },
  arrowButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    fontSize: 24,
    color: 'purple',
  },
  expandedContent: {
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  textHeading: {fontSize: 16, fontWeight: 'bold', color: '#1c1c1c'},
});

export default BottomSummary;
