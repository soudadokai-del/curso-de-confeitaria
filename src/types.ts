export interface Lesson {
  id: string;
  title: string;
  videoUrl: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  lessons: Lesson[];
}

export interface CourseProgress {
  completedLessons: string[]; // Array of lesson IDs
}
