import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomButton from '../utils/CustomButton.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddTask = ({navigation}) => {
  const [Name, setName] = useState('');
  const [Phone, setPhone] = useState('');
  const [Tableid, setTableid] = useState();
  const [dishes, setDishes] = useState('');

  const setTask = async () => {
    if (
      Name.length == 0 ||
      Phone.length == 0 ||
      Tableid.length == 0 ||
      dishes.length == 0
    ) {
      Alert.alert('Warning!', 'Please fill all the details.');
    } else {
      const existingOrder = await AsyncStorage.getItem('Orders');
      let dataArray = existingOrder ? JSON.parse(existingOrder) : [];
      const newData = {Name, Phone, Tableid, dishes, Status: false};
      dataArray.push(newData);
      await AsyncStorage.setItem('Orders', JSON.stringify(dataArray));
      Alert.alert('SuccessFully!', 'Orders Saved.');
      navigation.goBack();
    }
  };

  return (
    <ScrollView>
      <View style={styles.body}>
        <TextInput
          placeholderTextColor={'#adadad'}
          value={Name}
          style={styles.input}
          placeholder="Name"
          onChangeText={value => setName(value)}
        />
        <TextInput
          placeholderTextColor={'#adadad'}
          value={Phone}
          style={styles.input}
          placeholder="Phone"
          keyboardType="numeric"
          onChangeText={value => setPhone(value)}
        />
        <TextInput
          placeholderTextColor={'#adadad'}
          value={Tableid}
          style={styles.input}
          placeholder="Table id"
          keyboardType="numeric"
          onChangeText={value => setTableid(value)}
        />
        <TextInput
          placeholderTextColor={'#adadad'}
          value={dishes}
          style={styles.input}
          placeholder="dishes"
          onChangeText={value => setDishes(value)}
        />
        <CustomButton
          title="Save Order"
          color="#1eb900"
          style={{width: '100%'}}
          onPressFunction={setTask}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#555555',
    borderRadius: 10,
    textAlign: 'left',
    fontSize: 20,
    margin: 10,
    paddingHorizontal: 10,
    color: '#000000',
  },
  text: {
    fontSize: 20,
    color: '#000000',
  },

});

export default AddTask;
