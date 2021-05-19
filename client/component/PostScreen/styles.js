import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    alignItems: 'center',
  },
  thumbnail: {
    height: 300,
    width: 300,
    resizeMode: 'contain',
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
  },
  button: {
    backgroundColor: '#788eec',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    backgroundColor: '#788eec',
    marginLeft: 15,
    marginRight: 55,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 30,
    marginTop: 80
  }
});
