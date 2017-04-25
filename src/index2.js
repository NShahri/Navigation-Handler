import React from 'react';
import { Prompt, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class RouterHandler extends React.Component {
    static defaultProps = {
        when: false
    }

    static propTypes = {
        children: PropTypes.node,
        when: PropTypes.bool.isRequired,
    }

    static contextTypes = {
        routerHandler: PropTypes.object
    }

    static childContextTypes = {
        routerHandler: PropTypes.object.isRequired
    }

    getChildContext() {
        return {
            routerHandler: this.context.routerHandler || this
        };
    }

    constructor(props){
        super(props);

        this.state = {};

        this._onRouteChanging = this._onRouteChanging.bind(this);
    }

    render(){
        let {when} = this.props;
        let {activeChild} = this.state;

        return (
            <div>
                <Prompt when={when} message={this._onRouteChanging} />
                { activeChild }
            </div>
        );
    }

    _onRouteChanging(p){
        let {children, when} = this.props;
        let childArray = React.Children.toArray(children);
        let activeChild = childArray.find(c => !c.to || c.to === p.pathname );
        when = when && !!activeChild;

        if(!when){
            this.setState({to: p.pathname, activeChild: null});
            return true;
        }

        this.setState({to: p.pathname, activeChild:  React.cloneElement(activeChild, { navigate: ()=>alert(p.pathname) }) });

        return false;
    }
}

// RouterHandler.propTypes = {
//     children: PropTypes.node,
//     when: PropTypes.bool.isRequired,
// };

export default withRouter(RouterHandler);
