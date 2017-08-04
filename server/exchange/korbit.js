const request = require('request')


function korbit_ticker_btc() {
    request('https://api.korbit.co.kr/v1/ticker?currency_pair=btc_krw', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body) // Print the google web page.
            korbit_ticker.btc = JSON.parse(body)
        }
    })
}

function korbit_ticker_eth() {
    request('https://api.korbit.co.kr/v1/ticker?currency_pair=eth_krw', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body) // Print the google web page.
            korbit_ticker.eth = JSON.parse(body)

        }
    })
}

function korbit_ticker_etc() {
    request('https://api.korbit.co.kr/v1/ticker?currency_pair=etc_krw', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body) // Print the google web page.
            korbit_ticker.etc = JSON.parse(body)

        }
    })
}
export function run_korbit_ticker(){
    korbit_ticker_btc()
    korbit_ticker_etc()
    korbit_ticker_eth()
}

