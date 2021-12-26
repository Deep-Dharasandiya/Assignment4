import React from 'react'
import { StyleSheet, Text, View,Image} from 'react-native'
import Colors from '../constant/Colors'
import SplashScreen from 'react-native-splash-screen';
import TextField from '../components/TextFeild';
import SubmitButton from '../components/SubmitButton';
import {unit } from '../constant/ScreenDetails';
import store from '../Store';
import { Observer } from 'mobx-react-lite';
import { array } from 'mobx-state-tree/dist/internal';
import data from '../data';
import Loader from '../components/Loader';


export default function InitialScreen(props) {
    const [userName , setUserName] = React.useState('');

    React.useEffect(() => {
        SplashScreen.hide();
    }, []);

    function onChangeUserName(text){
        setUserName(text);
    }
     async function onSubmit(){
         if(userName != ''){
             const flag = store.insertUser(userName);
             if (flag) {
                 props.navigation.navigate('Home', { userName: userName });
             } else {
                 alert("error");
             }
         }else{
             store.setAleart("Please enter userName first");
         }
        
        
    }
    return (
        <View style={styles.container}>
            {console.log("dfgrrg : " +store.isLoading)}
        
            <Image
              style={styles.icon}
              resizeMode="contain"
              source={require('../constant/Image/LogoWithBackground.png')}
            />
            <Text style={styles.title}>TODO LIST</Text>
            <TextField
                lable="UserName:"
                keypadtipe="email-address"
                ismultipleline={false}
                iconname="person"
                value={userName}
                fn={onChangeUserName}
            />
            <SubmitButton
                viewStyle={{marginTop:20 * unit}}
                height={50 *unit}
                width={150 * unit}
                lable="Submit"
                iconname="md-checkmark-circle-sharp"
                fn={onSubmit}
           />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
       flex:1,
       alignItems:'center',
       justifyContent:'center',
       backgroundColor:Colors.purple,
       padding:20  * unit,
    },
    icon:{
        height:100 * unit,
        width:100 * unit,
    },
    title:{
        color:Colors.white,
        fontSize:20 * unit,
        fontWeight:'700',
        marginTop:10 * unit,
        marginBottom:20 * unit,
    },
    
})
