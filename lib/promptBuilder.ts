export const createPrompt = (name: string, matric: string) => `
You're writing a CSC201 assignment on "Multiprocessing and Scheduling" for a student named ${name} with matric number ${matric}.

Write a clear, unique answer that includes:
1. A detailed explanation of multiprocessing.
2. The advantages and disadvantages.
3. A sample Python code snippet.
4. A conclusion.

Use formal academic tone. Format code properly. Keep answer original.
`;
