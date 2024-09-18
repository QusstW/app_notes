import { View, StyleSheet, StatusBar } from "react-native";

const Headerlayout = ({marginTop, children}: {marginTop: number | undefined, children: React.JSX.Element}) => {
  return (
    <View style={{marginTop, ...styles.header}}>
        {children}
    </View>
  );
};

export default Headerlayout

const styles = StyleSheet.create({
    header: {
      display: 'flex',
      height: 30,
      borderBottomColor: 'rgb(114 114 114)',
      borderBottomWidth: 1,
    }
  });