import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  FileUp,
  ClipboardList,
  Check,
  Upload,
  Eye,
  EyeOff,
  Trash2,
  Lock,
  FileText,
  Video,
  Presentation,
  Users,
  GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ClassSubject {
  id: string;
  program: string;
  semester: string;
  section: string;
  subject: string;
  subjectCode: string;
}

interface Topic {
  id: string;
  name: string;
  hours: number;
  completed: boolean;
}

interface Material {
  id: string;
  name: string;
  type: "pdf" | "ppt" | "video";
  size: string;
  visible: boolean;
  uploadDate: string;
}

interface StudentMark {
  id: string;
  rollNo: string;
  name: string;
  test1: number;
  test2: number;
  quiz: number;
  assignment: number;
  total?: number;
}

// Classes handled by the faculty
const classesHandled: ClassSubject[] = [
  { id: "1", program: "B.E - CSE", semester: "3", section: "A", subject: "Data Structures & Algorithms", subjectCode: "CS3301" },
  { id: "2", program: "B.Tech - AI&DS", semester: "4", section: "A", subject: "Computer Networks", subjectCode: "CS3591" },
  { id: "3", program: "B.Tech - IT", semester: "4", section: "B", subject: "Web Technology", subjectCode: "IT3401" },
  { id: "4", program: "B.E - CSE", semester: "5", section: "B", subject: "Machine Learning", subjectCode: "CS3501" },
  { id: "5", program: "B.Tech - AI&DS", semester: "6", section: "A", subject: "Deep Learning", subjectCode: "AD3601" },
];

// Syllabus data per class
const syllabusDataByClass: Record<string, Topic[]> = {
  "1": [
    { id: "1", name: "Introduction to Data Structures", hours: 3, completed: true },
    { id: "2", name: "Arrays and Linked Lists", hours: 6, completed: true },
    { id: "3", name: "Stacks and Queues", hours: 5, completed: true },
    { id: "4", name: "Trees and Binary Trees", hours: 8, completed: false },
    { id: "5", name: "Graphs and Traversals", hours: 8, completed: false },
    { id: "6", name: "Sorting Algorithms", hours: 6, completed: false },
  ],
  "2": [
    { id: "1", name: "Introduction to Networks", hours: 4, completed: true },
    { id: "2", name: "Physical Layer", hours: 5, completed: true },
    { id: "3", name: "Data Link Layer", hours: 6, completed: false },
    { id: "4", name: "Network Layer", hours: 8, completed: false },
    { id: "5", name: "Transport Layer", hours: 6, completed: false },
  ],
  "3": [
    { id: "1", name: "HTML5 & CSS3", hours: 6, completed: true },
    { id: "2", name: "JavaScript Fundamentals", hours: 8, completed: true },
    { id: "3", name: "React.js Basics", hours: 8, completed: true },
    { id: "4", name: "Node.js Backend", hours: 6, completed: false },
    { id: "5", name: "Database Integration", hours: 6, completed: false },
  ],
  "4": [
    { id: "1", name: "Introduction to ML", hours: 4, completed: true },
    { id: "2", name: "Supervised Learning", hours: 8, completed: false },
    { id: "3", name: "Unsupervised Learning", hours: 6, completed: false },
    { id: "4", name: "Neural Networks", hours: 8, completed: false },
  ],
  "5": [
    { id: "1", name: "Deep Learning Fundamentals", hours: 4, completed: true },
    { id: "2", name: "Convolutional Neural Networks", hours: 8, completed: false },
    { id: "3", name: "Recurrent Neural Networks", hours: 6, completed: false },
    { id: "4", name: "Transformers & Attention", hours: 8, completed: false },
  ],
};

// Materials data per class
const materialsDataByClass: Record<string, Material[]> = {
  "1": [
    { id: "1", name: "Data Structures Introduction.pdf", type: "pdf", size: "2.3 MB", visible: true, uploadDate: "2024-01-10" },
    { id: "2", name: "Arrays Deep Dive.ppt", type: "ppt", size: "5.1 MB", visible: true, uploadDate: "2024-01-12" },
    { id: "3", name: "Linked List Tutorial", type: "video", size: "45 MB", visible: false, uploadDate: "2024-01-14" },
  ],
  "2": [
    { id: "1", name: "Network Basics.pdf", type: "pdf", size: "3.2 MB", visible: true, uploadDate: "2024-01-08" },
    { id: "2", name: "OSI Model.ppt", type: "ppt", size: "4.5 MB", visible: true, uploadDate: "2024-01-10" },
  ],
  "3": [
    { id: "1", name: "HTML5 Guide.pdf", type: "pdf", size: "2.1 MB", visible: true, uploadDate: "2024-01-05" },
    { id: "2", name: "React Tutorial", type: "video", size: "120 MB", visible: true, uploadDate: "2024-01-15" },
  ],
  "4": [
    { id: "1", name: "ML Introduction.pdf", type: "pdf", size: "4.2 MB", visible: true, uploadDate: "2024-01-12" },
  ],
  "5": [
    { id: "1", name: "Deep Learning Basics.pdf", type: "pdf", size: "5.5 MB", visible: true, uploadDate: "2024-01-18" },
  ],
};

// Student marks data per class
const studentMarksDataByClass: Record<string, StudentMark[]> = {
  "1": [
    { id: "1", rollNo: "CSE001", name: "Aditya Kumar", test1: 18, test2: 17, quiz: 9, assignment: 8 },
    { id: "2", rollNo: "CSE002", name: "Priya Sharma", test1: 20, test2: 19, quiz: 10, assignment: 10 },
    { id: "3", rollNo: "CSE003", name: "Rahul Verma", test1: 15, test2: 16, quiz: 8, assignment: 7 },
  ],
  "2": [
    { id: "1", rollNo: "AD001", name: "Sneha Patel", test1: 19, test2: 18, quiz: 9, assignment: 9 },
    { id: "2", rollNo: "AD002", name: "Vikram Singh", test1: 17, test2: 16, quiz: 8, assignment: 8 },
  ],
  "3": [
    { id: "1", rollNo: "IT001", name: "Ananya Rao", test1: 20, test2: 20, quiz: 10, assignment: 10 },
    { id: "2", rollNo: "IT002", name: "Karthik Nair", test1: 16, test2: 17, quiz: 7, assignment: 8 },
  ],
  "4": [
    { id: "1", rollNo: "CSE101", name: "Meera Iyer", test1: 18, test2: 19, quiz: 9, assignment: 9 },
  ],
  "5": [
    { id: "1", rollNo: "AD101", name: "Arjun Menon", test1: 19, test2: 18, quiz: 10, assignment: 9 },
  ],
};

const typeIcons = {
  pdf: FileText,
  ppt: Presentation,
  video: Video,
};

export default function Academics() {
  const [selectedClassId, setSelectedClassId] = useState(classesHandled[0].id);
  const [topicsData, setTopicsData] = useState<Record<string, Topic[]>>(syllabusDataByClass);
  const [materialsData, setMaterialsData] = useState<Record<string, Material[]>>(materialsDataByClass);
  const [marksData, setMarksData] = useState<Record<string, StudentMark[]>>(studentMarksDataByClass);
  const [lockedClasses, setLockedClasses] = useState<Record<string, boolean>>({});

  const selectedClass = classesHandled.find(c => c.id === selectedClassId)!;
  const topics = topicsData[selectedClassId] || [];
  const materials = materialsData[selectedClassId] || [];
  const marks = marksData[selectedClassId] || [];
  const isLocked = lockedClasses[selectedClassId] || false;

  const completedTopics = topics.filter((t) => t.completed).length;
  const totalHours = topics.reduce((acc, t) => acc + t.hours, 0);
  const completedHours = topics.filter((t) => t.completed).reduce((acc, t) => acc + t.hours, 0);
  const progressPercentage = totalHours > 0 ? (completedHours / totalHours) * 100 : 0;

  const toggleTopic = (id: string) => {
    setTopicsData((prev) => ({
      ...prev,
      [selectedClassId]: prev[selectedClassId].map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      ),
    }));
  };

  const toggleVisibility = (id: string) => {
    setMaterialsData((prev) => ({
      ...prev,
      [selectedClassId]: prev[selectedClassId].map((m) =>
        m.id === id ? { ...m, visible: !m.visible } : m
      ),
    }));
  };

  const lockMarks = () => {
    setLockedClasses((prev) => ({
      ...prev,
      [selectedClassId]: true,
    }));
  };

  const calculateTotal = (student: StudentMark) => {
    const weightage = {
      test1: 0.25,
      test2: 0.25,
      quiz: 0.2,
      assignment: 0.3,
    };
    return Math.round(
      student.test1 * weightage.test1 +
      student.test2 * weightage.test2 +
      student.quiz * 2 * weightage.quiz +
      student.assignment * weightage.assignment * 10
    );
  };

  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="page-header font-serif">Academic Activities</h1>
        <p className="text-muted-foreground -mt-4">
          Manage syllabus, materials, and internal marks for your classes
        </p>
      </motion.div>

      {/* Class Selector */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="widget-card mb-6"
      >
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Select Class</p>
              <p className="font-semibold text-foreground">Choose a class to manage</p>
            </div>
          </div>
          <div className="flex-1 md:max-w-md">
            <Select value={selectedClassId} onValueChange={setSelectedClassId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a class" />
              </SelectTrigger>
              <SelectContent>
                {classesHandled.map((cls) => (
                  <SelectItem key={cls.id} value={cls.id}>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-secondary" />
                      <span>{cls.program} - Sem {cls.semester} - Sec {cls.section}</span>
                      <Badge variant="outline" className="ml-2">{cls.subjectCode}</Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Selected Class Info */}
        <div className="mt-4 p-4 bg-muted/50 rounded-lg border border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Program</p>
              <p className="font-semibold text-foreground">{selectedClass.program}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Semester / Section</p>
              <p className="font-semibold text-foreground">Sem {selectedClass.semester} - Sec {selectedClass.section}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Subject Code</p>
              <p className="font-semibold text-secondary">{selectedClass.subjectCode}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Subject Name</p>
              <p className="font-semibold text-foreground">{selectedClass.subject}</p>
            </div>
          </div>
        </div>
      </motion.div>

      <Tabs defaultValue="syllabus" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="syllabus" className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Syllabus
          </TabsTrigger>
          <TabsTrigger value="materials" className="flex items-center gap-2">
            <FileUp className="w-4 h-4" />
            Study Materials
          </TabsTrigger>
          <TabsTrigger value="marks" className="flex items-center gap-2">
            <ClipboardList className="w-4 h-4" />
            Internal Marks
          </TabsTrigger>
        </TabsList>

        <TabsContent value="syllabus">
          {/* Progress Overview */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="widget-card mb-6"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {selectedClass.subject}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {selectedClass.program} • Semester {selectedClass.semester} • Section {selectedClass.section}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-secondary">
                  {completedTopics}/{topics.length}
                </p>
                <p className="text-xs text-muted-foreground">Topics Completed</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Hours Covered</span>
                <span className="font-medium">{completedHours}/{totalHours} hrs</span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
            </div>
          </motion.div>

          {/* Topics List */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="widget-card"
          >
            <h3 className="section-title">Syllabus Topics</h3>
            <div className="space-y-3">
              {topics.map((topic, index) => (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-lg border transition-all cursor-pointer",
                    topic.completed
                      ? "bg-success/5 border-success/30"
                      : "bg-muted/30 border-border hover:border-primary/30"
                  )}
                  onClick={() => toggleTopic(topic.id)}
                >
                  <div className="flex items-center gap-4">
                    <Checkbox checked={topic.completed} />
                    <div>
                      <p className={cn(
                        "font-medium",
                        topic.completed && "line-through text-muted-foreground"
                      )}>
                        {topic.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{topic.hours} hours</p>
                    </div>
                  </div>
                  {topic.completed && (
                    <Check className="w-5 h-5 text-success" />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="materials">
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="widget-card mb-6"
          >
            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <Upload className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
              <p className="font-medium text-foreground mb-1">
                Drag and drop files here
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                or click to browse (PDF, PPT, Video links)
              </p>
              <Button variant="outline">
                <FileUp className="w-4 h-4 mr-2" />
                Upload Files
              </Button>
            </div>
          </motion.div>

          {/* Materials List */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="widget-card"
          >
            <h3 className="section-title">Uploaded Materials for {selectedClass.subject}</h3>
            {materials.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No materials uploaded yet for this class
              </div>
            ) : (
              <div className="space-y-3">
                {materials.map((material, index) => {
                  const Icon = typeIcons[material.type];
                  return (
                    <motion.div
                      key={material.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border hover:border-primary/30 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "p-2 rounded-lg",
                          material.type === "pdf" && "bg-destructive/10",
                          material.type === "ppt" && "bg-warning/10",
                          material.type === "video" && "bg-secondary/10"
                        )}>
                          <Icon className={cn(
                            "w-5 h-5",
                            material.type === "pdf" && "text-destructive",
                            material.type === "ppt" && "text-warning",
                            material.type === "video" && "text-secondary"
                          )} />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{material.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {material.size} • {material.uploadDate}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          {material.visible ? (
                            <Eye className="w-4 h-4 text-success" />
                          ) : (
                            <EyeOff className="w-4 h-4 text-muted-foreground" />
                          )}
                          <Switch
                            checked={material.visible}
                            onCheckedChange={() => toggleVisibility(material.id)}
                          />
                        </div>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                        </Button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </TabsContent>

        <TabsContent value="marks">
          {/* Lock Banner */}
          {isLocked && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-warning/10 border border-warning/30 rounded-lg p-4 mb-6 flex items-center gap-3"
            >
              <Lock className="w-5 h-5 text-warning" />
              <p className="text-sm text-warning font-medium">
                Marks have been locked and submitted to Controller of Exams for {selectedClass.subject}
              </p>
            </motion.div>
          )}

          {/* Marks Table */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="widget-card"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="section-title mb-0">Internal Marks Entry - {selectedClass.subject}</h3>
                <p className="text-xs text-muted-foreground">
                  Weightage: Test 1 (25%) + Test 2 (25%) + Quiz (20%) + Assignment (30%)
                </p>
              </div>
              <Button
                className={isLocked ? "bg-muted" : "bg-primary hover:bg-primary/90"}
                disabled={isLocked}
                onClick={lockMarks}
              >
                <Lock className="w-4 h-4 mr-2" />
                Lock Marks
              </Button>
            </div>

            {marks.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No students found for this class
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 text-sm font-semibold text-muted-foreground">Roll No</th>
                      <th className="text-left p-3 text-sm font-semibold text-muted-foreground">Name</th>
                      <th className="text-center p-3 text-sm font-semibold text-muted-foreground">Test 1 (20)</th>
                      <th className="text-center p-3 text-sm font-semibold text-muted-foreground">Test 2 (20)</th>
                      <th className="text-center p-3 text-sm font-semibold text-muted-foreground">Quiz (10)</th>
                      <th className="text-center p-3 text-sm font-semibold text-muted-foreground">Assignment (10)</th>
                      <th className="text-center p-3 text-sm font-semibold text-primary">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {marks.map((student, index) => (
                      <motion.tr
                        key={student.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b hover:bg-muted/30 transition-colors"
                      >
                        <td className="p-3 text-sm font-mono">{student.rollNo}</td>
                        <td className="p-3 text-sm font-medium">{student.name}</td>
                        <td className="p-3">
                          <Input
                            type="number"
                            value={student.test1}
                            className="w-16 text-center mx-auto"
                            disabled={isLocked}
                            max={20}
                            min={0}
                          />
                        </td>
                        <td className="p-3">
                          <Input
                            type="number"
                            value={student.test2}
                            className="w-16 text-center mx-auto"
                            disabled={isLocked}
                            max={20}
                            min={0}
                          />
                        </td>
                        <td className="p-3">
                          <Input
                            type="number"
                            value={student.quiz}
                            className="w-16 text-center mx-auto"
                            disabled={isLocked}
                            max={10}
                            min={0}
                          />
                        </td>
                        <td className="p-3">
                          <Input
                            type="number"
                            value={student.assignment}
                            className="w-16 text-center mx-auto"
                            disabled={isLocked}
                            max={10}
                            min={0}
                          />
                        </td>
                        <td className="p-3 text-center">
                          <span className="px-3 py-1 bg-primary/10 text-primary font-bold rounded-full">
                            {calculateTotal(student)}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
}
