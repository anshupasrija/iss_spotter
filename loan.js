let creditLimit = 5000;


/*
 * Input: number of dollars to loan out
 * Returns: Promise of loan which may or may not fulfill, based on remaining credit.
 * If creditLimit is less than the requested amount, only the remaining limit is loaned out,
    otherwise the full amount is loaned out. If $0 remain in the limit, the loan request is rejected (error!).
 */
const loanOut = function (amount) {

  return new Promise((resolve, reject) => {

    if (creditLimit > 0 && creditLimit < amount) {
      amount = creditLimit;
      creditLimit -= amount;
      resolve(amount);
    }
    else if (creditLimit >= amount) {
      creditLimit -= amount;
      resolve(amount);
    }
    else {
      reject(`"Insufficient funds".`)
    }
  });
};


console.log("Asking for $150, which should be okay ...");
loanOut(5150)
  .then((amountRecived) => {
    console.log(`\t-> I got $${amountRecived} loan from the bank! Remaining credit limit: $${creditLimit}`);
  })
  .catch((err) => {
    console.log(`\t-> Error: ${err}!`);
  })