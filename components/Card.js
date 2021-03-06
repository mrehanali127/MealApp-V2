import React from "react";
import { View,StyleSheet } from "react-native";

const Card=props=>{
    // Add card style also its child style
    return<View style={{...styles.card,...props.style}}>{props.children}</View>
}

const styles=StyleSheet.create({

    card:{
       
        shadowColor:'black',
        shadowOffset:{width:0,height:2},
        shadowRadius:6,
        shadowOpacity:0.26,
        backgroundColor:'white',
        marginVertical:10,
        elevation:5,
        padding:20,
        borderRadius:10
    }
});

export default Card;