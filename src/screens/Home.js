import React from 'react'
import { StyleSheet, Text, View,Image,TouchableOpacity,FlatList ,ScrollView} from 'react-native'
import Colors from '../constant/Colors'
import SearchFeild from '../components/SearchFeild'
import { width,unit } from '../constant/ScreenDetails';
import Icon from 'react-native-vector-icons/Ionicons';
import store from '../Store';
import { set } from 'mobx';
import { observer } from 'mobx-react-lite';

 function Home(props) {
    const [searchText , setSearchText] = React.useState('');
    const [isFullBody , setIsFullBody] = React.useState(false);
    const [today, setToday] = React.useState(todayDate());
    const [tomorrow, settomorrow] = React.useState(tomorrowDate());
    function todayDate() {
        const tempdate = new Date();
        let date = tempdate.getDate() < 10 ? ('0' + tempdate.getDate()) : tempdate.getDate();
        let month = (tempdate.getMonth() + 1) < 10 ? ('0' + (tempdate.getMonth() + 1)) : (tempdate.getMonth() + 1);
        let year = tempdate.getFullYear();
        return (year + '-' + month + '-' + date);
    }
    function tomorrowDate() {
        let tempdate = new Date();
        tempdate.setDate(tempdate.getDate() + 1);
        let date = (tempdate.getDate())< 10 ? ('0' + (tempdate.getDate())) : tempdate.getDate();
        let month = (tempdate.getMonth() + 1) < 10 ? ('0' + (tempdate.getMonth() + 1)) : (tempdate.getMonth() + 1);
        let year = tempdate.getFullYear();
        return (year + '-' + month + '-' + date);
    }
    React.useEffect(() => {
        //setDetails(store);
    },[]);

    function onChangeSearchText(text){
        setSearchText(text);
        setIsFullBody(true);
        if(text == ''){
            setIsFullBody(false);
        }
    }
    function onAdd(){
        props.navigation.navigate('Add',{isedit:false,item:{}});
    }
    function onPressItem(item){
        props.navigation.navigate('ShowDetails',item={item});
    }
    
    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <View>
                    <Text style={styles.hello}>Hello!</Text>
                    <Text style={styles.userName}>{store.userName}</Text>
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
                    <ScrollView 
                      horizontal={true}
                      >
                    <Card
                        due="Late"
                        task={store.lateTask}
                        complete={store.lateCompleteTask}
                        color={Colors.lightred}
                    />
                    <Card
                        due="Today"
                        task={store.todayTask}
                        complete={store.todayCompleteTask}
                        color={Colors.lightgreen}
                    />
                    <Card
                        due="Tommorow"
                        task={store.tommorowTask}
                        complete={store.tommorowCompleteTask}
                        color={Colors.lightblue}
                    />
                    <Card
                        due="UpComming"
                        task={store.upcomingTask}
                        complete={store.upcomingComleteTask}
                        color={Colors.lightyellow}
                    />
                </ScrollView>
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
                
                <Text style={styles.cardTitle}>{"Todo List (" + (store.todoList).filter((item) => ((item.title).toLowerCase()).includes(searchText.toLowerCase())).length+")"}</Text>
                <View style={{marginBottom:25*unit}}>
                    <FlatList
                        key={1}
                        data={(store.todoList).filter((item) => ((item.title).toLowerCase()).includes(searchText.toLowerCase()))}
                        listMode="SCROLLVIEW"
                        keyExtractor={(item, index) => `key-${index}`}
                        renderItem={({index, item }) => {
                            return <TouchableOpacity
                                style={{...styles.itemView,
                                    borderColor: today == item.endDate ? Colors.lightgreen
                                        :
                                        tomorrow == item.endDate ? Colors.lightblue
                                            :
                                            today < item.endDate ? Colors.lightyellow : Colors.lightred,
                                  }}
                                onPress={() => onPressItem(item)}>
                                <View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon
                                            name="albums"
                                            color={today == item.endDate ? Colors.lightgreen 
                                                : 
                                                tomorrow == item.endDate ? Colors.lightblue 
                                                : 
                                                today < item.endDate?Colors.lightyellow:Colors.lightred}
                                            size={20 * unit}
                                        />
                                        <Text style={styles.titleText}>{item.title}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon
                                            name="albums"
                                            color={today == item.endDate ? Colors.lightgreen
                                                :
                                                tomorrow == item.endDate ? Colors.lightblue
                                                    :
                                                    today < item.endDate ? Colors.lightyellow : Colors.lightred}
                                            size={20 * unit}
                                            size={20 * unit}
                                        />
                                        <Text style={styles.dueText}>By {item.endDate}</Text>
                                    </View>
                                </View>
                                <View>
                                    <Icon
                                        name={item.status ?"md-checkmark-circle-sharp":"md-close-circle"}
                                        color={item.status?"green":'red'}
                                        size={25 * unit}
                                    />
                                </View>
                            </TouchableOpacity>
                        }}
                    />
                   
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
export default observer(Home);
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
        marginRight:20*unit,
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
        padding:10* unit
    },
    titleText:{
        color:Colors.black,
        fontSize:17* unit,
        fontWeight:'500',
        marginLeft:10*unit,
    },
    dueText:{
        color:Colors.black,
        fontSize:15* unit,
        fontWeight:'500',
         marginLeft: 10 * unit,
    },
    addButton:{
        position:'absolute',
        bottom:5* unit,
        right:(width/2)-15*unit,
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