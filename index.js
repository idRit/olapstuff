const fetch = require('node-fetch');

async function getAlltransactions() {
    let res = await (await fetch("https://raw.githubusercontent.com/idRit/olapstuff/master/transactions.json")).json();

    let logArr = [];
    let dataItemA = getRandomInt(1000);
    let dataItemAHistory = [];
    dataItemAHistory.push(dataItemA);
    let newDataItem = dataItemA;
    res.forEach(el => {
        let log = "";
        if (el.status === "start") {
            log = "<" + el.name + ", " + "start>";
        }
        else if (el.status === "commited") {
            log = "<" + el.name + ", " + "commit>";
        }
        else if (el.operation.startsWith("read")) {
            log = "<" + el.name + ", " + el.data + ", " + dataItemA + ", " + newDataItem + ">";
        }
        else if (el.status === "") {
            if (el.operation.startsWith("add")) {
                newDataItem += getNum(el.operation);
                dataItemAHistory.push(newDataItem);
            }
            else {
                newDataItem -= getNum(el.operation);
                dataItemAHistory.push(newDataItem);
            }
            log = "<" + el.name + ", " + el.data + ", " + dataItemA + ", " + newDataItem + ">";
            dataItemA = newDataItem;
        }
        else if (el.status === "pc") {
            log = "<" + el.name + ", " + "write>";
        }
        logArr.push(log);
    });
    let logs = logArr;
    console.log(logs);

    logArr.reverse()

    let transactionsUndone = [];
    let transactionsRedone = [];
    logArr.forEach((el, i) => {
        if (el.split(', ')[1].startsWith("commit")) {
            transactionsRedone.push(el.split(',')[0].split('<')[1]);
        } else if (el.split(', ')[1].startsWith("start") && !transactionsRedone.includes(el.split(',')[0].split('<')[1])){
            transactionsUndone.push(el.split(',')[0].split('<')[1]);
        }
    });

    transactionsRedone.filter(( t={}, a=> !(t[a]=a in t) ));
    transactionsUndone.filter(( t={}, a=> !(t[a]=a in t) ));

    console.log("Transactions redone: " + transactionsRedone);
    console.log("Transactions undone: " + transactionsUndone);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getNum(str) {
    return parseInt(str.match(/(\d+)/));
}

getAlltransactions();