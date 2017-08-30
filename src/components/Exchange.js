import React, { Component } from 'react';
import { Row, Col, Card } from 'antd';

import axios from 'axios'

import _ from 'lodash';
import {PricePanel} from "./PricePanel";


function calcBittrexPriceChange(market){
    let last = market.Last;
    let prev = market.PrevDay

    return parseFloat((last/prev * 100.0) - 100.0).toFixed(4)
}

function tickerParse(exchange, data) {
    switch(exchange.name){
        case 'coinone' : {
            return _.each(data, (d) => d)
        }
        case 'bithumb' : {
            return {
                btc:{
                    last:data['BTC'].last,
                    change:''
                },
                eth:{
                    last:data['ETH'].last,
                    change:''
                },
                etc:{
                    last:data['ETC'].last,
                    change:''
                },
                dash:{
                    last:data['DASH'].last,
                    change:''
                }
            }
        }
        case 'poloniex': {
            return {
                btc:{
                    last:parseFloat(data['USDT_BTC'].last).toFixed(4),
                    change:''
                },
                eth:{
                    last:parseFloat(data['USDT_ETH'].last).toFixed(4),
                    change:''
                },
                etc:{
                    last:parseFloat(data['USDT_ETC'].last).toFixed(4),
                    change:''
                },
                dash:{
                    last:parseFloat(data['USDT_DASH'].last).toFixed(4),
                    change:''
                }
            }
        }
        case 'bittrex':{
            let result = data.result
            let r = {
                btc:{
                    last: _.find(result, {'MarketName':'USDT-BTC'}).Last.toFixed(4),
                    change: calcBittrexPriceChange(_.find(result, {'MarketName':'USDT-BTC'}))
                },
                eth:{
                    last: _.find(result, {'MarketName':'USDT-ETH'}).Last.toFixed(4),
                    change: calcBittrexPriceChange(_.find(result, {'MarketName':'USDT-ETH'}))
                },
                etc:{
                    last: _.find(result, {'MarketName':'USDT-ETC'}).Last.toFixed(4),
                    change: calcBittrexPriceChange(_.find(result, {'MarketName':'USDT-ETC'}))

                },
                dash:{
                    last: _.find(result, {'MarketName':'USDT-DASH'}).Last.toFixed(4),
                    change: calcBittrexPriceChange(_.find(result, {'MarketName':'USDT-DASH'}))

                },
                bat:{
                    last: _.find(result, {'MarketName':'BTC-BAT'}).Last.toFixed(8),
                    change: calcBittrexPriceChange(_.find(result, {'MarketName':'BTC-BAT'}))
                },
                omg:{
                    last: _.find(result, {'MarketName':'BTC-OMG'}).Last.toFixed(8),
                    change: calcBittrexPriceChange(_.find(result, {'MarketName':'BTC-OMG'}))

                },
                snt:{
                    last: _.find(result, {'MarketName':'BTC-SNT'}).Last.toFixed(8),
                    change: calcBittrexPriceChange(_.find(result, {'MarketName':'BTC-SNT'}))

                },
                eth_bat:{
                    last: _.find(result, {'MarketName':'ETH-BAT'}).Last.toFixed(8),
                    change: calcBittrexPriceChange(_.find(result, {'MarketName':'ETH-BAT'}))

                },
                eth_omg:{
                    last: _.find(result, {'MarketName':'ETH-OMG'}).Last.toFixed(8),
                    change: calcBittrexPriceChange(_.find(result, {'MarketName':'ETH-OMG'}))

                },
                eth_snt:{
                    last: _.find(result, {'MarketName':'ETH-SNT'}).Last.toFixed(8),
                    change: calcBittrexPriceChange(_.find(result, {'MarketName':'ETH-SNT'}))

                }
            }
            return r;

        }
        default :
            return data
    }
}


export default class Exchange extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isFetching:false
        }
    }
    async getPrice() {
        // console.log(this.props.exchange.orderbook)

        // this.setState({
        //     isFetching:true
        // })
        this.setIsFetching(true)

        axios.get(this.props.exchange.api.ticker, {
        })
            .then((r) => {
                if (r.status !== 200) {
                    throw new Error();
                }
                return r.data;
            })
            .then((data) =>{

                    // console.log(data);
                this.setTicker(tickerParse(this.props.exchange, data))
                        // isFetching:false
                this.setIsFetching(false)
                }
            )
            .catch(error => {
                console.log(error);
            })


    }
    setTicker = (tickerData) => {
        this.setState((prevState, props) => (

                {
                    ticker:tickerData
                }
            )
        )
    }
    setIsFetching = (isFetching) => {
        this.setState({isFetching:isFetching})
    }
    componentDidMount() {
        this.getPrice();
        this.timer = setInterval(() => this.getPrice(), 10000)

    }
  render() {
    const { exchange } = this.props;
    return (
      <Card title={exchange ? exchange.name.toUpperCase() : 'Empty'} extra={<a href="#">More</a>}
            style={{ color: 'black' ,background:this.state.isFetching ? '#dddddd' : 'white'}}>
        <p><PricePanel
            name="BTC"
            price={this.state.ticker ? this.state.ticker.btc.last : "???"}/></p>
        <p><PricePanel
            name="ETH"
            price={this.state.ticker ? this.state.ticker.eth.last : "???"}/></p>
        <p><PricePanel
            name="ETC"
            price={this.state.ticker ? this.state.ticker.etc.last : "???"}/></p>
        <p><PricePanel
            name="DASH"
            price={this.state.ticker && this.state.ticker.dash ? this.state.ticker.dash.last : "???"}/></p>
          {this.props.exchange.name === 'bittrex' && this.state.ticker ? <p>BTC-BAT Last: { this.state.ticker.bat.last } Change: {this.state.ticker.bat.change}%</p> : <span/> }
          {this.props.exchange.name === 'bittrex' && this.state.ticker ? <p>ETH-BAT Last: { this.state.ticker.eth_bat.last } Change: {this.state.ticker.eth_bat.change}%</p> : <span/> }
          {this.props.exchange.name === 'bittrex' && this.state.ticker ? <p>BTC-SNT Last: { this.state.ticker.snt.last } Change: {this.state.ticker.snt.change}%</p> : <span/> }
          {this.props.exchange.name === 'bittrex' && this.state.ticker ? <p>ETH-SNT Last: { this.state.ticker.eth_snt.last } Change: {this.state.ticker.eth_snt.change}%</p> : <span/> }
          {this.props.exchange.name === 'bittrex' && this.state.ticker ? <p>BTC-OMG Last: { this.state.ticker.omg.last } Change: {this.state.ticker.omg.change}%</p> : <span/> }
          {this.props.exchange.name === 'bittrex' && this.state.ticker ? <p>ETH-OMG Last: { this.state.ticker.eth_omg.last } Change: {this.state.ticker.eth_omg.change}%</p> : <span/> }



      </Card>
    );
  }
}

