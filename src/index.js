import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class HandlerAction extends React.Component {
    constructor(...args){
        super(...args);

        this.state = {
            active: false
        };

        this._onRouteChange = this._onRouteChange.bind(this);
    }

    _onRouteChange(p){
        if(p.pathname === this.props.path){
            this.setState({active: true});
            return false;
        }

        this.setState({active: false});
        return true;
    }

    enable() {
        if (this.unblock){
            this.unblock();
        }

        this.unblock = this.props.history.block(this._onRouteChange);
    }

    disable() {
        if (this.unblock) {
            this.unblock();
            this.unblock = null;
        }
    }

    componentWillMount() {
        if (this.props.when){
            this.enable();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.when) {
            if (!this.props.when){
                this.enable();
            }
        } else {
            this.disable();
        }
    }

    componentWillUnmount() {
        this.disable();
    }

    render() {
        let {children} = this.props;
        let {active} = this.state;

        if(!active){
            return null;
        }

        return React.Children.only(children);
    }
}

HandlerAction.propTypes = {
    path: PropTypes.string.isRequired,
    when: PropTypes.bool.isRequired,
    children: PropTypes.node,
    history: PropTypes.object.isRequired,
    path: PropTypes.string.isRequired
};

HandlerAction.defaultProps = {
    when: true,
    path: ''
};

export default withRouter(HandlerAction);
