import React, { CSSProperties, useRef, ChangeEvent } from 'react';
import styled from 'styled-components';

export interface UploadProps {
  accept?: string;
  multiple?: boolean;
  // files?: FileList;
  onChange?: (fileList: FileList | null) => void;
  style?: CSSProperties;
  className?: string;
}

const Upload: React.FC<UploadProps> = ({
  accept,
  multiple,
  onChange,
  style,
  className,
  children,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // const [fileList, setFileList] = useState<FileList | null>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // setFileList(e.target.files);
    typeof onChange === 'function' && onChange(e.target.files);
  };

  return (
    <Wrapper style={style} className={className} onClick={handleClick}>
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        ref={inputRef}
        hidden
        onChange={handleChange}
      />
      {children}
    </Wrapper>
  );
};

export default Upload;

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
`;
