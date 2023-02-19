class Logger {
  private namespace: string;
  constructor(namespace: string) {
    this.namespace = namespace;
  }

  info(message: string, object?: any, methodName?: string) {
    if (object) {
      console.info(`[INFO] [${this.namespace}]${methodName ? ' ' + methodName : ''} - ${message}`, object);
    } else {
      console.info(`[INFO] [${this.namespace}]${methodName ? ' ' + methodName : ''} - ${message}`);
    }
  }

  warn(message: string, object?: any, methodName?: string) {
    if (object) {
      console.warn(`[WARN] [${this.namespace}]${methodName ? ' ' + methodName : ''} - ${message}`, object);
    } else {
      console.warn(`[WARN] [${this.namespace}]${methodName ? ' ' + methodName : ''} - ${message}`);
    }
  }

  error(message: string, object?: any, methodName?: string) {
    if (object) {
      console.error(`[ERROR] [${this.namespace}]${methodName ? ' ' + methodName : ''} - ${message}`, object);
    } else {
      console.error(`[ERROR] [${this.namespace}]${methodName ? ' ' + methodName : ''} - ${message}`);
    }
  }

  debug(message: string, object?: any, methodName?: string) {
    if (object) {
      console.debug(`[DEBUG] [${this.namespace}]${methodName ? ' ' + methodName : ''} - ${message}`, object);
    } else {
      console.debug(`[DEBUG] [${this.namespace}]${methodName ? ' ' + methodName : ''} - ${message}`);
    }
  }

  getTimeStamp = (): string => {
    return new Date().toISOString();
  };
}

export default Logger;
