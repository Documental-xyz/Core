import { describe, it, expect, vi } from 'vitest';
import core from '../integration';

describe('core() integration factory', () => {
  it('returns an AstroIntegration with correct name', () => {
    const integration = core({ repo: 'org/repo' });
    expect(integration.name).toBe('@documental-xyz/core');
  });

  it('exposes astro:config:setup hook', () => {
    const integration = core({ repo: 'org/repo' });
    expect(typeof integration.hooks['astro:config:setup']).toBe('function');
  });

  it('hook calls injectRoute, injectScript, updateConfig', async () => {
    const integration = core({ repo: 'org/repo' });
    const injectRoute = vi.fn();
    const injectScript = vi.fn();
    const updateConfig = vi.fn();
    const logger = { info: vi.fn(), warn: vi.fn(), error: vi.fn() } as any;
    await integration.hooks['astro:config:setup']!({
      config: {} as any,
      command: 'dev',
      isRestart: false,
      injectRoute,
      injectScript,
      updateConfig,
      addRenderer: vi.fn(),
      addWatchFile: vi.fn(),
      addClientDirective: vi.fn(),
      addMiddleware: vi.fn(),
      addDevToolbarApp: vi.fn(),
      createCodegenDir: vi.fn(),
      logger,
    });
    expect(injectRoute).toHaveBeenCalled();
    expect(injectScript).toHaveBeenCalled();
    expect(updateConfig).toHaveBeenCalled();
  });

  it('throws if repo option is missing', () => {
    expect(() => core({} as any)).toThrow(/repo/i);
  });
});
