const fetch = require('node-fetch');

async function getAlltransactions() {
    let res = await (await fetch("https://raw.githubusercontent.com/idRit/olapstuff/master/transactions.json")).json();
    console.log(res);
    let logArr = [];
    let context = [];
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
        }
        else if (el.status === "pc") {
            log = "<" + el.name + ", " + "write>";
        }
        logArr.push(log);
    });
    console.log(logArr);//.reverse());
    // res.forEach((el, i) => {
    //     if (el.name === elInit.name && el.operation === "commited") {
    //         redo(el, context);
    //     }    
    // });
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getNum(str) {
    return parseInt(str.match(/(\d+)/));
}

getAlltransactions();