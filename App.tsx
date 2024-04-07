import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import StockHoldings from './screens/StockHoldings';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <StockHoldings />
    </>
  );
}

export default App;
