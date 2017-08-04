import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import Exchange from '../components/Exchange';

import * as exchangeActions from '../action/exchangeAction'

class ExchangeHome extends Component {
    componentDidMount() {
        // this.timer = setInterval(() => this.getPrice(), 5000)
    }
    componentDidUnMount(){
        // clearTimeout(this.timer)
    }
    render() {
        const { exchanges } = this.props;
        return (
            <Row type="flex" justify="start">
                {
                    exchanges ? exchanges.map((exchange) => (
                            <Col span={12}>
                                <Exchange key={exchange.name} exchange={exchange} />
                            </Col>
                        )
                    ) : 'Empty Exchanges'
                }
            </Row>
        );
    }
}


function mapStateToProps(state) {
    return {
        exchanges: state.env.exchanges
    };
}


export default connect(mapStateToProps)(ExchangeHome);
