import React from 'react'
import { StyleSheet, Text, View,Switch } from 'react-native'
import Colors from '../constant/Colors'
import { width,height,unit } from '../constant/ScreenDetails';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ShowDetails() {
    const [status , setStatus] = React.useState(false);
    function onChangeStatus(){
        setStatus(!status);
    }
    return (
        <View style={styles.container}>
            <View style={styles.card}>
              <Text style={styles.header}>Title</Text>
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
                 <Text style={styles.descriptionText}>status djfg fnjhg gbnjb gjknbhnjbntu ijgth8ht thuhh tijyjhjhyi6 </Text>
              </View>
              <View style={styles.descriptionView}>
                 <Icon
                    name= {"today"}
                    color={Colors.lightblue}
                    size={25}
                />
                 <Text style={styles.descriptionText}>2021-12-22 : 2021-12-25 </Text>
              </View>
              <View style={styles.descriptionView}>
                 <Icon
                    name= {"ios-calendar"}
                    color={Colors.lightblue}
                    size={25}
                />
                 <Text style={styles.descriptionText}>Created By 2021-11-30 </Text>
              </View>
              <View style={styles.descriptionView}>
                 <Icon
                    name= {"ios-reload-circle-sharp"}
                    color={Colors.lightblue}
                    size={25}
                />
                 <Text style={styles.descriptionText}>Updateted By 2021-11-30 </Text>
              </View>
              <View style={{...styles.descriptionView,justifyContent:'space-around'}}>
                 <Icon
                    name= {"ios-trash"}
                    color={Colors.lightred}
                    size={30}
                />
                 <Icon
                    name= {"ios-reload-circle-sharp"}
                    color={Colors.black}
                    size={30}
                />
              </View>
              <View style={{height:2,backgroundColor:Colors.black,marginVertical:10,}}/>
              <Text style={{...styles.descriptionText,textAlign:'right'}}>By 2021-02-23</Text>
            </View>
        </View>
    )
}

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
