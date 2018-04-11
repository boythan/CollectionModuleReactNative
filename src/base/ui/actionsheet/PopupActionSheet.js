import React, { Component, PropTypes } from 'react';
import { Actions } from 'react-native-router-flux';

import ActionSheet from './ActionSheet';

const closeActionSheet = _.throttle(Actions.pop, 500);

actionSheetDefaultProps = {
    dialogTitle: '',
    children: null,
    actions: null,
    cancelColor: 'white',
}

class PopupActionSheet extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    static propTypes = {
        dialogTitle: PropTypes.any,
        children: PropTypes.any,
    };

    show = (onShown) => {
        this.dialog.show(onShown);
    }

    dismiss = (onDismissed) => {
        this.dialog.dismiss(onDismissed);
    }

    onDismissed = () => {
        closeActionSheet();
    }

    render() {
        return (
            <ActionSheet
                ref={(dialog) => { this.dialog = dialog; }}
                onDismissed={this.onDismissed}
                {...this.props}>
                {this.props.children}
            </ActionSheet>
        );
    }

    static show(props) {
        Actions.actionSheet({ ...actionSheetDefaultProps, ...props });
    }
}

export default PopupActionSheet;