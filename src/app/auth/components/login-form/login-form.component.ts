import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'; // Icona "spinner" (solido)
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { emailValidator } from '../../../core/Validators/email.validator';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  standalone: false,
})
export class LoginFormComponent implements OnInit {
  // Icons
  faSpinner = faSpinner; // Icona spinner

  public form!: FormGroup;
  public loading: boolean = false; // Pour le chargement lors de l'interaction avec le database

  //Qui un oggetto per la mia gestione degli errori legati al mio formulario.
  public formErrors: {
    [campo: string]: {
      message: string;
      validations: { [field: string]: string };
    };
  } = {
    form: {
      message: '',
      validations: {},
    },
  };

  constructor(private authService: AuthService, private router: Router) {}

  public subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [emailValidator(), Validators.required]),
      password: new FormControl('', [Validators.required]),
    });

    this.subscription.add(
      this.form.statusChanges.subscribe(() => {
        this.updateFormErrors();
      })
    );
  }

  public updateFormErrors() {
    if (!this.form) {
      return;
    }
    // Questo serve per cancellare eventuali messaggi di errore già visibles.
    for (const campo in this.formErrors) {
      this.formErrors[campo].message = '';
    }
  }

  public submit(): void {
    if (this.form.valid) {
      this.loading = true; // Chargement si le formulaire è valide
      const email = this.form.get('email')?.value;
      const password = this.form.get('password')?.value;
      this.authService.login$(email, password).subscribe({
        next: (user) => {
          const role = this.authService.getUserRole();
          // this.loading = true; //  avant la navigation

          if (role === 'user') {
            this.router.navigate(['/user/feed']).finally(() => {
              this.loading = false; // Fin du chargement
            });
          } else if (role === 'admin') {
            this.router.navigate(['/admin/dashboard']).finally(() => {
              this.loading = false; // Fin du chargement
            });
          } else {
            this.loading = false;
            this.formErrors['form'].message =
              "Erreur durant l'authentication. Contacter le support client.";
          }
        },
        // Messaggi di errori provenienti dall'authService dopo la sua interazione con il server
        error: (error) => {
          this.loading = false; // Fine du chargement en cas d'erreur
          this.formErrors['form'].message = error.message;
        },
      });
    } else {
      this.formErrors['form'].message =
        'Le formulaire est incomplet ou contient des erreurs, verifier les champs.';
    }
  }
}
