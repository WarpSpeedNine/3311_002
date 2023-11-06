PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS "Muscle_Group" (
    "MG_ID" INTEGER PRIMARY KEY AUTOINCREMENT, 
    "Area" TEXT
);

INSERT INTO Muscle_Group (Area) VALUES ('Bicep');
INSERT INTO Muscle_Group (Area) VALUES ('Tricep');
INSERT INTO Muscle_Group (Area) VALUES ('Legs');
INSERT INTO Muscle_Group (Area) VALUES ('Back');
INSERT INTO Muscle_Group (Area) VALUES ('Shoulders');
INSERT INTO Muscle_Group (Area) VALUES ('Abdominals');

CREATE TABLE IF NOT EXISTS "Type" (
    "T_ID" INTEGER PRIMARY KEY AUTOINCREMENT, 
    "Type" TEXT
);

INSERT INTO Type (Type) VALUES ('Free weights');
INSERT INTO Type (Type) VALUES ('Calisthenics');
INSERT INTO Type (Type) VALUES ('Machine');

CREATE TABLE IF NOT EXISTS "Exercises" (
    "ID" INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE, 
    "Name" TEXT, 
    "MGroupID" INTEGER, 
    "TypeID" INTEGER, 
    FOREIGN KEY("MGroupID") REFERENCES "Muscle_Group"("MG_ID"),
    FOREIGN KEY("TypeID") REFERENCES "Type"("T_ID")
);

CREATE TABLE IF NOT EXISTS "Routines" (
    "RoutineID" INTEGER PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "Description" TEXT,
    "CreatedAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "RoutineExercises" (
    "RoutineID" INTEGER,
    "ExerciseID" INTEGER,
    PRIMARY KEY ("RoutineID", "ExerciseID"),
    FOREIGN KEY("RoutineID") REFERENCES "Routines"("RoutineID"),
    FOREIGN KEY("ExerciseID") REFERENCES "Exercises"("ID")
);

CREATE TABLE IF NOT EXISTS "CalendarEntries" (
    "EntryID" INTEGER PRIMARY KEY AUTOINCREMENT,
    "EntryDate" DATE NOT NULL,
    "RoutineID" INTEGER,
    "Comments" TEXT,
    FOREIGN KEY("RoutineID") REFERENCES "Routines"("RoutineID")
);

CREATE TABLE IF NOT EXISTS "LoggedWorkouts" (
    "LoggedWorkoutID" INTEGER PRIMARY KEY AUTOINCREMENT,
    "CalendarEntryID" INTEGER,
    "ExerciseID" INTEGER,
    "SetNumber" INTEGER NOT NULL,
    "Repetitions" INTEGER NOT NULL,
    "Weight" INTEGER NOT NULL,
    FOREIGN KEY("CalendarEntryID") REFERENCES "CalendarEntries"("EntryID"),
    FOREIGN KEY("ExerciseID") REFERENCES "Exercises"("ID")
);

COMMIT;