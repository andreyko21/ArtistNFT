export default class ContactMe {
    constructor(){
        this.name = document.querySelector('.contact-me__name');
        this.nameError = document.querySelector('.contact-me__error-name');
        this.mail = document.querySelector('.contact-me__mail');
        this.mailError = document.querySelector('.contact-me__error-mail');
        this.question = document.querySelector('.contact-me__question');
        this.questionError = document.querySelector('.contact-me__error-question');
        this.btn = document.querySelector('.contact-me__btn');
        this.nameRegEx = /^[A-Za-zА-Яа-яЁё\s]+$/u;
        this.emailRegEx = /^[A-Za-zА-Яа-яЁё0-9._%+-]+@[A-Za-zА-Яа-яЁё0-9.-]+\.[A-Za-zА-Яа-яЁё]{2,}$/u;
    }
    check(){
        this.btn.addEventListener('click', () => {
            if(!this.nameRegEx.test(this.name.value)){
                this.nameError.innerHTML = 'Please enter a valid name';
            }else{
                this.nameError.innerHTML = '';
            }
            if(!this.emailRegEx.test(this.mail.value)){
                this.mailError.innerHTML = 'Please enter a correct email address';
            }else{
                this.mailError.innerHTML = '';
            }
            if(this.question.value.length <= 5){
                this.questionError.innerHTML = 'min 5 characters';
            }else{
                this.questionError.innerHTML = '';
            }
            if(this.nameRegEx.test(this.name.value) && this.emailRegEx.test(this.mail.value) && this.question.value.length >= 5){
                alert('отправка на firebase')
                this.name.value = '';
                this.mail.value = '';
                this.question.value = '';
            }
        });
    }
};


