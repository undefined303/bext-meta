import { useBextTheme } from '@/hooks/custom-theme-provider';
import { LIB_CONTEXT_DTS, LIB_UI_DTS, LIB_UTIL_DTS } from '@/lib';
import MonacoEditor, { Monaco } from '@monaco-editor/react';
import { ComponentProps, FC, useCallback } from 'react';

export const Editor: FC<ComponentProps<typeof MonacoEditor>> = (props) => {
  const theme = useBextTheme();

  const onMount = useCallback((_, monaco: Monaco) => {
    monaco.languages.typescript.javascriptDefaults.addExtraLib(LIB_UI_DTS);
    monaco.languages.typescript.javascriptDefaults.addExtraLib(LIB_UTIL_DTS);
    monaco.languages.typescript.javascriptDefaults.addExtraLib(LIB_CONTEXT_DTS);
  }, []);

  return (
    <MonacoEditor
      {...props}
      theme={theme === 'dark' ? 'vs-dark' : 'vs'}
      onMount={onMount}
    />
  );
};