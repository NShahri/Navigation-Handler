import React from 'react';
import { Prompt } from 'react-router-dom';
import PropTypes from 'prop-types';

class RouterHandler extends React.Component {
    static defaultProps = {
        when: false
    }

    constructor(props){
        super(props);

        this.state = {};

        this._onRouteChanging = this._onRouteChanging.bind(this);
    }

    renderMatchRoute(child, nextPathname){
        console.log(child.path, nextPathname);

        if(!child.path) {
            return null;
        }

        return child.path === nextPathname ? React.cloneElement(child, { navigate: ()=>{alert('sdfsdf');} }) : null;
    }

    render(){
        let {children, when} = this.props;

        return (
            <div>
                <Prompt when={when} message={this._onRouteChanging} />
                { React.Children.map(children, (c, index) => this.renderMatchRoute(c, this.state.nextPathname, index)) }
            </div>
        );
    }

    _onRouteChanging(p){
        this.setState({nextPathname: p.pathname});

        return false;
    }
}

RouterHandler.propTypes = {
    children: PropTypes.node,
    when: PropTypes.bool.isRequired,
};

export default RouterHandler;
