import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Colors from '../constant/Colors'
import { width,height,unit } from '../constant/ScreenDetails';
import TextField from '../components/TextFeild';
import SubmitButton from '../components/SubmitButton';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Add() {
    const [ title , setTitle] = React.useState('');
    const [ description , setDescription] = React.useState('');


    const [startDateText, setStartDateText] = React.useState('Select');
    const [endDateText, setEndDateText] = React.useState('Select');
    const [startDate, setStartDate] = React.useState(new Date());
    const [endDate, setEndDate] = React.useState(new Date());
    const [showStartDate, setShowStartDate] = React.useState(false);
    const [showEndDate, setShowEndDate] = React.useState(false);

    const onChangeStartDate = (event, selectedDate) => {
        const currentDate = selectedDate || startDate;
        setStartDate(currentDate);
        setShowStartDate(Platform.OS === 'ios');
        if(event.type=="set"){
            const tempdate=new Date(selectedDate);
                let date = tempdate.getDate();
                let month = tempdate.getMonth() + 1;
                let year = tempdate.getFullYear();
            setStartDateText(year + '-' + month + '-' + date);

       }
    };
    const onChangeEndDate = (event, selectedDate) => {
        const currentDate = selectedDate || endDate;
        setEndDate(currentDate);
        setShowEndDate(Platform.OS === 'ios');
        if(event.type=="set"){
            const tempdate=new Date(selectedDate);
            let date = tempdate.getDate();
            let month = tempdate.getMonth() + 1;
            let year = tempdate.getFullYear();
            setEndDateText(year + '-' + month + '-' + date);
        }   
        
    };
    const showDatepickerStartDate = () => {
        setShowStartDate(true);
    };
    const showDatepickerEndDate = () => {
        setShowEndDate(true);
    };




    function onChangeTitle(text){
        setTitle(text);
    }
    function onChangeDescription(text){
        setDescription(text);
    }
    function onSubmit(){
        //props.navigation.navigate('Home',{userName:userName});
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Todo Item</Text>
            <TextField
                lable="Title:"
                keypadtipe="email-address"
                ismultipleline={false}
                iconname="person"
                value={title}
                fn={onChangeTitle}
            />
            <TextField
                lable="Description:"
                keypadtipe="email-address"
                ismultipleline={true}
                iconname="person"
                value={description}
                fn={onChangeDescription}
            />
            <View style={styles.dateView}>
                <View>
                     <Text style={styles.subHeader}>Start Date:</Text>
                     <SubmitButton
                      fontStyle={{fontSize:15}}
                        height={40 *unit}
                        width={width *0.4}
                        lable={startDateText}
                        iconname="ios-calendar"
                        fn={showDatepickerStartDate}
                     />
                </View>
                <View>
                     <Text style={styles.subHeader}>Due Date:</Text>
                     <SubmitButton
                       fontStyle={{fontSize:15* unit}}
                        height={40 *unit}
                        width={width *0.4}
                        lable={endDateText}
                        iconname="ios-calendar"
                        fn={showDatepickerEndDate}
                     />
                </View>
            </View>

            {showStartDate && (
                <DateTimePicker
                testID="StartDate"
                minimumDate={new Date()}
                value={startDate}
                mode={'date'}
                is24Hour={true}
                display="default"
                onChange={onChangeStartDate}
                />
            )}
            {showEndDate && (
                <DateTimePicker
                testID="EndDate"
                minimumDate={startDate}
                value={endDate}
                mode={'date'}
                is24Hour={true}
                display="default"
                onChange={onChangeEndDate}
                />
            )}

            <SubmitButton
               viewStyle={{marginTop:30,backgroundColor:Colors.lightblue}}
                height={40 *unit}
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
        backgroundColor:Colors.purple,
        justifyContent:'center',
        padding:20* unit,
     },
     header:{
        color:Colors.white,
        fontSize:25 *unit,
        textAlign:'center',
        fontWeight:'600',
     },
     subHeader:{
        color:Colors.white,
        fontSize:20 *unit,
        fontWeight:'500',
        marginTop:20* unit,
     },
     dateView:{
         flexDirection:'row',
         alignItems:'center',
         justifyContent:'space-between',
     }
})
