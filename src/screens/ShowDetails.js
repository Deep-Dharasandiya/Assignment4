import React from 'react'
import { StyleSheet, Text, View,Switch,TouchableOpacity } from 'react-native'
import Colors from '../constant/Colors'
import { width,height,unit } from '../constant/ScreenDetails';
import Icon from 'react-native-vector-icons/Ionicons';
import store from '../Store';
import { observer } from 'mobx-react-lite';

function ShowDetails(props) {
    const [item, setItem] = React.useState(props.route.params.item);
    const [status, setStatus] = React.useState(item.status);
    function onChangeStatus(){
        const obj={...item};
        obj.status=!status;
        const flag = store.insertTodoItem(obj);
        setStatus(!status);
    }

    function onEdit(index){
        props.navigation.navigate('Add', { isedit: true, item: item });
    }
    function onDelete(item){
      const flag= store.deleteTodoItem(item);
      if(flag){
          props.navigation.pop();
      }
    }
    return (
        <View style={styles.container}>
            <View style={styles.card}>
              <Text style={styles.header}>{item.title}</Text>
              <View style={styles.status}>
                <Text style={styles.subHeader}>status:</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={status ? "green" : "red"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={onChangeStatus}
                    value={status}
                />
              </View>
              <View style={styles.descriptionView}>
                 <Icon
                    name= {"ios-document-text"}
                    color={Colors.lightblue}
                    size={25}
                />
                 <Text style={styles.descriptionText}>{item.description}</Text>
              </View>
              <View style={styles.descriptionView}>
                 <Icon
                    name= {"today"}
                    color={Colors.lightblue}
                    size={25}
                />
                 <Text style={styles.descriptionText}>{item.startDate +" : "+item.endDate} </Text>
              </View>
              <View style={styles.descriptionView}>
                 <Icon
                    name= {"ios-calendar"}
                    color={Colors.lightblue}
                    size={25}
                />
                    <Text style={styles.descriptionText}>{"Created By "+item.createdDate}</Text>
              </View>
              <View style={styles.descriptionView}>
                 <Icon
                    name= {"ios-reload-circle-sharp"}
                    color={Colors.lightblue}
                    size={25}
                />
                    <Text style={styles.descriptionText}>{"Updated By " + item.updatedDate} </Text>
              </View>
              <View style={{...styles.descriptionView,justifyContent:'space-around'}}>
                <TouchableOpacity
                    onPress={() => onDelete({...item})}>
                    <Icon
                        name= {"ios-trash"}
                        color={Colors.lightred}
                        size={30}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                        onPress={() => onEdit({...item})}>
                    <Icon
                        name= {"ios-reload-circle-sharp"}
                        color={Colors.black}
                        size={30}
                    />
                </TouchableOpacity>
              </View>
              <View style={{height:2,backgroundColor:Colors.black,marginVertical:10,}}/>
              <Text style={{...styles.descriptionText,textAlign:'right'}}>{"By "+ item.endDate}</Text>
            </View>
        </View>
    )
}
export default observer(ShowDetails);

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.purple,
        justifyContent:'center',
     },
     header:{
        color:Colors.lightblue,
        fontSize:25 *unit,
        textAlign:'center',
        fontWeight:'600',
        marginTop:20* unit,
     },
     subHeader:{
        color:Colors.black,
        fontSize:20 *unit,
        textAlign:'center',
        fontWeight:'600',
     },
     card:{
         backgroundColor:Colors.white,
         borderRadius:20* unit,
         paddingVertical:20* unit,
         paddingHorizontal:10* unit,
     },
     status:{
         flexDirection:'row',
         position:'absolute',
         top:10* unit,
         right:10* unit,
         alignItems:'center',
         justifyContent:'center',
     },
     descriptionView:{
         marginTop:10* unit,
         flexDirection:'row',
         alignItems:'center',
     },
     descriptionText:{
        color:Colors.black,
        fontSize:18 *unit,
        fontWeight:'500',
        marginLeft:10* unit,
     }
})
