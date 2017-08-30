

const express = require('express')
const morgan = require('morgan')
const cwd = require('cwd')
const app = express()
const http = require('http')
const request = require('request')
const _ = require('lodash')


let port = 3000


let korbit_ticker = {
    btc:{
    },
    eth:{

    },
    etc:{

    }
}

let bithumb_ticker = {

}


function korbit_ticker_btc() {
    request('https://api.korbit.co.kr/v1/ticker?currency_pair=btc_krw', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // console.log(body) // Print the google web page.
            korbit_ticker.btc = JSON.parse(body)
        }
    })
}

function korbit_ticker_eth() {
    request('https://api.korbit.co.kr/v1/ticker?currency_pair=eth_krw', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // console.log(body) // Print the google web page.
            korbit_ticker.eth = JSON.parse(body)

        }
    })
}

function korbit_ticker_etc() {
    request('https://api.korbit.co.kr/v1/ticker?currency_pair=etc_krw', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // console.log(body) // Print the google web page.
            korbit_ticker.etc = JSON.parse(body)

        }
    })
}
function run_korbit_ticker(){
    korbit_ticker_btc()
    korbit_ticker_etc()
    korbit_ticker_eth()
}

run_korbit_ticker()
setInterval(run_korbit_ticker, 3000)

function bithum_ticker_parse(data){

    return _.each(data, (d) => d.last = d.closing_price)
    // Object.keys(data).forEach(function (key) {
    //     data[key].last = data[key].closing_price;
    //     delete data[key].closing_price;
    // });
    // console.log(data);
    // return data
}

function bithumb_ticker_all(){
    request('https://api.bithumb.com/public/ticker/ALL', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // console.log(body) // Print the google web page.
            bithumb_ticker = bithum_ticker_parse(JSON.parse(body).data)
        }
    })
}


bithumb_ticker_all()
setInterval(bithumb_ticker_all, 3000)


let bittrex_ticker = {

}

function run_bittrex_ticker(){
    request('https://bittrex.com/api/v1.1/public/getmarketsummaries', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // console.log(body) // Print the google web page.
            bittrex_ticker = JSON.parse(body)
        }
    })
}


run_bittrex_ticker()
setInterval(run_bittrex_ticker, 3000)

// console.log(cwd())

app.use('/', express.static(cwd() + '/build/'))
app.use(morgan('combined'))

app.get('/bithumb/ticker', function(req,res){
    res.header('Access-Control-Allow-Origin', "*")
    // console.log(bithumb_ticker)
    res.send(bithumb_ticker)
})

app.get('/korbit/ticker', function(req,res){

    res.header('Access-Control-Allow-Origin', "*")
    res.send(korbit_ticker)
})

app.get('/bittrex/ticker', function(req,res){
    res.header('Access-Control-Allow-Origin', "*")
    res.send(bittrex_ticker)
})



const server = app.listen(port, () => console.log(`Express listening on port:${port}`))