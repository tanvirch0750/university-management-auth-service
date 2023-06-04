// currentyly this is not being used in any file

import { IGenereicErrorMessage } from './error';

export type IGenereicErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenereicErrorMessage[];
};
