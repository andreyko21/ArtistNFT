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
    this.emailBlock = $('#email');
    this.passwordBlock = $('#password');
    this.loginTextLinkBlock = $('.text-link_signUp');
    this.signUpTextLinkBlock = $('.text-link_signIn');
    this.roleBlock = $('.radio-buttons-block');
    this.submitButton = $('.submit-button');
    this.form = $('.authorization-section__form');
    this.typeAuth = $('#mySwitch');
    this.formErrorBlock = $('.authorization-section__error');
    this.Init();
    this.BindEvents();
    this.setupValidation();
  }

  setupValidation() {
    this.validator = this.form.validate({
      rules: {
        email: {
          required: true,
          email: true,
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

    $('input').on('keyup change', () => {
      let valid = true;
      $('input').each(() => {
        valid = this.validator.element(this) && valid;
      });
    });
  }

  async BindEvents() {
    this.auth = await firebase.getAuth();
    this.form.on('submit', () => {
      if (this.validator.form()) {
        if (this.typeAuth.is(':checked')) {
          this.SignIn();
        } else {
          this.SignUp();
        }
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
    this.loginTextLinkBlock.css('display', 'flex');
    this.signUpTextLinkBlock.hide();
    this.roleBlock.hide();
    this.emailBlock.show();
    this.passwordBlock.show();
  }

  ShowSignUp() {
    this.typeAuth.prop('checked', false);
    this.loginTextLinkBlock.hide();
    this.signUpTextLinkBlock.css('display', 'flex');
    this.roleBlock.show();
    this.emailBlock.show();
    this.passwordBlock.show();
  }

  async SignUp() {
    try {
        await createUserWithEmailAndPassword(
          this.auth,
          this.emailBlock.val(),
          this.passwordBlock.val()
        );
      } catch (error) {
        this.formErrorBlock.html(this.getErrorMessage(error));
      }
  }

  async SignIn() {
    try {
        await signInWithEmailAndPassword(
          this.auth,
          this.emailBlock.val(),
          this.passwordBlock.val()
        );
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
