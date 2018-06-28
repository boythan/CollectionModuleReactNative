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
    FlatList,
    Image
} from 'react-native';
import { connect } from 'react-redux';

import { Actions } from 'react-native-router-flux';
import Messages from '../../constant/message'
import NavBar from '../../base/ui/NavBar';
import InstagramLogin from 'react-native-instagram-login'
import ButtonText from '../../base/ui/button/ButtonText';
import API from '../../network/API';
import CookieManager from 'react-native-cookies';
import Axios from 'axios';
import AppColos from '../../theme/colors';
import message from '../../constant/message';
import Line from '../../base/ui/Line';

const CLIENTID_INSTA = 'fd86003c82eb4da9b08be468d443262f'
const REDIRECT_URL = 'http://fruitful.tech/'


const styles = StyleSheet.create({
    containerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        justifyContent: 'space-between',
        backgroundColor: 'white'
    },
    containerImage: {
        width: 30,
        height: 30,
        borderRadius: 8,
    },
    textContent: {
        marginLeft: 10,
        color: AppColos.grey,
        fontSize: 14
    },
    contentContainer: {
        width: '60%',
        justifyContent: 'center'
    },
    textContentSecond: {
        marginLeft: 10,
        color: AppColos.gray,
        fontSize: 14
    },
    containerUnfollow: {
        padding: 8,
        borderColor: AppColos.orange,
        borderRadius: 6,
        borderWidth: 1,
        width: 100,
        alignItems: 'center'
    }
})


class LoginInstagramScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            follower: [],
            cookie: ''
        }
    }

    componentDidMount() {
        this.refs.instagramLogin.show();
    }


    /**
     * function returns userID and cookie
     * cause some API get follower is deprecated by facebook (refer https://www.instagram.com/developer/changelog/)
     * so I must get cookie in web befor I get user's follower
     */
    async getUserInfo() {
        const userSelf = await API.getUserSelf(this.token);
        console.log(userSelf)
        const resCookie = await CookieManager.get(`https://www.instagram.com/${userSelf.data.data.username}/`);
        console.log(resCookie)
        let cookie = ''
        for (var property in resCookie) {
            cookie = cookie + ';' + property + '=' + resCookie[property];
        }
        await this.setState({ cookie })

        return { userId: resCookie.ds_user_id, cookie }
    }


    async onLoginSuccess(token) {
        this.token = token;
        const userInfo = await this.getUserInfo();
        console.log(userInfo)

        const resFollowers = await API.getFollower(userInfo.userId, userInfo.cookie);
        console.log(resFollowers)

        if (resFollowers && resFollowers.data && resFollowers.data.data && resFollowers.data.data.user) {
            this.setState({ follower: resFollowers.data.data.user.edge_followed_by.edges })
        }

    }

    onUnFollow(item) {
        API.unFollower(item.item.node.id, this.state.cookie, this.token).then(res => {
            if (res.data) {
                let { follower } = this.state;
                follower.splice(item.index, 1);
                this.setState({ follower })
            }
        }).catch(err => {
            console.log(err)
        })
    }

    renderFollowerItems(item, onPressUnfollow) {
        const follower = item.item;
        return (<View style={styles.containerItem}>
            <Image
                style={styles.containerImage}
                source={{ uri: follower.node.profile_pic_url }} />
            <View style={styles.contentContainer}>
                <Text style={styles.textContent}>{follower.node.username}</Text>
                <Text style={styles.textContentSecond}>{follower.node.full_name}</Text>
            </View>

            <TouchableOpacity style={styles.containerUnfollow} onPress={() => { this.onUnFollow(item) }}>
                <Text style={{ color: AppColos.gray }}>
                    {message.unFollow}
                </Text>
            </TouchableOpacity>
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
            <NavBar title={Messages.instagram} />
            <InstagramLogin
                redirectUrl={REDIRECT_URL}
                ref='instagramLogin'
                clientId={CLIENTID_INSTA}
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
                ItemSeparatorComponent={Line}
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