import {
  Modal,
  TextInput,
  FileInput as FileInputMantine,
  Image,
} from '@mantine/core';
import React from 'react';

type Props = {
  inputPropsUrl?: any;
  inputPropsFile?: any;
  image?: string;
  label?: string;
  placeholder?: string;
  title?: string;
  style?: string;
  withAsterisk?: boolean;
  isBuying?: boolean;
};

function FileInput({
  inputPropsUrl,
  inputPropsFile,
  label,
  title,
  placeholder,
  style,
  withAsterisk,
  isBuying,
}: Props) {
  const [opened, setOpened] = React.useState(false);

  return (
    <>
      <TextInput
        label={label}
        placeholder={placeholder}
        style={style}
        withAsterisk={withAsterisk}
        readOnly
        onClick={() => setOpened(true)}
        {...inputPropsUrl}
      />
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={title}
        centered
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {!isBuying && (
            <Image
              src={
                inputPropsUrl.value !== ''
                  ? inputPropsUrl.value
                  : 'https://efqndplvrwsimqbfyssn.supabase.co/storage/v1/object/sign/images/empty.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZW1wdHkucG5nIiwiaWF0IjoxNjY3MzIwODAwLCJleHAiOjE5ODI2ODA4MDB9.3x46rxQNM1JlPrBE3hjYc8hkW-r7GAyeZJt_g6n8j18'
              }
              alt={title}
            />
          )}
          <FileInputMantine
            label="Da click para buscar la imagen"
            accept="image/png,image/jpeg,image/webp,image/gif"
            {...inputPropsFile}
          />
        </div>
      </Modal>
    </>
  );
}

export default FileInput;
