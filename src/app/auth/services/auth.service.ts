import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { LoginRequestInterface } from '../interfaces/login-request.interface';
import { RegisterRequestInterface } from '../interfaces/register-request.interface';
import { environment } from '../../../environments/environment.prod';
import { AuthTokenInterface } from '../../shared/interfaces/auth-token.interface';
import { UserInterface } from '../../shared/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Usa environment.apiUrl
  private apiBaseUrl: string = environment.apiUrl + '/auth';

  // Ici "null" est la valeur par defaut que je passe à mon "BehaviorSubject" car c'est obbligé de lui passer une valeur par defaut.
  private userToken$: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

  public user$: BehaviorSubject<UserInterface | null> =
    new BehaviorSubject<UserInterface | null>(null);

  constructor(private http: HttpClient) {
    const token = sessionStorage.getItem('WWA_JWToken');
    if (token) {
      this.userToken$.next(token);
      this.setToken(token); // Decodifica e imposta il token
    }

    // Imposta i dati utente decodificandoli dal token
    const user = this.getUserFromToken();
    if (user) {
      this.user$.next(user);
    }
  }

  // Questo metodo mi consente di salvare il token nella session storage dell'utente che fa l'accesso
  //Usiamo l'interfaccia DecodedToken per gestire il tipo del token

  // Metodo per salvare il token nella session storage
  public setToken(token: string): void {
    try {
      const decodedAuthTokenInterface = jwtDecode<AuthTokenInterface>(token);
      // Controlla se il ruolo è "admin" o "user"
      if (
        decodedAuthTokenInterface.role === 'admin' ||
        decodedAuthTokenInterface.role === 'user'
      ) {
        this.userToken$.next(token); // Aggiorna il BehaviorSubject del token
        sessionStorage.setItem('WWA_JWToken', token); // Salva il token nella sessionStorage

        // Aggiorna i dati dell'utente dal token
        const user = this.getUserFromToken();
        if (user) {
          this.user$.next(user); // Aggiorna il BehaviorSubject dell'utente
        }
      } else {
        console.warn(
          `Ruolo non autorizzato: ${decodedAuthTokenInterface.role}`
        );
        this.logout(); // Rimuovi ogni traccia se il ruolo non è valido
      }
    } catch (error) {
      console.error('Errore nella decodifica del token:', error);
      this.logout(); // In caso di token invalido, esegui il logout
    }
  }

  // Metodo per ottenere l'utente decodificando il token JWT
  private getUserFromToken(): UserInterface | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decodedAuthTokenInterface = jwtDecode<{
        id: number;
        email: string;
        role: string;
        surname: string;
        name: string;
        imagePath: string;
      }>(token);

      return {
        id: decodedAuthTokenInterface.id,
        email: decodedAuthTokenInterface.email,
        role: decodedAuthTokenInterface.role,
        surname: decodedAuthTokenInterface.surname || '',
        name: decodedAuthTokenInterface.name || '',
        password: '', // Vuoto, il token non contiene la password
        imagePath: decodedAuthTokenInterface.imagePath || '',
      };
    } catch (error) {
      console.error('Errore nella decodifica del token JWT:', error);
      return null;
    }
  }

  // Metodo per effettuare l'accesso
  public login$(
    email: string,
    password: string
  ): Observable<{ token: string }> {
    // Oggetto per la richiesta di "login" che mandiamo poi al server. Costituisce il body della chiamata HTTP di tipo "post"
    const loginRequest: LoginRequestInterface = { email, password };

    /** "{ withCredentials: true }" pour permettre l'envoie des cookies tra il frontend e le backend */
    return this.http
      .post<{ token: string }>(`${this.apiBaseUrl}/login`, loginRequest, {
        withCredentials: true,
      })
      .pipe(
        tap((response) => {
          // Imposta il token e decodifica i dati
          this.setToken(response.token);
        }),
        catchError(this.handleError('login'))
      );
  }

  // Metodo per registrare un nuovo utente
  public register$(
    surname: string,
    name: string,
    email: string,
    password: string
  ): Observable<UserInterface> {
    // Oggetto per la richiesta di "registrazione" che mandiamo poi al server. Costituisce il body della chiamata HTTP di tipo "post"
    const registerRequest: RegisterRequestInterface = {
      surname,
      name,
      email,
      password,
    };

    return this.http
      .post<UserInterface>(`${this.apiBaseUrl}/register`, registerRequest)
      .pipe(catchError(this.handleError('register')));
  }

  // Metodo per la gestione di errori sia per il form di "login" che per quello di "registrazione".
  private handleError(operation: string) {
    return (error: HttpErrorResponse) => {
      let errorMessage = `Erreur durant la fase de ${operation}.`;
      if (error.status === 0) {
        errorMessage = 'Problème de connection au server.';
      } else if (error.status === 401) {
        errorMessage =
          operation === 'login'
            ? 'Credenziali non valide.'
            : "L'email inserita è già collegata ad un account.";
      }
      return throwError(() => new Error(errorMessage));
    };
  }

  // Pulisce i BehaviorSubjects "cliente$" et "clienteToken$" et la session storage
  public logout(): void {
    this.user$.next(null);
    this.userToken$.next(null);
    sessionStorage.removeItem('WWA_JWToken');
  }

  // Verifica se l'utente è autenticato
  public isAuthenticated(): boolean {
    return !!this.userToken$.value;
  }

  /** Vari "Getters" che mi consentono di recuperare i dati salvati nella session storage */
  // Ottieni il token corrente
  public getToken(): string | null {
    return this.userToken$.value;
  }

  // Ottenere l'Id del cliente logato
  public getUserId(): number | null {
    return this.user$.value ? Number(this.user$.value.id) : null;
  }

  // Ottenere il nome del cliente logato
  public getUserSurname(): string | null | undefined {
    return this.user$.value ? this.user$.value.surname : null;
  }

  // Ottenere il nome del cliente logato
  public getUserName(): string | null | undefined {
    return this.user$.value ? this.user$.value.name : null;
  }

  // Ottenere il nome del cliente logato
  public getUserRole(): string | null | undefined {
    return this.user$.value ? this.user$.value.role : null;
  }

  // Obtenir l'email
  public getUserEmail(): string | null | undefined {
    return this.user$.value ? this.user$.value.email : null;
  }
}
