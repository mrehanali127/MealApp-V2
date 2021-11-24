import React from "react";

import { View,Text,StyleSheet,TextInput,KeyboardAvoidingView,TouchableWithoutFeedback,Button,Keyboard,Dimensions,ScrollView } from "react-native";
import Colors from "../constants/Colors";
import Card from "../components/Card";
import { useState } from "react";
import IP from "../constants/IP";

const AddCategoryScreen=()=>{

    const [enteredName,setEnteredName]=useState('');
    const [enteredColor,setEnteredColor]=useState('');
    const [enteredOld,setEnteredOld]=useState('');
    const [enteredNew,setEnteredNew]=useState('');
    const [enterToDel,setEnteredToDel]=useState('');

    const nameInputHandler=inputText=>{
        setEnteredName(inputText);
    }

    const colorInputHandler=inputText=>{
        setEnteredColor(inputText);
    }

    const oldNameHandler=inputText=>{
        setEnteredOld(inputText);
    }

    const newNameHandler=inputText=>{
        setEnteredNew(inputText);
    }

    const deleteCategoryHandler=inputText=>{
        setEnteredToDel(inputText);
    }

    const addNewCategory=()=>{
        let url=`http://${IP.ip}:3000/categories`;
        let data={
            name:enteredName,
            color:enteredColor
        }
        fetch(url,{
            method:'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
            body:JSON.stringify(data)
        }).then((response)=>response.json())
        .then(setEnteredName(''))
        .then(setEnteredColor(''))
        .then(()=>console.log("DATA Inserted"))
        .catch((error)=>console.log(error));

    }

    const updateCategoryName=()=>{
        let url=`http://${IP.ip}:3000/categories`;
        let data={
            oldname:enteredOld,
            newname:enteredNew
        }
        fetch(url,{
            method:'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
            body:JSON.stringify(data)
        }).then((response)=>response.json())
        .then(setEnteredNew(''))
        .then(setEnteredOld(''))
        .then(()=>console.log("Name Updated"))
        .catch((error)=>console.log(error));

    }

    const deleteCategory=()=>{
        let url=`http://${IP.ip}:3000/categories`;
        let data={
            name:enterToDel
        }
        fetch(url,{
            method:'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
            body:JSON.stringify(data)
        }).then((response)=>response.json())
        .then(setEnteredToDel(''))
        .then(()=>console.log("Category Deleted"))
        .catch((error)=>console.log(error));

    }




    return(
        <ScrollView>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={10}>
        <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}}>
        <View style={styles.screen}>

            <Card style={styles.inputContainer}>
            <Text style={styles.title}>Add New Category</Text>
                <TextInput style={styles.input} blurOnSubmit autoCapitalize='none' autoCorrect={false} 
                 maxLength={50} placeholder={"Enter Category Name"}  onChangeText={nameInputHandler} value={enteredName} />
                <TextInput style={styles.input} blurOnSubmit autoCapitalize='none' autoCorrect={false} 
                 maxLength={50} placeholder={"Enter Color Code"}  onChangeText={colorInputHandler} value={enteredColor}/>

                <View style={styles.buttonContainer}>
                   <View style={styles.button}><Button title="Add New" onPress={addNewCategory} color={Colors.primaryColor} /></View>
                </View>
                </Card>
            

            <Card style={styles.inputContainer}>
            <Text style={styles.title}>Update Category Name</Text>
                <TextInput style={styles.input} blurOnSubmit autoCapitalize='none' autoCorrect={false} 
                 maxLength={50} placeholder={"Enter Old Name"}  onChangeText={oldNameHandler} value={enteredOld} />
                <TextInput style={styles.input} blurOnSubmit autoCapitalize='none' autoCorrect={false} 
                 maxLength={50} placeholder={"Enter New Name"}  onChangeText={newNameHandler} value={enteredNew}/>

                <View style={styles.buttonContainer}>
                   <View style={styles.button}><Button title="Update Category" onPress={updateCategoryName} color={Colors.primaryColor} /></View>
                </View>
            </Card>

            <Card style={styles.inputContainer}>
            <Text style={styles.title}>Delete Category</Text>
                <TextInput style={styles.input} blurOnSubmit autoCapitalize='none' autoCorrect={false} 
                 maxLength={50} placeholder={"Enter Category Name"}  onChangeText={deleteCategoryHandler} value={enterToDel} />

                <View style={styles.buttonContainer}>
                   <View style={styles.button}><Button title="Delete Category" onPress={deleteCategory} color={Colors.primaryColor} /></View>
                </View>
            </Card>

        </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView> 
        </ScrollView>
    )
}

const styles=StyleSheet.create(
    {
        screen:{
            flex:1,
            alignItems:'center',
            justifyContent:'center'
        },
        title:{
            fontSize:20,
            marginVertical:10,
            
    
        },
        inputContainer:{
            width:300,
            maxWidth:'80%',
            alignItems:'center',
           
        },
        buttonContainer:{
            flexDirection:'row',
            width:'100%',
            justifyContent:'center',
            paddingHorizontal:15
    
        },
        button:{
            //width:90,
            width:Dimensions.get('window').width/2
        },
        input:{
            width:'80%',
            textAlign:"left" 
        },
        
    }
)

export default AddCategoryScreen;