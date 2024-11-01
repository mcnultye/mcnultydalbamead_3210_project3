// Class to create the deck of cards

import * as THREE from 'three';

//Creating the deck
class Deck{
    constructor() {
        this.deck = [];
        this.cardData = {
            suit: ['spades','hearts', 'clubs', 'diamonds'], 
            value: [2,3,4,5,6,7,8,9,10,11,12,13,14]};
        this.createDeck();
    }


//creating each individual card
 createDeck() {
   this.cardData.suit.forEach((suit) => {
        this.cardData.value.forEach((val) => {
            var card = {
                suit: suit,
                value: val,
                obj: createCardObject(createTextures(suit,val))
            }
            deck.push(card);
        });
   });
}

//creating the textures
 createTextures(suit,val){
    const loader = new THREE.TextureLoader();
    if(val <= 10){
        return loader.load('cardT/' + val + suit + '.png');
    } else if (val == 11){
        return loader.load('cardT/jack' + suit + '.png');
    } else if (val == 12){
        return loader.load('cardT/queen' + suit + '.png');
    } else if (val == 13){
        return loader.load('cardT/king' + suit + '.png');
    } else if (val == 14){
        return loader.load('cardT/ace' + suit + '.png');
    }
}

//creating the card object
 createCardObject(texture){
    const geometry = new THREE.BoxGeometry(.4,.6,.001);
    const materials = [
        new THREE.MeshBasicMaterial(),
        new THREE.MeshBasicMaterial(),
        new THREE.MeshBasicMaterial(),
        new THREE.MeshBasicMaterial(),
        new THREE.MeshBasicMaterial({map: 'cardT/'+texture}),
        new THREE.MeshBasicMaterial({map: 'cardT/back.png'})
    ];
    const mesh = new THREE.Mesh(geometry, materials);
    return mesh;
}

    getDeck() {
        return this.deck;
    }
}

export default Deck;