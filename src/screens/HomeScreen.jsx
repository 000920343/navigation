import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ImageBackground, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ToDoForm from '../components/ToDoForm';

const HomeScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const loadTasks = async () => {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) setTasks(JSON.parse(storedTasks));
    };
    loadTasks();
  }, []);

  useEffect(() => {
    const saveTasks = async () => {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    };
    saveTasks();
  }, [tasks]);

  const generateUniqueId = () => {
    return Date.now().toString();
  };

  const addTask = (taskText) => {
    const newTask = { id: generateUniqueId(), text: taskText, completed: false };
    setTasks([...tasks, newTask]);
  };

  const toggleTaskStatus = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'All') return true;
    if (filter === 'Completed') return task.completed;
    if (filter === 'Pending') return !task.completed;
  });

  const getBackgroundImage = () => {
    switch (filter) {
      case 'Completed':
        return require('../../assets/background2.jpg');
      case 'Pending':
        return require('../../assets/background3.jpg');
      default:
        return require('../../assets/background1.jpg');
    }
  };

  const renderTaskCard = ({ item }) => (
    <View style={styles.taskCard}>
      <Text style={styles.taskText}>{item.text}</Text>
      <Text style={styles.statusText}>
        {item.completed ? 'Completed' : 'Pending'}
      </Text>
      <View style={styles.taskActions}>
        <TouchableOpacity
          style={[
            styles.statusButton,
            item.completed ? styles.pendingButton : styles.completedButton,
          ]}
          onPress={() => toggleTaskStatus(item.id)}
        >
          <Text style={styles.statusButtonText}>
            {item.completed ? 'Mark as Pending' : 'Mark as Done'}
          </Text>
        </TouchableOpacity>
        {filter === 'Completed' && (
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => removeTask(item.id)}
          >
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <ImageBackground source={getBackgroundImage()} style={styles.background}>
      <View style={styles.filters}>
        <TouchableOpacity
          style={[styles.tabButton, filter === 'All' && styles.activeTab]}
          onPress={() => setFilter('All')}
        >
          <Text style={[styles.tabText, filter === 'All' && styles.activeTabText]}>
            ALL
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, filter === 'Completed' && styles.activeTab]}
          onPress={() => setFilter('Completed')}
        >
          <Text
            style={[
              styles.tabText,
              filter === 'Completed' && styles.activeTabText,
            ]}
          >
            COMPLETED
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, filter === 'Pending' && styles.activeTab]}
          onPress={() => setFilter('Pending')}
        >
          <Text style={[styles.tabText, filter === 'Pending' && styles.activeTabText]}>
            PENDING
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.formHeading}>Add Your Tasks</Text>
      <View style={styles.formContainer}>
        <ToDoForm addTask={addTask} />
      </View>
      <Text style={styles.heading}>
        {filter === 'All'
          ? 'All Tasks'
          : filter === 'Completed'
          ? 'Completed Tasks'
          : 'Pending Tasks'}
      </Text>
      <FlatList
        data={filteredTasks}
        renderItem={renderTaskCard}
        keyExtractor={(item) => item.id} // Ensure unique key
        contentContainerStyle={styles.taskList}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  filters: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 5,
    backgroundColor: '#E0E0E0',
    borderRadius: 0,
  },
  activeTab: {
    backgroundColor: '#2196F3',
  },
  tabText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  formHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
    color: '#FFF',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  formContainer: {
    margin: 10,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
    color: '#FFF',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  taskList: {
    padding: 10,
  },
  taskCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  taskText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statusText: {
    marginTop: 5,
    fontSize: 14,
    color: '#666',
  },
  taskActions: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  statusButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  completedButton: {
    backgroundColor: '#28A745',
  },
  pendingButton: {
    backgroundColor: '#FFC107',
  },
  statusButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  removeButton: {
    backgroundColor: '#DC3545',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  removeButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
