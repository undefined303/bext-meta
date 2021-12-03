import { usePersistFn } from 'ahooks';
import Quill from 'quill';
import { FC, useEffect, useRef } from 'react';

export const RichEditor: FC<{
  defaultHtml?: string;
  defaultReadOnly?: boolean;
  onChange?: (html: string) => void;
}> = (props) => {
  const ref = useRef<HTMLDivElement>(null);
  const getProps = usePersistFn(() => props);

  useEffect(() => {
    const { defaultHtml, defaultReadOnly } = getProps();
    if (ref.current) {
      ref.current.innerHTML = defaultHtml || '';
      const quill = new Quill(ref.current, {
        theme: 'snow',
        modules: {
          toolbar: defaultReadOnly
            ? false
            : [
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                [{ size: ['small', false, 'large', 'huge'] }],
                [
                  { align: [] },
                  'bold',
                  'italic',
                  'underline',
                  'strike',
                  'blockquote',
                  'code-block',
                ],
                [
                  { list: 'ordered' },
                  { list: 'bullet' },
                  { script: 'sub' },
                  { script: 'super' },
                ],
                [{ indent: '-1' }, { indent: '+1' }],
                [{ color: [] }, { background: [] }],
                ['link', 'image'],
                ['clean'],
              ],
        },
        readOnly: defaultReadOnly,
      });
      quill.on('text-change', () => {
        const el = ref.current?.querySelector('.ql-editor') as HTMLDivElement;
        getProps()?.onChange?.(el.innerHTML || '');
      });
    }
  }, []);

  return <div ref={ref} />;
};
