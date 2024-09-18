import React from "react";
import { View, Text, StyleSheet, TextInput, Keyboard } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Headerlayout from "@/components/HeaderLayout";
import { Link } from "expo-router";
import { TNote } from "@/types/types";
import { editNote, fetchNotes } from "@/api/api";

const NoteDetailScreen = () => {
  const [notes, setNotes] = React.useState<TNote[]>([]);
  const { id } = useLocalSearchParams();

  const [title, setTitle] = React.useState("");
  const [message, setMessage] = React.useState("");

  const initialLoad = (actualNote: any) => {
    if (actualNote) {
      setTitle(actualNote.title);
      setMessage(actualNote.content);
    }
  };

  React.useEffect(() => {
    fetchNotes(setNotes);
  }, []);

  React.useEffect(() => {
    const actualNote = notes.find((el) => el.id === id);
    initialLoad(actualNote);
  }, [id, notes]);

  const onApply = () => {
    editNote({
      id: id as string,
      content: message,
      title,
    });
    Keyboard.dismiss();
  };

  return (
    <View style={styles.wrapper}>
      <Headerlayout marginTop={50}>
        <View style={styles.header}>
          <Link href="/">
            <View>
              <Text style={{ color: "#0000f3" }}>Назад</Text>
            </View>
          </Link>

          <View>
            <Text style={{ color: "#0000f3" }} onPress={onApply}>
              Готово
            </Text>
          </View>
        </View>
      </Headerlayout>

      <TextInput
        style={styles.titleInput}
        multiline
        value={title}
        onChangeText={(value) => setTitle(value)}
        placeholder="Введите название заметки..."
        onFocus={() => console.log("onfocus")}
        onBlur={() => console.log("onblre")}
      />
      <TextInput
        style={styles.textInput}
        multiline
        value={message}
        onChangeText={(value) => setMessage(value)}
        placeholder="Введите текст заметки..."
        onFocus={() => console.log("onfocus")}
        onBlur={() => console.log("onblre")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "gray",
  },
  textInput: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
  },
  titleInput: {
    paddingBottom: 30,
    paddingTop: 30,
  },
  header: {
    paddingLeft: 10,
    paddingRight: 10,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
  },
});

export default NoteDetailScreen;
