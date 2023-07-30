import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';

const Inactive = ({navigation}) => {
  const [taskList, setTaskList] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    getTasks();
  }, [isFocused]);

  const getTasks = async () => {
    const existingOrder = await AsyncStorage.getItem('Orders');
    setTaskList(JSON.parse(existingOrder));
  };

  const checkTask = async id => {
    const index = taskList.findIndex(task => task.Tableid === id);
    console.log(index);
    if (index > -1) {
      let newTasks = [...taskList];
      newTasks[index].Status = false;
      await AsyncStorage.setItem('Orders', JSON.stringify(newTasks));
      getTasks();
    }
  };

  // console.log(taskList);

  return (
    <View style={styles.body}>
      <FlatList
        data={taskList && taskList.filter(task => task.Status === true)}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.item}>
            <View style={styles.item_row}>
              <View
                style={[
                  {
                    backgroundColor: '#ffffff',
                  },
                  styles.color,
                ]}
              />
              <CheckBox
                tintColors={{true: '#F15927', false: 'black'}}
                value={item.Status}
                onValueChange={() => {
                  checkTask(item.Tableid);
                }}
              />
              <View style={styles.item_body}>
                <Text style={styles.title} numberOfLines={1}>
                  {item.Name}
                </Text>

                <Text style={styles.subtitle} numberOfLines={1}>
                  {item.Phone}
                </Text>
                <Text style={styles.subtitle} numberOfLines={1}>
                  Table Id : {item.Tableid}
                </Text>
                <Text style={styles.subtitle} numberOfLines={1}>
                  Table Id : {item.dishes}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  item_row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item_body: {
    flex: 1,
  },

  item: {
    marginHorizontal: 10,
    marginVertical: 7,
    paddingRight: 10,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 5,
  },
  title: {
    color: '#000000',
    fontSize: 30,
    margin: 5,
  },
  subtitle: {
    color: '#999999',
    fontSize: 20,
    margin: 5,
  },
  color: {
    width: 20,
    height: 100,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
});

export default Inactive;
