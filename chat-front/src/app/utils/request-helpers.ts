import { throwError, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

/* eslint-disable no-console */

export const handleRequestError = (error: HttpErrorResponse): Observable<never> => {
    if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
    } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
};

/* eslint-enable no-console */

export type Headers = { [key: string]: string };

export const getHeaders = (token?: string): Headers => {
    const auth = token ? { Authorization: `Bearer ${token}` } : undefined;
    let headers: Headers = {};

    if (auth) headers = { ...headers, ...auth };
    return headers;
};
