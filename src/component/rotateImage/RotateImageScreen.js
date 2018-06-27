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
    TouchableOpacity,
    Image,
    Dimensions
} from 'react-native';
import { connect } from 'react-redux';

import { Actions } from 'react-native-router-flux';
import NavBar from '../../base/ui/NavBar';
import message from '../../constant/message';
import ButtonText from '../../base/ui/button/ButtonText';
import AppColors from '../../theme/colors'
import AppSizes from '../../theme/sizes'
class RotateScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rotateDegree: 0
        };
    }

    // UI CONTROL
    // -----------------------------------------------------------------------------

    rotateImage() {
        this.setState({
            rotateDegree: this.state.rotateDegree + 90
        })
    }
    // - --- UI RENDER
    // -----------------------------------------------------------------------------
    // - ----


    render() {

        return <View style={styles.container}>
            <NavBar title={message.rotateImage} />
            <View style={styles.contentContainer}>
                <Image style={{
                    width: 200,
                    heihgt: 200,
                    backgroundColor: 'white',
                    transform: [
                        { perspective: 850 },
                        { rotateZ: `${this.state.rotateDegree}deg` },
                    ]
                }}
                    source={require('../../image/ic_list_arrow_right.png')} />

                <ButtonText
                    containerStyle={{ marginTop: 40, backgroundColor: AppColors.redGoogle, width: 300 }}
                    content={message.rotateImage}
                    onClick={() => { this.rotateImage() }}
                />
            </View>
        </View>

    }
};

// Redux
const mapStateToProps = state => ({})

// Any actions to map to the component?
const mapDispatchToProps = {}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(RotateScreen);

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
    },
    contentContainer: {
        width: AppSizes.screen.width,
        height: AppSizes.screen.height,
        justifyContent: 'center',
        alignItems: 'center'
    }
});