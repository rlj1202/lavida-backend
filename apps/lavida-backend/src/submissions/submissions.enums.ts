export enum SubmissionStatus {
  WAITING = 'waiting',

  CORRECT_ANSWER = 'correct',
  WRONG_ANSWER = 'wrong',

  TIME_EXCEEDED = 'time_exceeded',
  MEMORY_EXCEEDED = 'memory_exceeded',
  /** Submitted code prints too much */
  OUTPUT_EXCEEDED = 'output_exceeded',

  RUNTIME_ERROR = 'runtime_error',
  COMPILE_ERROR = 'compile_error',
}
