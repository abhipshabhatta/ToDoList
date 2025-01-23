import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Alert,
} from 'react-native';
import TodoItem from '../components/TodoItem';
import dummyData from '../data/dummyData';
import styles from '../styles/styles';

const HomeScreen = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState(dummyData);

  // Add Task Handler
  const addTaskHandler = () => {
    if (task.trim().length === 0) {
      Alert.alert('Invalid Input', 'Please enter a task.');
      return;
    }
    const newTask = {
      id: Date.now().toString(),
      title: task,
    };
    setTasks((prevTasks) => [newTask, ...prevTasks]);
    setTask('');
  };

  // Remove Task Handler
  const removeTaskHandler = (id) => {
    setTasks((prevTasks) => prevTasks.filter((item) => item.id !== id));
  };

  const renderItem = ({ item }) => {
    return <TodoItem task={item} onRemove={removeTaskHandler} />;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>To-Do List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task"
          value={task}
          onChangeText={setTask}
        />
        <Button title="Add" onPress={addTaskHandler} />
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default HomeScreen;
