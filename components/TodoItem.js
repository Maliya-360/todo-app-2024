import React from 'react';
import { useState } from 'react';
import { View, Text, Button,TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import CheckBox from 'expo-checkbox';

const styles = StyleSheet.create({
    todoItem: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical:10,
      paddingHorizontal: 15,
      marginVertical: 5,
      marginHorizontal:'6vw',
      borderColor: '#ddd',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.4,
      shadowRadius: 2,
      elevation: 2,
    },
    checkboxContainer: {
      marginRight: 10,
      width:'95%',
    },
    todoItemText: {
      flex: 1,
      fontSize: 16,
      color: '#333',
      marginTop:-5,
      marginLeft:10,
    },
    completed: {
      textDecorationLine: 'line-through',
      color: '#999',
    },
      editButton: {
      backgroundColor: '#007BFF',
      paddingVertical: 6,
      paddingHorizontal: 10,
      marginRight: 10,
    },
    buttonText: {
    color: '#fff',
    fontSize: 14,
    },
    input: {
      flex: 1,
      padding: 5,
      fontSize: 16,
      color: '#333',
      borderColor: '#ddd',
      borderWidth: 1,
      borderRadius: 5,
    },
    deleteButton: {
      backgroundColor: '#FF6347',
      paddingVertical: 6,
      paddingHorizontal: 10,
    },
    deleteButtonText: {
      color: '#fff',
      fontSize: 14,
    },
    pinButton: {
      backgroundColor: '#FFD700',
      paddingVertical: 6,
      paddingHorizontal: 10,
      marginRight: 10,
    },
    pinButtonText: {
      color: '#fff',
      fontSize: 14,
    },
    buttonContainer: {
      flexDirection: 'row',
      marginTop: 10,
    },
    buttonContainer2: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical:10,
      paddingHorizontal: 15,
      marginVertical: 5,
      backgroundColor: 'white',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    }
});
  

export default function TodoItem({ task, deleteTask, toggleCompleted, togglePin, updateTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const handleSaveEdit = () => {
    updateTask(task.id, editedText);
    setIsEditing(false);
  };

  return (
    <View style={styles.todoItem}>
      <View style={styles.checkboxContainer}>
        <View style={styles.buttonContainer2}>
          <CheckBox
            value={task.completed}
            onValueChange={() => toggleCompleted(task.id)}
            tintColors={{ true: '#4CAF50', false: '#ccc' }}
          />
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={editedText}
              onChangeText={setEditedText}
              onSubmitEditing={handleSaveEdit}
            />
          ) : (
            <Text style={[styles.todoItemText, task.completed && styles.completed]}>
              {task.text}
            </Text>
          )}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => {
            if (isEditing) {
              handleSaveEdit();
            } else {
              setIsEditing(true);
            }
          }}
        >
          <Text style={styles.buttonText}>{isEditing ? 'Save' : 'Edit'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.pinButton}
          onPress={() => togglePin(task.id)}
        >
          <Text style={styles.pinButtonText}>{task.pinned ? 'Unpin' : 'Pin'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteTask(task.id)}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}