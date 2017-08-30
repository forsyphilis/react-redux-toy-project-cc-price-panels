import React, {Component} from 'react'

export class PricePanel extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        return true;
    }

    componentDidMount() {
    }
    componentWillReceiveProps(nextProps, prevProps){

        if(nextProps.price !== this.props.price){
            if(parseFloat(nextProps.price,10) > parseFloat(this.props.price,10)){
                this.setState({compare:'up-price'})
            }
            else if (parseFloat(nextProps.price,10) < parseFloat(this.props.price,10)){
                this.setState({compare:'down-price'})
            }
            else{
                this.setState({compare:'same-price'})
            }
        }


    }
    setCompare(compare){
            this.setState((prevState, props) => (
                {
                compare:compare
            }
            ))
    }

    render(){
        return(
        <span className={this.state.compare }>
         {`${this.props.name} Last: ${this.props.price}` }
        </span>
        )
    }
}