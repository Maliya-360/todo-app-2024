import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput,Text, TouchableOpacity, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import TodoItem from './TodoItem';
import { Animated } from 'react-native';
import { Easing } from 'react-native';


const styles = (isDarkMode) => StyleSheet.create({
    container: {
      flex: 1,
      padding: 25,
      backgroundColor: isDarkMode ? '#333' : '#f2f2f2',
      margin:20
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 15,
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    inputContainer2: {
      flexDirection:'row',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    textInput: {
      flex: 1,
      padding: 10,
      color: isDarkMode ? '#fff' : '#333',
      textAlign: 'center',
      backgroundColor:'white',
      borderRadius: 8,
      borderColor: '#ddd',
    },
    addButton: {
      marginLeft: -10,
      backgroundColor: '#4CAF50',
      paddingVertical: 6,
      paddingHorizontal: 15,
      borderRadius: 8,
    },
    addButtonText: {
      color: '#fff',
      fontSize: 16,
    },
    clearButton: {
      backgroundColor: '#FF6347',
      paddingVertical: 10,
      paddingHorizontal: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.2,
      shadowRadius: 5,
    },
    clearButtonText: {
      color: '#fff',
      fontSize: 16, 
    },
    title: {
      fontSize: 40,
      fontWeight: 'bold',
      textAlign: 'center',
      color: isDarkMode ? '#fff' : 'white',
        textShadowColor: isDarkMode ? 'black' : 'black',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 2,
    },
    banner: {
      height: 100,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
      overflow: 'hidden',
    },
    scrollContainer: {
      flexGrow: 1,
    },
    showCompletedButton: {
      backgroundColor: '#2196F3',
      paddingVertical: 10,
      paddingHorizontal: 15,
      marginLeft: 10,
    },
    showCompletedButtonText: {
      color: '#fff',
      fontSize: 16,
    },
    showPinnedButton: {
      backgroundColor: '#FF9800',
      paddingVertical: 10,
      paddingHorizontal: 15,
      marginLeft: 10,
    },
    themeToggleButton: {
    padding: 10,
    backgroundColor: '#4B4B4B',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
},
themeToggleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
}
  }
);
  

export default function TodoList() {
  // State Hooks
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Doctor Appointment', completed: true, pinned: false},
    { id: 2, text: 'Meeting at School', completed: false, pinned: false},
  ]);

  const [isDarkMode, setIsDarkMode] = useState(false);
  const currentStyles = styles(isDarkMode);

  const [text, setText] = useState('');
  const [showCompletedOnly, setShowCompletedOnly] = useState(false);
  const [showPinnedOnly, setShowPinnedOnly] = useState(false);

  const scaleValue = useRef(new Animated.Value(1)).current;
  const opacityValue = useRef(new Animated.Value(1)).current;
  
  useEffect(() => {
    const storedTasks = JSON.parse(window.localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    window.localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  

  const animateClearButton = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.7,
        duration: 200,
        easing: Easing.elastic(1.5),
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1.1,
        duration: 200,
        easing: Easing.elastic(1.5),
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 200,
        easing: Easing.elastic(1.5),
        useNativeDriver: true,
      })
    ]).start(() => clearTasks());
  };

  const animateShowCompleted = () => {
    Animated.timing(opacityValue, {
      toValue: showCompletedOnly ? 1 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setShowCompletedOnly(!showCompletedOnly);
  };

  // Function to Add Task
  function addTask() {
    const newTask = { id: Date.now(), text, completed: false, pinned: false};
    setTasks([...tasks, newTask]);
    setText('');
  }
  // Function to Delete Task
  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id));
  }
  // Function to Toggle Task Completion
  function toggleCompleted(id) {
    setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } :  task)));
  }
  
  function togglePin(id) {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, pinned: !task.pinned } : task
    ));
  }
  function clearTasks() {
    setTasks([]);
  }
  function updateTask(id, newText) {
  setTasks(tasks.map(task => 
    task.id === id ? { ...task, text: newText } : task
  ));
  }

  const displayedTasks = tasks
  .filter(task => (showPinnedOnly ? task.pinned : true))
  .filter(task => (showCompletedOnly ? task.completed : true));

  return (
    <View style={currentStyles.container}>

          <TouchableOpacity style={currentStyles.themeToggleButton} onPress={() => setIsDarkMode(!isDarkMode)}>
            <Text style={currentStyles.themeToggleButtonText}>
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </Text>
          </TouchableOpacity>

      <ImageBackground
        source={{ uri: 'https://img.freepik.com/free-photo/neutral-marble-gray-background_53876-102738.jpg' }}
        style={currentStyles.banner}
        resizeMode="cover"
      >
        <Text style={currentStyles.title}>ToDo-App</Text>
      </ImageBackground>
      
      <View style={currentStyles.inputContainer2}>

        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <TouchableOpacity style={currentStyles.clearButton} onPress={animateClearButton}>
            <Text style={currentStyles.clearButtonText}>Clear All</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={{ opacity: opacityValue }}>
          <TouchableOpacity
            style={currentStyles.showCompletedButton}
            onPress={animateShowCompleted}
          >
            <Text style={currentStyles.showCompletedButtonText}>
              {showCompletedOnly ? 'Show All' : 'Completed'}
            </Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={{ opacity: opacityValue }}>
          <TouchableOpacity
            style={currentStyles.showPinnedButton}
            onPress={() => setShowPinnedOnly(!showPinnedOnly)} 
          >
            <Text style={currentStyles.showCompletedButtonText}>
              {showPinnedOnly ? 'Show All' : 'Pinned'}
            </Text>
          </TouchableOpacity>
        </Animated.View>

      </View>

      <View style={currentStyles.inputContainer}>
        <TextInput
          style={currentStyles.textInput}
          value={text}
          onChangeText={setText}
          placeholder="New Task"
          placeholderTextColor="#999"
          onSubmitEditing={addTask}
        />
        
        <TouchableOpacity style={currentStyles.addButton} onPress={addTask}>
          <Text style={currentStyles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={currentStyles.scrollContainer}>
      {displayedTasks.map(task => (
        <TodoItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          toggleCompleted={toggleCompleted}
          togglePin={togglePin}
          updateTask={updateTask}
        />
      ))}
      </ScrollView>
    </View>
  );
}