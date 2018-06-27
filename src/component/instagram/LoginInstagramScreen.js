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
    FlatList
} from 'react-native';
import { connect } from 'react-redux';

import { Actions } from 'react-native-router-flux';
import Messages from '../../constant/message'
import NavBar from '../../base/ui/NavBar';
import InstagramLogin from 'react-native-instagram-login'
import ButtonText from '../../base/ui/button/ButtonText';
import API from '../../network/API';

const styles = StyleSheet.create({

})

class LoginInstagramScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            follower: []
        }
    }

    componentDidMount() {
        this.refs.instagramLogin.show();
    }

    async onLoginSuccess(token) {
        const userSelf = await API.getUserSelf(token);
        console.log(userSelf)

        const followers = await API.getMedia(token, userSelf.data.data.id);

        console.log(followers)
    }

    renderFollowerItems(item) {
        const follower = item.item;
        return (<View>
            <Text>{follower.name}</Text>
        </View>)
    }

    keyExtractor = (item, index) => {
        if (!item.id) {
            return index.toString();
        }
        return item.id
    }

    render() {
        return (<View style={styles.container}>
            <NavBar title={Messages.login} />
            <InstagramLogin
                redirectUrl={'http://fruitful.tech/'}
                ref='instagramLogin'
                clientId='fd86003c82eb4da9b08be468d443262f'
                scopes={['public_content', 'follower_list']}
                onLoginSuccess={(token) => { this.onLoginSuccess(token) }}
                onLoginFailure={(data) => console.log(data)}
            />
            <FlatList
                renderItem={(item) => this.renderFollowerItems(item)}
                data={this.state.follower}
                keyExtractor={this.keyExtractor}
                style={styles.list}
                extraData={this.state}
            />
        </View>)
    }
}

// Redux
const mapStateToProps = state => ({})

// Any actions to map to the component?
const mapDispatchToProps = {}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(LoginInstagramScreen);