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
                obj: this.createCardObject(this.createTextures(suit,val))
            }
            this.deck.push(card);
            console.log(`Created card: ${val} of ${suit}`); // Log created card

        });
   });
}

/*
//creating the textures
 createTextures(suit,val){
    const loader = new THREE.TextureLoader();
    if(val <= 10){
        return loader.load('components/cardT/' + val + suit + '.png');
    } else if (val == 11){
        return loader.load('components/cardT/jack' + suit + '.png');
    } else if (val == 12){
        return loader.load('components/cardT/queen' + suit + '.png');
    } else if (val == 13){
        return loader.load('components/cardT/king' + suit + '.png');
    } else if (val == 14){
        return loader.load('components/cardT/ace' + suit + '.png');
    }
}
*/

createTextures(suit, val) {
    const loader = new THREE.TextureLoader();
    const texturePath = val <= 10 
        ? `components/cardT/${val}${suit}.png` 
        : `components/cardT/${val === 11 ? 'jack' : val === 12 ? 'queen' : val === 13 ? 'king' : 'ace'}${suit}.png`;

    const texture = loader.load(texturePath, (texture) => {
        console.log(`Loaded texture for ${val} of ${suit}`);
    }, undefined, (error) => {
        console.error(`Error loading texture: ${texturePath}`, error);
    });

    return texture;
}

//creating the card object
createCardObject(texture) {
    var geometry = new THREE.BoxGeometry(.4, .6, .001);

    // Define materials for each face of the card
    var frontMaterial = new THREE.MeshBasicMaterial({ map: texture }); // Card front with custom texture
    var backMaterial = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('components/cardT/back.png') }); // Card back texture
    var sideMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 }); // Sides, simple black color

    var materials = [
        sideMaterial, // right
        sideMaterial, // left
        sideMaterial, // top
        sideMaterial, // bottom
        frontMaterial, // front
        backMaterial  // back
    ];

    var mesh = new THREE.Mesh(geometry, materials);
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    console.log(`Created card with material:`, materials); // Debugging output
    mesh.scale.set(1, 1, 1); // Adjust these values to your liking

    return mesh;
}

    shuffle() {
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }

    deal(playersCount) {
        const piles = Array.from({ length: playersCount }, () => []);
        this.deck.forEach((card, index) => piles[index % playersCount].push(card));
        return piles;
    }
}

export default Deck;