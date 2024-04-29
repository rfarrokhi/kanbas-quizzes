import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid';

interface QuizState {
    quizzes: Quizable[]
    currentQuiz: Quizable | null
    currentQuestion: QuizQuestion | null
    setCurrentQuiz: (quiz: Quizable | null) => void
    setCurrentQuestion: (question: QuizQuestion | null) => void
    addQuiz: (quiz: Quizable) => void
    updateQuiz: (quiz: Quizable) => void
    deleteQuiz: (quiz: Quizable) => void
    resetStore: () => void
}

interface Quizable {
    id: string
    courseId: string
    title: string
    published: boolean
    instructions: string
    type: QuizType
    assignmentGroup: QuizAssignmentGroup
    shuffleAnswers: boolean
    timeLimit: number
    multipleAttempts: boolean
    showCorrectAnswers: boolean
    accessCode: string
    oneQuestionAtATime: boolean
    webcamRequired: boolean
    lockQuestionsAfterAnswering: boolean
    dueDate: Date
    availableDate: Date
    untilDate: Date
    questions: QuizQuestion[]
    getAvailabilityStatus: () => string
    getPoints: () => number
    updateInStore: () => void
    createQuestion: () => QuizQuestion
    updateQuestion: (question: QuizQuestion) => void
    deleteQuestion: (question: QuizQuestion) => void
    delete: () => void
}

export class Quiz implements Quizable {
    id: string
    courseId: string
    title: string
    published: boolean
    instructions: string
    type: QuizType
    assignmentGroup: QuizAssignmentGroup
    shuffleAnswers: boolean
    timeLimit: number
    multipleAttempts: boolean
    showCorrectAnswers: boolean
    accessCode: string
    oneQuestionAtATime: boolean
    webcamRequired: boolean
    lockQuestionsAfterAnswering: boolean
    dueDate: Date
    availableDate: Date
    untilDate: Date
    questions: QuizQuestion[]

    constructor(courseId: string) {
        this.id = uuidv4()
        this.courseId = courseId
        this.title = "New Quiz"
        this.published = false
        this.instructions = ""
        this.type = QuizType.GradedQuiz
        this.assignmentGroup = QuizAssignmentGroup.Quizzes
        this.shuffleAnswers = false
        this.timeLimit = 20 // 20 minutes
        this.multipleAttempts = false
        this.showCorrectAnswers = false
        this.accessCode = ''
        this.oneQuestionAtATime = true
        this.webcamRequired = false
        this.lockQuestionsAfterAnswering = false
        this.dueDate = new Date()
        this.availableDate = new Date()
        this.untilDate = new Date()
        this.questions = []
        useQuizStore.getState().addQuiz(this)
        useQuizStore.getState().setCurrentQuiz(this)
    }

    getAvailabilityStatus() {
        const now = new Date()
        if (now < this.availableDate) {
            return `Not available until ${this.availableDate.toLocaleDateString()}`
        } else if (now > this.untilDate) {
            return "Closed"
        } else {
            return `Available until ${this.untilDate.toLocaleDateString()}`
        }
    }

    getPoints() {
        return this.questions.reduce((acc, question) => acc + question.points, 0)
    }

    updateInStore() {
        useQuizStore.getState().updateQuiz(this)
    }

    createQuestion(): QuizQuestion {
        const question = {
            id: uuidv4(),
            title: "New Question",
            type: QuizQuestionType.MultipleChoice,
            question: "",
            points: 1,
            correctAnswer: "",
            choices: []
        }
        this.questions.push(question)
        useQuizStore.getState().setCurrentQuestion(question)
        this.updateInStore()
        return question;
    }

    updateQuestion(question: QuizQuestion) {
        this.questions = this.questions.map(q => q.id === question.id ? question : q)
        this.updateInStore()
    }

    deleteQuestion(question: QuizQuestion) {
        this.questions = this.questions.filter(q => q.id !== question.id)
        useQuizStore.getState().setCurrentQuestion(null)
        this.updateInStore()
    }

    delete() {
        useQuizStore.getState().deleteQuiz(this)
    }
}

export interface QuizQuestion {
    id: string
    title: string
    type: QuizQuestionType
    question: string
    points: number
    correctAnswer: string | boolean | string[]
}

export interface MultipleChoiceQuestion extends QuizQuestion {
    choices: string[]
    correctAnswer: string
}

export interface TrueFalseQuestion extends QuizQuestion {
    correctAnswer: boolean
}

export interface FillInMultipleBlanksQuestion extends QuizQuestion {
    correctAnswers: string[]
}

export enum QuizQuestionType {
    MultipleChoice = "Multiple Choice",
    TrueFalse = "True/False",
    FillInMultipleBlanks = "Fill in Multiple Blanks",
}

export enum QuizType {
    GradedQuiz = "Graded Quiz",
    PracticeQuiz = "Practice Quiz",
    GradedSurvey = "Graded Survey",
    UngradedSurvey = "Ungraded Survey"
}

export enum QuizAssignmentGroup {
    Quizzes = "Quizzes",
    Exams = "Exams",
    Assignments = "Assignments",
    Project = "Project"
}

const useQuizStore = create<QuizState>()((set) => ({
    quizzes: [],
    currentQuiz: null,
    currentQuestion: null,
    setCurrentQuiz: (quiz) => set({ currentQuiz: quiz }),
    setCurrentQuestion: (question) => set({ currentQuestion: question }),
    addQuiz: (quiz) => set((state) => ({ quizzes: [quiz, ...state.quizzes] })),
    updateQuiz: (quiz) => set((state) => ({ quizzes: state.quizzes.map(q => q.id === quiz.id ? quiz : q) })),
    deleteQuiz: (quiz) => set((state) => ({ quizzes: state.quizzes.filter(q => q.id !== quiz.id) })),
    resetStore: () => set({ quizzes: [] })
}))
export default useQuizStore