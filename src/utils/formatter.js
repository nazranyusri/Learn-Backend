export function formatAccountData(account) {
  return {
    accountId: account.id,
    accountName: account.name,
    accountType: account.account_type,
    openingBalance: account.opening_balance,
    updateAtDate: account.updated_at,
    isSavingsAccount: account.is_savings_account,
  };
}

export function formatAddAccountData(account) {
  return {
    accountName: account.name,
  };
}
