import React from 'react'
import { StyleSheet, Text, View ,Modal,ActivityIndicator,TouchableOpacity} from 'react-native'
import Colors from '../constant/Colors'
import { width,unit } from '../constant/ScreenDetails';
import {observer} from 'mobx-react-lite';
import store from '../Store';
function Aleart(props) {
    const styles = StyleSheet.create({
        container:{
           padding:5*unit,
           width: width*0.9,
           marginVertical:20 * unit,
           backgroundColor:Colors.white,
           borderColor:Colors.lightblue,
           borderWidth:2,
           borderRadius:10*unit,
           shadowColor: Colors.lightblue,
            shadowOffset: {width: -2, height: 4},
            shadowOpacity: 0.5,
            shadowRadius: 4,
            elevation: 10*unit,
            justifyContent:'center',
           alignItems:'center',
          },
    })
    return (
        <Modal
          transparent={true}
          supportedOrientations={['portrait', 'landscape']}
          animationType='none'
          visible={props.isVisible}
          onRequestClose={() => {
            store.closeAleart();
          }}
        >
             <TouchableOpacity
                onPress={() => store.closeAleart()}
                style={{flex:1,alignItems:'center',justifyContent:'center'}}
                >
                <View style={styles.container}>
                    <Text style={{fontSize:18*unit,marginTop:10}}>{store.aleartMessage}</Text>
                    <View style={{width:60,backgroundColor:Colors.blurblue,padding:5 *unit,alignItems:'center',justifyContent:'center',borderRadius:5,marginVertical:10}}>
                        <Text style={{color:Colors.lightblue,fontWeight:'600'}}>OK</Text>
                        </View>

                </View>
            </TouchableOpacity>
         
        </Modal>
    )
}

export default observer(Aleart);
