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

type Props = {
  authors: Array<any>;
  genres: Array<any>;
  form: any;
  setLoad: Function;
  setShowSpinner: Function;
};

function BookForm({ authors, genres, form, setLoad, setShowSpinner }: Props) {
  return null;
}

export default BookForm;
