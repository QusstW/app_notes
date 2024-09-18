import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import Headerlayout from "@/components/HeaderLayout";
import React, { useState } from "react";
import { TNote } from "@/types/types";
import uuid from "react-native-uuid";
import { addNote, deleteNote, fetchNotes } from "@/api/api";

const NoteItem = ({
  title,
  message,
  id,
}: {
  title: string;
  message: string;
  id: string;
}) => {
  return (
    <View style={styles.note}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message} numberOfLines={1}>
          {message}
        </Text>
      </View>
      <View>
        <Text
          onPress={(e) => {
            e.preventDefault();
            deleteNote(id);
          }}
          style={{ color: "red" }}
        >
          Удалить
        </Text>
      </View>
    </View>
  );
};

export default function NotesScreen() {
  const [notes, setNotes] = useState<TNote[]>([]);

  React.useEffect(() => {
    fetchNotes(setNotes);
  }, []);

  const getDefaultNoteData = () => {
    return {
      id: uuid.v4() as string,
      title: `Новая заметка ${notes.length + 1}`,
      content: "",
    };
  };

  const onAddNote = async () => {
    const defaultNoteData = getDefaultNoteData();
    addNote(defaultNoteData);
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <Headerlayout marginTop={StatusBar.currentHeight}>
        <View style={styles.header}>
          <Ionicons
            onPress={onAddNote}
            style={styles.addIcon}
            name="add-circle-outline"
            size={24}
            color="white"
          />
        </View>
      </Headerlayout>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.notesContainer}>
          {notes.map((note) => (
            <Link key={note.id} href={`/note/${note.id}`}>
              <NoteItem
                title={note.title}
                message={note.content}
                id={note.id}
                key={note.id}
              />
            </Link>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "gray",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  addIcon: {
    marginRight: 20,
  },
  notesContainer: {},
  note: {
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgb(114 114 114)",
    minWidth: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  title: {},
  message: {
    marginTop: 15,
    maxWidth: 300,
  },
});
