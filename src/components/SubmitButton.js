import React from 'react'
import { StyleSheet, Text,TouchableOpacity } from 'react-native'
import Colors from '../constant/Colors';
import Icon from 'react-native-vector-icons/Ionicons';

export default function SubmitButton(props) {
    const styles = StyleSheet.create({
        btnStyle:{
            height:props.height,
            width:props.width,
            borderRadius:10,
            alignItems:'center',
            justifyContent:'center',
            marginTop:10,
            alignSelf:'center',
            backgroundColor:Colors.lightred,
            flexDirection:'row',
            ...props.viewStyle,
        },
        btnText:{
            fontSize: 23,
            fontWeight:'600',
            color:Colors.white,
            ...props.fontStyle,
        },
        icon:{
         marginRight: 10,
         alignSelf: 'center',
         justifyContent: 'center'
        },
     });
    return (
        <TouchableOpacity
          onPress={() => props.fn()}
          style={styles.btnStyle}
          >
            <Icon
                style={styles.icon}
                name={props.iconname}
                color={Colors.white}
                size={22}
            />
            <Text style={styles.btnText}>
                {props.lable}
           </Text>
     </TouchableOpacity>
    )
}

