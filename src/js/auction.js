import $ from 'jquery';
import Header from './modules/header';
import { collection, getDocs, updateDoc, setDoc, doc} from "firebase/firestore";
import firebase from './modules/firebase';


class Auction {
    constructor() {
        this.header = new Header();
        this.db = firebase.getFirestore();
        this.firebase();
        this.auth = firebase.getAuth();
        this.inputPrice = $('.input-block__input');
        this.inpError = $('.auction__error-place');
        this.urlParams = new URLSearchParams(window.location.search);
        this.id = this.urlParams.get("id");
        if(this.id === null){
            this.id = 'arts-3'
        }
    }
    async firebase() {
        const querySnapshot = await getDocs(collection(this.db, "arts"));
        querySnapshot.forEach((doc) => {
            if(doc.id === this.id){
                this.inputInfo(doc.data());
                this.timer(doc.data().liveData);
                this.liveData(doc.data().liveData);
                this.progressPrice(doc.data());
                this.dataPrice(doc.data());
                this.priceBtn(doc.data());
                this.hiddenBtn();
            }
        });
    }
    async changePrice(price, data){
        if(this.auth.currentUser){
            await setDoc(doc(this.db, "auction", this.id), {
                price: price,
                email: this.auth.currentUser.email,
                user: this.auth.currentUser.uid,
            });
            await updateDoc(doc(this.db, "arts", this.id), {
                price: price,
            });
            alert('Ставку змінено');
            this.updatePrice(price, data);
        }else{
            alert('Для того щоб зробити ставку, потрібно авторизуватися')
        }
    }
    priceBtn(data){
        $('.auction__input-btn').on('click', () => {
            const minBid = parseFloat(data.price) + 5;
            const inpInfo = parseFloat(this.inputPrice.val());
            if(minBid > inpInfo){
                this.inpError.html('increase your bet');
            }else if(this.inputPrice.val().length == 0){
                this.inpError.html('input price');
            }else if(isNaN(inpInfo)){
                this.inpError.html('input only number');
            }else{
                this.inpError.html('');
                this.changePrice(inpInfo, data);
            }
        })
    }
    timer(data){
        const countdownDate = new Date(data).getTime();
        const timer = setInterval(function() {
            const now = new Date().getTime();
            const distance = countdownDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            $('#days').html(days + 'd') ;
            $('#hours').html(hours + 'h');
            $('#minutes').html(minutes + 'm');
            $('#seconds').html(seconds + 's');

            if (distance < 0) {
                clearInterval(timer);
                document.getElementById('timer').innerHTML = 'Время истекло!';
            }
        }, 1000);
    }
    liveData(data){
        const downData = new Date(data);
        const month = downData.toLocaleString('en-US', {month: 'short'});
        let minutes = ''
        let hours = ''
        if(downData.getMinutes() < 10){
            minutes = '0' + downData.getHours();
        }
        if(downData.getHours() < 10){
            hours = '0' + downData.getMinutes();
        }
        $('#live-mounth').html(month);
        $('#live-day').html(downData.getDate());
        $('#live-hours').html(minutes);
        $('#live-minutes').html(hours);
    }
    progressPrice(data){
        const thisPrice = parseFloat(data.price);
        const minPrice = parseFloat(data.minPrice);
        $(".auction__progress-status").css("width", `${(thisPrice / (minPrice / 100) )}%`);
    }
    updatePrice(price, data){
        $('.auction__price').html(parseFloat(price).toLocaleString('ru-RU'));
        const minPrice = parseFloat(data.minPrice);
        const newWidth = (price / (minPrice / 100)) + "%";
        $(".auction__progress-status").animate({ width: newWidth }, 1000); 
        this.inputPrice.val('');
        $('#input-place').attr('placeholder', '$' +  (price + 5).toLocaleString('ru-RU'));
    }
    dataPrice(data){
        const startData = new Date(data.startData).getTime();
        const liveData = new Date(data.liveData).getTime();
        const thisDate = new Date().getTime();
        const progress = ((thisDate - startData) / ((liveData - startData) / 100));
        $(".auction__progress-procent").css("width", `${progress}%`);
    }
    inputInfo(data){
        // const priceInfo = '$' +  parseFloat(data.price).toLocaleString('en-US');
        // const startPrice = parseFloat(data.price).toLocaleString('en-US');
        $('.auction__name-title').html(data.title);
        $('.auction__size').html(data.details[1]);
        $('.auction__start-price').html(parseFloat(data.minPrice).toLocaleString('en-US'));
        $('.auction__inform-column_next-inform').html(data.details[2]);
        $('.auction__price').html(parseFloat(data.price).toLocaleString('ru-RU'));
        $('#input-place').attr('placeholder', '$' +  (parseFloat(data.price) + 5).toLocaleString('ru-RU'));
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



