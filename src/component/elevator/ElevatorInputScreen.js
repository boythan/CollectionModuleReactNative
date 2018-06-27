import React, { Component } from 'react';
import {
    View,
    TextInput,
    Button,
    Alert,
    StyleSheet,
    Keyboard,
    Text,
    Linking,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';

import { Actions } from 'react-native-router-flux';
import message from '../../constant/message';
import NavBar from '../../base/ui/NavBar';
import ButtonText from '../../base/ui/button/ButtonText';
import AppColors from '../../theme/colors'
import AppSizes from '../../theme/sizes'
class ElevatorInputScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    // UI CONTROL
    // -----------------------------------------------------------------------------
    onClickSimulator() {
        const props = {
            floorNumber: '12',
            elevatorNumber: '4',
        }
        Actions.elevatorSimulator(props);
    }
    // - --- UI RENDER
    // -----------------------------------------------------------------------------
    // - ----

    render() {

        return <View style={styles.container}>
            <NavBar title={message.elevator} />
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <TextInput
                    style={[AppStyles.textInput, styles.textInputStyle]}
                    autoCapitalize='none'
                    autoCorrect={false}
                    underlineColorAndroid='transparent'
                    placeholder={message.floorNumber}
                    placeholderTextColor={AppColors.textSecondary}
                    onChangeText={floorNumber => this.setState({ floorNumber })}
                    value={'12'}
                />

                <TextInput
                    style={[AppStyles.textInput, styles.textInputStyle]}
                    autoCapitalize='none'
                    autoCorrect={false}
                    underlineColorAndroid='transparent'
                    placeholder={message.elevatorNumber}
                    placeholderTextColor={AppColors.textSecondary}
                    onChangeText={elevatorNumber => this.setState({ elevatorNumber })}
                    value = {'4'}
                />
                <ButtonText
                    containerStyle={styles.buttonText}
                    content={message.simulator}
                    onClick={() => this.onClickSimulator()} />
            </View>
        </View>

    }
};

// Redux
const mapStateToProps = state => ({})

// Any actions to map to the component?
const mapDispatchToProps = {}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(ElevatorInputScreen);

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInputStyle: {

        width: AppSizes.screen.width - 32,
        marginTop: 16
    },
    buttonText: {
        width: AppSizes.screen.width - 32,
        padding: 16,
        backgroundColor: AppColors.gray,
        marginTop: 16,
    }
});