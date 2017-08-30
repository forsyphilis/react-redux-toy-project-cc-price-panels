

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

// const checkUserKey = (req, res, next)=>{
//     if(req.body.user_key !== undefined){
//         next();
//     }else{
//         res.status(500).send({ error: 'user_key is undefined' });
//     }
// };


app.post('/friend', (req, res) => {
    // const user_key = req.body.user_key;
    // console.log(`${user_key}님이 쳇팅방에 참가했습니다.`);

    res.set({
        'content-type': 'application/json'
    }).send(JSON.stringify({success: true}));
});

app.post('/message',(req,res) => {
    console.log(req.body)
    console.log("BODY!")

    const _obj = {
        // user_key: req.body.user_key,
        type: req.body.type,
        content: req.body.content
    };
    let massage = {
        "message": {
            "text": '응답 메세지...'
        },
        "keyboard": {
            "type": "buttons",
            "buttons": [
                "메뉴1",
                "메뉴2",
                "메뉴3"
            ]
        }
    };
    res.set({
        'content-type': 'application/json'
    }).send(JSON.stringify(massage));
})

app.get('/keyboard', (req, res) => {
    const menu = {
        type: 'text',
        buttons: ["메뉴1", "메뉴2", "메뉴3"]
    };

    res.set({
        'content-type': 'application/json'
    }).send(JSON.stringify(menu));
});

app.delete('/friend', (req, res) => {
    const user_key = req.body.user_key;
    console.log(`${user_key}님이 쳇팅방을 차단했습니다.`);

    res.set({
        'content-type': 'application/json'
    }).send(JSON.stringify({success: true}));
});


const server = app.listen(port, () => console.log(`Express listening on port:${port}`))