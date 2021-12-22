import React from 'react'
import { StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native'
import Colors from '../constant/Colors'
import SearchFeild from '../components/SearchFeild'
import { width,unit } from '../constant/ScreenDetails';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Home(props) {
    const [searchText , setSearchText] = React.useState('');
    const [isFullBody , setIsFullBody] = React.useState(false);

    function onChangeSearchText(text){
        setSearchText(text);
        setIsFullBody(true);
        if(text == ''){
            setIsFullBody(false);
        }
    }
    function onAdd(){
        props.navigation.navigate('Add',{userName:"ss"});
    }
    function onPressItem(){
        props.navigation.navigate('ShowDetails',{userName:"ss"});
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.hello}>Hello!</Text>
                    <Text style={styles.userName}>Deep Dharasandiya</Text>
                </View>
                <Image
                    style={styles.icon}
                    resizeMode="contain"
                    source={require('../constant/Image/LogoWithBackground.png')}
                />
            </View>
            <SearchFeild
                lable="Search:"
                keypadtipe="email-address"
                ismultipleline={false}
                iconname="search"
                value={searchText}
                fn={onChangeSearchText}
            />
            {
                  !isFullBody && (
                        <Text style={styles.todo}>TODO:</Text>
                  )
            }
            {
                !isFullBody && (
                    <View style={styles.cardView}>
                    <Card
                        due="Today"
                        task={10}
                        complete={4}
                        color={Colors.lightred}
                    />
                    <Card
                        due="Tommorow"
                        task={10}
                        complete={4}
                        color={Colors.lightblue}
                    />
                    <Card
                        due="This Week"
                        task={10}
                        complete={4}
                        color={Colors.lightyellow}
                    />
                </View>
                )
            }
           
            <View style={styles.body}>
                <TouchableOpacity 
                    onPress={() => setIsFullBody(!isFullBody)}>
                    <Icon
                        style={{position:'absolute',right:0,top:0,}}
                        name= {isFullBody?"ios-arrow-down-circle":"ios-arrow-up-circle"}
                        color={Colors.black}
                        size={25* unit}
                    />
                </TouchableOpacity>
                
                <Text style={styles.cardTitle}>Todo List (10)</Text>
                <View >
                    <TouchableOpacity
                      style={styles.itemView}
                      onPress={() => onPressItem()}>
                        <View>
                            <View style={{flexDirection:'row'}}>
                                <Icon
                                        name="albums"
                                        color={Colors.lightred}
                                        size={20* unit}
                                    />
                                <Text style={styles.titleText}>  Work</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <Icon
                                        name="albums"
                                        color={Colors.lightred}
                                        size={20* unit}
                                    />
                                <Text style={styles.dueText}>  By Today</Text>
                            </View>
                        </View>
                        <View>
                        <Icon
                            name="md-checkmark-circle-sharp"
                            color={"green"}
                            size={25* unit}
                        />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity 
             style={styles.addButton}
                    onPress={() => onAdd()}>
                    <Icon
                        name= {"add-circle"}
                        color={Colors.lightblue}
                        size={45* unit}
                    />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.purple,
     },
     header:{
        marginTop:15 * unit,
        marginHorizontal:20 *unit,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
     },
     hello:{
        color:Colors.white,
        fontSize:15 *unit,
     },
     userName:{
        color:Colors.white,
        fontSize:20 *unit,
        fontWeight:'500'
     },
     icon:{
        height:50 * unit,
        width:50 * unit,
    },
    todo:{
        color:Colors.white,
        marginLeft:20 * unit,
        marginTop:30 * unit,
        marginBottom:15 * unit,
        fontSize:20 * unit,
    },
    cardView:{
        flexDirection:'row',
    },
    Card:{
        marginLeft:20 * unit,
        width:(width - 80*unit)/3,
        height:130*unit,
        borderRadius:10 * unit,
        justifyContent:'center',
        padding:10 * unit,
    },
    cardTitle:{
        alignSelf:'center',
        color:Colors.black,
        fontSize:20* unit,
        fontWeight:'700',
        marginTop:10* unit
    },
    due:{
        color:Colors.white,
        fontSize:12 * unit,
        fontWeight:'800',
        textAlign:'center',
        marginBottom:10 * unit,
    },
    total:{
        color:Colors.white,
        fontSize:15* unit,
        fontWeight:'400',
    },
    body:{
        flex:1,
        width:width,
        backgroundColor:Colors.white,
        borderTopLeftRadius:40* unit,
        borderTopRightRadius:40* unit,
        marginTop:20* unit,
        padding:20* unit,
    },
    itemView:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderBottomWidth:2* unit,
        borderColor:Colors.lightred,
        padding:10* unit
    },
    titleText:{
        color:Colors.black,
        fontSize:17* unit,
        fontWeight:'500'
    },
    dueText:{
        color:Colors.black,
        fontSize:15* unit,
        fontWeight:'500'
    },
    addButton:{
        position:'absolute',
        bottom:10* unit,
        right:10* unit
    }

})


function Card(props){
    return(
        <View style={{...styles.Card,backgroundColor:props.color}}>
           <Text style={styles.due}>{props.due}</Text>
           <View style={{flexDirection:'row'}}>
            <Icon
                    name="albums"
                    color={Colors.white}
                    size={20* unit}
                />
             <Text style={styles.total}> : {props.task}</Text>
           </View>
           <View style={{flexDirection:'row'}}>
            <Icon
                    name="md-checkmark-circle-sharp"
                    color={Colors.white}
                    size={20* unit}
                />
             <Text style={styles.total}> : {props.complete}</Text>
           </View>
           <View style={{flexDirection:'row'}}>
            <Icon
                    name="md-close-circle"
                    color={Colors.white}
                    size={20* unit}
                />
             <Text style={styles.total}> : {(props.task- props.complete)}</Text>
           </View>
        </View>
    );
}