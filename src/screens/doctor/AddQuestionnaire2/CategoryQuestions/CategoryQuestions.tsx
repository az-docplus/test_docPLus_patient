import React, { useState, useEffect, useReducer } from 'react'
import { View, Text, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import { Header } from '..'
import Style from './Style'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { hp, wp } from '../../../../components/Scalling'
import { Colors } from '../../../../styles/colorsV3'
import { AddQuestion } from './AddQuestion'
import { QuestionsList } from './Questions'
import VirtualizedView from '../../../../components/VirtualizedList'
import LinearGradient from 'react-native-linear-gradient';
import Loader from '../../../../components/Loader'
import { Host } from '../../../../utils/connection';
import axios from 'axios';
import commonService from '../../../../services/commonServices'
import { useDispatch } from 'react-redux';
import { UpdateCategory } from '../../../../reduxV2/action/QuestionnaireAction'


const CategoryQuestion = (props) => {
    const [catData, setCatData] = useState<any>('')
    const [questionsList, setQuestionsList] = useState([])
    const [addQuestionVisible, setAddQuestionVisible] = useState(false)
    const [updateLoader, setUpdateLoader] = useState(false)
    const [loader, setLoader] = useState(true)
    const [editQuestion,setEditQuestion] = useState<any>('');
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const [editMode,setEditmode] = useState(false);
    const dispatch = useDispatch()



    const onDeleteQuestion = (id:string) => {
    let NewCatdata = {...catData};
    let questionIdArray = [];
    const filterQuestion  = catData.item.questions.filter((item:any)=> item._id !== id);

    NewCatdata.item.questions = filterQuestion;
      setCatData(NewCatdata);
      setQuestionsList(filterQuestion);
    console.log('==========================filterQuestion',filterQuestion);
     
    filterQuestion.forEach((element:any) => {
        questionIdArray.push(element._id)
    });

    const _data = {
        "id": NewCatdata.item._id,
        "title": NewCatdata.item.title,
        "practice": NewCatdata.item.practice,
        "type": NewCatdata.item.type,
        "questions": questionIdArray
    }

    console.log('==========================_data',_data);
    dispatch(UpdateCategory(_data, ()=>{console.log("done");
    }))



      forceUpdate();
     };
console.log('===============================questionsList',questionsList);
console.log('==============================catData',catData);
    useEffect(() => {
        const params = props.route.params
        if(params) {
            if(params.catData) {
                setCatData(params.catData)
                setQuestionsList(params.catData.item.questions)
                setLoader(false)
            }
        }
    }, [])

    const onAddQuestionPress = () => setAddQuestionVisible(true)
    const onAddQuestionClose = () => {setAddQuestionVisible(false); setEditQuestion(''); setEditmode(false);}

    const onUpdatePress = async () => {
        setUpdateLoader(true)
        commonService.asyncLoop(questionsList.length, (loop) => {
            var index = loop.iteration();
            const { category, disabled, option, optionText, root, specialty,
                superQuestion, title, type, updatedAt, __v, _id
            } = questionsList[index]

            if(option[0].linkedQuestion.length !== 0) {
                option[0].linkedQuestion = [option[0].linkedQuestion[0]._id]
            }
            const data = {
                category, disabled, option: JSON.stringify(option),
                optionText, root, specialty, superQuestion, title, type, updatedAt,
                __v, id: _id
            }


            console.log('=================================data',data);
           
            const config: any = {
                Accept: '*/*',
                'Content-Type': 'application/x-www-form-urlencoded',
            };


            axios
                .post(`${Host}/questionnaire/update`, data, config)
                .then((res) => {
                    console.log('update Question Response =>', res.data)
                    loop.next()
                })
                .catch((e) => {
                    setUpdateLoader(false)
                    console.log('Error while updating Question =>', e);
                    Alert.alert('Something went wrong please try again later')
                })
        }, () => {
            setUpdateLoader(false)
            Alert.alert('Questions Updated')
        })
    }

    const onQuestionToggleChange = (data) => {
        setQuestionsList(data)
    }
     const onEditQuestion = (data:any) =>{
         setEditQuestion(data);
         setEditmode(true);
        setAddQuestionVisible(true)

     }
    const onDisableAll = () => {
        questionsList.forEach((element: any) => {
            element.disabled = true
        })
        commonService.asyncLoop(
            questionsList.length, (loop) => {
                var index = loop.iteration();
                questionsList[index].disabled = true
                loop.next()
            },
            () => {
                setQuestionsList(questionsList)
                forceUpdate()
            })
    }

    const updateCategoryArray = (array) => {
        console.log('====================================>>>>>>>>>xxxxxxxx',array);
        setCatData(array)
        forceUpdate()
    }

    return (
        <View style={Style.container}>
            <Header
                back
                title={catData.activeButton}
                navigation={props.navigation}
            />
            {
                loader ?
                    <Loader />
                    :
                    <VirtualizedView>
                        <View style={Style.catNameContainer}>
                            <Text style={Style.catName}>{catData.item.title}</Text>
                            <Text style={Style.catNameQus}>{catData.item.questions.length}</Text>
                        </View>
                        <View style={Style.suggestedQuestionContainer}>
                            <Text style={Style.suggestedText}>Suggested Questions</Text>
                            <TouchableOpacity onPress={onDisableAll}>
                                <Text style={Style.disableAll}>Disable all</Text>
                            </TouchableOpacity>
                        </View>

                        <QuestionsList
                           
                            onEditQuestion={onEditQuestion}
                            onDeleteQuestion={onDeleteQuestion}
                            questions={catData.item.questions}
                            onQuestionToggleChange={onQuestionToggleChange}
                        />


                        <View style={Style.addQuestionBtnContainer}>
                            <Image source={require('../../../../assets/png/addQuestionBox.png')}
                                style={Style.addQuestionImage}
                                resizeMode='stretch'
                            />
                            <TouchableOpacity style={Style.addQuestionBtn}
                                activeOpacity={0.6}
                                onPress={onAddQuestionPress}
                            >
                                <AntDesign name='plus' size={wp(8)} color={Colors.color12} />
                                <Text style={Style.addQuestionBtnText}>Add Customized Question</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={{ marginVertical: hp(3) }}
                            onPress={onUpdatePress}
                        >
                            <LinearGradient
                                colors={[Colors.color12, Colors.color17]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={Style.updateButton}
                            >
                                {
                                    updateLoader ? <ActivityIndicator size='small' color={Colors.white} />
                                        :
                                        <Text style={Style.updateText}>Update</Text>
                                }
                            </LinearGradient>
                        </TouchableOpacity>

                        {
                            addQuestionVisible &&
                            <AddQuestion
                                visible={addQuestionVisible}
                                onClose={onAddQuestionClose}
                                category={catData}
                                editQuestion={editQuestion}
                                editMode={editMode}
                                updateCategoryArray={updateCategoryArray}
                            />
                        }
                    </VirtualizedView>
            }
        </View>
    )
}

export default CategoryQuestion