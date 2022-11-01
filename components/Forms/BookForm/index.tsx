import {
  Alert,
  Button,
  Checkbox,
  FileInput,
  MultiSelect,
  NumberInput,
  Select,
  Textarea,
  TextInput,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import React from 'react';
import useInsertValues from 'hooks/useInsertValues';
import useUpdateValues from 'hooks/useUpdateValues';

type Props = {
  authors: Array<any>;
  genres: Array<any>;
  form: any;
  setLoad: Function;
  setShowSpinner: Function;
};

function BookForm({ authors, genres, form, setLoad, setShowSpinner }: Props) {
  


  return (
    
  );
}

export default BookForm;
