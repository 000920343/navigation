import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const ToDoList = ({ tasks, completeTask, showCompletionMessage }) => {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View
          style={[
            styles.taskRow,
            item.completed ? styles.completedTask : styles.pendingTask,
          ]}
        >
          <Text style={styles.taskText}>{item.text}</Text>
          {item.completed && showCompletionMessage && (
            <Text style={styles.completedMessage}>You have completed this task</Text>
          )}
          {!item.completed && (
            <TouchableOpacity
              style={styles.completeButton}
              onPress={() => completeTask(item.id)}
            >
              <Text style={styles.buttonText}>Mark as Done</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  taskRow: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  completedTask: {
    borderColor: '#4CAF50', 
  },
  pendingTask: {
    borderColor: '#FFC107', 
  },
  taskText: {
    fontSize: 16,
    flex: 1,
  },
  completedMessage: {
    marginTop: 5,
    fontSize: 14,
    color: '#4CAF50',
    fontStyle: 'italic',
  },
  completeButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default ToDoList;
