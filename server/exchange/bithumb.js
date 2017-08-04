const request = require('request')

function bithumb_ticker_all(){
    request('https://api.bithumb.com/public/ticker/ALL', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body) // Print the google web page.
            korbit_ticker.btc = JSON.parse(body)
        }
    })
}