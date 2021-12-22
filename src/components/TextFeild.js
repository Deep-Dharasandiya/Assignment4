import React from 'react'
import { StyleSheet, View ,TextInput} from 'react-native'
import Colors from '../constant/Colors';
import Icon from 'react-native-vector-icons/Ionicons';

export default  function TextField(props) {
    const styles = StyleSheet.create({
        textFeildView:{
            flexDirection: 'row',
            paddingRight: 10 ,
            marginTop: 20 ,
            borderRadius: 10 ,
            backgroundColor: Colors.white,
        },
        icon:{
            marginHorizontal: 22 ,
            alignSelf: 'center',
            justifyContent: 'center'
        },
        textinput:{
            flex: 1,
            color:Colors.black,
            fontSize: 20 ,
            fontWeight:'700',
            paddingVertical:10 ,
        }
    });
    return (
      <View style={styles.textFeildView}>
       <Icon
        style={styles.icon}
        name={props.iconname}
        color={Colors.black}
        size={22 }
      /> 
      <TextInput
        style={styles.textinput}
        keyboardType={props.keypadtipe}
        maxLength={props.maxlength}
        placeholder={props.lable}
        fontSize={20 }
        multiline={props.ismultipleline}
        placeholderTextColor={Colors.gray}
        onChangeText={text => props.fn(text)}
        defaultValue={props.value}
      />
    </View>
    )
    
  }