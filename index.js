const fetch = require('node-fetch');

async function getAlltransactions() {
    let res = await (await fetch("https://raw.githubusercontent.com/idRit/olapstuff/master/transactions.json")).json();
    console.log(res);
    let commitedTransactions = [];
    res.reverse();
    let firstTransactionName = res[0].name;
    res.forEach((el, i) => {
        if (i !== 0) {
            
            commitedTransactions.push(el.name);

        }
    });

}

getAlltransactions();