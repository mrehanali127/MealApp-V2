import React from "react";

import { View,Text,StyleSheet, Button, FlatList, Dimensions,TouchableOpacity } from "react-native";

import {CATEGORIES} from '../data/dummy_data';
import Colors from '../constants/Colors';
import IP from "../constants/IP";
import CategoryGridTile from "../components/CategoryGridTile";
import { useEffect, useState } from "react";


const CategoriesScreen=(props)=>{

    const [isLoading,setLoading]=useState(true);
    const [categoriesData,setcategoriesData]=useState([]);

    useEffect(()=>{
        fetch(`http://${IP.ip}:3000/categories`)
        .then((response)=>response.json())
        .then((response)=>setcategoriesData(response))
        .catch((error)=>console.error(error))
        .finally(()=>setLoading(false));
      },[]);
      

    const renderGridItem=(itemData)=>{
        return(
           <CategoryGridTile title={itemData.item.name} color={itemData.item.color} onSelect={()=>{
            props.navigation.navigate({
                routeName:'CategoryMeals',
                params:{
                    categoryId:itemData.item.id
                }
            });
           }
        }/>
        )
    }

   
    
   // console.log(props);
    return(
        <View>
        {/** 
       <FlatList data={CATEGORIES} renderItem={renderGridItem} numColumns={2} />
       */}
       <View style={styles.flatLIST}>
        <FlatList data={categoriesData} renderItem={renderGridItem} numColumns={2} />
        </View>
        <View>
        <Button
            onPress={(()=>{
                props.navigation.navigate({
                    routeName:'AddCategory'
                })
            })}
            title="Add Category"
            style={styles.button}
            color={Colors.primaryColor}
/>
</View>
        </View>
    )
};

// dynmically add other properties to objects
CategoriesScreen.navigationOptions={

    headerTitle:'Meal Categories',
    headerStyle:{
        backgroundColor:Colors.primaryColor
    },
    headerTintColor:'white'
};

const styles=StyleSheet.create(
    {
        gridItem:{
            flex:1,
            margin:15,
            height:150,
            width:Dimensions.get('window').width/2.5
        },
        screen:{
            flex:1,
            alignItems:'center',
            justifyContent:'center'
        },
        flatLIST:{
            width:'100%',
            height:Dimensions.get('window').height*0.8
        },
        button:{
            width:'80%',
            height:'10%',
            borderRadius:10
        }
       
    }
)

export default CategoriesScreen;