import $ from 'jquery';
import Header from './modules/header';
import { collection, getDocs, updateDoc, setDoc, doc} from "firebase/firestore";
import firebase from './modules/firebase';
import Parallax from './modules/parallax';
import 'jquery-validation';
import Preloader from './modules/preloader';

class Auction {
    constructor() {
        this.header = new Header();
        this.db = firebase.getFirestore();
        this.prolax = new Parallax();
        this.firebase();
        this.auth = firebase.getAuth();
        this.inputPrice = $('.input-block__input');
        this.inpError = $('.auction__error-place');
        this.urlParams = new URLSearchParams(window.location.search);
        this.id = this.urlParams.get("id");
        this.currentPrice = 0;
        this.minPrice = 0;
        this.liveData = 0;
        this.form = $('.auction__input-line');
        if(this.id === null){
            this.id = 'arts-3'
        }
    }
    async firebase() {
        const querySnapshot = await getDocs(collection(this.db, "arts"));
        querySnapshot.forEach((doc) => {
            if(doc.id === this.id){
                this.liveData = new Date(doc.data().liveData);
                this.inputInfo(doc.data());
                this.timer(this.liveData);
                this.startLiveData();
                this.progressPrice(doc.data());
                this.dataPrice(doc.data());
                this.validation();
                this.hiddenBtn();
                this.minPrice = doc.data().minPrice;
                this.stopPreload = new Preloader('page__container');
            }
        });
    }
    checkMaxPrice(price){
        if(+price > 1000000000){
            return 'auction stopped'
        }else{
            return +price
        }
    }
    checkPlaceholder(price){
        if(+price > 1000000000){
            return 'no bids accepted'
        }else{
            return  '$' +  (+price + 5).toLocaleString('ru-RU')
        }
    }
    updatePrice(){
        console.log(this.checkMaxPrice(this.currentPrice))
        $('.auction__price').html('$' + this.checkMaxPrice(this.currentPrice));
        const newWidth = ( +this.currentPrice / ( +this.minPrice / 100)) + "%";
        $(".auction__progress-status").animate({ width: newWidth }, 1000); 
        this.inputPrice.val('');
        $('#input-place').attr('placeholder', this.checkPlaceholder(this.currentPrice));
    }
    async changePrice(newPrice){
        this.currentPrice =  +newPrice;
        if(this.auth.currentUser){
            await setDoc(doc(this.db, "auction", this.id), {
                price: this.currentPrice,
                email: this.auth.currentUser.email,
                user: this.auth.currentUser.uid,
            });
            await updateDoc(doc(this.db, "arts", this.id), {
                price: this.currentPrice,
            });
            alert('Ставку змінено');
            this.updatePrice();
        }else{
            alert('Для того щоб зробити ставку, потрібно авторизуватися')
        }
    }
    validation() {
        this.form.on('submit', function(event) {
            event.preventDefault(); 
        });
        this.inputPrice.on('keydown', (e) => {
            let key = e.key;
            if(key === 'e' || key === 'E' || key === '+'|| key === '-'){
                e.preventDefault();
            }
        });
        this.form.validate({
          rules: {
            pay: {
              digits: true,  
              customValidation: true, 
              required: true,
            },
          },
          messages: {
            pay: {
              digits: "Only number",
              customValidation: `Increase Bid`,
              required: 'Input Bid',
            },
          },
          errorPlacement: (error, element) => {
            if (element.attr("name") === "pay") {
              error.appendTo(".auction__error-place");
            }
          },
          submitHandler: () => {
            this.changePrice($('[name="pay"]').val());
          },

        });      
        $.validator.addMethod(
          "customValidation",
          (value) => {
            return !isNaN(+value) && +value >= this.currentPrice + 5;
          },
        );
      }
    timer(data){
        const timer = setInterval(function() {
            const now = new Date().getTime();
            const distan = data.getTime() - now;
            const days = Math.floor(distan / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distan % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distan % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distan % (1000 * 60)) / 1000);
            $('#days').html(days + 'd') ;
            $('#hours').html(hours + 'h');
            $('#minutes').html(minutes + 'm');
            $('#seconds').html(seconds + 's');
            if (distan < 0) {
                clearInterval(timer);
                document.getElementById('timer').innerHTML = 'Finished time!';
            }
        }, 1000);
    }
    changeData(num){
        if(+num < 10){
            return '0' + num; 
        }else{
            return num;
        }
    }
    startLiveData(){
        const month = this.liveData.toLocaleString('en-US', {month: 'short'});
        $('#live-mounth').html(month);
        $('#live-day').html(this.liveData.getDate());
        $('#live-hours').html(this.changeData(this.liveData.getHours()));
        $('#live-minutes').html(this.changeData(this.liveData.getMinutes()));
    }
    progressPrice(data){
        $(".auction__progress-status").css("width", `${(+data.price / (+data.minPrice / 100) )}%`);
    }
    dataPrice(data){
        const startData = new Date(data.startData).getTime();
        const liveData = new Date(data.liveData).getTime();
        const thisDate = new Date().getTime();
        const progress = ((thisDate - startData) / ((liveData - startData) / 100));
        $(".auction__progress-procent").css("width", `${progress}%`);
    }
    inputInfo(data){
        this.currentPrice = this.checkMaxPrice(data.price);
        $('.auction__name-title').html(data.title);
        $('.auction__size').html(data.details[1]);
        $('.auction__start-price').html(parseFloat(data.minPrice).toLocaleString('en-US'));
        $('.auction__inform-column_next-inform').html(data.details[2]);
        $('.auction__price').html( '$' + this.currentPrice);
        $('#input-place').attr('placeholder', this.checkPlaceholder(data.price));
        $('.auction__text-block-paragraph_one').html(data.text[0]);
        $('.auction__text-block-paragraph_two').html(data.text[1]);
        $(".auction__img source").attr("srcset", data.imageWebP);
        $(".auction__img img").attr("src", data.imagePng);
    }
    hiddenBtn(){
        const paragraphs = $('.auction__text-block-paragraphs');
        const height = paragraphs.height();
        paragraphs.height(height)
        $('.auction__text-block-btn').on("click", function() {
            $('.auction__text-block').toggleClass('auction__text-block_hidden');
            if ($('.auction__text-block').hasClass('auction__text-block_hidden')) {
                paragraphs.height('50px')
            }else{
                paragraphs.height(height);
            }
        });
    }
};
const auction = new Auction();



