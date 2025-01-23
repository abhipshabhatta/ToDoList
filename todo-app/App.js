import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList
} from 'react-native';

export default function App() {
  const [todoList, setTodoList] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // handle editing
  const [editingItemId, setEditingItemId] = useState(null);
  const [editingText, setEditingText] = useState('');

  // Add a new todo item
  const addTodo = () => {
    if (inputValue.trim().length === 0) return;

    const newTodo = {
      id: Date.now().toString(),
      text: inputValue,
    };
    setTodoList([...todoList, newTodo]);
    setInputValue('');
  };

  // Remove a todo item by id
  const removeTodo = (id) => {
    setTodoList(todoList.filter((item) => item.id !== id));
  };

  // Enter "edit mode" for a specific todo item
  const startEditing = (item) => {
    setEditingItemId(item.id);
    setEditingText(item.text);
  };

  // Save the updated text back into the todo item
  const saveEditing = () => {
    if (editingText.trim().length === 0) {
      // If the user clears the text, you could either delete it or revert.
      // Here, we'll just revert to old text, but you could remove or handle differently.
      cancelEditing();
      return;
    }
    const updatedTodos = todoList.map((todo) => {
      if (todo.id === editingItemId) {
        return { ...todo, text: editingText };
      }
      return todo;
    });
    setTodoList(updatedTodos);
    // Exit edit mode
    setEditingItemId(null);
    setEditingText('');
  };

  // Cancel editing and reset the state
  const cancelEditing = () => {
    setEditingItemId(null);
    setEditingText('');
  };

  // Renders each todo item in the list
  const renderTodoItem = ({ item }) => {
    // If this item is currently being edited, show the edit UI
    if (item.id === editingItemId) {
      return (
        <View style={styles.editingItem}>
          <TextInput
            style={styles.editingTextInput}
            value={editingText}
            onChangeText={setEditingText}
          />
          <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={saveEditing}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={cancelEditing}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      );
    }

    // Otherwise, show the normal list item
    return (
      <View style={styles.todoItem}>
        <Text style={styles.todoText}>{item.text}</Text>
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={[styles.button, styles.editButton]} onPress={() => startEditing(item)}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={() => removeTodo(item.id)}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>React Native To-Do List</Text>

      {/* Input to Add New Task */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter a task..."
          value={inputValue}
          onChangeText={setInputValue}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTodo}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Render the List of Todos */}
      <FlatList
        data={todoList}
        keyExtractor={(item) => item.id}
        renderItem={renderTodoItem}
        style={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  textInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  listContainer: {
    marginTop: 10,
  },
  todoItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  todoText: {
    fontSize: 16,
    flex: 1,
  },
  actionsContainer: {
    flexDirection: 'row',
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
    marginLeft: 5,
  },
  editButton: {
    backgroundColor: '#2ecc71',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },

  // Editing Mode Styles
  editingItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  editingTextInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#f9f9f9',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 5,
    paddingHorizontal: 10,
  },
  saveButton: {
    backgroundColor: '#3498db',
  },
  cancelButton: {
    backgroundColor: '#95a5a6',
  },
});
