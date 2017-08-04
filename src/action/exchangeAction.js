import axios from 'axios'

export function getPrice(exchange, currency){
    return (dispatch, getState) => {
        axios.get(exchange.api.transaction, {
            currency_pair:currency
        }).then((r) => {
            console.log(r.data)
        }).catch(err => {
            throw err
        })
    }
}