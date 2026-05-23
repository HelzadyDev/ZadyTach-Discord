export type { DiscordLibColors, DiscordLibConfig };

interface DiscordLibColors {
  primary: string;
  secondary: string;
  success: string;
  danger: string;
  warning: string;
}

interface DiscordLibConfig {
  colors: DiscordLibColors;
}

const defaultConfig: DiscordLibConfig = {
  colors: {
    primary:   "#3b82f6",
    secondary: "#4f545c",
    success:   "#22c55e",
    danger:    "#ED4245",
    warning:   "#fbbd23",
  },
};

let _config: DiscordLibConfig = { ...defaultConfig };

export function configure(config: Partial<DiscordLibConfig>): void {
  _config = {
    ..._config,
    ...config,
    colors: { ..._config.colors, ...config.colors },
  };
}

export function getConfig(): DiscordLibConfig {
  return _config;
}