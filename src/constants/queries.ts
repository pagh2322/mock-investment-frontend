const QUERY_KEYS = {
  STOCK_PRICES: 'stock-prices',
  OWN_STOCKS: 'own-stocks',
  STOCK_PRICE_CANDLES: 'stock-price-candles',
  STOCK_ORDER_HISTORIES: 'stock-order-histories',
  COMMENTS: 'comments',
  CURRENT_BALANCE: 'current-balance',
  STOCK_TICKER: 'stock-ticker',
  SEARCHED_STOCK_TICKERS: 'searched-stock-tickers',
  SIMULATION_DATE: 'simulation-date',
  STOCK_VALUES_RANKING: 'stock-values-ranking',
  STOCK_VALUES: 'stock-values',
  LIKED_STOCK_PRICES: 'liked-stock-prices',
  OWN_STOCK_TOTAL_VALUE: 'own-stock-total-value',
};

export default QUERY_KEYS;

export const MUTATION_KEYS = {
  CREATE_STOCK_ORDER: 'create-stock-order',
  TOGGLE_STOCK_TICKER_LIKE: 'toggle-stock-ticker-like',
  CREATE_COMMENT: 'create-comment',
  CREATE_REPLY: 'create-reply',
  PROCEED_SIMULATION_DATE: 'proceed-simulation-date',
  RESTART_SIMULATION: 'restart-simulation',
  CREATE_COMMENT_REPORT: 'create-comment-report',
  UPDATE_NICKNAME: 'update-nickname',
  TOGGLE_COMMENT_LIKE: 'toggle-comment-like',
  CANCEL_STOCK_ORDER: 'cancel-stock-order',
};