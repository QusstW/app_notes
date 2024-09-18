import { ref, set, remove, update, onValue } from "firebase/database";
import { TNote } from "@/types/types";
import { database } from "@/app/firebase";

export const addNote = (note: TNote) => {
  set(ref(database, "notes/" + note.id), {
    title: note.title,
    content: note.content,
  })
    .then(() => {
      console.log("Заметка добавлена!");
    })
    .catch((error) => {
      console.error("Ошибка добавления заметки: ", error);
    });
};

export const fetchNotes = (
  setNotes: React.Dispatch<React.SetStateAction<TNote[]>>
) => {
  const notesRef = ref(database, "notes/");
  onValue(
    notesRef,
    (snapshot) => {
      const notesData = snapshot.val();
      const notesList = notesData
        ? Object.entries(notesData).map(([id, data]) => {
            return { id, ...(data as { content: string; title: string }) };
          })
        : [];
      setNotes(notesList);
    },
    {
      onlyOnce: false,
    }
  );
};

export const deleteNote = (noteId: string) => {
  remove(ref(database, "notes/" + noteId))
    .then(() => {
      console.log("Заметка удалена!");
    })
    .catch((error) => {
      console.error("Ошибка удаления заметки: ", error);
    });
};

export const editNote = (note: TNote) => {
  update(ref(database, "notes/" + note.id), {
    title: note.title,
    content: note.content,
  })
    .then(() => {
      console.log("Заметка отредактирована!");
    })
    .catch((error) => {
      console.error("Ошибка редактирования заметки: ", error);
    });
};
