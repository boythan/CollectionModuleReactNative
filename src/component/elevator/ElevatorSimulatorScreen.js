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
import message from '../../constant/message';
import NavBar from '../../base/ui/NavBar';
import ButtonText from '../../base/ui/button/ButtonText';
import AppColors from '../../theme/colors'
import AppSizes from '../../theme/sizes'
import _ from 'lodash'

const STATUS = {
    OFF: 0,
    ON: 1,
    OPEN: 2
}

const DIRECTION = {
    DOWN: 0,
    UP: 1,
}
class ElevatorSimulatorScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            floorNumber: Number.parseInt(props.floorNumber, 10),
            elevatorNumber: Number.parseInt(props.elevatorNumber, 10),
            simulatorList: constructSimulatorList(props.floorNumber, props.elevatorNumber),
            elevatorFloorList: constructElevatorFloorList(props.elevatorNumber),
        };
    }

    // UI CONTROL
    // -----------------------------------------------------------------------------

    keyExtractor = (item, index) => {
        if (!item.id) {
            return index.toString();
        }
        return item.id
    }


    moveEleForWatingCus(floor, direction) {
        const nearestElevator = this.findNearestElevator(floor, direction)
        console.log(nearestElevator);
        //update simulator List 
        let { simulatorList } = this.state;
        simulatorList[this.state.floorNumber - nearestElevator.floor].elevatorInFloor[nearestElevator.elevator].status = STATUS.OFF;

        simulatorList[this.state.floorNumber - floor.floor].elevatorInFloor[nearestElevator.elevator] = {
            FS: 0,
            direction,
            elevator: nearestElevator.elevator,
            status: STATUS.OPEN,
        }

        //update elevator list
        let { elevatorFloorList } = this.state;
        elevatorFloorList[nearestElevator.elevator] = {
            ...elevatorFloorList[nearestElevator.elevator],
            floor: floor.floor,
            status: STATUS.OPEN
        }

        this.setState({ elevatorFloorList, simulatorList });
    }

    findNearestElevator(floor, direction) {

        let elevatorFloorList = this.state.elevatorFloorList;

        
        //if there is at least one ele in the customer's floor
        const index = _.findIndex(floor.elevatorInFloor, ele => {
            return ele.status === STATUS.ON;//ele.direction === direction && 
        })
        if (index >= 0) {
            return elevatorFloorList[index];
        }


        let N = this.state.floorNumber - 1;
        elevatorFloorList.forEach(elevator => {
            let d = Math.abs(elevator.floor - floor.floor)

            if (this.isTowardElevator(elevator, floor)) {
                if (elevator.direction === direction) {
                    elevator.FS = (N + 2) - d;
                } else {
                    elevator.FS = (N + 1) - d
                }
            } else {
                elevator.FS = 1
            }
        })

        const nearest = elevatorFloorList.reduce((ele1, ele2) => ele1.FS >= ele2.FS ? ele1 : ele2)

        return nearest;
    }

    isTowardElevator(elevator, floor) {
        return (elevator.floor < floor.floor && elevator.direction === DIRECTION.UP) ||
            (elevator.floor > floor.floor && elevator.direction === DIRECTION.DOWN);
    }
    onPressCurrentFloor(item) {
        Alert.alert(message.direction, '', [
            {
                text: message.down,
                onPress: () => {
                    this.moveEleForWatingCus(item, DIRECTION.DOWN)
                }
            },
            {
                text: message.up,
                onPress: () => {
                    this.moveEleForWatingCus(item, DIRECTION.UP)
                }
            }
        ])

    }

    onPressTargetFloor(item) {
        let { simulatorList, elevatorFloorList } = this.state
        const indexElevator = _.findIndex(elevatorFloorList, (ele) => {
            return ele.status === STATUS.OPEN;
        })
        const indexSimulator = _.findIndex(simulatorList, (simulator) => {
            return simulator.elevatorInFloor[indexElevator].status == STATUS.OPEN
        })
        //status
        elevatorFloorList[indexElevator].status = STATUS.ON;
        elevatorFloorList[indexElevator].floor = item.floor;

        simulatorList[indexSimulator].elevatorInFloor[indexElevator].status = STATUS.OFF;
        simulatorList[this.state.floorNumber - item.floor].elevatorInFloor[indexElevator].status = STATUS.ON;

        //direction
        let direction;
        if (item.floor > simulatorList[indexSimulator].floor) {
            direction = DIRECTION.UP
        } else {
            direction = DIRECTION.DOWN
        }
        simulatorList[this.state.floorNumber - item.floor].elevatorInFloor[indexElevator].direction = direction;
        elevatorFloorList[indexElevator].direction = direction
        this.setState({ simulatorList, elevatorFloorList })
    }

    getBackgroundColorElevator(status) {
        switch (status) {
            case STATUS.OFF:
                return AppColors.white;
            case STATUS.ON:
                return AppColors.pink;
            case STATUS.OPEN:
                return AppColors.blueBackground
        }

    }

    // - --- UI RENDER
    // -----------------------------------------------------------------------------
    // - ----
    renderElevator(item) {
        let elevatorView = [];

        item.elevatorInFloor.forEach(elevator => {

            let viewElevator;
            if (elevator.status === STATUS.OFF) {
                viewElevator = (<View style={styles.elevatorOff} />)
            } else {
                viewElevator = (<Text style={{ fontSize: 14, color: this.getBackgroundColorElevator(elevator.status) }} >{elevator.direction == DIRECTION.UP ? '^' : 'v'}</Text>)
            }
            elevatorView.push(viewElevator)
        })
        return elevatorView
    }


    renderSimulatorCell(item) {
        const simulatorItem = item.item;
        return (<View style={styles.containerItem}>
            <TouchableOpacity style={{ width: '15%', }} onPress={() => this.onPressCurrentFloor(simulatorItem)}>
                <Text style={{ color: AppColors.textContent }}>{message.floor + ' ' + simulatorItem.floor}</Text>
            </TouchableOpacity>

            <View style={styles.containerElevator}>{this.renderElevator(simulatorItem)}</View>
            <TouchableOpacity style={{ width: '15%', }} onPress={() => this.onPressTargetFloor(simulatorItem)}>
                <Text style={{ color: AppColors.textContent }}>{message.floor + ' ' + simulatorItem.floor}</Text>
            </TouchableOpacity>

        </View>)
    }
    renderSimulator() {
        return (<FlatList
            renderItem={(item) => this.renderSimulatorCell(item)}
            data={this.state.simulatorList}
            keyExtractor={this.keyExtractor}
            style={styles.list}
            extraData={this.state}
        />)
    }

    render() {

        return <View style={styles.container}>
            <NavBar title={message.elevator} />
            <View style={{ alignItems: 'center', flex: 1 }}>
                <View style={{ height: 40, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ width: '15%', textAlign: 'center' }} >{message.yourFloor}</Text>
                    <Text style={{ width: '70%', textAlign: 'center' }}>{message.elevator}</Text>
                    <Text style={{ width: '15%', textAlign: 'center' }}>{message.targetFloor}</Text>
                </View>

                <View style={styles.containerSimulator}>
                    {this.renderSimulator()}
                </View>
            </View>
        </View>

    }
};

// Redux
const mapStateToProps = state => ({})

// Any actions to map to the component?
const mapDispatchToProps = {}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(ElevatorSimulatorScreen);

/**
 * init simulator/ floor list for simulator
 * @param {*} floor 
 * @param {*} elevator 
 */
const constructSimulatorList = (floor, elevator) => {
    let constructSimulatorList = []
    const floorNumber = Number.parseInt(floor, 10)
    const elevatorNumber = Number.parseInt(elevator, 10)

    for (let index = floorNumber; index > 0; index--) {
        let item = {
            floor: index,
            elevatorNumber,
            elevatorInFloor: constructFloorElevatorList(index, elevatorNumber)
        }
        constructSimulatorList.push(item)
    }
    return constructSimulatorList;
}
/**
 * init elevator list for simulator 
 * @param {*} floor 
 * @param {*} elevator 
 */
const constructFloorElevatorList = (floor, elevator) => {
    let elevatorList = [];
    const elevatorNumber = Number.parseInt(elevator, 10);

    for (let index = 0; index < elevatorNumber; index++) {
        let item = {
            elevator: index,
            status: floor == 1 ? STATUS.ON : STATUS.OFF,
            direction: DIRECTION.UP,
            FS: 0
        }
        elevatorList.push(item)
    }
    return elevatorList;
}

/**
 * map elevator to floor 
 */

const constructElevatorFloorList = (elevator) => {
    let mapElevatorToFloor = []
    const elevatorNumber = Number.parseInt(elevator, 10);
    for (let index = 0; index < elevatorNumber; index++) {
        let item = {
            elevator: index,
            floor: 1,
            direction: DIRECTION.UP,
            FS: 0,
            status: STATUS.ON
        }
        mapElevatorToFloor.push(item)
    }
    return mapElevatorToFloor;
}

/**
 * style for component
 */
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
    },
    containerItem: {
        flexDirection: 'row',
        width: AppSizes.screen.width,
        marginTop: 8
    },
    containerElevator: {
        width: '70%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 8,
        paddingRight: 8
    },
    containerSimulator: {
        height: '100%',
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    elevatorOff: {
        backgroundColor: AppColors.white,
        height: 20,
        width: 4
    }
});