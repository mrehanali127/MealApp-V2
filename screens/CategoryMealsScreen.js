import React,{useState,useEffect,useNavigationState} from "react";

import { View,Text,StyleSheet, Button,FlatList } from "react-native";
import { CATEGORIES,MEALS } from "../data/dummy_data";
import Colors from "../constants/Colors";
import IP from "../constants/IP";
import MealItem from "../components/MealItem";

const CategoryMealsScreen=(props)=>{

    const [isLoading,setLoading]=useState(true);
    const [categoryData,setcategoryData]=useState([]);

    useEffect(()=>{
        fetch(`http://${IP.ip}:3000/categories`)
        .then((response)=>response.json())
        .then((response)=>setcategoryData(response))
        .catch((error)=>console.error(error))
        .finally(()=>setLoading(false));
      },[]);

      
      const getCategory=((Id)=>categoryData.filter(cat=>cat.id===Id));
      //var found = getCountryByCode('DZ');

    const renderMealItem=(itemData)=>{
        return(
          <MealItem title={itemData.item.title} duration={itemData.item.duration}
          complexity={itemData.item.complexity} affordability={itemData.item.affordability}
          image={itemData.item.imageUrl} onSelectMeal={()=>{
                props.navigation.navigate({
                    routeName:'MealDetail',
                    params:{
                        mealId:itemData.item.id
                    }
                });

          }} />
        )
    }

    const catId=props.navigation.getParam('categoryId');

    //const selectedCategory=CATEGORIES.find(cat=>cat.id===catId);
    
    const selectedCategory=getCategory(catId);
    //const selectedCategory=getCategoryById(catId);
    console.log(selectedCategory);

    // return meals that belong to that category
    const displayedMeals=MEALS.filter(meal=>meal.categoryIds.indexOf(catId)>=0);

    return(
        <View style={styles.screen}>
           <FlatList data={displayedMeals} renderItem={renderMealItem} style={{width:'100%'}}/>
        </View>
    )
};

// we can't get selected Category directly because it may
// not access it is declared within object
// so used this method 
CategoryMealsScreen.navigationOptions=(navigationData)=>{

    let catData=[];

    fetch(`http://${IP.ip}:3000/categories`)
    .then((response)=>response.json())
    .then((response)=>{ catData=response;
    return catData })
    .catch((error)=>console.error(error));
    
    
      const catId=navigationData.navigation.getParam('categoryId');
    console.log(catData);
      const getCategory=((Id)=>catData.filter(cat=>cat.id===Id));
      const selectedCategory=getCategory(catId);
      console.log("hi")
      console.log(selectedCategory.name)
      console.log(typeof(selectedCategory))
      console.log("end")
      //const selectedCategoryName=selectedCategory.find(item=>item.id===catId);
     // console.log(typeof(selectedCategoryName));

      return{
          headerTitle:selectedCategory.name,
          headerStyle:{
            backgroundColor:Colors.primaryColor
        },
        headerTintColor:'white'
      }
}

const styles=StyleSheet.create(
    {
        screen:{
            flex:1,
            alignItems:'center',
            justifyContent:'center'
        }
    }
)

export default CategoryMealsScreen;