import $ from 'jquery';
import Header from './modules/header';
import { collection, getDocs} from "firebase/firestore";
import firebase from './modules/firebase';


class Auction {
    constructor() {
        this.header = new Header();
        this.db = firebase.getFirestore();
        this.firebase();
        this.hiddenBtn();
    }
    async firebase() {
        const querySnapshot = await getDocs(collection(this.db, "arts"));
        querySnapshot.forEach((doc) => {
          console.log(doc.data(), doc.id)
        });
      }
    hiddenBtn(){
        $('.auction__text-block-btn').on("click", function() {
            $('.auction__text-block').toggleClass('auction__text-block_hidden')
        });
        const height = $('.auction__text-block-paragraphs').height()
        var newKeyframesRule = `
        @keyframes animationOne {
            0% {
                height: ${height}px;
            }
            10% {
                height: ${height + 12}px;
            }
            90% {
                height: 40px;
            }
            100% {
                height: 50px;
            }
        }
        @keyframes animationTwo {
            0% {
                height: 50px;
            }
            20% {
                height: 38px;
            }
            90% {
                height: ${height + 10}px;
            }
            100% {
                height: ${height}px;
            }
        }
        `;

        var styleSheet = $('<style>').text(newKeyframesRule);
        $('head').append(styleSheet);
    }
};
const auction = new Auction();



