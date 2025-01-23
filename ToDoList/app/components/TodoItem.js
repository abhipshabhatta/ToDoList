import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const TodoItem = ({ task, onRemove }) => {
  return (
    <View style={styles.todoItem}>
      <Text style={styles.todoText}>{task.title}</Text>
      <Button
        title="Delete"
        color="#FF5C5C"
        onPress={() => onRemove(task.id)}
      />
    </View>
  );
};

export default TodoItem;

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#eee',
    padding: 10,
    marginVertical: 5,
    borderRadius: 4,
  },
  todoText: {
    fontSize: 16,
  },
});
