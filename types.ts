
export interface KeyDefinition {
  term: string;
  meaning: string;
}

export interface SummaryResult {
  overview: string;
  keyPoints: string[];
  definitions: KeyDefinition[];
  examTakeaway: string;
}

export type RevisionMode = 'concise' | 'detailed' | 'bullet-points';
