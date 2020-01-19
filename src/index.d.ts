export default class darken {
  private dark: boolean;
  constructor(options?: {
    container: string | null;
    default: string;
    toggle: string | null;
    remember: string | null;
    usePrefersColorScheme: boolean;
    class: string;
    variables: object;
  }, callback?: (active: boolean) => void);
  toggle(): void;
  on(): void;
  off(): void;
}
