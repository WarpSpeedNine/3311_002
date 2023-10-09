const ExercisesScreen = ({ navigation }) => {
    const handleExerciseSelect = (exercise) => {
      navigation.navigate('LogWorkout', { selectedExercise: exercise });
    };
  
    return (
      <View style={styles.container}>
        {/* Here, add your logic/UI to select an exercise. For simplicity, I'm using buttons: */}
        <TouchableOpacity onPress={() => handleExerciseSelect("Exercise 1")}>
          <Text style={styles.buttonText}>Exercise 1</Text>
        </TouchableOpacity>
        {/* Repeat for other exercises... */}
      </View>
    );
  };
  
  export default ExercisesScreen;