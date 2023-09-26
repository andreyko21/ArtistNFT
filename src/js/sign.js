import $ from 'jquery';
import 'jquery-validation';
import firebase from './modules/firebase';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

class AuthPage {
  constructor() {
    this.roleBlock = $('.radio-buttons-block');
    this.submitButton = $('.submit-button');
    this.SignInform = $('#singInForm');
    this.SignUpform = $('#singUpForm');
    this.typeAuth = $('#mySwitch');
    this.formErrorBlock = $('.authorization-section__error');
    this.Init();
    this.BindEvents();
    this.ValidationSignIn();
    this.ValidationSignUp();
  }

  initializeValidation(formElement) {
    $.validator.addMethod(
      'cyrillicEmail',
      function (value, element) {
        return /^[а-яА-ЯёЁa-zA-Z0-9._%+-]+@[а-яА-ЯёЁa-zA-Z0-9.-]+\.[а-яА-ЯёЁa-zA-Z]{2,4}$/.test(
          value
        );
      },
      'Please enter a valid email address'
    );

    return formElement.validate({
      rules: {
        email: {
          required: true,
          cyrillicEmail: true,
        },
        firstName: {
          required: true,
        },
        lastName: {
          required: true,
        },
        password: {
          required: true,
          minlength: 6,
        },
      },
      messages: {
        email: {
          required: 'Please enter your email',
          email: 'Please enter a valid email address',
        },
        password: {
          required: 'Please enter your password',
          minlength: 'Password must be at least 6 characters',
        },
        firstName: {
          required: 'Please enter your first name',
        },
        lastName: {
          required: 'Please enter your last name',
        },
      },
      errorPlacement: (error, element) => {
        error.appendTo(element.parent().find('.input-block__error'));
      },
      highlight: (element, errorClass, validClass) => {
        $(element).parent().addClass('error-block').removeClass(validClass);
      },
      unhighlight: (element, errorClass, validClass) => {
        $(element).parent().removeClass('error-block').addClass(validClass);
      },
    });
  }

  ValidationSignIn() {
    this.signInValidator = this.initializeValidation(this.SignInform);
    $('input').on('keyup change', () => {
      let valid = true;
      $('input').each(() => {
        valid = this.signInValidator.element(this) && valid;
      });
    });
  }

  ValidationSignUp() {
    this.signUpValidator = this.initializeValidation(this.SignUpform);
    $('input').on('keyup change', () => {
      let valid = true;
      $('input').each(() => {
        valid = this.signUpValidator.element(this) && valid;
      });
    });
  }

  async BindEvents() {
    this.auth = await firebase.getAuth();
    this.SignInform.on('submit', () => {
      if (this.signInValidator.form()) {
        this.SignIn();
      }
    });

    this.SignUpform.on('submit', () => {
      if (this.signUpValidator.form()) {
        this.SignUp();
      }
    });

    this.typeAuth.on('change', () => {
      this.ToggleAuthMode();
    });

    window.addEventListener('popstate', () => {
      this.Init();
    });
  }

  ToggleAuthMode() {
    const hash = this.typeAuth.is(':checked') ? '#signIn' : '#signUp';
    window.location.hash = hash;
  }

  Init() {
    const hash = window.location.hash.toLowerCase();
    if (hash === '#signup') {
      this.ShowSignUp();
    } else {
      this.ShowSignIn();
    }
  }

  ShowSignIn() {
    this.typeAuth.prop('checked', true);
    this.SignInform.show();
    this.SignUpform.hide();
  }

  ShowSignUp() {
    this.typeAuth.prop('checked', false);
    this.SignInform.hide();
    this.SignUpform.show();
  }

  async SignUp() {
    try {
      await createUserWithEmailAndPassword(
        this.auth,
        this.SignUpform.find('#email-signUp').val(),
        this.SignUpform.find('#password-signUp').val()
      );
      window.location.href = '/index.html';
    } catch (error) {
      this.SignUpform.find('.authorization-section__error').html(
        this.getErrorMessage(error)
      );
    }
  }

  async SignIn() {
    try {
      await signInWithEmailAndPassword(
        this.auth,
        this.SignInform.find('#email-signIn').val(),
        this.SignInform.find('#password-signIn').val()
      );
      window.location.href = '/index.html';
    } catch (error) {
      this.formErrorBlock.html(this.getErrorMessage(error));
    }
  }

  getErrorMessage(error) {
    switch (error.code) {
      case 'auth/wrong-password':
        return 'Incorrect password';
      case 'auth/user-not-found':
        return 'User not found';
      case 'auth/too-many-requests':
        return 'Access to this account has been temporarily disabled due to too many failed login attempts. You can immediately restore it by resetting your password or try again later.';
      case 'auth/user-disabled':
        return 'User account has been disabled by the administrator';
      case 'auth/email-already-in-use':
        return 'Email address is already in use by another user';
      case 'auth/credential-already-in-use':
        return 'These credentials are already associated with another account';
      case 'auth/custom-token-mismatch':
        return 'Error: Custom token does not match';
      case 'auth/requires-recent-login':
        return 'This operation requires reauthentication. Please sign in again.';
      default:
        return 'Authentication error: ' + error.code;
    }
  }
}

new AuthPage();
