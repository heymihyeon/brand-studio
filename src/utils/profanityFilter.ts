export interface ProfanityMatch {
  word: string;
  startIndex: number;
  endIndex: number;
}

export class ProfanityFilter {
  private static instance: ProfanityFilter;
  private profanityWords: string[] = [];

  private constructor() {
    this.loadProfanityWords();
  }

  public static getInstance(): ProfanityFilter {
    if (!ProfanityFilter.instance) {
      ProfanityFilter.instance = new ProfanityFilter();
    }
    return ProfanityFilter.instance;
  }

  private loadProfanityWords(): void {
    const saved = localStorage.getItem('profanityWords');
    if (saved) {
      this.profanityWords = JSON.parse(saved);
    }
  }

  public updateProfanityWords(words: string[]): void {
    this.profanityWords = words;
  }

  public checkText(text: string): ProfanityMatch[] {
    const matches: ProfanityMatch[] = [];
    const lowerText = text.toLowerCase();

    this.profanityWords.forEach(profanityWord => {
      let index = 0;
      while ((index = lowerText.indexOf(profanityWord, index)) !== -1) {
        matches.push({
          word: profanityWord,
          startIndex: index,
          endIndex: index + profanityWord.length
        });
        index += profanityWord.length;
      }
    });

    return matches.sort((a, b) => a.startIndex - b.startIndex);
  }

  public hasProfanity(text: string): boolean {
    return this.checkText(text).length > 0;
  }

  public getProfanityWords(): string[] {
    return [...this.profanityWords];
  }
}

export const profanityFilter = ProfanityFilter.getInstance();