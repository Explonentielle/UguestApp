import {TouchableOpacity, Text, StyleSheet} from 'react-native';

export default function Button({children, onPress, disabled = false}) {
  return (
    <TouchableOpacity disabled={disabled} style={[styles.button, disabled && {opacity: 0.5}]} onPress={onPress}>
      <Text style={styles.content}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'rgb(255 108 222)',
    marginBottom: 10,
    marginTop: 10,
    paddingHorizontal: 40,
    paddingVertical: 10,
    alignSelf: 'center',
    borderRadius: 10,
  },
  content: {
    color: '#fff',
    fontSize: 26,
  },
});
