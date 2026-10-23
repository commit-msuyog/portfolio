export interface ProjectItem {
  id: string;
  tag: string;
  category: string;
  year: string;
  title: string;
  summary: string;
  architecture: {
    stack1: string;
    stack2: string;
    stack3: string;
  };
  status: string;
  figNumber: string;
  figTitle: string;
  figMetric: string;
  details: {
    problem: string;
    solution: string;
    technicalHighlights: string[];
    benchmarkData: { label: string; value: string }[];
  };
}

export interface OpenSourceItem {
  id: string;
  type: string;
  tag: string;
  repo: string;
  stars?: string;
  subtitle: string;
  description: string;
  codeSnippet?: string;
  metadata: {
    label1: string;
    value1: string;
    label2: string;
    value2: string;
  };
  linkText: string;
}

export interface SkillCategory {
  num: string;
  title: string;
  tag: string;
  items: {
    name: string;
    role: string;
    details: string;
  }[];
}

export interface TerminalMessage {
  id: string;
  type: 'system' | 'user' | 'assistant' | 'error';
  content: string;
  timestamp: string;
}
