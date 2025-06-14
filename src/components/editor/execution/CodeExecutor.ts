
export interface ExecutionResult {
  success: boolean;
  output: string;
  error?: string;
  executionTime: number;
  memoryUsage?: number;
  stackTrace?: string;
}

export interface TestCase {
  id: string;
  name: string;
  input: string;
  expectedOutput: string;
  description?: string;
}

export interface TestResult {
  testCase: TestCase;
  passed: boolean;
  actualOutput: string;
  executionTime: number;
  error?: string;
}

export class CodeExecutor {
  private static instance: CodeExecutor;
  private workers: Map<string, Worker> = new Map();
  private pyodideReady = false;

  static getInstance(): CodeExecutor {
    if (!CodeExecutor.instance) {
      CodeExecutor.instance = new CodeExecutor();
    }
    return CodeExecutor.instance;
  }

  async initializePyodide(): Promise<void> {
    if (this.pyodideReady) return;
    
    try {
      // @ts-ignore
      const pyodide = await loadPyodide();
      (window as any).pyodide = pyodide;
      this.pyodideReady = true;
    } catch (error) {
      console.error('Failed to initialize Pyodide:', error);
    }
  }

  async executeCode(language: string, code: string, input?: string, timeout = 5000): Promise<ExecutionResult> {
    const startTime = performance.now();
    
    try {
      switch (language) {
        case 'javascript':
        case 'typescript':
          return await this.executeJavaScript(code, input, timeout);
        case 'python':
          return await this.executePython(code, input, timeout);
        default:
          return await this.mockExecution(language, code, input, timeout);
      }
    } catch (error) {
      return {
        success: false,
        output: '',
        error: error instanceof Error ? error.message : 'Unknown error',
        executionTime: performance.now() - startTime,
        stackTrace: error instanceof Error ? error.stack : undefined
      };
    }
  }

  private async executeJavaScript(code: string, input?: string, timeout = 5000): Promise<ExecutionResult> {
    return new Promise((resolve) => {
      const startTime = performance.now();
      const outputs: string[] = [];
      let hasError = false;
      let errorMessage = '';
      let stackTrace = '';

      // Create a sandboxed execution context
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);

      const iframeWindow = iframe.contentWindow;
      if (!iframeWindow) {
        resolve({
          success: false,
          output: '',
          error: 'Failed to create execution context',
          executionTime: performance.now() - startTime
        });
        return;
      }

      // Override console methods to capture output
      iframeWindow.console = {
        log: (...args: any[]) => outputs.push(args.map(String).join(' ')),
        error: (...args: any[]) => {
          hasError = true;
          errorMessage = args.map(String).join(' ');
        },
        warn: (...args: any[]) => outputs.push('Warning: ' + args.map(String).join(' ')),
        info: (...args: any[]) => outputs.push('Info: ' + args.map(String).join(' '))
      } as any;

      // Add input handling
      if (input) {
        const inputLines = input.split('\n');
        let inputIndex = 0;
        (iframeWindow as any).prompt = () => {
          return inputIndex < inputLines.length ? inputLines[inputIndex++] : '';
        };
      }

      // Set timeout
      const timeoutId = setTimeout(() => {
        hasError = true;
        errorMessage = 'Execution timeout';
        cleanup();
      }, timeout);

      const cleanup = () => {
        clearTimeout(timeoutId);
        document.body.removeChild(iframe);
        
        resolve({
          success: !hasError,
          output: outputs.join('\n'),
          error: hasError ? errorMessage : undefined,
          executionTime: performance.now() - startTime,
          stackTrace: stackTrace || undefined
        });
      };

      try {
        // Execute the code
        iframeWindow.eval(`
          try {
            ${code}
          } catch (error) {
            console.error(error.message);
            throw error;
          }
        `);
        
        // Allow for async operations
        setTimeout(cleanup, 100);
      } catch (error) {
        hasError = true;
        errorMessage = error instanceof Error ? error.message : 'Execution error';
        stackTrace = error instanceof Error ? error.stack || '' : '';
        cleanup();
      }
    });
  }

  private async executePython(code: string, input?: string, timeout = 5000): Promise<ExecutionResult> {
    const startTime = performance.now();
    
    if (!this.pyodideReady) {
      await this.initializePyodide();
    }

    if (!this.pyodideReady) {
      return {
        success: false,
        output: '',
        error: 'Python runtime not available',
        executionTime: performance.now() - startTime
      };
    }

    try {
      const pyodide = (window as any).pyodide;
      
      // Capture stdout
      let output = '';
      pyodide.runPython(`
        import sys
        from io import StringIO
        old_stdout = sys.stdout
        sys.stdout = StringIO()
      `);

      // Handle input if provided
      if (input) {
        pyodide.runPython(`
          import sys
          from io import StringIO
          sys.stdin = StringIO("""${input}""")
        `);
      }

      // Execute the code with timeout
      const executeWithTimeout = new Promise<void>((resolve, reject) => {
        const timeoutId = setTimeout(() => {
          reject(new Error('Execution timeout'));
        }, timeout);

        try {
          pyodide.runPython(code);
          clearTimeout(timeoutId);
          resolve();
        } catch (error) {
          clearTimeout(timeoutId);
          reject(error);
        }
      });

      await executeWithTimeout;

      // Get the output
      output = pyodide.runPython(`
        output = sys.stdout.getvalue()
        sys.stdout = old_stdout
        output
      `);

      return {
        success: true,
        output: output || '',
        executionTime: performance.now() - startTime
      };
    } catch (error) {
      return {
        success: false,
        output: '',
        error: error instanceof Error ? error.message : 'Python execution error',
        executionTime: performance.now() - startTime,
        stackTrace: error instanceof Error ? error.stack : undefined
      };
    }
  }

  private async mockExecution(language: string, code: string, input?: string, timeout = 5000): Promise<ExecutionResult> {
    const startTime = performance.now();
    
    // Simulate execution time
    await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));

    // Basic syntax validation
    const hasBasicSyntax = code.includes('main') || code.includes('function') || code.includes('def') || code.includes('class');
    
    if (!hasBasicSyntax) {
      return {
        success: false,
        output: '',
        error: `Syntax error in ${language} code`,
        executionTime: performance.now() - startTime
      };
    }

    // Generate mock output based on language
    let mockOutput = '';
    switch (language) {
      case 'java':
        mockOutput = 'Hello World\n(Simulated Java execution)';
        break;
      case 'cpp':
        mockOutput = 'Hello World\n(Simulated C++ execution)';
        break;
      case 'go':
        mockOutput = 'Hello World\n(Simulated Go execution)';
        break;
      default:
        mockOutput = `Hello World\n(Simulated ${language} execution)`;
    }

    return {
      success: true,
      output: mockOutput,
      executionTime: performance.now() - startTime
    };
  }

  async runTestCases(language: string, code: string, testCases: TestCase[], timeout = 5000): Promise<TestResult[]> {
    const results: TestResult[] = [];

    for (const testCase of testCases) {
      const result = await this.executeCode(language, code, testCase.input, timeout);
      
      results.push({
        testCase,
        passed: result.success && result.output.trim() === testCase.expectedOutput.trim(),
        actualOutput: result.output,
        executionTime: result.executionTime,
        error: result.error
      });
    }

    return results;
  }

  cleanup(): void {
    this.workers.forEach(worker => worker.terminate());
    this.workers.clear();
  }
}
